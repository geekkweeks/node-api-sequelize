import express from "express";
import bodyParser from "body-parser";
import sequelize from "./config/db.js";
import db from "./models/index.js";
import { Op } from "sequelize";

// create application/json parser
// var jsonParser = bodyParser.json();

const User = db.models.User;

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/users/search-name/:name", async (req, res, next) => {
  try {
    const params = req.params;
    console.log("🚀 ~ app.get ~ params:", params?.name);
    if (!params) {
      res.status(400).send("Id is required");
    }
    const users = await User.findAll({
      attributes: ["firstName", "lastName"],
      where: {
        firstName: {
          [Op.like]: `%${params?.name}%`,
        },
      },
    });
    console.log("🚀 ~ app.get ~ users:", users);
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/users/:id", async (req, res, next) => {
  try {
    const params = req.params;
    if (!params) {
      res.status(400).send("Id is required");
    }
    const user = await User.findByPk(params?.id);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

app.post("/add-user", (req, res, next) => {
  const request = req.body;
  if (Object.keys(request).length === 0)
    res.status(400).send("Request is empty");
  console.log(req.body);
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
    firstName: request?.firstName,
    lastName: request?.lastName,
    email: request?.email,
  });
  user
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
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
