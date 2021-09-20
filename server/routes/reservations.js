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

// Запрос статуса нужного столика
router.get('/table/:id', async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.query;
  const selectedDate = new Date(`${date}T${time}`);
  const startDate = new Date(selectedDate.getTime() - 1000 * 60 * 90);
  const endDate = new Date(selectedDate.getTime() + 1000 * 60 * 90);
  const reservedTablesForDate = await Reservation.findAll({
    where: {
      [Op.and]: [
        { TableId: id },
        {
          dateTime: {
            [Op.between]: [startDate, endDate],
          },
        },
      ],
    },
    raw: true,
  });
  // console.log('RESERVED TABLES::::::::::::::::::::::::', reservedTablesForDate);
  const reserved = reservedTablesForDate.length > 0;
  res.json({ reserved });
});

// Запрос на столики нужного зала
router.get('/hall/:id', async (req, res) => {
  const { id } = req.params;
  const tablesOfHall = await Table.findAll({
    where: {
      HallId: id,
    },
    raw: true,
  });
  res.json({ tables: tablesOfHall });
});

// Создание резерва столика
router.post('/', async (req, res) => {
  const { tableId, guestCount, guestPhone, guestName, date, time } = req.body;
  const selectedDate = new Date(`${date}T${time}`);
  const reservation = await Reservation.create(
    {
      TableId: tableId,
      dateTime: selectedDate,
      guestCount,
      guestName,
      guestPhone,
      timeInterval: 90,
    },
    { raw: true },
  );
  res.json({ reservation });
});

module.exports = router;
