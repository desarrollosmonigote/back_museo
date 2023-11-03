const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "historiconacional@gmail.com",
    pass: "mpat iblp yugb uuzl",
  },
});

transporter.verify().then(() => {
  console.log("Listo para enviar emails");
});

module.exports = { transporter };
