const express = require('express');

const { Router } = express;
const router = Router();
const { Subcategory } = require('../db/models');
const checkStaff = require('../middlewares/staffValidation');

router.post('/', checkStaff, async (req, res) => {
  const { category, name } = req.body;
  try {
    const newSubcategory = await Subcategory.create({
      CategoryId: category.id,
      name,
      raw: true,
    });
    res.json({ subcategory: newSubcategory });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put('/:id', checkStaff, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const subcategory = await Subcategory.findOne({ where: { id: Number(id) } });
    subcategory.name = name;
    await subcategory.save();

    res.json({ subcategory });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete('/:id', checkStaff, async (req, res) => {
  const { id } = req.params;
  try {
    const subcategory = await Subcategory.findOne({ where: { id: Number(id) } });
    await subcategory.destroy();
    res.json({ subcategory });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
