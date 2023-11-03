const { generateToken } = require("../config/token");
const AdministratorsServices = require("../services/administrators");

class AdministratorsController {
  static async getAll(req, res) {
    const { error, data } = await AdministratorsServices.getAll();
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getSingle(req, res) {
    const { id } = req.params;
    const { error, data } = await AdministratorsServices.getSingle(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    if (!data) {
      return res
        .status(404)
        .send({ message: `No existe un turno con el id ${id}` });
    }
    res.send(data);
  }

  static async loginAdmin(req, res) {
    const { email, password } = req.body;
    const { error, data } = await AdministratorsServices.loginAdmin(
      email,
      password
    );
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    const token = generateToken(data);
    res.cookie("token", token);
    res.send({ message: "login admin ok" });
  }

  static async createAdministrator(req, res) {
    const body = req.body;
    const { error, data } = await AdministratorsServices.createAdministrator(
      body
    );
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(201).send(data);
  }

  static async changePassword(req, res) {
    const id = req.params.id;
    const { password } = req.body;
    const { error, data } = await AdministratorsServices.changePassword(
      id,
      password
    );
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send("Se ha cambiado la contraseña con éxito");
  }

  static async updateAdministrator(req, res) {
    const { id } = req.params;
    const body = req.body;
    const { error, data } = await AdministratorsServices.updateAdministrator(
      id,
      body
    );
    if (error) {
      return res.status(data.error || 500).send({ message: data.message });
    }
    res.status(202).send(data);
  }
  static async deleteAdministrator(req, res) {
    const { id } = req.params;
    const { error, data } = await AdministratorsServices.deleteAdministrator(
      id
    );
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.sendStatus(202);
  }
}

module.exports = AdministratorsController;
