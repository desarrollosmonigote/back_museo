const express = require("express");
const router = express.Router();
const ShiftsController = require("../controllers/shifts");
const { validateAdmin } = require("../middlewares/auth");

// api/shifts
router.get("/", ShiftsController.getAll);
router.get("/availables", ShiftsController.getAllShiftAvailables);
router.get("/andclients", ShiftsController.getAllShiftsAndClients);
router.get("/andclients/:id", ShiftsController.getAllShiftAndClientById);
router.get("/:id", ShiftsController.getSingle);
router.post("/", /* validateAdmin, */ ShiftsController.createShift);
router.put("/:id", /* validateAdmin, */ ShiftsController.updateShift);
router.delete("/:id", /* validateAdmin, */ ShiftsController.deleteShift);

module.exports = router;
