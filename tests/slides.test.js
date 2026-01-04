// tests/slides.test.js
import { describe, test, expect } from "vitest";

import { slideBuilder } from "../src/interpreter/slideBuilder.js";

describe("TitleSlide", () => {
  test("render() is deterministic", () => {
    const deck = {
      version: "deck-v1",
      deck: [
        {
          type: "titleSlide",
          data: [{ name: "title", content: "Deterministic" }]
        }
      ]
    };

    const [slide] = slideBuilder(deck);

    const html1 = slide.render();
    const html2 = slide.render();

    expect(html1).toBe(html2);
  });

  test("slide object is immutable", () => {
    const deck = {
      version: "deck-v1",
      deck: [
        {
          type: "titleSlide",
          data: [{ name: "title", content: "Frozen" }]
        }
      ]
    };

    const [slide] = slideBuilder(deck);

    expect(Object.isFrozen(slide)).toBe(true);
  });
});
