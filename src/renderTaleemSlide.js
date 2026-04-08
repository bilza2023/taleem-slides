
// src/core/renderSlide.js

import { SlideRegistry } from "./registry/registry.js";

export function renderTaleemSlide(json) {
  const fn = SlideRegistry[json.type];

  if (!fn) {
    throw new Error(`Unknown slide type: ${json.type}`);
  }
  const actions = [];
  return fn(json,actions); // ✅ pass full object
}