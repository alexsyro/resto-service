const express = require('express');

const { Router } = express;
const router = Router();
const { Position, Subcategory, Category, Measure } = require('../db/models');

// Все блюда
router.get('/', async (req, res) => {
  const hugeData = await Position.findAll({
    attributes: ['id', 'name', 'description', 'kcal', 'portionSize', 'price', 'imgPath'],
    include: [
      {
        model: Subcategory,
        attributes: ['id', 'name'],
        // include: [
        //   {
        //     model: Category,
        //     attributes: ['id', 'name'],
        //   },
        // ],
      },
      {
        model: Measure,
        attributes: ['type'],
        // attributes: ['id', 'type'],
      },
    ],
    raw: true,
  });
  res.json(hugeData);
});

// Блюда только определённой категории
router.get('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const positions = await Position.findAll({
    attributes: ['id', 'name', 'description', 'kcal', 'portionSize', 'price', 'imgPath'],
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
    ],
    raw: true,
  });
  console.log('POSITIONS', positions);
  res.json({ positions });
});

// Запрос на категории с подкатегориями
router.get('/categories', async (req, res) => {
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
        category.categories = [...subcategories];
      }
      return category;
    }),
  );
  console.log('CATEGORY', categoriesWithSubcategory);
  res.json(categoriesWithSubcategory);
});

module.exports = router;
