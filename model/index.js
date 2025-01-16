import getMistralFacts from "./mistral.js";
import getArticles from "./newsApi.js";
import config from "../config.js";

async function getFunnyFacts_helper(
  numArticles = config.NUM_PAGES,
  numFacts = config.NUM_FACTS
) {
  try {
    const articles = await getArticles(numArticles);

    const funFactArticles = await Promise.all(
      articles.map(async (article) => {
        try {
          const response = await getMistralFacts(article, numFacts);
          article.funnyFacts = response.content;
          return article;
        } catch (error) {
          console.log(error);
          throw error;
        }
      })
    );
    console.log(funFactArticles);
    return funFactArticles;
  } catch (error) {
    console.log("Outer error block");
    console.error(error);
  }
}

function getDesiredInfo(articles) {
  return articles.map((article) => {
    return {
      title: article.title,
      funnyFacts: article.funnyFacts,
      source: article.source.name,
      originalLink: article.url,
      publicationDate: article.publishedAt,
      category: "Sport",
    };
  });
}

export default async function getFunFactArticle(numArticles, numFacts) {
  try {
    const articles = await getFunnyFacts_helper(numArticles, numFacts);
    // Leave only required information
    return getDesiredInfo(articles);
  } catch (error) {
    console.error("Error in main function:\n", error);
    throw error;
  }
}
