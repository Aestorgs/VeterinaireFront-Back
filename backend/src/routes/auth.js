const auth = require("express").Router();
const { ObjectId } = require("mongodb");
const { database } = require("../db/database");

// Pour ce connecter utilisateur

auth.post("/login", async (req, res) => {
  try {
    const auth = await database
      .collection("owners")
      .aggregate([
        {
          $match: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
          },
        },
      ])
      .toArray();
    res.status(200).send(auth[0]._id);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Pour enregister un utilisateur 

auth.post("/register", async (req, res) => {
  try {
    const auth = await database.collection("owners").insertOne({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      city: req.body.city,
      telephone: req.body.telephone,
      pets: [],
    });
    res.status(201).send(auth);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Pour enregister un animaux 

auth.post("/:id", async (req, res) => {
  try {
    const auth = await database.collection("owners").updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $push: {
          pets: {
            name: req.body.pets[0].name,
            birth_date: req.body.pets[0].birth_date,
            types: req.body.pets[0].types,
            visits: [],
          },
        },
      }
    );
    res.status(201).send(auth);
  } catch (err) {
    console.log(err.message);
  }
});

// Pour afficher l'utilisateur 

auth.get("/:id", async (req, res) => {
  try {
    const auth = await database
      .collection("owners")
      .aggregate([{ $match: { _id: ObjectId(req.params.id) } }])
      .toArray();
    res.status(200).send(auth);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = { auth };
