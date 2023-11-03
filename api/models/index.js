const Activity = require("./Activity.js");
const Client = require("./Client.js");
const Shift = require("./Shift.js");
const Administrator = require("./Administrator.js");

Shift.hasOne(Client, { foreignKey: { allowNull: false, unique: true } });
Client.belongsTo(Shift, { foreignKey: { allowNull: false, unique: true } });

Activity.hasMany(Client);
Client.belongsTo(Activity, { foreignKey: { allowNull: false } });

module.exports = { Activity, Client, Shift, Administrator };
