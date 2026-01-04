// tests/interpreter.test.js
import { describe, test, expect } from "vitest";

import { slideBuilder } from "../src/interpreter/slideBuilder.js";

describe("slideBuilder", () => {
  test("builds slides from a valid deck", () => {
    const deck = {
      version: "deck-v1",
      deck: [
        {
          type: "titleSlide",
          start: 0,
          end: 10,
          data: [{ name: "title", content: "Hello World" }]
        }
      ]
    };

    const slides = slideBuilder(deck);

    expect(Array.isArray(slides)).toBe(true);
    expect(slides.length).toBe(1);

    const slide = slides[0];
    expect(slide.type).toBe("titleSlide");
    expect(typeof slide.render).toBe("function");

    const html = slide.render();
    expect(typeof html).toBe("string");
    expect(html).toContain("Hello World");
  });

  test("throws on unknown slide type", () => {
    const deck = {
      version: "deck-v1",
      deck: [
        {
          type: "unknownSlide",
          data: []
        }
      ]
    };

    expect(() => slideBuilder(deck)).toThrow(
      /unsupported slide type "unknownSlide"/
    );
  });

  test("throws on malformed slide data", () => {
    const deck = {
      version: "deck-v1",
      deck: [
        {
          type: "titleSlide",
          data: []
        }
      ]
    };

    expect(() => slideBuilder(deck)).toThrow(
      /missing or invalid title content/
    );
  });
});
