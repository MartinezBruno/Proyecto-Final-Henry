const express = require("express");
const router = express.Router();

const { createProv } = require("../controllers/proveedores.js");

router.post("/", createProv);

module.exports = router;
