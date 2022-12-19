const { MongoClient } = require('mongodb');

// Conneter a la base de donnée
const client = new MongoClient(process.env.URI)

const database = client.db()

module.exports = {database}
