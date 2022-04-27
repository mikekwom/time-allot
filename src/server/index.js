const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const sequelize = require("./sequelize");
const bcrypt = require("bcrypt");
app.use("/", require("./controller"));

// Middleware
app.use(express.json());
app.use(cors());

// Endpoints here
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const validClient = await sequelize
    .query(
      `
    SELECT * FROM client WHERE email = '${email}'
    `
    )
    .catch((err) => console.log(err));
  console.log(validClient[1].rowCount);

  if (validClient[1].rowCount === 1) {
    if (bcrypt.compareSync(password, validClient[0][0].password)) {
      let object = {
        id: validClient[0][0].id,
        name: validClient[0][0].name,
        email,
      };
      res.status(200).send(object);
    } else {
      res.status(401).send("Password is incorrect");
    }
  } else {
    res.status(401).send("Email is incorrect");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
