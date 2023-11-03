const S = require("sequelize");
const db = require("../config");

class Shift extends S.Model {}

Shift.init(
  {
    mes: {
      type: S.STRING,
      allowNull: false,
    },
    dia: {
      type: S.STRING,
      allowNull: false,
    },
    horario: {
      type: S.STRING,
      allowNull: false,
    },
    capacidad: {
      type: S.INTEGER,
      defaultValue: 35,
    },
    numeroDia: {
      type: S.INTEGER,
      allowNull: false,
    },
    status: {
      type: S.ENUM("disponible", "ocupado", "cancelado"),
      defaultValue: "disponible",
    },
    fecha_formato_fullcalendar: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "shift", timestamps: false }
);

module.exports = Shift;
