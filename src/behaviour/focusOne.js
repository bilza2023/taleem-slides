function focusOne(timeline, allIds) {
    const actions = [];
  
    for (const step of timeline) {
      const focusId = step.id;
  
      const dimIds = allIds.filter(id => id !== focusId);
  
      actions.push({
        time: step.time,
        state: {
          focus: [focusId],
          dim: dimIds
        }
      });
    }
  
    return actions;
  }