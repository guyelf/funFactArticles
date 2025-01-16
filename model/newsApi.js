import axios from "axios";
import config from "../config.js";

// Function to get news articles
export default async function getArticles(numResults = 1) {
  const page = config.STARTING_PAGE;
  const apiKey = config.NEWSAPI_API_KEY;
  try {
    const url = `https://newsapi.org/v2/everything?sources=espn&page=${page}&pagesize=${numResults}&apiKey=${apiKey}`;
    const response = await axios.get(url);
    console.log(response.data.articles);
    return response.data.articles;
  } catch (error) {
    console.error("Errored Response in news org api:\n", error);
    throw error;
  }
}
