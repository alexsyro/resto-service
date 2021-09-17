const express = require('express');
const bcrypt = require('bcrypt');

const { Router } = express;
const router = Router();
const { Staff } = require('../db/models');

// Регистрация персонала
router.post('/new', async (req, res) => {
  const { name, login, phone, password, postId } = req.body;
  try {
    const [, isNew] = await Staff.findOrCreate({
      where: {
        login,
        phone,
      },
      defaults: {
        name,
        login,
        phone,
        password: await bcrypt.hash(password, 10),
        PostId: postId,
      },
    });
    // If new - that's ok? Proceed to session creating
    if (isNew) {
      const user = { name, login, phone, isAdmin: postId === 1 }; // postId 1 = admin
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
router.post('/', async (req, res) => {
  const { credentials, password } = req.body;
  try {
    const user = await Staff.find({ where: { email: credentials } });
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
  } catch (error) {
    res.status(500).json({ error, user: {} });
  }
});

module.exports = router;
