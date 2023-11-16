const  ActiveForm  = require("../../models/ActiveForm");

async function createActiveForm() {
    try {
      await ActiveForm.create({active: true, message:"el próximo formulario se habilita el 3 de Diciembre a las 9:00hs" });
      console.log("Se creo el toggle de activar el formulario");
    } catch (error) {
      console.log(error);
    }
  }

createActiveForm()

module.exports = createActiveForm;

