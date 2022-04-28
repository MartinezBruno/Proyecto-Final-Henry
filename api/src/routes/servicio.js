const express = require("express");
const router = express.Router();

const { getServicios } = require("../controllers/servicios");

router.get("/", getServicios);

module.exports = router;
