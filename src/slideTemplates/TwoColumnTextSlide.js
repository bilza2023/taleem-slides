import { extractTimeline } from "../renders/extractTimeline.js";
import { buildSequentialStates } from "../renders/buildSequentialStates.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function TwoColumnTextSlide(data) {
  const rawItems = data.data ?? [];

  const items = addIdToItems(rawItems);

  const leftItems = items.filter(d =>
    d.name === "leftText" || d.name === "leftImage"
  );

  const rightItems = items.filter(d =>
    d.name === "rightText" || d.name === "rightImage"
  );

  if (!leftItems.length || !rightItems.length) {
    throw new Error("twoColumnText: requires left and right content");
  }

  const allIds = items.map(i => i.id);
  const timeline = extractTimeline(items);
  const actions = buildSequentialStates(timeline, allIds);

  function renderItem(item) {
    const classes = item.classes || "";

    if (item.name === "leftText" || item.name === "rightText") {
      return `<div id="${item.id}" class="hidden ${classes}">
        ${item.content}
      </div>`;
    }

    if (item.name === "leftImage" || item.name === "rightImage") {
      return `<img id="${item.id}" class="hidden ${classes}" src="${item.content}" alt="" />`;
    }

    return "";
  }

  const html = `
    <section class="slide twoColumnText">

      <div class="col left">
        ${leftItems.map(renderItem).join("")}
      </div>

      <div class="col right">
        ${rightItems.map(renderItem).join("")}
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