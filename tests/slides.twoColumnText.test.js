import { describe, test, expect } from "vitest";
import { slideBuilder } from "../src/interpreter/slideBuilder.js";

describe("twoColumnText", () => {
  test("builds with left and right", () => {
    const deck = {
      version: "deck-v1",
      deck: [{
        type: "twoColumnText",
        data: [
          { name: "left", content: "L1" },
          { name: "right", content: "R1" }
        ]
      }]
    };

    const [slide] = slideBuilder(deck);
    expect(slide.render()).toContain("L1");
    expect(slide.render()).toContain("R1");
  });

  test("throws if one side missing", () => {
    expect(() =>
      slideBuilder({
        version: "deck-v1",
        deck: [{
          type: "twoColumnText",
          data: [{ name: "left", content: "Only" }]
        }]
      })
    ).toThrow();
  });
});
