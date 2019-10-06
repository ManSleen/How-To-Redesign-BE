const router = require("express").Router();

// Import data model
const Steps = require("./steps-model");

// Gets an array of all steps
router.get("/", (req, res) => {
  Steps.find()
    .then(steps => {
      res.status(200).json(steps);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get all steps from the DB" });
    });
});

// Get single step by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Steps.findById(id)
    .then(step => {
      if (step) {
        res.status(200).json(step);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a step with that ID in the db" });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Could not get step from the DB" })
    );
});

//Updates a step by passing step's ID as a request parameter and changes in request body
router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Steps.update(changes, id)
    .then(step => {
      if (step) {
        res.status(200).json(step);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a step with that ID in the db" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not update step in the DB" });
    });
});

// Delete a step by passing step's ID as a req param
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let foundStep;
  Steps.findById(id)
    .then(step => {
      if (step) {
        foundStep = step;
        Steps.remove(id)
          .then(steps => {
            res.status(200).json(foundStep);
          })
          .catch(err => res.send(err));
      } else {
        res
          .status(404)
          .json({ message: "Could not find a step with that ID in the db" });
      }
    })
    .catch(err => {
      return res
        .status(500)
        .json({ message: "Could not find a step with that ID in the db" });
    });
});

router.post("/", (req, res) => {
  const step = req.body;
  console.log(step);
  Steps.add(step)
    .then(step => {
      res.status(200).json(step);
    })
    .catch(err => {
      res.status(500).json({ message: "Sorry" });
    });
});

// Export router
module.exports = router;
