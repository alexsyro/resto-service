const express = require('express');
const session = require('express-session');
const SessionFileStore = require('session-file-store')(session);
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

// Routers
const clientRouter = require('./routes/clients');
const staffRouter = require('./routes/staff');
const menuRouter = require('./routes/menu');
const ordersRouter = require('./routes/orders');
const reserveRouter = require('./routes/reservations');

// Инициализируем хранение переменных окружения в файл .env
dotenv.config();

const { PORT, SECRET_PHRASE } = process.env;
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
    res.redirect(307, '/api/clients');
  } else {
    res.redirect(307, '/api/staff');
  }
});

server.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
});

// Routers
server.use('/api/clients', clientRouter);
server.use('/api/staff', staffRouter);
server.use('/api/menu', menuRouter);
server.use('/api/orders', ordersRouter);
server.use('/api/reservations', reserveRouter);

server.listen(PORT, () => {
  console.log(`${'\n'.repeat(10)}[------] SERVER STARTED AT PORT ${PORT} [------]\n`);
});
