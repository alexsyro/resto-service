const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'elbrus.socks@mail.ru',
    pass: 'o4BbeTNMsZAbqHKsaB4C',
  },
});

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log('Email sent: ', info);
  });
};

module.exports = mailer;

const message = {
  from: 'ELBRUS SOCKS TEAM <elbrus.socks@mail.ru>',
  to: req.session.user.email,
  subject: 'Подтверждение покупки',
  text: `Уважаемый, ${req.session.user.username}, благодарим за приобретение следующих товаров: \n${letterOfGoods}`,
};
mailer(message);
