const ActivitiesServices = require("../services/activities");

class ActivitiesController {
  static async getAll(req, res) {
    const { error, data } = await ActivitiesServices.getAll();
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getSingle(req, res) {
    const { id } = req.params;
    const { error, data } = await ActivitiesServices.getSingle(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    if (!data) {
      return res
        .status(404)
        .send({ message: `No existe una actividad con el id ${id}` });
    }
    res.send(data);
  }

  static async createActivity(req, res) {
    const body = req.body;
    if (req.file) {
      body.path_image = req.file.path;
    }
    const { error, data } = await ActivitiesServices.createActivity(body);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(201).send(data);
  }

  static async updateActivity(req, res) {
    const { id } = req.params;
    const body = req.body;
    const { error, data } = await ActivitiesServices.updateActivity(id, body);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send(data);
  }

  static async deleteActivity(req, res) {
    const { id } = req.params;
    const { error, data } = await ActivitiesServices.deleteActivity(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.sendStatus(202);
  }
}

module.exports = ActivitiesController;
