import { describe, test, expect } from "vitest";
import { slideBuilder } from "../src/interpreter/slideBuilder.js";

describe("bulletList", () => {
  test("builds with bullets", () => {
    const deck = {
      version: "deck-v1",
      deck: [{
        type: "bulletList",
        data: [
          { name: "bullet", content: "A" },
          { name: "bullet", content: "B" }
        ]
      }]
    };

    const [slide] = slideBuilder(deck);
    expect(slide.render()).toContain("A");
    expect(slide.render()).toContain("B");
  });

  test("throws with no bullets", () => {
    expect(() =>
      slideBuilder({
        version: "deck-v1",
        deck: [{ type: "bulletList", data: [] }]
      })
    ).toThrow();
  });
});
