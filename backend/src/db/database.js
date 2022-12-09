const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.URI)

const database = client.db()

module.exports = {database}