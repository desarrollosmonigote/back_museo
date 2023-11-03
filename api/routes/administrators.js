const express = require("express");
const AdministratorsController = require("../controllers/administrators");
const { validateAdmin } = require("../middlewares/auth");

const router = express.Router();

// api/administrators
router.get("/", AdministratorsController.getAll);
router.get("/:id", AdministratorsController.getSingle);
router.post("/login", AdministratorsController.loginAdmin);
router.post("/", AdministratorsController.createAdministrator);
router.put(
  "/change-password/:id",
  /*validateAdmin,*/ AdministratorsController.changePassword
);
router.put(
  "/:id",
  /*validateAdmin,*/ AdministratorsController.updateAdministrator
);
router.delete("/:id", AdministratorsController.deleteAdministrator);

module.exports = router;
