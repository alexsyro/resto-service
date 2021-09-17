const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

//Routers
const clientRouter = require('./routes/clients');

// Инициализируем хранение переменных окружения в файл .env
dotenv.config();

const { PORT, SECRET } = process.env;

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

server.use('/api/clients', clientRouter);

server.listen(PORT, () => {
  console.log(`${'\n'.repeat(10)}[------] SERVER STARTED AT PORT ${PORT} [------]\n`);
});
