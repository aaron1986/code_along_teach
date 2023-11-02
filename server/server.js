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
  app.get("/translate", async (request, response) => {
    const { word, from, to } = request.query;
  
    // make our API call
    const API = `https://api.mymemory.translated.net/get?q=${word}&langpair=${from}|${to}`;
    const res = await axios.get(API);

    //unsplash api
    const sploosh_api = `https://api.unsplash.com/search/photos?page=1&query=${word}&client_id=njF7szjcV9ReHwyPn9rSpsiKdG6p9IgOrlm_SOi8YHk`;
    const ans = await axios.get(sploosh_api);
    //retrieve description data from api
    //response.json(ans.data.results[0].urls.full);
  
    const wrangledData = {
      translation: res.data.responseData.translatedText,
      match: res.data.responseData.match,
      image: ans.data.results[0].urls.full,
    };
  
    response.json(wrangledData);
  });

//leave alone
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));