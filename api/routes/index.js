const express = require("express");
const router = express.Router();
const shiftRoutes = require("./shifts");
const activityRoutes = require("./activities");
const clientRoutes = require("./clients");
const administratorRoutes = require("./administrators");
const activeFormRoutes = require("./activeForm")

router.use("/shifts", shiftRoutes);
router.use("/activities", activityRoutes);
router.use("/clients", clientRoutes);
router.use("/administrators", administratorRoutes);
router.use("/activeForm", activeFormRoutes)

module.exports = router;
