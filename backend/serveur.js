require("dotenv").config();

const express = require("express");
const cors = require("cors");
const {router} = require('./src/routes');


const app = express();
const PORT = 3000 || process.env.PORTS;
app.use(cors());
app.use(express.json())
app.use('/api' , router);

app.listen(PORT,() => {
  console.log(`Application running on http://localhost:${PORT}`);
});
