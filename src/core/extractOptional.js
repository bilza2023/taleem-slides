

import {indexData} from "./indexData.js";

export function extractOptional(raw, names = []) {
  const map = indexData(raw);
  const result = {};

  for (const name of names) {
    result[name] = map[name]?.content ?? null;
  }

  return result;
}