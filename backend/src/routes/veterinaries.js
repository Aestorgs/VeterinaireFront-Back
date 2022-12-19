const veterinaries = require("express").Router();
const { database } = require("../db/database");

// Afficher les vétérinaires
veterinaries.get("/", async (req, res) => {
  try {
    const veterinaries = await database
      .collection("veterinaries").find({}).toArray();
    res.status(200).send(veterinaries);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { veterinaries };
