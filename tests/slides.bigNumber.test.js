import { describe, test, expect } from "vitest";
import { slideBuilder } from "../src/interpreter/slideBuilder.js";

describe("bigNumber", () => {
  test("builds with number", () => {
    const deck = {
      version: "deck-v1",
      deck: [{
        type: "bigNumber",
        data: [{ name: "number", content: 42 }]
      }]
    };

    const [slide] = slideBuilder(deck);
    expect(slide.render()).toContain("42");
  });

  test("throws without number", () => {
    expect(() =>
      slideBuilder({
        version: "deck-v1",
        deck: [{ type: "bigNumber", data: [] }]
      })
    ).toThrow();
  });
});
