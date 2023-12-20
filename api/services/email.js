const { transporter } = require("../config/mailer");
let handlebars = require("handlebars");
let fs = require("fs");
console.log(transporter.sendMail);

exports.sendShiftConfirmation = (data, turno) => {
  const { mes, dia, horario, numeroDia } = turno;
  const mail = data.dataValues.mail;
  const { cantidad_de_personas, cantidad_de_docentes, institucion } =
    data.dataValues

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
        cantidad_de_personas,
        cantidad_de_docentes,
        institucion,
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


exports.sendShiftCancelation = (mail) => {

  readHTMLFile(
    __dirname + "/../utils/email/shiftCanceled.html",
    function (err, html) {
      if (err) {
        console.error("error reading file", err);
        return;
      }
      let template = handlebars.compile(html);
      let replacements = {
        mail
      };
      let htmlToSend = template(replacements);
      let mailOptions = {
        from: "Museo Histórico Nacional <historiconacional@gmail.com>",
        to: mail,
        subject: "Cancelación de turno",
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
