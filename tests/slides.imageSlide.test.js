import { describe, test, expect } from "vitest";
import { slideBuilder } from "../src/interpreter/slideBuilder.js";

describe("imageSlide", () => {
  test("builds with image", () => {
    const deck = {
      version: "deck-v1",
      deck: [{
        type: "imageSlide",
        data: [{ name: "image", content: "/img.png" }]
      }]
    };

    const [slide] = slideBuilder(deck);
    expect(slide.render()).toContain("/img.png");
  });

  test("throws without image", () => {
    expect(() =>
      slideBuilder({
        version: "deck-v1",
        deck: [{ type: "imageSlide", data: [] }]
      })
    ).toThrow();
  });
});
