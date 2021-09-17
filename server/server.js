const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

// Routers
const clientRouter = require('./routes/clients');
const staffRouter = require('./routes/staff');

// Инициализируем хранение переменных окружения в файл .env
dotenv.config();

const { PORT, SECRET } = process.env;
const REGEXP_EMAIL_PATTERN = /[\s\S]+[@]{1}.+[.]{1}/gi;

const server = express();

const sessionConfig = {
  name: 'user_sid',
  secret: SECRET,
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

// Routers
server.use('/api/clients', clientRouter);
server.use('/api/staff', staffRouter);

server.listen(PORT, () => {
  console.log(`${'\n'.repeat(10)}[------] SERVER STARTED AT PORT ${PORT} [------]\n`);
});
