import { extractTimeline } from "../renders/extractTimeline.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function SkeletonSlide(data) {
  const rawItems = data.data ?? [];

  if (!rawItems.length) {
    throw new Error("skeleton: requires items");
  }

  const items = addIdToItems(rawItems);

  const timeline = extractTimeline(items);

  const allIds = items.map(i => i.id);

  const actions = [];

  for (const step of timeline) {
    const activeId = step.id;

    const hiddenIds = allIds.filter(id => id !== activeId);

    actions.push({
      time: step.time,
      state: {
        visible: [activeId],
        hidden: hiddenIds
      }
    });
  }

  function renderItem(item) {
    const id = item.id;

    if (item.name === "title") {
      return `<h1 id="${id}" class="hidden ${item.classes || ""}">
        ${item.content}
      </h1>`;
    }

    if (item.name === "para") {
      return `<p id="${id}" class="hidden ${item.classes || ""}">
        ${item.content}
      </p>`;
    }

    if (item.name === "image") {
      return `
        <div id="${id}" class="skeleton-image hidden ${item.classes || ""}">
          <img src="${item.content}" />
        </div>
      `;
    }

    return "";
  }

  const html = `
    <section class="slide skeleton">

      <div class="skeleton-body">
        ${items.map(renderItem).join("")}
      </div>

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