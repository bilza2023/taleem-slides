export function extractTimeline(items) {
    const timeline = [];
  
    for (const item of items) {
      const { id, timings } = item;
  
      if (!timings) continue;
  
      for (const t of timings) {
        if (t.event === "show") {
          timeline.push({
            time: t.time,
            id
          });
        }
      }
    }
  
    // sort by time (critical)
    timeline.sort((a, b) => a.time - b.time);
  
    return timeline;
  }