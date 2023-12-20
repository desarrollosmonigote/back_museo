const ActiveFormServices = require("../services/activeForm");

class ActiveFormController {
  static async getFormStatus(req, res) {
    const { error, data } = await ActiveFormServices.getAll();
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }
 
  static async updateActiveForm(req, res) {
    const { id } = req.params;
    const body = req.body;
    const { error, data } = await ActiveFormServices.updateActiveForm(id, body);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send(data);
  }

}

module.exports = ActiveFormController;