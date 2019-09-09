const router = require("express").Router();

const Guides = require("./guides-model");
const Steps = require("../steps/steps-model");

// Get all guides
router.get("/", (req, res) => {
  Guides.find()
    .then(guide => {
      res.status(200).json(guide);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get all guides from the db" });
    });
});

// Get guide by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Guides.findById(id)
    .then(guide => {
      if (guide) {
        Guides.getStepsByGuide(id)
          .then(steps => {
            guide.steps = steps;
            Guides.getLikesByGuide(id)
              .then(likes => {
                guide.likes = likes;
                res.status(200).json(guide);
              })
              .catch(error => {
                res.status().json({
                  message: "Could not get likes for guide"
                });
              });
          })
          .catch(error => {
            res.status().json({ message: "Could not get steps for guide" });
          });
      } else {
        res
          .status(404)
          .json({ message: "Could not find a guide with that ID in the db" });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Could not get guide from the DB" })
    );
});

// Edit a guide using its ID and pass in changes in body
router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Guides.update(changes, id)
    .then(guide => {
      if (guide) {
        res.status(200).json(guide);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a guide with that ID in the db" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not update guide in the DB" });
    });
});

// Delete a guide using its ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let foundGuide;
  Guides.findById(id)
    .then(guide => {
      if (guide) {
        foundGuide = guide;
        Guides.remove(id)
          .then(guides => {
            res.status(200).json(foundGuide);
          })
          .catch(err => res.send(err));
      } else {
        res
          .status(404)
          .json({ message: "Could not find a guide with that ID in the db" });
      }
    })
    .catch(err => {
      return res
        .status(500)
        .json({ message: "Could not delete guide from the db" });
    });
});

// Add a new guide
router.post("/", (req, res) => {
  const guide = req.body;
  Guides.add(guide)
    .then(guide => {
      res.status(200).json(guide);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not add guide to the db" });
    });
});

// Add steps to a specific guide using guide id
router.post("/:id/steps", (req, res) => {
  const step = req.body;
  const { id } = req.params;
  Guides.findById(id)
    .then(guide => {
      if (guide) {
        step.guide_id = id;
        Guides.addStep(step)
          .then(guide => {
            res.status(201).json(guide);
          })
          .catch(err => {
            res.status(500).json({ message: "Could not add step to the db" });
          });
      } else {
        res.status(404).json({ message: "Could not find that guide by ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not add step to the db" });
    });
});

module.exports = router;
