const express = require("express");
const router = express.Router();
const controller = require("../controllers/avaliacao.controller");

router.post("/", controller.criar);
router.get("/", controller.listar);
router.get("/stats", controller.stats);

module.exports = router;