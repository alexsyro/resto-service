const express = require('express');
const bcrypt = require('bcrypt');

const { Router } = express;
const router = Router();
const { Client, Staff } = require('../db/models');

const REGEXP_EMAIL_PATTERN = /[\s\S]+[@]{1}.+[.]{1}/gi;

// Регистрация
router.get('/new', async (req, res) => {
  const { name, email, phone, password, discountId } = req.body;
  try {
    const [, isNew] = await Client.findOrCreate({
      where: {
        email,
        phone,
      },
      defaults: {
        name,
        email,
        phone,
        password: await bcrypt.hash(password, 10),
        DiscountId: discountId || 1, // 0% by default
      },
    });
    // If new - that's ok? Proceed to session creating
    if (isNew) {
      const user = { name, email, phone, isAdmin: false, discount: discountId || 1 };
      req.session.isAuthorized = true;
      req.session.user = { ...user, password: '' };
      res.json({ user }); // send user back
    } else {
      res.status(409).json({ error: 'User already exists', user: {} });
    }
  } catch (error) {
    res.status(500).json({ error, user: {} });
  }
});

// Логин
router.get('/', async (req, res) => {
  const { credentials, password } = req.body;
  let user;
  if (credentials.match(REGEXP_EMAIL_PATTERN)) {
    // Если в строке находится email проверяем среди клиентов
    try {
      user = await Client.find({ where: { email: credentials } });
    } catch (error) {
      res.status(500).json({ error, user: {} });
    }
  } else {
    // Если в строке не почта, то смотрим есть ли login у персонала
    try {
      user = await Staff.find({ where: { login: credentials } });
    } catch (error) {
      res.status(500).json({ error, user: {} });
    }
    if (user) {
      // Если клиент с таким логином существует, тогда сравниваем пароли
      if (bcrypt.combine(password, user.password)) {
        // Если пароль подходит, то пишем юзера в сессию
        req.session.isAuthorized = true;
        if (user.PostId === 1) {
          // post_id 1 - это Админ
          req.session.user = { ...user, isAdmin: true, password: '' };
        } else {
          req.session.user = { ...user, isAdmin: false, password: '' };
        }
        res.json({ user });
      } else {
        // Если не подходит - кидаем на фронт ошибку
        res.status(403).json({ error: 'Wrong password', user: {} });
      }
    } else {
      // Если такого пользователя не существует, кидам на фронт ошибку
      res.status(404).json({ error: 'User not found', user: {} });
    }
  }
});

module.exports = router;
