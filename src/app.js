import express from "express";
import sequelize from "./config/db.js";
import db from "./models/index.js";

const User = db.models.User;

const app = express();
const port = 8080;

app.get("/users", (req, res, next) => {
  try {
    User.findAll().then((data) => {
      if (data) res.send(JSON.stringify(data));
      else res.send([]);
    });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

app.get("/add-user", (req, res, next) => {
  // USE CREATE FUNCTION
  //   User.create({
  //     firstName: "John",
  //     lastName: "dadsad",
  //     email: "jhonchecna@gmail.com",
  //   })
  //     .then((data) => {
  //       res.send(data);
  //     })
  //     .catch((err) => res.send(err.message));

  // USE BUILD FUNCTION
  const user = User.build({
    firstName: "dsd",
    lastName: "dsd",
    email: "ssd@gmail.com",
  });
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400);
      res.send(err.message);
    });
});

app.get("/", (req, res, next) => {
  sequelize
    .authenticate()
    .then(() => {
      res.send(`Connection established!!!`);
    })
    .catch((err) => {
      res.send("Connection error: " + err.message);
    });
});

app.listen(port, () => {
  console.log(`Server is running now with: ${port} port!!!!!`);
});
