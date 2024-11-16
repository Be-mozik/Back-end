const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, text, html, fromName = 'Be Mozik', attachments }) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: {
        name: fromName,
        address: process.env.EMAIL_USER,
      },
      to,
      subject,
      text,
      html,
      attachments: attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Une erreur a été rencontrée lors de l’envoi de l’email.');
  }
}

module.exports = sendEmail;
