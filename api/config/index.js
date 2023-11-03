const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const db = new Sequelize("museo", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
