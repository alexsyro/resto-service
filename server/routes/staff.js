const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Staff, File, Post } = require('../db/models');
const checkStaff = require('../middlewares/staffValidation');

const { Router } = express;
const router = Router();

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({ attributes: ['id', 'name'], raw: true });
    res.json({ posts });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', checkStaff, async (req, res) => {
  try {
    const staffs = await Staff.findAll({ raw: true });
    res.json({ staffs });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Регистрация персонала
router.post('/new', checkStaff, async (req, res) => {
  const { file } = req.files;
  const { name, login, phone, password, postId } = req.body;
  try {
    const image = await File.create(
      {
        name: `${name}`,
        type: file.mimetype,
        size: file.size,
        data: file.data,
      },
      { raw: true },
    );
    const [, isNew] = await Staff.findOrCreate({
      where: {
        [Op.or]: [{ login }, { phone }],
      },
      defaults: {
        name,
        login,
        phone,
        password: await bcrypt.hash(password, 10),
        PostId: postId,
        FileId: image.id,
      },
      raw: true,
    });
    // If new - that's ok? Proceed to session creating
    if (isNew) {
      const user = { name, login, phone, isAdmin: Number(postId) === 1 }; // postId 1 = admin
      req.session.isAuthorized = true;
      req.session.user = user;
      res.json({ user }); // send user back
    } else {
      res.status(409).json({ error: 'User already exists', user: {} });
    }
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Изменение
router.put('/:id', checkStaff, async (req, res) => {
  const { id } = req.params;
  const { file } = req.files;
  const { name, password, phone, position } = req.body;
  try {
    const staff = await Staff.findOne({ where: { id } });
    staff.name = name || staff.name;
    staff.password = password || staff.password;
    staff.phone = phone || staff.phone;
    staff.PostId = position || staff.PostId;
    if (file) {
      const image = await File.create(
        {
          name: `${name}`,
          type: file.mimetype,
          size: file.size,
          data: file.data,
        },
        { raw: true },
      );
      staff.FileId = image.id;
    }
    await staff.save();
    res.json({ staff });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Удаление персонала
router.delete('/:id', checkStaff, async (req, res) => {
  const { id } = req.params;
  try {
    await Staff.destroy({ where: { id } });
    res.json({ deleted: true });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Логин
router.post('/', async (req, res) => {
  const { credentials, password } = req.body;
  try {
    const user = await Staff.findOne({ where: { login: credentials }, raw: true });
    if (user) {
      // Если клиент с таким логином существует, тогда сравниваем пароли
      if (await bcrypt.compare(password, user.password)) {
        // Если пароль подходит, то пишем юзера в сессию
        req.session.isAuthorized = true;
        let userData = { ...user, isStaff: true, isAuth: true, password: '' };
        if (user.PostId === 1) {
          // post_id 1 - это Админ
          userData = { ...userData, isAdmin: true };
        } else {
          userData = { ...userData, isAdmin: false };
        }
        req.session.user = userData;
        res.json({ user: { ...userData } });
      } else {
        // Если не подходит - кидаем на фронт ошибку
        res.status(403).json({ error: 'Wrong password', user: { isAuth: false } });
      }
    } else {
      // Если такого пользователя не существует, кидам на фронт ошибку
      res.status(404).json({ error: 'User not found', user: { isAuth: false } });
    }
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
