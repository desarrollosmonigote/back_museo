const S = require("sequelize");
const db = require("../config");
const bcrypt = require("bcrypt");

class Administrator extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

Administrator.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    last_name: {
      type: S.STRING,
      allowNull: false,
    },
    username: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.DataTypes.STRING,
      unique: true,
      validate: { isEmail: true },
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.TEXT,
    },
    status: {
      type: S.ENUM("activo", "inactivo"),
      defaultValue: "activo",
    },
  },
  { sequelize: db, modelName: "administrator", timestamps: false }
);

Administrator.beforeCreate((admin) => {
  const salt = bcrypt.genSaltSync();
  admin.salt = salt;
  return admin
    .hash(admin.password, salt)
    .then((hash) => (admin.password = hash));
});

Administrator.addHook("beforeBulkCreate", async (admin) => {
  const salt = bcrypt.genSaltSync();
  admin.salt = salt;
  return admin
    .hash(admin.password, salt)
    .then((hash) => (admin.password = hash));
});

module.exports = Administrator;
