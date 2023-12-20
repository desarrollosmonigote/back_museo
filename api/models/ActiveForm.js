const S = require("sequelize");
const db = require("../config");

class ActiveForm extends S.Model {}

ActiveForm.init(
  {
    active: {
      type: S.BOOLEAN,
      allowNull: false,
    },
    message: {
      type: S.STRING,
      allowNull: false,
    }
  },
  { sequelize: db, modelName: "active_form", timestamps: false }
);

module.exports = ActiveForm;