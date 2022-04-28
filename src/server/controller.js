const express = require("express");
const app = express();
const router = express.Router();
module.exports = {
  register: async (req, res) => {
    const { email, name, password } = req.body;
    const checkClient = await sequelize.query(`
      SELECT * FROM client WHERE email = '${email}'
      `);
    // console.log(checkClient[1].rowCount)
    if (checkClient[1].rowCount !== 0) {
      res.status(500).send("Email already in use");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      await sequelize.query(`
          INSERT INTO client(name, email, password)
          VALUES (
              '${name}',
              '${email}',
              '${passwordHash}'
          )
          `);
      // gives frontend access to client
      const clientInfo = await sequelize.query(`
          SELECT id, email, name FROM client WHERE email = '${email}' 
          `);
      res.status(200).send(clientInfo);
    }
  },
  login: async (req, res) => {
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
  },
};
