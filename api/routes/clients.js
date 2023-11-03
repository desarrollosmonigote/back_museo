const express = require("express");
const ClientsController = require("../controllers/clients");
const { validateClient, validateAdmin } = require("../middlewares/auth");

const router = express.Router();

// api/clients
router.get("/", /*validateAdmin,*/ ClientsController.getAll);
router.get("/:id", /*validateAdmin,*/ ClientsController.getSingle);
router.post("/", ClientsController.createClient);
router.put("/:id", /*validateClient,*/ ClientsController.updateClient);
router.delete("/:id", /*validateAdmin,*/ ClientsController.deleteClient);

module.exports = router;
