
import {indexData} from "./indexData.js";

export function extractRequired(raw, required = []) {
  const map = indexData(raw);
  const result = {};

  for (const name of required) {
    const item = map[name];

    if (!item || item.content === undefined) {
      throw new Error(`${raw.type}: requires ${name}`);
    }

    result[name] = item.content;
  }

  return result;
}