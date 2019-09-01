// import middleware and express
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// import routers
const UsersRouter = require("./users/users-router.js");
const AuthRouter = require("./auth/auth-router.js");

// create server using express
const server = express();

// use middleware before routers
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

// setup paths for routers
server.use("/api/users", UsersRouter);
server.use("/api/auth", AuthRouter);

// GET request to root / to make sure everything is working
server.get("/", (req, res) => {
  res.json({ message: "API is up!" });
});

// export server
module.exports = server;