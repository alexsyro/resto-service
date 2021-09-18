const express = require('express');
const { Op } = require('sequelize');

const { Router } = express;
const router = Router();
const { Reservation, Table, Hall } = require('../db/models');

// Список всех залов
router.get('/halls', async (req, res) => {
  const halls = await Hall.findAll({ raw: true });
  res.json({ halls });
});

// Запрос на столики нужного зала
router.get('/hall/:id', async (req, res) => {
  const { date, time } = req.query;
  const selectedDate = new Date(`${date}T${time}`);
  const offset = Math.abs(selectedDate.getTimezoneOffset()) * 60 * 1000;
  const startDate = new Date(selectedDate.getTime() - 1000 * 60 * 90);
  const endDate = new Date(selectedDate.getTime() + 1000 * 60 * 90);
  console.log(`--------
  offset: ${offset}
  startDate: ${startDate}
  selectedDate: ${selectedDate}
  endDate: ${endDate}
  --------`);
  const tableForDate = await Reservation.findAll({
    where: {
      dateTime: {
        [Op.gt]: startDate,
        [Op.lt]: endDate,
      },
    },
    raw: true,
  });
  console.log('TABLES:::::', tableForDate);
  res.json({ reserved: tableForDate });
});

// Создание резерва столика
router.post('/', async (req, res) => {
  const { tableId, guestCount, date, time } = req.body;
  console.log('////////', req.body);
  const selectedDate = new Date(`${date}T${time}`);
  const offset = Math.abs(selectedDate.getTimezoneOffset()) * 60 * 1000;
  console.log(':::::::::::::::', selectedDate);
  const reservation = await Reservation.create(
    {
      TableId: tableId,
      dateTime: selectedDate.toUTCString(),
      guestCount,
      timeInterval: 90,
    },
    { raw: true },
  );
  console.log('RESERVATION', reservation);
  res.json(reservation);
});

module.exports = router;
