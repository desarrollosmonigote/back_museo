const { Shift, Client } = require("../models");

class ShiftsServices {
  static async getAll() {
    try {
      const response = await Shift.findAll();
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async getAllAvailables() {
    try {
      const response = await Shift.findAll({
        where: { status: "disponible"},
        include: [
          {
            model: Client,
            attributes: ["shiftId"],
          },
        ],
      });
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async getAllShiftsAndClients() {
    try {
      const response = await Shift.findAll({
        include: [
          {
            model: Client,
            attributes: [
              "mail",
              "telefono",
              "datos_del_grupo",
              "institucion",
              "direccion",
              "provincia",
              "localidad",
              "gestion",
              "cantidad_de_personas",
              "cantidad_de_docentes",
              "requerimientos_especificos",
              "autoriza_foto",
              "grupo",
              "tipo_de_curso",
              "actividad_solicitada",
            ],
          },
        ],
      });
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async getAllShiftAndClientById(id) {
    try {
      const response = await Shift.findOne({
        where: { id: id },
        include: [
          {
            model: Client,
            attributes: [
              "mail",
              "telefono",
              "datos_del_grupo",
              "institucion",
              "direccion",
              "provincia",
              "localidad",
              "gestion",
              "cantidad_de_personas",
              "cantidad_de_docentes",
              "requerimientos_especificos",
              "autoriza_foto",
              "grupo",
              "tipo_de_curso",
              "actividad_solicitada",
            ],
          },
        ],
      });
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(id) {
    try {
      const response = await Shift.findByPk(id);
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async createShift(body) {
    try {
      const response = await Shift.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async updateShift(id, body) {
    try {
      // comprobamos si existe el turno
      const shift = await Shift.findByPk(id);
      if (!shift) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el turno con el id ${id}`,
          },
        };
      }
      // actualizamos el turno
      const [affectdRows, updatedShift] = await Shift.update(body, {
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
      const shift = await Shift.findByPk(id);
      if (!shift) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el turno con el id ${id}`,
          },
        };
      }
      // eliminamos el turno
      const response = await Shift.destroy({ where: { id } });
      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = ShiftsServices;