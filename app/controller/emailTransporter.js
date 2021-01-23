'use strict';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  service: 'qq',
  secure: true,
  auth: {
    user: '1326153330@qq.com',
    pass: 'jtxmhsdyfrergjfd',
  },
});

module.exports = transporter;
