//librairies
const express = require("express");
const cors = require("cors");

//Controller function
const getRequestInfo = require("./controller/getRequestInfo");

//Middelware function
const checkDataUser = require("./middelware/checkDataUser");

//express app
const app = express();

// for use json in body
app.use(express.json({ limit: "10kb" }));

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://ip-address-tracker-master-lq4x.onrender.com",
      "https://ip-address-tracker-master-hazel.vercel.app",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // autorise les requêtes sans origin (ex: mobile, curl)
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

//only one route
app.post("/requestinfo", checkDataUser, getRequestInfo);

module.exports = app;
