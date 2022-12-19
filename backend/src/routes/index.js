const { visits } = require("./visits");
const { auth } = require("./auth");
const { pets } = require("./pets");
const {veterinaries} = require("./veterinaries");

// Pour utiliser les routes
const router = require("express").Router();

router.use("/visits", visits);
router.use("/auth", auth);
router.use("/pets", pets);
router.use("/veterinaries", veterinaries);

module.exports = { router };
