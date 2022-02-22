const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async data => {
  const mail = { ...data, from: 'pv.dudchenko@gmail.com' }
  await sgMail.send(mail)
  return true
}

/* sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch(error => {
    console.error(error)
  }) */

module.exports = sendMail
