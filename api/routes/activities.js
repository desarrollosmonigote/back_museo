const express = require("express");
const ActivitiesController = require("../controllers/activities");
const { validateAdmin } = require("../middlewares/auth");
const uploader = require("../public/multer");

const router = express.Router();

// api/activities
router.get("/", ActivitiesController.getAll);
// ruta para las actividades activas
router.get("/active", ActivitiesController.getAllActive);
router.get("/:id", ActivitiesController.getSingle);
router.post(
  "/",
  /*validateAdmin,*/ uploader.single("file"),
  ActivitiesController.createActivity
);

router.put("/:id", /*validateAdmin,*/ ActivitiesController.updateActivity);
router.delete("/:id", /*validateAdmin,*/ ActivitiesController.deleteActivity);

module.exports = router;
