export const EqSlide = {
  type: "eq",

  fromJSON(raw) {
    const lines = raw.data
      ?.filter(d => d.name === "line")
      .map(d => ({
        type: d.type,
        content: d.content
      }));

    if (!lines || lines.length === 0) {
      throw new Error("eq: requires at least one line");
    }

    return Object.freeze({
      type: "eq",
      lines,

      render({ visibleCount = lines.length } = {}) {
        return `
          <section class="slide eq">
            <div class="eq-layout">

              <div class="eq-left">
                ${lines
                  .slice(0, visibleCount)
                  .map(l => `
                    <div class="eq-line eq-${l.type}">
                      ${l.content}
                    </div>
                  `)
                  .join("")}
              </div>

              <div class="eq-right"></div>

            </div>
          </section>
        `;
      }
    });
  }
};
