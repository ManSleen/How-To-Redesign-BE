// import middleware and express
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// import routers
//const UsersRouter = require("./users/users-router.js");

// create server using express
const server = express();

// use middleware before routers
server.use(helmet());
server.use(express.json());
server.use(cors());

// setup paths for routers
// server.use("/api/users", UsersRouter);

// GET request to root / to make sure everything is working
server.get("/", (req, res) => {
  res.json({ message: "API is up!" });
});

// export server
module.exports = server;
