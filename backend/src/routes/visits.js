const visits = require("express").Router();
const { ObjectId } = require("mongodb");
const { database } = require("../db/database");


// Afficher les visites 
visits.get("/:id", async (req, res) => {
  try {
    const visites = await database
      .collection("owners")
      .aggregate([
        { $match: { _id: ObjectId(req.params.id) } },
        { $unwind: "$pets" },
        { $unwind: "$pets.visits" },
        {
          $lookup: {
            from: "veterinaries",
            localField: "pets.visits.vet",
            foreignField: "_id",
            as: "vets",
          },
        },
        { $set: { "pets.visits.vet": "$vets" } },
        { $unwind: "$pets.visits.vet" },
        { $group: { _id: "$pets.name", visits: { $push: "$pets.visits" } } },
        { $project: { _id: 0, name: "$_id", visits: 1 } },
      ])
      .toArray();
    res.status(200).send(visites);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Envoyer une visites
visits.post("/:id", async (req, res) => {
  try {
    const visites = await database.collection("owners").updateOne(
      { _id: ObjectId(req.params.id), "pets.name": req.body.pets.name },
      {
        $push: {
          "pets.$.visits": {
            description: req.body.description,
            vet: req.body.vet._id,
            visit_date: req.body.visit_date,
          },
        },
      }
    );
    res.status(201).send(visites);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { visits };
