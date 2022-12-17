const express = require("express");

const connect = require("./configs/db");

const userController = require("./controllers/user.controller");

const { register, login } = require("./controllers/auth.controller");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/users", userController);

app.post("/register", register);

app.post("/login", login);

const port = process.env.PORT || 5600;

app.listen(port, async function () {
  try {
    await connect();
    console.log(`listening on ${port}`);
  } catch (err) {
    console.log(err.message);
  }
});
