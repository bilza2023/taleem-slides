import { describe, test, expect } from "vitest";
import { Progressbar } from "../src/slideTemplates/Progressbar.js";

describe("Progressbar", () => {

  test("renders structure", () => {
    const raw = {
      type: "progressbar",
      data: [
        {
          name: "bar",       // ✅ FIX: was "progress", Progressbar.js filters name === "bar"
          label: "Test",     // ✅ FIX: was `content`, Progressbar.js reads b.label
          value: 50          // ✅ FIX: was spItems[{name:"value", content:50}], Progressbar.js reads b.value
        }
      ]
    };

    const { html } = Progressbar(raw);

    expect(html).toContain("progressbar");
    expect(html).toContain("progressbar-item");
    expect(html).toContain("progressbar-fill");
  });

  test("renders all bars", () => {
    const raw = {
      type: "progressbar",
      data: [
        {
          name: "bar",   // ✅ FIX
          label: "A",    // ✅ FIX
          value: 20      // ✅ FIX
        },
        {
          name: "bar",   // ✅ FIX
          label: "B",    // ✅ FIX
          value: 40      // ✅ FIX
        }
      ]
    };

    const { html } = Progressbar(raw);

    const renderedCount = (html.match(/progressbar-item/g) || []).length;

    expect(renderedCount).toBe(2);
  });

  test("clamps values between 0 and 100", () => {
    const raw = {
      type: "progressbar",
      data: [
        {
          name: "bar",   // ✅ FIX
          label: "A",    // ✅ FIX
          value: 150     // ✅ FIX — should clamp to 100
        },
        {
          name: "bar",   // ✅ FIX
          label: "B",    // ✅ FIX
          value: -20     // ✅ FIX — should clamp to 0
        }
      ]
    };

    const { html } = Progressbar(raw);

    expect(html).toContain("width:100%");
    expect(html).toContain("width:0%");
  });

  test("renders empty section if no bars", () => {
    const raw = { type: "progressbar", data: [] };

    const { html } = Progressbar(raw);

    expect(html).toContain("progressbar");
  });

});