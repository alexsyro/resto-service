const express = require('express');
const { Op } = require('sequelize');

const { Router } = express;
const router = Router();
const { Reservation, Table, Hall, State, Client, Order } = require('../db/models');

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

router.get('/', async (req, res) => {
  const reservations = await Reservation.findAll({
    attributes: ['id', 'table_id', 'date_time', 'guest_count', 'guest_name', 'guest_phone', 'time_interval'],
    include: [
      {
        model: Table,
        key: 'id',
        attributes: ['id', 'hall_id', 'number', 'seats_limit'],
      },
      {
        model: State,
        key: 'id',
        attributes: ['id', 'state'],
      },
    ],
    raw: true,
  });

  const orders = await Order.findAll({
    attributes: ['id', 'client_id', 'reservation_id', 'state_id'],
    include: [
      {
        model: Client,
        key: 'id',
        attributes: ['id', 'name', 'phone', 'discount_id'],
      },
      {
        model: Reservation,
        key: 'id',
        attributes: ['id', 'table_id', 'date_time', 'guest_count', 'guest_name', 'guest_phone', 'time_interval'],
      },
      {
        model: State,
        key: 'id',
        attributes: ['state'],
      },
    ],
    raw: true,
  });
  res.json({ orders, reservations });
});

router.put('/done', async (req, res) => {
  const { id } = req.body;
  const reservationToChange = await Reservation.findOne({
    where: {
      id,
    },
  });
  reservationToChange.StateId = 2;
  await reservationToChange.save();

  res.json({ message: 'Вы успешно подтвердили заказ' });
});

// router.put('/edit', async (req, res) => {
//   const { id } = req.body;
// нужно изменить базу
//   res.json({ message: 'Вы успешно изменили заказ' });
// });

module.exports = router;
