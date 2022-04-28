const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const sequelize = require("./sequelize");
const bcrypt = require("bcrypt");
const ctrl = require("./controller");

// Middleware
app.use(express.json());
app.use(cors());

// Endpoints here
app.post("/register", ctrl.register);
app.post("/login", ctrl.login);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
