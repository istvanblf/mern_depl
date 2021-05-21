const Pet = require("../models/pet.model");

// Export an object that is full of methods.
module.exports = {
  // long-form - key: value format
  create: function (req, res) {
    console.log("create method executed.");

    Pet.create(req.body)
      .then((pet) => {
        // Newly created pet from DB that includes DB id.
        res.json(pet);
      })
      .catch((err) => {
        // This makes axios on the front-end react side trigger the .catch.
        res.status(400).json(err);
      });
  },

  getAll(req, res) {
    console.log("getAll method executed.");

    Pet.find().sort({ type: 1})
      .then((pets) => {
        res.json(pets);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  getOne(req, res) {
    console.log("getOne method executed", "url params:", req.params);

    Pet.findById(req.params.id)
      .then((pet) => {
        res.json(pet);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  delete(req, res) {
    console.log("delete method executed", "url params:", req.params);

    Pet.findByIdAndDelete(req.params.id)
      .then((pet) => {
        res.json(pet);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  update(req, res) {
    console.log("update method executed", "url params:", req.params);

    Pet.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true, // to return update doc instead of old one.
    })
      .then((pet) => {
        res.json(pet);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
};
