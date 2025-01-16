import getMistralFacts from "./mistral.js";

describe("Mistral AI tests", () => {
  test("Get Mistral facts", async () => {
    const mistral_fact = await getMistralFacts();
    expect(mistral_fact.content).toContain("Olympics");
  });
});
