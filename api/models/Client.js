const S = require("sequelize");
const db = require("../config");

class Client extends S.Model {}

Client.init(
  {
    mail: {
      type: S.DataTypes.STRING,
      validate: { isEmail: true },
    },
    telefono: { type: S.STRING, allowNull: false },
    datos_del_grupo: { type: S.STRING },
    institucion: { type: S.STRING, allowNull: false },
    direccion: { type: S.STRING },
    provincia: { type: S.STRING },
    localidad: { type: S.STRING },
    gestion: { type: S.STRING },
    cantidad_de_personas: { type: S.INTEGER },
    cantidad_de_docentes: { type: S.INTEGER },
    requerimientos_especificos: { type: S.STRING },
    autoriza_foto: { type: S.BOOLEAN },
    grupo: { type: S.STRING },
    tipo_de_curso: { type: S.STRING},
    actividad_solicitada: { type: S.STRING },
  },
  { sequelize: db, modelName: "client", timestamps: false }
);

module.exports = Client;
