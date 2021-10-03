const express = require("express");
const router = express.Router();

const controller = require('../controllers/category');

router.post("/", controller.create);
router.get("/", controller.all);
router.delete("/:id", controller.delete);

module.exports = router;