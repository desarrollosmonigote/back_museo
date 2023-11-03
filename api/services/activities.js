const { Activity } = require("../models");

class ActivitiesServices {
  static async getAll() {
    try {
      const response = await Activity.findAll();
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(id) {
    try {
      const response = await Activity.findByPk(id);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async createActivity(body) {
    try {
      const response = await Activity.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async updateActivity(id, body) {
    try {
      // comprobamos si existe el turno
      const activity = await Activity.findByPk(id);
      if (!activity) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe la actividad con el id ${id}`,
          },
        };
      }
      // actualizamos el turno
      const [affectedRows, updatedActivity] = await Activity.update(body, {
        where: { id },
        returning: true,
      });
      return { error: false, data: updatedActivity[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async deleteActivity(id) {
    try {
      // comprobamos si existe el turno
      const activity = await Activity.findByPk(id);
      if (!activity) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe la actividad con el id ${id}`,
          },
        };
      }
      // eliminamos el turno
      const response = await Activity.destroy({ where: { id } });
      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = ActivitiesServices;
