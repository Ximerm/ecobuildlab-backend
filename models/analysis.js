const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({});

module.exports = mongoose.model("Analysis", analysisSchema);
