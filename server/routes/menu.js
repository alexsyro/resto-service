const express = require('express');

const { Router } = express;
const router = Router();
const { Position, Subcategory, Category, Measure, File } = require('../db/models');
const checkStaff = require('../middlewares/staffValidation');

// Запрос единиц измерения
router.get('/measures', async (req, res) => {
  try {
    const measures = await Measure.findAll({ attributes: ['id', 'type'], raw: true });
    res.json({ measures });
  } catch (err) {
    console.log('------------ERROR', new Date(), err);
    res.status(500).json({ error: err.message });
  }
});

// Добавление Блюда
router.post('/', checkStaff, async (req, res) => {
  const { file } = req.files;
  const { name, description, kcal, portionSize, price, categoryId, measureId } = req.body;
  console.log(name, description, kcal, portionSize, price, categoryId, measureId);
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
    const position = await Position.create({
      name,
      description,
      kcal,
      portionSize,
      price,
      SubcategoryId: categoryId,
      FileId: image.id,
      MeasureId: measureId,
    });

    res.json({ position });
  } catch (err) {
    console.log('------------ERROR', new Date(), err);
    res.status(500).json({ error: err.message });
  }
});

// Изменение
router.put('/:id', checkStaff, async (req, res) => {
  const { id } = req.params;
  const { name, description, kcal, portionSize, price } = req.body;
  try {
    const position = await Position.findOne({ where: { id } });
    position.name = name || position.name;
    position.description = description || position.description;
    position.kcal = kcal || position.kcal;
    position.price = price || position.price;
    position.portionSize = portionSize || position.portionSize;

    if (req.file) {
      const { file } = req.files;
      const image = await File.create(
        {
          name: `${name}`,
          type: file.mimetype,
          size: file.size,
          data: file.data,
        },
        { raw: true },
      );
      position.FileId = image.id;
    }
    await position.save();
    console.log('EDIT::::::::::::::', position);
    res.json({ position });
  } catch (err) {
    console.log('------------ERROR', new Date(), err);
    res.status(500).json({ error: err.message });
  }
});

// Удаление
router.delete('/:id', checkStaff, async (req, res) => {
  const { id } = req.params;
  try {
    await Position.destroy({ where: { id } });
    res.json({ deleted: true });
  } catch (err) {
    console.log('------------ERROR', new Date(), err);
    res.status(500).json({ error: err.message });
  }
});

// Все блюда
router.get('/', async (req, res) => {
  const hugeData = await Position.findAll({
    attributes: ['id', 'name', 'description', 'kcal', 'portionSize', 'price'],
    include: [
      {
        model: Subcategory,
        attributes: ['id', 'name'],
      },
      {
        model: Measure,
        attributes: ['type'],
      },
      {
        model: File,
        attributes: ['type', 'data', 'name'],
      },
    ],
    raw: true,
  });
  res.json(hugeData);
});

// Блюда только определённой категории
router.get('/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const positions = await Position.findAll({
      attributes: ['id', 'name', 'description', 'kcal', 'portionSize', 'price'],
      where: {
        SubcategoryId: id,
      },
      include: [
        {
          model: Subcategory,
          attributes: ['name'],
        },
        {
          model: Measure,
          attributes: ['type'],
        },
        {
          model: File,
          attributes: ['type', 'data', 'name'],
        },
      ],
      raw: true,
    });
    res.json({ positions });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

// Запрос на категории с подкатегориями
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll({ attributes: ['id', 'name'], raw: true });
    const categoriesWithSubcategory = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await Subcategory.findAll({
          attributes: ['id', 'name', 'category_id'],
          where: {
            CategoryId: category.id,
          },
          raw: true,
        });
        if (category.categories) {
          category.categories.concat(subcategories);
        } else {
          // eslint-disable-next-line no-param-reassign
          category.categories = [...subcategories];
        }
        return category;
      }),
    );
    res.json(categoriesWithSubcategory);
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

module.exports = router;
