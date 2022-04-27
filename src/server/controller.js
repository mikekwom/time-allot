const express = require("express");
const router = express.Router();
module.exports = router;

app.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const checkUser = await sequelize.query(`
      SELECT * FROM client WHERE email = '${email}'
      `);
  // console.log(checkUser[1].rowCount)
  if (checkUser[1].rowCount !== 0) {
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
    // gives frontend access to username
    const clientInfo = await sequelize.query(`
          SELECT id, email, name FROM client WHERE email = '${email}' 
          `);
    res.status(200).send(clientInfo);
  }
});
