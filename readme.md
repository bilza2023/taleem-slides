# Taleem Slides — README (Current State + Future Direction)

## Overview

`taleem-slides` is a **pure compilation layer** that converts structured JSON into:

* HTML (static structure)
* Actions (state timeline)
* Groups (CSS behavior mapping)

It does NOT:

* manipulate DOM
* handle timing execution
* apply styles

---

## Core Philosophy

```text
JSON → (compile) → HTML + STATE → (runner) → DOM
```

* Slides define structure and timing interpretation
* Action-runner enforces state
* CSS defines appearance

---

## Current API (LOCKED)

### Main Function

```js
renderTaleemSlide(json)
```

---

### Output Shape

```js
{
  html: string,
  actions: [
    {
      time: number,
      state: {
        [groupName]: string[] // ids
      }
    }
  ],
  groups: {
    [groupName]: string[] // css classes
  }
}
```

---

## Key Concepts

### 1. HTML

* Fully static
* Contains all elements with IDs
* May include initial classes like `hidden`

---

### 2. Actions

* Timeline of **complete state snapshots**
* At any time → exactly ONE valid state

---

### 3. Groups

Define behavior mapping:

```js
groups = {
  visible: [],
  hidden: ["hidden"]
}
```

---

## Behavior Model (CURRENT)

* Most slides use **accumulation behavior**
* Implemented via:

```js
buildSequentialStates()
```

* Items appear one-by-one and remain visible

---

## System Boundaries

| Layer          | Responsibility                 |
| -------------- | ------------------------------ |
| taleem-builder | generates valid JSON           |
| taleem-slides  | compiles JSON → HTML + actions |
| action-runner  | applies state to DOM           |
| player         | rendering + CSS                |

---

## What is STABLE (Do Not Change)

* Output API shape
* Action structure
* Group mechanism
* State completeness rule

---

# ⚠️ Known Limitations (Accepted for Now)

1. Behavior is hardcoded (accumulation)
2. HTML includes behavior classes (`hidden`)
3. No formal behavior abstraction
4. ID generation may not be deterministic
5. CSS animations partially conflict with state model

---

# 🚀 Future Development Plan

## Phase 1 — Internal Refactor (NO API CHANGE)

Goal: Improve internals without breaking player

### 1. Behavior Layer (internal only)

Replace:

```js
buildSequentialStates()
```

With:

```js
behaviors.accumulate()
```

Future behaviors:

* accumulate (current)
* focusOne (focus list)
* replace
* toggle
* blink (advanced)

👉 This is internal — API remains SAME

---

### 2. Timeline System Upgrade

* Fully support `timings[]` (event-based)
* Remove legacy `showAt`
* Standardize `extractTimeline()`

---

### 3. Deterministic IDs

Replace random IDs with:

```text
scopeId + slideIndex + itemIndex
```

Ensures:

* reproducibility
* testability
* multi-player support

---

## Phase 2 — Rendering Improvements

### 4. Remove Behavior from HTML

Move from:

```html
class="hidden"
```

To:

```text
state-driven visibility only
```

---

### 5. State-driven Animation

Shift from:

```text
CSS animation on load
```

To:

```text
CSS transition on class change
```

---

## Phase 3 — Advanced Behaviors

Introduce new slide capabilities:

### 6. Focus Behavior

```text
one item active, others dim
```

---

### 7. Replace Behavior

```text
one item at a time (no accumulation)
```

---

### 8. Toggle / Blink

```text
items appear/disappear over time
```

---

## Phase 4 — Tooling & Validation

### 9. Strong Validation

* ensure complete state
* validate IDs
* validate timeline consistency

---

### 10. Golden Slide Tests

* snapshot testing per slide type
* prevent regressions

---

# ⚠️ What NOT to Do

* ❌ Do NOT change output API
* ❌ Do NOT move logic into action-runner
* ❌ Do NOT mix CSS timing with logic timing
* ❌ Do NOT introduce partial state updates

---

# 🧭 Guiding Principle

```text
Slides decide WHAT should be true
Runner enforces it
CSS decides HOW it looks
```

---

# 🧠 Final Note

This system is:

* deterministic
* composable
* extensible

The current version is **stable and production-ready**.

Future work should focus on:
👉 internal clarity
👉 behavior abstraction
👉 zero breaking changes

---
