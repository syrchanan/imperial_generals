# Mobile-First Civil War Ledgers Calculator Spec

**Status:** Draft, last updated 2026-01-06 20:30:53

---

## Overview
This spec outlines a new, mobile-first version of the Civil War Ledgers Calculator. The interface is optimized for phones and tablets, but will scale smoothly to desktops. All previous calculator and UI code has been removed; this document replaces it entirely.

---

## Key Design Principles
- **Mobile-first:** One-column flows, big tap targets, smooth slide/fade modals.
- **Cards over tables:** Each input row is an item card; tables/grids are eliminated for scrollability and clarity.
- **Sticky controls:** Common actions global (top/bottom) bar; always visible.
- **Accessibility:** Labels, ARIA, keyboard-friendly, easy edits.

---
## Major Components & Structure

- **Sticky Header:**
  - App title (Ledgers & Rolls)
  - [Copy Receipt] icon/button, available at all times
- **Global Controls Row:**
  - Three horizontally-scrollable cards: Side, Inflation, Armories
  - Each is a pill/card with icon, big input, and tap for more info
- **Sections List:**
  - Accordion (collapsible panels), one for each section (e.g., "Armory 1861")
  - Shows subtotal on collapsed view and all item cards on expanded view
- **Add Item Button:**
  - Per section, always visible when expanded
- **Items as Cards:**
  - Scrollable cards per row: class/name as heading, amount as badge, modifier as tag, with edit/delete icons.
  - Swipe or tap for fast edit/remove
- **Slide-Up Modal for Adding/Editing:**
  - Multi-step (class → name → amount → modifier).
  - Custom modifier panel shows only if selected; inputs sized for mobile.
- **Sticky Totals Bar:**
  - Sits at screen bottom: Total Cost | Upkeep | [Receipt]
- **Receipt Modal:**
  - Scrollable, copyable breakdown by section, with all meta-info, global modifiers, timestamp

## Mockup
```
+--------------------------------------------------+
|  Ledgers & Rolls         [📋 Receipt]            |  ← Sticky Top Bar
+--------------------------------------------------+
[ Horizontal Scroll Global Controls ]
 ┌─────────────┐ ┌─────────────┐ ┌───────────────┐
 | [🇺🇸 Side]  | | [%] Infl.  | | [🏛️ Armories]|
 └─────────────┘ └─────────────┘ └───────────────┘
[Accordion: Section]
| Title ▼          Subtotal: $X/$Y                |
|   [+] Add Item                                   |
|   [ItemCard…]                                    |
|   ...                                            |
| ▲ Collapse                                      |
[TotalsBar]: Total: $XXXX   Upkeep: $YY   [📋]
```

## Key Behavior
- One section open at a time (accordion)
- Editing/adding always via overlay modal; returns user to same scroll spot
- All controls and modals keyboard-accessible
- All monetary/calculation logic identical—just a new UI
- All actions should feel "mobile app-like" in responsiveness

## Accessibility
- ARIA labels everywhere
- Tab order and field focus always logical
- Big tap targets and large input areas

## Extensibility/Future-Proofing
- New modifiers, fields, or summary views should be easy to add as new cards/steps
- Optional: dark mode toggle in future; currently always-on dark theme

---
## Notes
- This spec replaces all previous calculator specs and UI plans. See version history for prior logic if needed.
- Implementation should begin with root layout, global controls, and one section/accordion as a vertical pilot.
