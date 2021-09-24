const express = require('express');
const axios = require('axios');
const qs = require('qs');
const dotenv = require('dotenv');
const { Op } = require('sequelize');

const { Router } = express;
const router = Router();
const { Reservation, Table, Hall, State, Client, Order } = require('../db/models');
const checkStaff = require('../middlewares/staffValidation');

dotenv.config();
const { BEARER } = process.env;

// Список всех залов
router.get('/halls', async (req, res) => {
  try {
    const halls = await Hall.findAll({ raw: true });
    res.json({ halls });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

// Запрос статуса нужного столика
router.get('/table/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.query;
    const selectedDate = new Date(`${date}T${time}`);
    const startDate = new Date(selectedDate.getTime() - 1000 * 60 * 90);
    const endDate = new Date(selectedDate.getTime() + 1000 * 60 * 90);
    const reservedTablesForDate = await Reservation.findAll({
      where: {
        [Op.and]: [
          { TableId: id },
          { StateId: 2 }, // Только если столик подтверждён
          {
            dateTime: {
              [Op.between]: [startDate, endDate],
            },
          },
        ],
      },
      raw: true,
    });
    const reserved = reservedTablesForDate.length > 0;
    res.json({ reserved });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

// Запрос на столики нужного зала
router.get('/hall/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tablesOfHall = await Table.findAll({
      where: {
        HallId: id,
      },
      raw: true,
    });
    res.json({ tables: tablesOfHall });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

// Создание резерва столика
router.post('/', async (req, res) => {
  console.log('::::::::::::::::::::::::::::::::', req.body);
  try {
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
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

router.get('/', checkStaff, async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      attributes: [
        'id',
        'table_id',
        'date_time',
        'guest_count',
        'guest_name',
        'guest_phone',
        'time_interval',
      ],
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
          attributes: [
            'id',
            'table_id',
            'date_time',
            'guest_count',
            'guest_name',
            'guest_phone',
            'time_interval',
          ],
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
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

// Подтверждение резервирование
router.put('/done', checkStaff, async (req, res) => {
  try {
    const { id } = req.body;
    const reservationToChange = await Reservation.findOne({
      where: {
        id,
      },
    });
    reservationToChange.StateId = 2;
    await reservationToChange.save();

    const data = qs.stringify({
      phone: reservationToChange.guestPhone,
      text: `${reservationToChange.guestName}, ваше резервирование столика на ${new Date(
        reservationToChange.dateTime,
      )} подтверждено.`,
    });
    const config = {
      method: 'post',
      url: 'https://api.pushsms.ru/api/v1/delivery',
      headers: {
        Authorization: BEARER,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    await axios(config);

    res.json({ message: 'Вы успешно подтвердили заказ' });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

router.put('/cancel', checkStaff, async (req, res) => {
  try {
    const { id } = req.body;
    const reservationToChange = await Reservation.findOne({
      where: {
        id,
      },
    });
    reservationToChange.StateId = 7;
    await reservationToChange.save();
    res.json({ message: 'Вы успешно отменили резерв' });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

// router.put('/edit', async (req, res) => {
//   const { id } = req.body;
// нужно изменить базу
//   res.json({ message: 'Вы успешно изменили заказ' });
// });

module.exports = router;
