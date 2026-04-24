import { addIdToItems } from "../helpers/addIdToItems.js";

export function Progressbar(data) {
  const rawItems = data.data ?? [];
  const items = addIdToItems(rawItems);

  const bars = items.filter(d => d.name === "bar");

  // even if empty → still valid slide
  if (!bars.length) {
    return {
      html: `<section class="slide progressbar"></section>`,
      animation: "progressiveReveal",
      ids: []
    };
  }

  const ids = items.map(i => i.id);

  const html = `
    <section class="slide progressbar">

      ${bars
        .map(b => {
          const value = Math.max(
            0,
            Math.min(100, Number(b.value ?? 0))
          );

          return `
            <div id="${b.id}" class="progressbar-item hidden ${b.classes || ""}">
              <div class="progressbar-label">${b.label}</div>
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
    animation: "progressiveReveal",
    ids
  };
}