const { Model } = require("sequelize");
const { Client } = require("../models");
const { Shift } = require("../models");
const emailService = require("../services/email");
const { Op } = require("sequelize");

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
      const currentDate = new Date();
      const nextMonthDate = new Date();
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      const existClient = await Client.findAll({
        where: {
          mail: body.mail,
        },
        include: [
          {
            model: Shift,
            as: 'shift',
            attributes: ["fecha_formato_fullcalendar"],
            where: {
              fecha_formato_fullcalendar: {
                [Op.gte]: currentDate,
                [Op.lt]: nextMonthDate,
              },
            },
          },
        ],
      });
      
      const clientesConTurnoEnMesSiguiente = existClient.filter((cliente) => {
        return cliente.shift && cliente.shift.fecha_formato_fullcalendar;
      });

      if (clientesConTurnoEnMesSiguiente.length > 0) {
        return { statusCode: 409, error: false, data: "El Cliente ya tiene un turno" };
      }
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
      emailService.sendShiftCancelation(client.dataValues.mail);
      //actualizamos el turno a "disponible"
      const [affectdRows, updatedShift] = await Shift.update(
        { status: "disponible" },
        {
          where: { id: client.dataValues.shiftId },
          returning: true,
        }
      );
      // eliminamos el cliente
      const response = await Client.destroy({ where: { id } });
      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = ClientsServices;
