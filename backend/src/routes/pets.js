const pets = require("express").Router();
const { ObjectId } = require("mongodb");
const { database } = require("../db/database");

// Afficher les animaux et utilisateur par id 
pets.get("/:id", async (req, res) => {
  try {
    const pets = await database
      .collection("owners")
      .aggregate([
        { $match: { _id: ObjectId(req.params.id) } },
        { $project: { _id: 0, pets: "$pets" } },
      ])
      .toArray();
    res.status(200).send(pets);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { pets };
