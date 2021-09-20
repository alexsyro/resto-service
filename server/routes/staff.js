const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Staff, File, Post } = require('../db/models');

const { Router } = express;
const router = Router();

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({ attributes: ['id', 'name'], raw: true });
    res.json({ posts });
  } catch (err) {
    console.log('------------ERROR', new Date(), err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const staffs = await Staff.findAll({ raw: true });
    res.json({ staffs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, user: {} });
  }
});

// Регистрация персонала
router.post('/new', async (req, res) => {
  const { file } = req.files;
  console.log('[INCOMING BODY TO REG STA]', file);
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
    console.log('-----------------IMAGE CREATED', image.id, name, login, phone, password);
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
    console.log(error);
    res.status(500).json({ error: error.message, user: {} });
  }
});

// Изменение
router.put('/:id', async (req, res) => {
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
    staff.save();
    res.json({ staff });
  } catch (err) {
    console.log('------------ERROR', new Date(), err);
    res.status(500).json({ error: err.message });
  }
});

// Удаление персонала
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Staff.destroy({ where: { id } });
    res.json({ deleted: true });
  } catch (err) {
    console.log('------------ERROR', new Date(), err);
    res.status(500).json({ error: err.message });
  }
});

// Логин
router.post('/', async (req, res) => {
  console.log('[INCOMING BODY TO LOGIN STAFF]', req.body);
  const { credentials, password } = req.body;
  try {
    const user = await Staff.findOne({ where: { login: credentials }, raw: true });
    if (user) {
      // Если клиент с таким логином существует, тогда сравниваем пароли
      if (await bcrypt.compare(password, user.password)) {
        // Если пароль подходит, то пишем юзера в сессию
        req.session.isAuthorized = true;
        if (user.PostId === 1) {
          // post_id 1 - это Админ
          req.session.user = { ...user, isAdmin: true, password: '' };
        } else {
          req.session.user = { ...user, isAdmin: false, password: '' };
        }
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
