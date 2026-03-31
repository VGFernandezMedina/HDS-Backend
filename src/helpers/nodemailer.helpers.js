const nodemailer = require("nodemailer");

// Creamos la autenticación de nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Cambiamos el "ethereal.email" por "gmail.com"
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    //Acá irán las credeciales que configuramos en Google.
    user: `${process.env.GMAIL_USER}`,
    pass: `${process.env.GMAIL_PASS}`,
  },
});

module.exports = transporter;
