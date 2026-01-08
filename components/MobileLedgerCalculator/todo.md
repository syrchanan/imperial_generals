# Mobile Ledger Calculator Build Log & TODOs

Updated: 2026-01-06 23:04:46

## Component Build Log
- [x] types.ts — Types for sections, items, global controls
- [x] MobileLedgerCalculator.tsx — Main container/scaffold (live data loader for era, client-only with prop-based era, URL-driven, session/localStorage persistence, GH Pages compatible)
- [x] MobileGlobalControls.tsx — Top controls, horizontally scrollable, accessible
- [x] SectionAccordion.tsx — Per-section, add/edit/delete item logic, accessible
- [x] ItemCard.tsx — Card for user row with all item info/options, a11y compliant
- [x] ItemModal.tsx — Overlay/modal for add/edit item, ARIA/stepper accessibility
- [x] TotalsBar.tsx — Sticky bottom bar (grand total & receipt), accessible/copy button
- [x] ReceiptModal.tsx — Modal for receipt/markdown/copy, dialog compliant
- [x] dataLoader.ts — Loads/parse manifest/JSON from public/data/ledgers/* (safe for static export)
- [x] subtotalCalc.ts — Utility for per-section subtotal, global controls ready
- [x] todo.md — Active checklist, frequent status recorded
- [x] index.tsx — Default export for folder, ready for import
- [x] Cleaned up integration parts (removed deprecated `LedgerCalculatorPage.tsx`)
- [x] Added LedgersRollsPage.tsx as new top-level, client-ready tool entry

## Live Data Loading/Integration (2026-01-06 20:44:33 ➡️ 21:19:57)
- [x] Replaced demo constant era with era prop from router
- [x] Works in `app/war-room/[era]/[tool]/page.tsx` (226-01-06 21:09:41 update)
- [ ] Refactor ItemModal to accept a new `records` prop for live data.
- [x] In SectionAccordion, pass `section._rawRecords` to ItemModal as `records`. (2026-01-06 22:00:11)
- [x] In ItemModal, generate class/name options from live data, not hardcoded demo lists. (2026-01-06 21:58:37)
- [ ] Update TypeScript types as needed (support for live record info).
- [ ] Test add/edit workflows for all sections, using real data.
- [x] No server-APIs or SSR, browser-only fetch from static/public (GH Pages OK)
- [x] 2026-01-06 21:54: Live data now populates class/name dropdowns in ItemModal; SectionAccordion passes records, demo fallback maintained.

## UI/UX Polish & Accessibility Plan
- [x] Add accessible labels/descriptions to all controls/fields/buttons (compliant)
- [ ] Ensure tab/focus navigation works well on all inputs, modals, actions
- [ ] Polish input/select appearance and spacing, per mobile design
- [ ] Improve error handling: missing/invalid fields, helpers
- [ ] Make sticky receipt modal/copy button large, focusable, clear

## Static Export / GH Pages Compatibility (2026-01-06 21:19:57)
- [x] All fetch()es use paths resolvable after export (data in /public/data/ledgers/)
- [x] No API or SSR usage in these components — 100% client-side
- [x] All interactive files start with "use client"
- [x] Dynamic import now targets a default export successfully
- [x] Code tested and reviewed for static, browser-only hosting context

---

Ready for static export & GH Pages deploy.

Next steps: continue checklist for focus, error handling, mobile design polish, and advanced a11y nav if desired.

## Side Filter: Invalidate Selections on Change
- [ ] On side filter change, remove any selected ledger items that do not match "All" or the newly selected side.
- [ ] Show a visible notice informing the user when this happens.
- [ ] Review edge cases ("All" filter, no selections, etc.)
- [ ] Test and review UI/UX flow.
