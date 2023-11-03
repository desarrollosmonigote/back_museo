const { Administrator } = require("../models");

class AdministratorsServices {
  static async getAll() {
    try {
      const response = await Administrator.findAll();
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(id) {
    try {
      const response = await Administrator.findByPk(id);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async loginAdmin(email, password) {
    try {
      const admin = await Administrator.findOne({ where: { email: email } });
      if (!admin)
        return {
          error: true,
          data: {
            status: 400,
            message: `No existe el administrador con el email ${email}`,
          },
        };
      const validate = await admin.validatePassword(password);
      if (!validate)
        return {
          error: true,
          data: {
            status: 400,
            message: "Contraseña incorrecta",
          },
        };
      const payload = {
        name: admin.name,
        last_name: admin.last_name,
        username: admin.username,
        email: admin.email,
        rol: "admin",
      };
      return { error: false, data: payload };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async createAdministrator(body) {
    try {
      const response = await Administrator.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async changePassword(id, password) {
    try {
      const admin = await Administrator.findByPk(id);
      if (!admin) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el administrador con el id ${id}`,
          },
        };
      }
      if (password.length < 6) {
        return {
          error: true,
          data: {
            status: 400,
            message: `La contraseña debe tener al menos 6 caracteres`,
          },
        };
      }
      // actualizamos la contraseña
      const hashedPassword = await admin.hash(password, admin.salt);
      const response = admin.update({
        password: hashedPassword,
        first_access: false,
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async updateAdministrator(id, body) {
    try {
      // comprobamos si existe el administrador
      const administrator = await Administrator.findByPk(id);
      if (!administrator) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el administrador con el id ${id}`,
          },
        };
      }
      // actualizamos el turno
      const [affectdRows, updatedAdministrator] = await Administrator.update(
        body,
        {
          where: { id },
          returning: true,
        }
      );
      return { error: false, data: updatedAdministrator[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async deleteAdministrator(id) {
    try {
      // comprobamos si existe el turno
      const administrator = await Administrator.findByPk(id);
      if (!administrator) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el administrador con el id ${id}`,
          },
        };
      }
      // eliminamos el turno
      const response = await Administrator.destroy({ where: { id } });
      return { error: false, data: response };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = AdministratorsServices;
