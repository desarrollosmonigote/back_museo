const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./config");
const routes = require("./routes");
const checkClients = require("./utils/updateShifts");
const uploader = require("./public/multer");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: ["http://formmuseo.desarrollosmonigote.com", "http://dashmuseo.desarrollosmonigote.com" ]}));

app.use(express.static(__dirname + "/public"));
app.use("/multer/img", express.static(__dirname + "/public/multer/img"));

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log(
      `Servidor escuchando en el puerto 3000 y base de datos conectada`
    );
  });
});

const intervalo = 30 * 60 * 1000;
setInterval(checkClients, intervalo);
