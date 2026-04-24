import { addIdToItems } from "../helpers/addIdToItems.js";

export function EqSlide(data) {
  const rawItems = data.data ?? [];

  if (!rawItems.length) {
    throw new Error("eq: requires lines");
  }

  const items = addIdToItems(rawItems);

  // 🔹 build lines + spItems (keep deterministic ids)
  const lines = items.map(line => {
    const spItems = (line.spItems || []).map((sp, i) => ({
      ...sp,
      id: `${line.id}-sp-${i + 1}`
    }));

    return {
      ...line,
      spItems
    };
  });

  // 🔹 IMPORTANT: include BOTH line ids + sp ids
  const ids = [
    ...lines.map(l => l.id),
    ...lines.flatMap(l => l.spItems.map(sp => sp.id))
  ];

  const html = `
  <section class="slide eq">

    <ul class="eq-lines">
      ${lines.map(line => `
        <li 
          id="${line.id}" 
          class="eq-line ${line.classes || ""}"
        >
          ${line.content}
        </li>
      `).join("")}
    </ul>

    <div class="eq-side-panel">
      ${lines.map(line =>
        line.spItems.map(sp => {
          if (sp.name === "image") {
            return `
              <div id="${sp.id}" class="eq-explain-item hidden">
                <img src="${sp.content}" />
              </div>
            `;
          }

          return `
            <div id="${sp.id}" class="eq-explain-item hidden">
              ${sp.content}
            </div>
          `;
        }).join("")
      ).join("")}
    </div>

  </section>
`;

  return {
    html,
    animation: "highlightOne",
    ids
  };
}