const { Client } = require("../../models");
const ShiftsServices = require("../../services/shifts");

const checkClients = async () => {
  try {
    const cleanClients = await Client.findAll({
      where: { actividad_solicitada: null },
    });
    cleanClients.map((client) =>
      ShiftsServices.updateShift(client.dataValues.shiftId, {
        status: "disponible",
      })
    );
    cleanClients.map((client) =>
      Client.destroy({ where: { id: client.dataValues.id } })
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = checkClients;
