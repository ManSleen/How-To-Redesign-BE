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
  Guides.findById()
    .then(guide => {
      res.status(200).json(guide);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get all guides from the db" });
    });
});

router.put("/:id", (req, res) => {
  Guides.update()
    .then(guide => {
      res.status(200).json(guide);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get all guides from the db" });
    });
});

router.delete("/:id", (req, res) => {
  Guides.update()
    .then(guide => {
      res.status(200).json(guide);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get all guides from the db" });
    });
});
