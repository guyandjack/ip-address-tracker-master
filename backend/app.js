const express = require("express");

//Controller function
const getRequestInfo = require("./controller/getRequestInfo");

//Middelware function
const checkDataUser = require("./middelware/checkDataUser");

//express app
const app = express();

// for use json in body
app.use(express.json({ limit: "10kb" }));



//only one route
app.get("/requestinfo",
    (req, res, next) => { checkDataUser(req, res, next) },
    (req, res) => { getRequestInfo(req, res) });


module.exports = app


