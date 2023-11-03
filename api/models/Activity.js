const S = require("sequelize");
const db = require("../config");

class Activity extends S.Model {}

Activity.init(
  {
    grupo: {
      type: S.STRING,
      allowNull: false,
    },
    actividad: {
      type: S.STRING,
      allowNull: false,
    },
    descripcion: {
      type: S.TEXT,
      allowNull: false,
    },
    path_image: {
      type: S.STRING,
    },
    status: {
      type: S.ENUM("activo", "inactivo"),
      defaultValue: "activo",
    },
  },
  { sequelize: db, modelName: "activity", timestamps: false }
);

module.exports = Activity;
