
export function indexData(raw) {
    const map = {};
    for (const item of raw.data || []) {
      map[item.name] = item;
    }
    return map;
  }