export function showAllHighlightOne(items, timeline, extraStateFn) {
    const ids = items.map(i => i.id);
    const actions = [];
  
    for (const step of timeline) {
      const focusId = step.id;
  
      const dimIds = ids.filter(id => id !== focusId);
  
      const baseState = {
        focus: [focusId],
        dim: dimIds
      };
  
      const extraState = extraStateFn
        ? extraStateFn(focusId, items)
        : {};
  
      actions.push({
        time: step.time,
        state: {
          ...baseState,
          ...extraState
        }
      });
    }
  
    return actions;
  }