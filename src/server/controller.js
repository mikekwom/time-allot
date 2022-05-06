const express = require("express");
const app = express();
const router = express.Router();
const sequelize = require("./sequelize");
const bcrypt = require("bcrypt");

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

  addGoal: async (req, res) => {
    let { title, target_hours, userEmail } = req.body;
    title = sequelize.escape(title);
    target_hours = sequelize.escape(target_hours);
    userEmail = sequelize.escape(userEmail);

    sequelize
      .query(
        `
    INSERT INTO goal
    (name, dedicated_time, created, goal_owner, target_hours, is_complete)
    VALUES (${title}, 0, NOW(), (SELECT id FROM client WHERE email = ${userEmail}), ${target_hours}, false)
    RETURNING *;
    `
      )
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  showGoals: async (req, res) => {
    let userEmail = req.params.email;
    userEmail = sequelize.escape(userEmail);

    sequelize
      .query(
        `
      SELECT *
      FROM goal
      WHERE goal_owner = (SELECT id FROM client WHERE email = ${userEmail})
      AND is_complete = false
      ORDER BY created DESC;
      `
      )
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  deleteGoal: async (req, res) => {
    let goalId = req.params.id;
    goalId = sequelize.escape(goalId);

    sequelize
      .query(
        `
      DELETE FROM goal
      WHERE id = ${goalId};
      `
      )
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  markComplete: async (req, res) => {
    let goalId = req.params.id;
    goalId = sequelize.escape(goalId);

    sequelize
      .query(
        `
      UPDATE goal
      SET is_complete = true
      WHERE id = ${goalId};
      `
      )
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  updateHours: async (req, res) => {
    let { id, hours } = req.body;
    id = sequelize.escape(id);
    hours = sequelize.escape(hours);

    sequelize
      .query(
        `
      UPDATE goal
      SET dedicated_time = ${hours}
      WHERE id = ${id}
      `
      )
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  displayHourTotal: async (req, res) => {
    let userEmail = req.params.email;
    userEmail = sequelize.escape(userEmail);

    sequelize
      .query(
        `
    SELECT SUM(dedicated_time)
    FROM goal
    WHERE goal_owner = (SELECT id FROM client WHERE email = ${userEmail})
    `
      )
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  displayNameSum: async (req, res) => {
    let { userEmail, goalName } = req.body;
    userEmail = sequelize.escape(userEmail);
    goalName = sequelize.escape(goalName);

    sequelize
      .query(
        `
      SELECT SUM(dedicated_time)
      FROM goal
      WHERE goal_owner = (SELECT id FROM client WHERE email = ${userEmail})
      AND name = ${goalName}
      ORDER BY SUM(dedicated_time)
      `
      )
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },
};
