export function progressiveReveal(ids) {
    return ids.map((id, i) => ({
      time: i,
      state: {
        hidden: ids.slice(i + 1)
      }
    }));
  }