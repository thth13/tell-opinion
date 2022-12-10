const nodemailer = require('nodemailer');

const user = 'noreply@tell-opinion.com'
const pass = process.env.EMAIL

const transport = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user,
    pass
  }
})

const sendEmail = (subject, html, to) => {
  transport.sendMail({
    from: '"Tell Opinion" <noreply@tell-opinion.com>',
    to,
    subject,
    html
  }).catch(err => console.log(err));
}

module.exports = sendEmail;

// `<div><h1>Email Confirmation</h1>
// <h2>Hello ${user.name}</h2>
// <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
// </div>`,