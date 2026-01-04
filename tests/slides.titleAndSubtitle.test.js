import { describe, test, expect } from "vitest";
import { slideBuilder } from "../src/interpreter/slideBuilder.js";

describe("titleAndSubtitle", () => {
  test("builds successfully", () => {
    const deck = {
      version: "deck-v1",
      deck: [{
        type: "titleAndSubtitle",
        data: [
          { name: "title", content: "Hello" },
          { name: "subtitle", content: "World" }
        ]
      }]
    };

    const [slide] = slideBuilder(deck);
    expect(slide.render()).toContain("Hello");
    expect(slide.render()).toContain("World");
  });

  test("throws on missing data", () => {
    expect(() =>
      slideBuilder({
        version: "deck-v1",
        deck: [{ type: "titleAndSubtitle", data: [] }]
      })
    ).toThrow();
  });
});
