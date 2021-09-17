const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Client } = require('../db/models');

const { Router } = express;
const router = Router();

// Регистрация
router.post('/new', async (req, res) => {
  console.log('[INCOMING BODY TO REG CLIENT]', req.body);
  const { name, email, phone, password, discountId } = req.body;
  try {
    const [, isNew] = await Client.findOrCreate({
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
      const user = { name, email, phone, isAdmin: false, discount: discountId || 1 };
      req.session.isAuthorized = true;
      req.session.user = { user: { ...user, password: '' } };
      res.json({ user }); // send user back
    } else {
      res.status(409).json({ error: 'User already exists', user: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, user: {} });
  }
});

// Логин
router.post('/', async (req, res) => {
  console.log('[INCOMING BODY TO LOGIN CLIENT]', req.body);
  const { credentials, password } = req.body;
  // Если в строке находится email проверяем среди клиентов
  try {
    const user = await Client.findOne({ where: { email: credentials }, raw: true });

    if (user) {
      // Если клиент с таким логином существует, тогда сравниваем пароли
      if (await bcrypt.compare(password, user.password)) {
        // Если пароль подходит, то пишем юзера в сессию
        req.session.isAuthorized = true;
        req.session.user = { ...user, isAdmin: false, password: '' };
        res.json({ user: { ...user, password: '' } });
      } else {
        // Если не подходит - кидаем на фронт ошибку
        res.status(403).json({ error: 'Wrong password', user: {} });
      }
    } else {
      // Если такого пользователя не существует, кидам на фронт ошибку
      res.status(404).json({ error: 'User not found', user: {} });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, user: {} });
  }
});

module.exports = router;
