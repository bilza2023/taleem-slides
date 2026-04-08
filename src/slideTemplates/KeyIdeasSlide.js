import { extractTimeline } from "../renders/extractTimeline.js";
import { buildSequentialStates } from "../renders/buildSequentialStates.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function KeyIdeasSlide(data) {
  function getSp(item, name) {
    return item.spItems?.find(sp => sp.name === name)?.content;
  }

  const rawItems = data.data ?? [];
  const items = addIdToItems(rawItems);

  const cards = items.filter(d => d.name === "card");

  if (!cards.length) {
    throw new Error("keyIdeasSlide: requires cards");
  }

  const allIds = items.map(i => i.id);
  const timeline = extractTimeline(items);
  const actions = buildSequentialStates(timeline, allIds);

  const html = `
    <section class="slide keyIdeasSlide">

      ${cards
        .map(
          c => `
        <div id="${c.id}" class="key-idea hidden ${c.classes || ""}">
          <div class="icon">${getSp(c, "icon") ?? ""}</div>
          <div class="label">${c.content}</div>
        </div>
      `
        )
        .join("")}

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