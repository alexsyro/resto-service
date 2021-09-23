const nodemailer = require('nodemailer');

async function mailer(message) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const sendMail = () => {
    transporter.sendMail(message, (err, info) => {
      if (err) return console.log(err);
      console.log('Email sent: ', info);
    });
  };

  sendMail();
}

module.exports = mailer;
