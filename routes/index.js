const { getHome } = require("../controllers/mainController");

const express = require("express");

const router = express.Router();

router.get("/", getHome);

module.exports = router;
