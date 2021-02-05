const express = require("express");
const songRoutes = express.Router();
const axios = require("axios");

songRoutes.get("/search/:q", async (req, res, next) => {
  try {
    const { q } = req.params;
    console.log(q);
    var options = {
      method: "GET",
      url: "https://deezerdevs-deezer.p.rapidapi.com/search",
      params: { q: q },
      headers: {
        "x-rapidapi-key": process.env.RAPID_KEY,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };
    const resp = await axios(options);
    console.log(resp);
    const {
      data: { data },
    } = await resp;
    res.send(data);
  } catch (err) {
    console.log(err);
    const error = new Error("There are no songs for this query");
    next(error);
  }
});

songRoutes.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    var options = {
      method: "GET",
      url: "https://deezerdevs-deezer.p.rapidapi.com/album/" + id,
      headers: {
        "x-rapidapi-key": process.env.RAPID_KEY,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };
    const resp = await axios(options);
    const { data } = await resp;
    res.send(data);
  } catch (err) {
    const error = new Error("There are no songs for this query");
    next(error);
  }
});

module.exports = songRoutes;
