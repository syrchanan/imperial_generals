import type { MobileLedgerSection, GlobalControls, Modifier } from "./types";

// Calculates subtotal for a section, using its items and _rawRecords + global controls
export function calculateSubtotal(
  section: MobileLedgerSection & { _rawRecords: any[] },
  globals: GlobalControls
) {
  let cost = 0, upkeep = 0;
  for (const item of section.items) {
    // Find the raw record (class+name match)
    const rec = section._rawRecords?.find(
      (r) => r.Class === item.class && r.Name === item.name
    );
    if (!rec) continue;
    let rowCost = Number(rec.Cost) || 0;
    let rowUpkeep = Number(rec.Upkeep) || 0;

    // Apply all modifiers in order
    for (const mod of item.modifiers || [] as Modifier[]) {
      switch (mod.type) {
        case "starfort":
          rowCost *= 2;
          break;
        case "historical":
          rowCost *= 0.67;
          break;
        case "custom":
          rowCost *= 1 + ((mod.value || 0) / 100);
          break;
        // ignore others
      }
    }
    rowCost *= item.amount;
    rowUpkeep *= item.amount;

    // Apply to cost
    rowCost *= 1 + (globals.inflationPercent / 100);
    rowCost *= -0.05 * globals.armories + 1.2;

    // Apply to upkeep
    rowUpkeep *= 1 + (globals.inflationPercent / 100);
    rowUpkeep *= -0.05 * globals.armories + 1.2;

    cost += rowCost;
    upkeep += rowUpkeep;
  }
  return { cost, upkeep };
}
