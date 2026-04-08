import { extractTimeline } from "../renders/extractTimeline.js";
import { addIdToItems } from "../helpers/addIdToItems.js";

export function EqSlide(data) {
  const rawItems = data.data ?? [];

  if (!rawItems.length) {
    throw new Error("eq: requires lines");
  }

  const items = addIdToItems(rawItems);

  // 🔹 collect lines + spItems
  const lines = items.map(line => {
    const spItems = (line.spItems || []).map((sp, i) => ({
      ...sp,
      id: `${line.id}-sp-${i + 1}` // stable id (no random)
    }));

    return {
      ...line,
      spItems
    };
  });

  const timeline = extractTimeline(items);

  const lineIds = lines.map(l => l.id);
  const spIds = lines.flatMap(l => l.spItems.map(sp => sp.id));

  const actions = [];

  for (const step of timeline) {
    const focusId = step.id;

    const dimIds = lineIds.filter(id => id !== focusId);

    const currentLine = lines.find(l => l.id === focusId);

    const visibleSp = currentLine?.spItems.map(sp => sp.id) || [];

    const hiddenSp = spIds.filter(id => !visibleSp.includes(id));

    actions.push({
      time: step.time,
      state: {
        focus: [focusId],
        dim: dimIds,
        visible: visibleSp,
        hidden: hiddenSp
      }
    });
  }

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
    actions,
    groups: {
      focus: [],
      dim: ["dim"],
      visible: [],
      hidden: ["hidden"]
    }
  };
}