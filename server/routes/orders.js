const express = require('express');

const { Router } = express;
const router = Router();
const { Reservation, Table, State, Order, Client, OrderPosition } = require('../db/models');

// Запрос на категории с подкатегориями
router.get('/', async (req, res) => {
  const reservations = await Reservation.findAll({
    attributes: ['id', 'table_id', 'state_id', 'date_time', 'guest_count', 'guest_name', 'guest_phone', 'time_interval'],
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
  console.log(reservations);

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
        attributes: ['id', 'table_id', 'date_time', 'state_id', 'guest_count', 'guest_name', 'guest_phone', 'time_interval'],
      },
      {
        model: State,
        key: 'id',
        attributes: ['id', 'state'],
      },
    ],
    raw: true,
  });
  console.log('orders:   ', orders, 'reservations:   ', reservations);
  res.json({ orders, reservations });
});

router.put('/done', async (req, res) => {
  const { id } = req.body;
  await Order.update({ state_id: 2 }, {
    where: {
      id,
    },
  });
  res.json({ message: 'Вы успешно подтвердили заказ' });
});

router.put('/edit', async (req, res) => {
  const { id } = req.body;
  await Order.update({ status: 'toCheck' }, {
    where: {
      id,
    },
  });
  res.json({ message: 'Вы успешно изменили заказ' });
});

module.exports = router;
