import { describe, test, expect } from "vitest";
import { slideBuilder } from "../src/interpreter/slideBuilder.js";

describe("cornerWordsSlide", () => {
  test("builds with words", () => {
    const deck = {
      version: "deck-v1",
      deck: [{
        type: "cornerWordsSlide",
        data: [{ name: "word", content: "A" }]
      }]
    };

    const [slide] = slideBuilder(deck);
    expect(slide.render()).toContain("A");
  });

  test("throws without words", () => {
    expect(() =>
      slideBuilder({
        version: "deck-v1",
        deck: [{ type: "cornerWordsSlide", data: [] }]
      })
    ).toThrow();
  });
});
