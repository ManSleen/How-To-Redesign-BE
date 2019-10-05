const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const secret = require("../config/secret.js");

//Register a new user and save to the DB
router.post("/register", (req, res) => {
  let user = req.body;
  if (user.name === "" || user.username === "" || user.email === "") {
    res.status(400).json({message: "You must include name, username and email to register"})
  } else {
    const hashedPass = bcrypt.hashSync(user.password, 12);
    user.password = hashedPass;
    const {username, email} = user;
    Users.findBy({ username })
      .first()
      .then(foundUser => {
        if (foundUser) {
          res.status(400).json({message: "That username is already being used"})
        } else {
          Users.findBy({ email })
          .first()
          .then(found => {
            if (found) {
              res.status(400).json({message: "That email is already being used"})
            } else {
              console.log("user in Users.add", user)
              Users.add(user)
                .then(saved => {
                  const token = generateToken(user);
                  res.status(201).json({saved, token});
                })
                .catch(error => {
                  res.status(500).json({message: "Username and email must be unique"});
                });
            }
          }).catch(err => console.log(err))
        }
      }).catch(err => console.log(err))

    
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        // Add user id and username
        res
          .status(200)
          .json({
            message: `Welcome ${user.username}!`,
            token,
            user: { userId: user.id, userName: user.username }
          });
      } else {
        res
          .status(401)
          .json({ message: "Invalid login credentials, please try again" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "There was an error logging you in" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "5d"
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
