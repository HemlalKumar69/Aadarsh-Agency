const express = require("express");
const totalDetails = require("../Controller/total.controller");
const routes = express.Router();

routes.get("/summary", totalDetails.getDashboardReport);

module.exports = routes;
