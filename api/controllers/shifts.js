const ShiftsServices = require("../services/shifts");

class ShiftsController {
  static async getAll(req, res) {
    const { error, data } = await ShiftsServices.getAll();
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getAllShiftAvailables(req, res) {
    const { error, data } = await ShiftsServices.getAllAvailables();
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getAllShiftsAndClients(req, res) {
    const { error, data } = await ShiftsServices.getAllShiftsAndClients();
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getAllShiftsAndClientsSorted(req, res) {
    const { error, data } = await ShiftsServices.getAllShiftsAndClientsSorted();
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }


  static async getAllShiftAndClientById(req, res) {
    const { id } = req.params;
    const { error, data } = await ShiftsServices.getAllShiftAndClientById(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getSingle(req, res) {
    const { id } = req.params;
    const { error, data } = await ShiftsServices.getSingle(id);
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

  static async createShift(req, res) {
    const body = req.body;
    const { error, data } = await ShiftsServices.createShift(body);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(201).send(data);
  }

  static async updateShift(req, res) {
    const { id } = req.params;
    const body = req.body;
    const { error, data } = await ShiftsServices.updateShift(id, body);
    if (error) {
      return res.status(data.error || 500).send({ message: data.message });
    }
    res.status(202).send(data);
  }
  static async deleteShift(req, res) {
    const { id } = req.params;
    const { error, data } = await ShiftsServices.deleteShift(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.sendStatus(202);
  }
}
module.exports = ShiftsController;
