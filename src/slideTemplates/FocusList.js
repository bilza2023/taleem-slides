import { extractTimeline } from "../helpers/extractTimeline.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function FocusListSlide(data) {
  const rawItems = data.data ?? [];
  const items = addIdToItems(rawItems);

  const bullets = items.filter(d => d.name === "bullet");
  const headingItem = items.find(d => d.name === "heading");

  if (!bullets.length) {
    throw new Error("focusList: requires bullets");
  }

  // 🔹 timeline (same)
  const timeline = extractTimeline(items);

  // 🔹 build focus/dim actions (NOT sequentialStates)
  const actions = [];

  for (const step of timeline) {
    const focusId = step.id;

    const dimIds = bullets
      .map(b => b.id)
      .filter(id => id !== focusId);

    actions.push({
      time: step.time,
      state: {
        focus: [focusId],
        dim: dimIds
      }
    });
  }

  const html = `
    <section class="slide focusList">

      ${
        headingItem
          ? `
            <h1 
              id="${headingItem.id}" 
              class="${headingItem.classes || ""}"
            >
              ${headingItem.content}
            </h1>
          `
          : ``
      }

      <ul>
        ${bullets
          .map(
            b => `
            <li 
              id="${b.id}" 
              class="${b.classes || ""}"
            >
              ${b.content}
            </li>
          `
          )
          .join("")}
      </ul>

    </section>
  `;

  return {
    html,
    actions,
    groups: {
      focus: [],
      dim: ["dim"]
    }
  };
}