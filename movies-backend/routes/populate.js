const express = require("express");
const router = express.Router();

const controller = require('../controllers/populate');

router.post("/", controller.populate);

module.exports = router;