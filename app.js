const express = require("express");

const app = express();

// Primera ruta
app.get("/", (req, res) => {
  res.send("EcoBuildLab API is running");
});

module.exports = app;
