const { ActiveForm } = require("../models");

class ActiveFormServices {
  static async getAll() {
    try {
      const response = await ActiveForm.findAll();
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async updateActiveForm(id, body) {
    try {
      const activeForm = await ActiveForm.findByPk(id);
      if (!activeForm) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe ese formulario con el id ${id}`,
          },
        };
      }
      const [affectedRows, updatedActiveForm] = await ActiveForm.update(body, {
        where: { id },
        returning: true,
      });
      return { error: false, data: updatedActiveForm[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = ActiveFormServices;
