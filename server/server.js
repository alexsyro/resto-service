const express = require('express');
const session = require('express-session');
const SessionFileStore = require('session-file-store')(session);
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const Stripe = require('stripe'); // импортируем платежную систему

const checkStaff = require('./middlewares/staffValidation');

// Routers
const clientRouter = require('./routes/clients');
const staffRouter = require('./routes/staff');
const menuRouter = require('./routes/menu');
const ordersRouter = require('./routes/orders');
const reserveRouter = require('./routes/reservations');
const categoryRouter = require('./routes/categories');
const subcategoryRouter = require('./routes/subcategories');
const { Reservation, Table, State, Order, Client, OrderPosition, Position } = require('./db/models');

// Инициализируем хранение переменных окружения в файл .env
dotenv.config();

const { PORT, SECRET_PHRASE } = process.env;
// передаем secret key который берем из кабинета разработчика
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const REGEXP_EMAIL_PATTERN = /[\s\S]+[@]{1}.+[.]{1}/gi;

const server = express();

const sessionConfig = {
  store: new SessionFileStore(),
  name: 'user_sid',
  secret: SECRET_PHRASE,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Цепляем сессии
server.use(session(sessionConfig));

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Разрешаем cors
server.use(cors(corsOptions));

// Парсит файлы из запросов
server.use(fileUpload());

// Logger to console
server.use(logger('dev'));

// Body parsers
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.post('/login', (req, res) => {
  const { credentials } = req.body;
  if (credentials.match(REGEXP_EMAIL_PATTERN)) {
    console.log('REDIRECTED TO CLIENTS', req.session);
    res.redirect(307, '/api/clients');
  } else {
    console.log('REDIRECTED TO STAFF', req.session);
    res.redirect(307, '/api/staff');
  }
});

server.get('/', checkStaff, async (req, res) => {
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
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

server.get('/logout', (req, res) => {
  console.log(`USER ${req.session.user.name} IS LOGOUT AT ${new Date()}`);
  req.session.destroy();
  res.clearCookie('user_sid');
  res.json({ message: 'OK' });
});

// Routers
server.use('/api/clients', clientRouter);
server.use('/api/staff', staffRouter);
server.use('/api/menu', menuRouter);
server.use('/api/orders', ordersRouter);
server.use('/api/reservations', reserveRouter);
server.use('/api/categories', categoryRouter);
server.use('/api/subcategories', subcategoryRouter);

// запрос к серверу с клиента
server.post('/pay', async (req, res) => {
  try {
    const { amount } = req.body; // сумма платежа
    // создаем платеж в котрый передаем нужные нам данные
    // нужно использовать валюту которая указана в кабинете разработчика
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        name: 'value', // metadata это для тех случаев когда нам нужно знать кто имеенно сделал
        // платеж чтобы после подтверждения платежа мы могли обновить какте либо данные
      },
    });
    // это строка которая отправляется клиенту для подтверждения платежа
    const clientSecret = paymentIntent.client_secret;
    res.json({ clientSecret, message: 'Платёж прошёл успешно!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// все отправляется в апи для проверки всего
// отправляет event.type
server.post('/stripe', (req, res) => {
  if (req.body.type === 'payment_intent.created') {
    console.log(`${req.body.data.object.metadata.name} initated payment`);
  }
  if (req.body.type === 'payment_intent.succeeded') {
    console.log(`${req.body.data.object.metadata.name} succeeded payment`);
  }
});

server.listen(PORT, () => {
  console.log(`${'\n'.repeat(10)}[------] SERVER STARTED AT PORT ${PORT} [------]\n`);
});
