import getArticles from "./newsApi";

describe("News API tests", () => {
  test("Get articles", async () => {
    const articles = await getArticles();
    expect(typeof articles[0].title).toBe("string");
  });
});
