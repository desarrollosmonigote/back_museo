const { Shift, Client } = require("../models");
const ClientsServices = require("../services/clients");
const emailService = require("../services/email");
const { generateClientToken } = require("../config/token");

class ClientsController {
  static async getAll(req, res) {
    const { error, data } = await ClientsServices.getAll();
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getSingle(req, res) {
    const { id } = req.params;
    const { error, data } = await ClientsServices.getSingle(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    if (!data) {
      return res
        .status(404)
        .send({ message: `No existe un cliente con el id ${id}` });
    }
    res.send(data);
  }

  static async createClient(req, res) {
    const body = req.body;
    const { error, data } = await ClientsServices.createClient(body);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    const token = generateClientToken(data);
    res.cookie("token", token);
    res.status(201).send(data);
  }

  static async updateClient(req, res) {
    const { id } = req.params;
    const body = req.body;
    const { error, data } = await ClientsServices.updateShift(id, body);
    if (error) {
      return res.status(data.error || 500).send({ message: data.message });
    }
    const turno = await Shift.findOne({ where: { id: body.shiftId } });
    if (body.activityId) {
      emailService.sendShiftConfirmation(data, turno.dataValues);
    }
    res.status(202).send(data);
  }

  static async deleteClient(req, res) {
    const { id } = req.params;
    const { error, data } = await ClientsServices.deleteShift(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.sendStatus(202);
  }
}
module.exports = ClientsController;
