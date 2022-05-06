const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const ctrl = require("./controller");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

// Endpoints here
app.post("/register", ctrl.register);
app.post("/login", ctrl.login);
app.post("/today", ctrl.addGoal);
app.get("/today/:email", ctrl.showGoals);
app.get("/today/totals/:email", ctrl.displayHourTotal);
app.post("/today/totals/graphs", ctrl.displayNameSum);
app.delete("/today/delete/:id", ctrl.deleteGoal);
app.post("/today/complete/:id", ctrl.markComplete);
app.post("/today/update", ctrl.updateHours);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
