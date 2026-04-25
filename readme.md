
# Taleem Slides — README (Current Architecture)

---

## Overview

`taleem-slides` is a **pure compilation layer** that converts structured JSON into:

* HTML (static structure)
* Actions (state timeline)
* Groups (CSS behavior mapping)

It does NOT:

* manipulate the DOM
* execute timing
* apply styles
* decide animations inside slides

---

## Core Philosophy

```text
JSON → Slides → (wrapper + primitives) → HTML + actions + groups → runner → DOM
```

---

## 🧠 Core Design (IMPORTANT)

### Separation of Concerns

| Layer         | Responsibility                 |
| ------------- | ------------------------------ |
| Slide         | Defines structure (HTML + ids) |
| Primitive     | Defines behavior (state logic) |
| Wrapper       | Connects slide → primitive     |
| Action Runner | Applies state to DOM           |
| CSS           | Controls appearance            |

---

## 🔧 Main API

```js
renderTaleemSlide(json)
```

---

## 📦 Output Format

```js
{
  html: string,
  actions: [
    {
      time: number,
      state: {
        [groupName]: string[]
      }
    }
  ],
  groups: {
    [groupName]: string[]
  }
}
```

---

## 🧩 Slide Contract (NEW — LOCKED)

Every slide must return:

```js
{
  html: string,
  animation: string,
  ids: string[]
}
```

### Rules:

* HTML must include **all elements with ids**
* No actions
* No groups
* No timing logic
* No animation logic

---

## 🎬 Animation Primitives (CORE SYSTEM)

All behavior is handled by **3 primitives only**:

---

### 1. `progressiveReveal`

> Items appear one-by-one and stay visible

```js
groups = {
  visible: [],
  hidden: ["hidden"]
}
```

---

### 2. `highlightOne`

> One item focused, others dim

```js
groups = {
  focus: [],
  dim: ["dim"]
}
```

Used by:

* FocusList
* Eq (with extensions)

---

### 3. `oneAtATime`

> Only one item visible at a time

```js
groups = {
  visible: [],
  hidden: ["hidden"]
}
```

Used by:

* Skeleton slides

---

## ⚙️ Wrapper (renderTaleemSlide)

The wrapper:

1. Calls slide → gets:

   ```js
   html, animation, ids
   ```

2. Validates:

   * ids exist
   * timings (if provided)

3. Runs primitive:

```js
runPrimitive({
  type: animation,
  ids,
  timings
})
```

4. Returns:

```js
{ html, actions, groups }
```

---

## ⏱ Timing Model

* Timing is **optional**
* Provided by user:

```js
timings: [t1, t2, t3]
```

Rules:

* length === ids.length
* strictly increasing

---

## 🧠 State Model

* Each action is a **complete state snapshot**
* No partial updates
* No merging

```js
{
  time: 5,
  state: {
    visible: ["id1"],
    hidden: ["id2", "id3"]
  }
}
```

---

## 🎯 Eq Slide Special Case

Eq slide uses:

* `highlightOne` primitive
* PLUS additional ids (side panel)

Meaning:

* focus → line
* dim → other lines
* visible/hidden → side panel items

👉 Still same primitive, extended mapping

---

## 🔒 What is LOCKED (Do Not Change)

* Output API (`html + actions + groups`)
* Slide contract (`html + animation + ids`)
* Primitive system (3 only)
* State snapshot model

---

## ❌ What Slides MUST NOT DO

* generate actions ❌
* define groups ❌
* use timeline logic ❌
* import primitives ❌

---

## ⚠️ Known Simplifications (Intentional)

* No per-item timing inside slides
* No After Effects style timeline
* Sequence = array order
* Behavior limited to 3 primitives

👉 This is by design (NOT a limitation)

---

## 🚀 Future Direction (SAFE)

### 1. Primitive Extensions (optional)

* better Eq mapping
* custom behaviors (still primitive-based)

---

### 2. Validation Layer

* stronger schema validation
* id consistency checks

---

### 3. Testing

* golden tests per slide
* full wrapper integration tests

---

## ❌ What NOT to Do

* ❌ Do NOT reintroduce per-item timing
* ❌ Do NOT move logic back into slides
* ❌ Do NOT add new primitives casually
* ❌ Do NOT mix animation logic with HTML

---

## 🧭 Guiding Principle

```text
Slides define WHAT exists
Primitives define WHAT happens
Runner enforces it
CSS defines HOW it looks
```

---

## 🧠 Final Note

This system is now:

* simple
* deterministic
* testable
* scalable

You have:

👉 removed accidental complexity
👉 eliminated duplicate logic
👉 unified all slides under one model

---

## 🔥 One-line Summary

> Taleem Slides is a **structure + behavior compiler powered by 3 primitives**

