const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Client, Order, OrderPosition, Position, Discount } = require('../db/models');

const { Router } = express;
const router = Router();

// Регистрация
router.post('/new', async (req, res) => {
  const { name, email, phone, password, discountId } = req.body;
  try {
    const [userEntry, isNew] = await Client.findOrCreate({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
      defaults: {
        name,
        email,
        phone,
        password: await bcrypt.hash(password, 10),
        DiscountId: discountId || 1, // 0% by default
      },
      raw: true,
    });
    // If new - that's ok? Proceed to session creating
    if (isNew) {
      const discount = await Discount.findOne({ where: { id: 1 } });
      const user = {
        ...userEntry.dataValues,
        password: '',
        isAdmin: false,
        isAuth: true,
        isStaff: false,
        discount: discount.size,
      };
      req.session.isAuthorized = true;
      req.session.user = user;
      res.json({ user }); // send user back
    } else {
      res.status(409).json({ error: 'User already exists', user: { isAuth: false } });
    }
  } catch (error) {
    console.log(`DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

// Логин
router.post('/', async (req, res) => {
  const { credentials, password } = req.body;
  // Если в строке находится email проверяем среди клиентов
  try {
    const user = await Client.findOne({ where: { email: credentials }, raw: true });

    if (user) {
      // Если клиент с таким логином существует, тогда сравниваем пароли
      if (await bcrypt.compare(password, user.password)) {
        const userData = { ...user, isAdmin: false, password: '', isAuth: true, isStaff: false };
        // Если пароль подходит, то пишем юзера в сессию
        req.session.isAuthorized = true;
        req.session.user = userData;
        const orders = await Order.findAll({
          where: {
            ClientId: user.id,
          },
          include: [
            {
              model: OrderPosition,
              attributes: ['quantity'],
              include: [{ model: Position, attributes: ['price'] }],
            },
          ],
        });
        const fullSpentMoney = orders.reduce((accum, order) => {
          const allPosPrice = order.OrderPositions.reduce((acc, position) => {
            // eslint-disable-next-line max-len
            const posPrice = position.dataValues.quantity * position.dataValues.Position.dataValues.price;
            return acc + posPrice;
          }, 0);
          return accum + allPosPrice;
        }, 0);
        const possibleDiscount = await Discount.findOne({
          where: {
            [Op.and]: [
              {
                minLimit: {
                  [Op.lte]: fullSpentMoney,
                },
              },
              {
                maxLimit: {
                  [Op.gte]: fullSpentMoney,
                },
              },
            ],
          },
          raw: true,
        });
        const userEntry = await Client.findOne({ where: { id: user.id } });
        userEntry.DiscountId = possibleDiscount.id;
        await userEntry.save();
        res.json({ user: { ...userData, discount: possibleDiscount.size } });
      } else {
        // Если не подходит - кидаем на фронт ошибку
        res.status(403).json({ error: 'Wrong password', user: { isAuth: false } });
      }
    } else {
      // Если такого пользователя не существует, кидам на фронт ошибку
      res.status(404).json({ error: 'User not found', user: { isAuth: false } });
    }
  } catch (error) {
    console.log(`DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

// Показываю всех пользователей
router.get('/', async (req, res) => {
  try {
    const clients = await Client.findAll({
      attributes: ['id', 'name', 'DiscountId', 'email', 'phone', 'createdAt', 'updatedAt'],
      raw: true,
    });
    res.json({ clients });
  } catch (error) {
    console.log(`DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

module.exports = router;
