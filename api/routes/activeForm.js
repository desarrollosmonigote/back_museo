const express = require("express");
const ActiveFormController = require("../controllers/activeForm");
const { validateAdmin } = require("../middlewares/auth");

const router = express.Router();

// api/activeForm
router.get("/", /*validateAdmin,*/ ActiveFormController.getFormStatus)
router.put("/:id", /*validateAdmin,*/ ActiveFormController.updateActiveForm);

module.exports = router;