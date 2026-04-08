
import { extractTimeline } from "../helpers/extractTimeline.js";
import { buildSequentialStates } from "../helpers/buildSequentialStates.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function BulletListSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const bullets = items.filter(d => d.name === "bullet");
  const headingItem = items.find(d => d.name === "heading");

  if (bullets.length === 0) {
    throw new Error("bulletList: requires at least one bullet");
  }

  const allIds = items.map(i => i.id);
  const timeline = extractTimeline(items);
  const actions = buildSequentialStates(timeline, allIds);

  const html = `
    <section class="slide bulletList">

      ${
        headingItem
          ? `
            <h1 
              id="${headingItem.id}" 
              class="hidden ${headingItem.classes || ""}"
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
              class="taleem-li hidden ${b.classes || ""}"
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
      visible: [],
      hidden: ["hidden"]
    }
  };
}