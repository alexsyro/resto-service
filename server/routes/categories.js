const express = require('express');

const { Router } = express;
const router = Router();
const { Subcategory, Category } = require('../db/models');
const checkStaff = require('../middlewares/staffValidation');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name'],
      include: {
        model: Subcategory,
        attributes: ['id', 'name'],
      },
    });
    res.json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.post('/', checkStaff, async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({
      name,
      raw: true,
    });
    res.json({ category: newCategory });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put('/:id', checkStaff, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findOne({ id });
    category.name = name;
    await category.save();

    res.json({ category });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete('/:id', checkStaff, async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ where: { id: Number(id) } });
    await category.destroy();
    res.json({ category });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
