import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import getFunFactArticle from "../model/index.js";
import config from "../config.js";

const app = express();
const port = 3000;

// Allow requests from the Vue app's origin
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/api/articles", async (req, res) => {
  try {
    const numArticles = parseInt(req.query.numArticles) || config.NUM_PAGES;
    const numFacts = parseInt(req.query.numFacts) || config.NUM_FACTS;

    if (numArticles < 1 || numFacts < 1) {
      res
        .status(400)
        .send("Invalid request parameters - should be positive integers");
    }

    const funnyFactsArticles = await getFunFactArticle(numArticles, numFacts);
    res.status(200).json(funnyFactsArticles);
  } catch (error) {
    res.status(500).send("Error fetching articles " + error.message);
  }
});
