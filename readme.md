
# `taleem-slides`

## Internal Design README (v0 – Starting Point)

This document captures the **intent, boundaries, and contracts** of the `taleem-slides` project at inception.

Even if implementation details change later, this file defines the **baseline we agreed on**.

---

## Status

This is a **strong, clean reset** — and this project is a **DELIVERABLE**.

The previous “player” direction mixed concerns and terminology.
`taleem-slides` fixes that at the root.

This project is **not a player**.

It is a **pure slide interpretation engine**.

---

## 🎯 Project Definition: `taleem-slides`

`taleem-slides` is a **pure JavaScript engine** that:

* accepts `deck-v1` JSON
* interprets it deterministically
* outputs an **array of slide objects**
* exposes **no DOM, no UI, no timing, no framework assumptions**

It can run:

* in Node
* in Vite
* in tests
* in CI

with identical results.

---

## Absolute Non-Goals

This library does **NOT**:

❌ touch the DOM
❌ mount HTML
❌ manage time or playback
❌ handle navigation
❌ know about CSS or frameworks
❌ know about React / Svelte / Vue
❌ perform animations
❌ read global state

If any of the above appear, the boundary is violated.

---

## High-Level Pipeline

```txt
deck-v1 JSON
   ↓
Interpreter (panic or success)
   ↓
Array of Slide Objects
   ↓
render() → pure HTML string
```

Everything *after* HTML injection is the responsibility of the **app**, not this library.

---

## 1️⃣ Interpreter (JSON → Slide Objects)

### Responsibilities

The interpreter is the **only component allowed to read raw JSON**.

It must:

* accept `deck-v1` JSON
* validate minimal invariants (shape, required fields)
* panic early on:

  * unknown slide types
  * malformed data
* construct **fully initialized slide objects**
* guarantee that after interpretation:

  * no raw JSON is ever needed again

```txt
deck-v1 JSON
   ↓
Interpreter (panic or success)
   ↓
SlideObject[]
```

### Lock Rule

> **No other part of the system may ever read raw JSON.**

---

## 2️⃣ Slide Objects (Pure, Immutable)

Slide objects are the **core output** of this library.

Each slide object:

* stores **only its own data**
* is **immutable after construction**
* contains **no DOM references**
* contains **no global state**
* exposes **pure methods only**

### Documented Slide Interface (Contract)

```ts
interface Slide {
  type: string;
  render(): string;   // pure, structural HTML only
}
```

### Notes on `render()`

* Returning an HTML **string** is considered **pure**
* HTML is treated as **intermediate representation**, not UI
* Class names are allowed
* Structure is allowed
* Behavior is NOT allowed

🔒 Lock Rule:

> Slides return **structure**, not behavior.

No `<script>`, no `<style>`, no events, no environment access.

---

## 3️⃣ Utility Functions (Array-Level)

The library may export **stateless utility functions** that operate on arrays of slide objects.

Examples:

```js
getSlideByIndex(slides, index)
getSlidesInRange(slides, start, end)
mapSlides(slides, fn)
```

Rules:

* no mutation
* no caching
* no globals
* no side effects

These functions exist purely for convenience and composability.

---

## 4️⃣ Testability (“Rust-like” Guarantee)

This library is designed to be **trivially testable**.

To enforce this, we lock two additional rules:

### 🔒 Rule A — No Hidden Time

* No `Date.now`
* No timers
* No implicit ordering
* No environment-dependent behavior

### 🔒 Rule B — Deterministic Output

* Same input → same output
* Always
* Without exception

This enables:

* snapshot testing
* golden file testing
* CI confidence

---

## Internal Design Contracts

### Slide Type Registration

Each slide type must declare its own interpreter entry:

```js
{
  type: "titleSlide",
  fromJSON(rawSlide): SlideObject
}
```

The interpreter then becomes:

```js
registry[type].fromJSON(rawSlide)
```

No conditionals.
No switch statements.
No guessing.

---

### Panic Surface

All errors must be **explicit and actionable**.

When interpretation fails, error messages must include:

* slide index
* slide type
* exact reason

Fail early. Fail loudly.

---

## Export Policy (Important)

`taleem-slides` exports:

* the interpreter
* documented utility functions

It does **NOT** export:

❌ concrete slide classes
❌ internal registries
❌ implementation details

Slide classes are **private implementation**.
Only the **interface contract** is public.

---

## Suggested Folder Structure

```txt
taleem-slides/
├─ src/
│  ├─ interpreter/
│  │  └─ interpretDeck.js
│  ├─ slides/              // private
│  │  ├─ TitleSlide.js
│  │  ├─ ImageWithTitleSlide.js
│  │  └─ ...
│  ├─ registry.js          // private
│  ├─ utils/
│  │  └─ slideUtils.js
│  └─ index.js             // public exports only
├─ tests/
│  ├─ interpreter.test.js
│  ├─ slides.test.js
│  └─ snapshots/
└─ README.md
```

---

## Final Assessment

This direction is:

* ✔️ Cleaner
* ✔️ More testable
* ✔️ Less ambiguous
* ✔️ Easier to reason about
* ✔️ Easier to extend

Most importantly:

> **It aligns with how we actually think about slides.**

This project is now a **clear, stable deliverable**.

---

### Next Steps (when ready)

* define the exact Slide interface (final)
* implement Interpreter + one slide (`TitleSlide`)
* set up tests + snapshots
* publish v0.1 as a locked baseline

---
