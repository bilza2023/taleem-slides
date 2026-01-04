import { describe, test, expect } from "vitest";
import { slideBuilder } from "../src/interpreter/slideBuilder.js";

describe("fillImage", () => {
  test("builds with image", () => {
    const deck = {
      version: "deck-v1",
      deck: [{
        type: "fillImage",
        data: [{ name: "image", content: "/bg.png" }]
      }]
    };

    const [slide] = slideBuilder(deck);
    expect(slide.render()).toContain("/bg.png");
  });

  test("throws without image", () => {
    expect(() =>
      slideBuilder({
        version: "deck-v1",
        deck: [{ type: "fillImage", data: [] }]
      })
    ).toThrow();
  });
});
