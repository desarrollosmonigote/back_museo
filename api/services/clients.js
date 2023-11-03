const { Client } = require("../models");
const { Shift } = require("../models");

class ClientsServices {
  static async getAll() {
    try {
      const response = await Client.findAll();
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(id) {
    try {
      const response = await Client.findByPk(id);
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async createClient(body) {
    try {
      const response = await Client.create(body);
      const [affectdRows, updatedShift] = await Shift.update(
        { status: "ocupado" },
        {
          where: { id: body.shiftId },
          returning: true,
        }
      );
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async updateShift(id, body) {
    try {
      // comprobamos si existe el turno
      const client = await Client.findByPk(id);
      if (!client) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el cliente con el id ${id}`,
          },
        };
      }
      // actualizamos el turno
      const [affectdRows, updatedShift] = await Client.update(body, {
        where: { id },
        returning: true,
      });
      return { error: false, data: updatedShift[0] };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async deleteShift(id) {
    try {
      // comprobamos si existe el turno
      const client = await Client.findByPk(id);
      if (!client) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el cliente con el id ${id}`,
          },
        };
      }
      //actualizamos el turno a "disponible"
      const [affectdRows, updatedShift] = await Shift.update({status: "disponible"}, {
        where: { id: client.dataValues.shiftId },
        returning: true,
      });
      // eliminamos el cliente
      const response = await Client.destroy({ where: { id } });
      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = ClientsServices;
