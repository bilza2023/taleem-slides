
# 📦 taleem-slides

## ⚠️  Warning :  Work in Progress — expect breaking changes

> **Pure slide template library for Taleem decks**

`taleem-slides` is a **simple, deterministic template library** that turns
**deck-style slide JSON** into **HTML**.

It does **one thing only**:

> **Given slide data + render state → return HTML**

It does **not** manage time, indexes, playback, or decks.

---

## 🌐 Live Display Center (Important)

👉 **Official live display & reference implementation**
**[https://bilza2023.github.io/taleem/](https://bilza2023.github.io/taleem/)**

This is **not a mock demo**.This link is the **active display center** where:

- slide templates are rendered in real browsers
- visual behavior is validated
- browser/player integration is tested
---

## ✨ Taleem.help Philosophy

**Taleem.help** is an educational technology initiative focused on making
**content-first learning tools**.

The goal of the `taleem-*` libraries is simple:

> Enable educators to create **JSON-based presentations**
> and display them online using **free, open tools**.

Key ideas:

* Slides already encode *layout + structure*
* Users provide **content only**
* There are **no configuration knobs**
* What you see is what the template decides

This removal of choice is **intentional**.

It makes the system:

* easy to learn
* hard to misuse
* consistent across platforms

If a different layout is needed, the solution is **not configuration** —
it is **a new slide template**.

Templates are cheap.
Even hundreds of templates add no runtime cost.

---

## ✨ What this library is

* A collection of **slide templates**
* Each template:

  * reads slide JSON
  * renders HTML
  * applies CSS classes based on a given state
* Fully **stateless** and **pure**

Think of it as:

> *Handlebars / JSX for Taleem slides*

---

## ❌ What this library is NOT

`taleem-slides` does **not**:

* build decks
* validate full decks
* manage timing (`showAt`)
* decide which slide is active
* manage playback
* mutate data

All of that belongs elsewhere.

---

## 🧠 Mental Model

```
slide JSON + render state
        ↓
   slide template
        ↓
       HTML
```

How the state is calculated is **not this library’s concern**.

---

## 📦 Installation

```bash
npm install taleem-slides
```

---

## 🚀 Basic Usage

### 1️⃣ Import a template

```js
import { getSlideTemplate } from "taleem-slides";
```

---

### 2️⃣ Load slide data (once)

```js
const SlideTemplate = getSlideTemplate("bulletList");

const slide = SlideTemplate.fromJSON({
  type: "bulletList",
  data: [
    { name: "bullet", content: "First point" },
    { name: "bullet", content: "Second point" },
    { name: "bullet", content: "Third point" }
  ]
});
```

> `fromJSON()` only **reads and stores structure**.
> No timing. No logic.

---

### 3️⃣ Render with state

```js
const html = slide.render({
  visibleCount: 2,
  activeIndex: 1
});
```

This will:

* render first 2 bullets
* highlight the second bullet
* dim the first

---

## 🎨 Render State Contract

Templates accept a **render state object**.

Common fields:

```ts
{
  visibleCount?: number; // how many items exist
  activeIndex?: number;  // which item is highlighted
}
```

Slides may choose to use one or both.

---

## 🎯 Class Name Contract

Templates apply **standard class names only**:

```text
.is-active
.is-dim
.is-hidden
```

Styling is handled entirely by the consuming app.

---

## 🧭 How this fits in the ecosystem

`taleem-slides` is intentionally **small** and **focused**.

It is used by higher-level projects:

### 🧩 Sister Projects

* **taleem-browser**
  Index-based slide viewer (manual navigation)

* **taleem-player**
  Time-based slide player (audio / video synced)

Both projects:

* compute render state (`activeIndex`, `visibleCount`)
* pass it to `taleem-slides`
* receive consistent HTML output

---

## 🧪 Demo & Reference Projects

* 🌐 **Live Display Center**
  [https://bilza2023.github.io/taleem/](https://bilza2023.github.io/taleem/)

* 📁 **GitHub Demo / Playground**
  *(link can be added here when ready)*

---

## 🧊 Stability & Versioning

* Targets **deck-v1**
* Breaking changes allowed during WIP phase
* HTML output is intentionally simple and predictable

---

## 🧠 Design Principle (Locked)

> **taleem-slides renders HTML.
> It does not decide *when* or *why*.**

---

If you want, next logical steps are:

* rewrite one slide as the **canonical reference**
* or update taleem-browser to consume the new API cleanly

This README now correctly **anchors the entire ecosystem**.
