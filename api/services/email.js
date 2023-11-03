const { transporter } = require("../config/mailer");
let handlebars = require("handlebars");
let fs = require("fs");
console.log(transporter.sendMail);

exports.sendShiftConfirmation = (data, turno) => {
  const { mes, dia, horario, numeroDia } = turno;
  const mail = data.dataValues.mail;

  readHTMLFile(
    __dirname + "/../utils/email/shiftConfirmation.html",
    function (err, html) {
      if (err) {
        console.error("error reading file", err);
        return;
      }
      let template = handlebars.compile(html);
      let replacements = {
        mail,
        mes,
        dia,
        horario,
        numeroDia,
      };
      let htmlToSend = template(replacements);
      let mailOptions = {
        from: "Museo Histórico Nacional <historiconacional@gmail.com>",
        to: mail,
        subject: "Confirmación de turno",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }
      });
    }
  );
};

let readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
};
