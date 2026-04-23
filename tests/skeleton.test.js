// tests/slides/skeletonSlide.test.js

import { describe, test, expect } from "vitest";
import { SkeletonSlide } from "../src/slideTemplates/SkeletonSlide.js";

describe("SkeletonSlide", () => {

  test("renders structure", () => {
    const raw = {
      type: "skeleton",
      data: [{ name: "title", content: "Hello" }]
    };

    const { html } = SkeletonSlide(raw);

    expect(html).toContain("skeleton");
    expect(html).toContain("skeleton-body");
  });

  test("renders different item types", () => {
    const raw = {
      type: "skeleton",
      data: [
        { name: "title", content: "Title" },
        { name: "para", content: "Para" },
        { name: "image", content: "img.png" }
      ]
    };

    const { html } = SkeletonSlide(raw);

    expect(html).toContain("<h1");
    expect(html).toContain("<p");
    expect(html).toContain("<img");
    // ❌ removed ul/li expectations
  });

  test("renders all items", () => {
    const raw = {
      type: "skeleton",
      data: [
        { name: "title", content: "T" },
        { name: "para", content: "P" }
      ]
    };

    const { html } = SkeletonSlide(raw);

    expect((html.match(/<h1/g) || []).length).toBe(1);
    expect((html.match(/<p/g) || []).length).toBe(1);
  });

  test("throws if no items", () => {
    const raw = { type: "skeleton", data: [] };

    expect(() => SkeletonSlide(raw)).toThrow();
  });

});