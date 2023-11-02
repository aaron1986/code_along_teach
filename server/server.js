const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const PORT = 8080;

const app = express();
app.use(cors());

app.get("/", (request, response) => {
    response.json("Its Working!!");
  });

//leave alone
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));