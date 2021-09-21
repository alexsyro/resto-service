const express = require('express');

const { Router } = express;
const router = Router();
const { Reservation, Table, State, Order, Client, OrderPosition, Position } = require('../db/models');

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
        attributes: [
          'id',
          'table_id',
          'date_time',
          'guest_count',
          'guest_name',
          'guest_phone',
          'time_interval',
        ],
        include: {
          model: Table,
          attributes: ['number'],
        },
      },
      {
        model: State,
        key: 'id',
        attributes: ['state'],
      },
      {
        model: OrderPosition,
        key: 'id',
        attributes: ['id', 'quantity'],
        include: {
          model: Position,
          attributes: ['name', 'price'],
        },
      },
    ],
    raw: false,
  });
  res.json({ orders, reservations });
});

router.post('/', async (req, res) => {
  const { reservation, user, cart, StateId } = req.body.order;
  const order = await Order.create({
    ClientId: user.id,
    StateId,
    ReservationId: reservation.id || null,
  });

  const promissesArrayOfOrderPositions = cart.map(async (position) => {
    const orderPosition = await OrderPosition.create({
      OrderId: order.id,
      PositionId: position.id,
      quantity: position.quantity,
    });
    return orderPosition;
  });
  const orderPositions = await Promise.all(promissesArrayOfOrderPositions);
  res.json({ order, orderPositions });
});

router.put('/done', async (req, res) => {
  const { id } = req.body;
  const orderToChange = await Order.findOne({
    where: {
      id,
    },
  });
  orderToChange.StateId = 2;
  await orderToChange.save();
  // API для СМС
  res.json({ message: 'Вы успешно подтвердили заказ' });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  // нужно изменить базу
  res.json({ message: 'Вы успешно изменили заказ' });
});

router.put('/сancel', async (req, res) => {
  const { id } = req.body;
  const orderToChange = await Order.findOne({
    where: {
      id,
    },
  });
  console.log(orderToChange);
  orderToChange.StateId = 7;
  await orderToChange.save();

  res.json({ message: 'Вы успешно отменили заказ' });
});

module.exports = router;
