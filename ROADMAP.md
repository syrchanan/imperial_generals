# Imperial Generals Static Site Roadmap (2026)

## High-Level Goals
- Serve as a static player-facing reference for the Imperial Generals game
- No backend or authentication—entirely static, suitable for GitHub Pages hosting
- Two main functions: 1) on-board and explain the game to new players, 2) offer tools/rules/maps for current players

---

## Phase 1: Static Player-Facing Resource

- [ ] Add/clean up content sections:
  - [X] Home/Landing page: review welcome text, add imagery
  - [ ] Game Overview page/section: intro, unique hooks, what is IG? (extra - do later with FAQs & about page)
  - [X] Remove sign-in placeholders; replace button with "Join the Game" linking to Discord (https://discord.gg/Hx4CfcMnkK)
  - [ ] Rules Reference: clear, organized, easy to navigate (markdown/JSON)
  - [X] Game Map: static image(s) in `/public`, or interactive (optional)
  - [ ] Features/News/Changelog: highlight new mechanics/updates; make sure labels stay centered if there is a line break
  - [X] Remove badge in /war-room cards for mobile layouts
- [ ] Add Calculator tool:
  - [ ] Define and create `/data/costs.json` data file
  - [ ] Implement calculator UI: select/add/remove item(s), running total
  - [ ] (Optional) Quantity input, per-item modifiers
- [ ] Style & polish:
  - [ ] Improve mobile layout
  - [ ] Fill `/public` with working sample assets (Squoosh.app optimized)
  - [ ] Polish README to document static/resource-focused architecture

---

## Phase 2: Quality of Life & Admin Tools

- [ ] Hidden `/admin` section (not linked in nav):
  - [ ] Simple upload or paste field for CSV from the cost spreadsheet
  - [ ] Parse to site’s JSON schema, validate/export new `/data/costs.json`
  - [ ] (Optional, long-term) In-browser preview of upcoming features/rules
- [ ] Add instructions for how to update site with new data/tools
- [ ] Create a CHANGELOG.md to track feature adds/changes for GM/admin reference
- [ ] (Optional) Add site build/deploy summary in README
- [ ] Replace React Icons with custom SVGs for better performance/cooler look

---

## Phase 3: Advanced Tools & “Mechanics Library”

- [ ] Stub page for ‘Game Mechanics Library’: announce coming TS-automation features
- [ ] Plan integration of TS mechanics library (future-proof API/UI)
- [ ] (Optional) Tools for quick rules lookup, dice roller, random event picker, etc.

---

## Future Ideas/Stretch
- [ ] Make calculator UI more modular (other games)
- [ ] Interactive map overlays (if tech allows—SVG/Canvas)
- [ ] User customization: color themes, favorites, language toggle

---

## Meta
- [ ] Review roadmap each quarter and update completed/incomplete tasks
- [ ] Add developer notes and lessons learned where useful

_Last reviewed: 2026-01-02_

---

## Jan 2026 TODOs

- [ ] Optimize map loading on /war-room/map page
  - [ ] Replace iframe embed with lazy-loaded Google Maps JavaScript API using @googlemaps/js-api-loader
  - [ ] Only do this if/when custom map controls or overlays are needed
- [x] Current iframe embed is sufficient for now, no further action required immediately
