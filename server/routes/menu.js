const express = require('express');

const { Router } = express;
const router = Router();
const { Position, Subcategory, Category, Measure } = require('../db/models');

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

router.get('/', async (req, res) => {
  const hugeData = await Position.findAll({
    attributes: ['id', 'name', 'description', 'kcal', 'portionSize', 'price', 'imgPath'],
    include: [
      {
        model: Subcategory,
        attributes: ['id', 'name'],
        include: [
          {
            model: Category,
            attributes: ['id', 'name'],
          },
        ],
      },
      {
        model: Measure,
        attributes: ['id', 'type'],
      },
    ],
  });
  res.json(hugeData);
});

module.exports = router;
