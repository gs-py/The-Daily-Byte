require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;

const fetchNews = (url, res) => {
  axios
    .get(url)
    .then((response) => {
      console.log(response.data.totalResults);

      if (response.data.totalResults > 0) {
        res.json({
          status: 200,
          success: true,
          message: "sucessfully feteched Data",
          data: response.data,
        });
        for (let i = 0; i < response.data.totalResults; i++) {
          console.log(response.data.articles[i].title);
        }
        console.log(response.data.totalResults);
      } else {
        res.json({
          status: 200,
          success: true,
          message: "no more data to fetch",
        });
      }
    })
    .catch((error) => {
      if (res.hea)
        res.json({
          status: 500,
          success: false,
          message: "Failed to fetch",
          error: error.message,
        });
    });
};
// Sample news API URL

app.get("/news", (req, res) => {
  let page = 1;
  const NEWS_API_URL = `https://newsapi.org/v2/everything?q=page=${page}&apiKey=${API_KEY}`;

  fetchNews(NEWS_API_URL, res);
});

// top headlines

app.options("/top-headlines", cors());
app.get("/top-headlines", (req, res) => {
  let url = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

// country
app.options("/country", cors());
app.get("/country/:iso", (req, res) => {
  const country = req.params.iso;
  let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server runnning on ${PORT}`);
});
