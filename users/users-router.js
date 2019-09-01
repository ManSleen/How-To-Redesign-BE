const router = require("express").Router();

// Import data model
const Users = require("./users-model");

// Gets an array of all registered users
router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      return res
        .status(500)
        .json({ message: "Could not get all users from the DB" });
    });
});

// Get single user by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a user with that ID in the db" });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Could not get user from the DB" })
    );
});

//Get a single user by username
router.get("/search/:name", (req, res) => {
  const { name } = req.params;
  const searchTerm = name.replace("_", " ");

  Users.findBy({ username: searchTerm })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error finding that username" });
    });
});

//Updates a user by passing user's ID as a request parameter and changes in request body
router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Users.update(changes, id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a user with that ID in the db" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not update user in the DB" });
    });
});

// Delete a user by passing user's ID as a req param
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let foundUser;
  Users.findById(id)
    .then(user => {
      if (user) {
        foundUser = user;
        Users.remove(id)
          .then(users => {
            res.status(200).json(foundUser);
          })
          .catch(err => res.send(err));
      } else {
        res
          .status(404)
          .json({ message: "Could not find a user with that ID in the db" });
      }
    })
    .catch(err => {
      return res
        .status(500)
        .json({ message: "Could not find a user with that ID in the db" });
    });
});

// Export router
module.exports = router;
