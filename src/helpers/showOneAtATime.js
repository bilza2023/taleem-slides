
export function showOneAtATime(items, timeline) {
    const ids = items.map(i => i.id);
    const actions = [];
  
    for (const step of timeline) {
      const activeId = step.id;
  
      const hiddenIds = ids.filter(id => id !== activeId);
  
      actions.push({
        time: step.time,
        state: {
          visible: [activeId],
          hidden: hiddenIds
        }
      });
    }
  
    return actions;
  }