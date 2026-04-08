import { extractTimeline } from "../renders/extractTimeline.js";
import { buildSequentialStates } from "../renders/buildSequentialStates.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function Progressbar(data) {
  function getSp(item, name) {
    return item.spItems?.find(sp => sp.name === name)?.content;
  }

  const rawItems = data.data ?? [];
  const items = addIdToItems(rawItems);

  const bars = items.filter(d => d.name === "progress");

  if (!bars.length) {
    return {
      html: `<section class="slide progressbar"></section>`,
      actions: [],
      groups: {
        visible: [],
        hidden: ["hidden"]
      }
    };
  }

  const allIds = items.map(i => i.id);
  const timeline = extractTimeline(items);
  const actions = buildSequentialStates(timeline, allIds);

  const html = `
    <section class="slide progressbar">

      ${bars
        .map(b => {
          const value = Math.max(
            0,
            Math.min(100, Number(getSp(b, "value") ?? 0))
          );

          return `
            <div id="${b.id}" class="progressbar-item hidden ${b.classes || ""}">
              <div class="progressbar-label">${b.content}</div>
              <div class="progressbar-track">
                <div class="progressbar-fill" style="width:${value}%"></div>
              </div>
            </div>
          `;
        })
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