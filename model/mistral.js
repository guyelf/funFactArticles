import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import config from "../config.js";

const model = new ChatMistralAI({
  model: config.AI_MODEL,
  temperature: 0,
  apiKey: config.MISTRAL_API_KEY,
});

export default async function getMistralFacts(
  article = { title: "Olympics 2000" },
  numFacts = 1
) {
  const plural = numFacts > 1 ? "s" : "";
  const promptMessages = [
    new SystemMessage(
      `Give me only ${numFacts} funny fact${plural} on the following news article.
       In your answer, skip the intro and start with the funny fact itself.`
    ),
    new HumanMessage(article.title),
  ];
  return await model.invoke(promptMessages);
}

// Test - todo: remove this
async function test_getMistralFacts() {
  getMistralFacts()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
}

// test_getMistralFacts();
