const S = require("sequelize");
const db = require("../config");

class Client extends S.Model {}

Client.init(
  {
    mail: {
      type: S.DataTypes.STRING,
      unique: true,
      validate: { isEmail: true },
    },
    telefono: { type: S.STRING, allowNull: false },
    datos_del_grupo: { type: S.STRING },
    institucion: { type: S.STRING, allowNull: false },
    direccion: { type: S.STRING, allowNull: false },
    provincia: { type: S.STRING, allowNull: false },
    localidad: { type: S.STRING, allowNull: false },
    gestion: { type: S.STRING, allowNull: false },
    cantidad_de_personas: { type: S.INTEGER, allowNull: false },
    cantidad_de_docentes: { type: S.INTEGER, allowNull: false },
    requerimientos_especificos: { type: S.STRING },
    autoriza_foto: { type: S.BOOLEAN, allowNull: false },
    grupo: { type: S.STRING, allowNull: false },
    tipo_de_curso: { type: S.STRING, allowNull: false },
    actividad_solicitada: { type: S.STRING, allowNull: false },
  },
  { sequelize: db, modelName: "client", timestamps: false }
);

module.exports = Client;
