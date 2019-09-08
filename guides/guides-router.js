const router = require("express").Router();

const Guides = require("./guides-model");

router.get("/", (req, res) => {
  Guides.find()
    .then(guide => {
      res.status(200).json(guide);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get all guides from the db" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Guides.findById(id)
    .then(guide => {
      if (guide) {
        res.status(200).json(guide);
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let foundStep;
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

router.delete("/:id", (req, res) => {
  Guides.delete()
    .then(guide => {
      res.status(200).json(guide);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not delete guide from the db" });
    });
});

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

module.exports = router;
