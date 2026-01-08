"use client";

// components/MobileLedgerCalculator/ItemModal.tsx

import React, { useState } from "react";
import type { MobileLedgerItem, Modifier } from "./types";

interface Props {
  initial?: Partial<MobileLedgerItem>;
  onSave: (item: MobileLedgerItem) => void;
  onCancel: () => void;
  mode: "add" | "edit";
  records?: any[];
  side?: string;
}

export function ItemModal({ initial = {}, onSave, onCancel, mode, records = [], side = "" }: Props) {
  // Step 1: Class, Step 2: Name, Step 3: Amount, Step 4: Modifiers
  const [step, setStep] = useState(1);

  function recordAllowedForSide(record: any, currentSide: string) {
    const key = ((record.side ?? record.Side) || "").trim().toLowerCase();
    const sideTarget = (currentSide || "").trim().toLowerCase();
    return !key || key === "all" || key === sideTarget;
  }
  const filteredRecords = (records || []).filter(r => recordAllowedForSide(r, side));

  function getKey(obj: any, lower: string, upper: string) {
    return obj[lower] ?? obj[upper];
  }
  const allClasses = Array.from(
    new Set(
      (filteredRecords || [])
        .map(r => getKey(r, 'class', 'Class'))
        .filter(Boolean)
    )
  );

  const allNamesObj: Record<string, string[]> = {};
  for (const rec of filteredRecords || []) {
    const cls = getKey(rec, 'class', 'Class');
    const name = getKey(rec, 'name', 'Name');
    if (cls && name) {
      if (!allNamesObj[cls]) allNamesObj[cls] = [];
      allClasses.sort((a, b) => a.localeCompare(b));
      Object.keys(allNamesObj).forEach(cls => {
        allNamesObj[cls].sort((a, b) => a.localeCompare(b));
      });
      if (!allNamesObj[cls].includes(name)) allNamesObj[cls].push(name);
    }
  }

  // Multi-modifiers state
  const [itemData, setItemData] = useState<MobileLedgerItem>({
    id: initial.id || "",
    class: initial.class || "",
    name: initial.name || "",
    amount: initial.amount || 1,
    modifiers: initial.modifiers || [] as Modifier[],
  });

  const canStarfort = itemData.class === "Buildings" && itemData.name.toLowerCase().includes("fort");
  const canHistorical = itemData.class === "Buildings";

  // Modifier toggle logic
  function toggleModifier(type: Modifier["type"], checked: boolean) {
    setItemData(data => {
      let mods = data.modifiers.filter(m => m.type !== type);
      if (checked) {
        if (type === "custom") {
          mods.push({ type: "custom", label: "", value: 0 }); // initial blank custom
        } else {
          mods.push({ type });
        }
      }
      return { ...data, modifiers: mods };
    });
  }

  // Add/Remove/Edit individual custom modifiers
  function updateCustom(idx: number, label: string, value: number) {
    setItemData(data => {
      const mods = data.modifiers.map((m, i) =>
        m.type === "custom" && i === idx ? { ...m, label, value } : m
      );
      return { ...data, modifiers: mods };
    });
  }
  function removeCustom(idx: number) {
    setItemData(data => {
      const mods = data.modifiers.map((m, i) => m.type === "custom" ? { ...m } : m)
        .filter((m, i) => !(m.type === "custom" && i === idx));
      return { ...data, modifiers: mods };
    });
  }
  function addCustom() {
    setItemData(data => ({ ...data, modifiers: [...data.modifiers, { type: "custom", label: "", value: 0 }] }));
  }

  const stepTitles = ["Class", "Name", "Amount", "Modifiers"];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
      <div
        className="w-full mx-auto sm:max-w-md bg-zinc-900 rounded-t-2xl p-4 shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-label"
        aria-describedby="modal-desc"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold" id="modal-label">{mode === "add" ? "Add Item" : "Edit Item"}</span>
          <button className="text-2xl leading-4" aria-label="Close modal" onClick={onCancel}>×</button>
        </div>
        <span id="modal-desc" className="sr-only">Follow the steps to select class, name, amount, and optional modifiers for this item.</span>
        {/* Stepper */}
        <div className="flex flex-col gap-4">
          {step === 1 && (
            <div>
              <label className="block mb-2 text-sm font-semibold" htmlFor="step-class-select">Class</label>
              <div className="w-full overflow-x-auto">
                <select
                  id="step-class-select"
                  aria-describedby="class-desc"
                  className="rounded-lg max-w-xs w-full bg-zinc-900 text-white border border-zinc-600 px-3 py-2 text-sm"
                  value={itemData.class}
                  onChange={e =>
                    setItemData(d => ({ ...d, class: e.target.value, name: "" }))
                  }
                >
                  <option value="">Select class...</option>
                  {allClasses.length === 0 ? (
                    <option disabled value="">No classes available</option>
                  ) : (
                    allClasses.map(cls => <option key={cls} value={cls}>{cls}</option>)
                  )}
                </select>
              </div>
              <span id="class-desc" className="sr-only">Select a class for the new item.</span>
              <button
                className="w-full mt-3 rounded-lg bg-blue-700 py-2 font-semibold"
                disabled={!itemData.class}
                aria-label="Go to name selection step"
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <label className="block mb-2 text-sm font-semibold" htmlFor="step-name-select">Name</label>
              <div className="w-full overflow-x-auto">
                <select
                  id="step-name-select"
                  aria-describedby="name-desc"
                  className="rounded-lg max-w-xs w-full bg-zinc-900 text-white border border-zinc-600 px-3 py-2 text-sm"
                  value={itemData.name}
                  onChange={e =>
                    setItemData(d => ({ ...d, name: e.target.value }))
                  }
                >
                  <option value="">Select name...</option>
                  {itemData.class && allNamesObj[itemData.class] && allNamesObj[itemData.class].length > 0 ? (
                    allNamesObj[itemData.class].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))
                  ) : (
                    <option disabled value="">No names available</option>
                  )}
                </select>
              </div>
              <span id="name-desc" className="sr-only">Select a name for the item.</span>
              <div className="flex justify-between mt-4">
                <button onClick={() => setStep(1)} className="text-sky-400" aria-label="Go back to class selection">Back</button>
                <button
                  className="rounded-lg bg-blue-700 py-2 px-5 font-semibold"
                  disabled={!itemData.name}
                  aria-label="Go to amount entry step"
                  onClick={() => setStep(3)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <label className="block mb-2 text-sm font-semibold" htmlFor="step-amount-input">Amount</label>
              <input
                id="step-amount-input"
                aria-describedby="amount-desc"
                className="rounded-lg w-full bg-zinc-900 text-white border border-zinc-600 px-3 py-2"
                type="number"
                min={1}
                value={itemData.amount}
                onChange={e =>
                  setItemData(d => ({ ...d, amount: Math.max(1, Number(e.target.value) || 1) }))
                }
              />
              <span id="amount-desc" className="sr-only">Enter the amount for the item, minimum 1.</span>
              <div className="flex justify-between mt-4">
                <button onClick={() => setStep(2)} className="text-sky-400" aria-label="Go back to name selection">Back</button>
                <button
                  className="rounded-lg bg-blue-700 py-2 px-5 font-semibold"
                  aria-label="Go to modifiers entry step"
                  onClick={() => setStep(4)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <label className="block mb-2 text-sm font-semibold">Modifiers</label>
              <div className="flex flex-col gap-3 mb-2">
                {canStarfort && (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={itemData.modifiers.some(m => m.type === "starfort")}
                      onChange={e => toggleModifier("starfort", e.target.checked)}
                    />
                    Starfort (+100%)
                  </label>
                )}
                {canHistorical && (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={itemData.modifiers.some(m => m.type === "historical")}
                      onChange={e => toggleModifier("historical", e.target.checked)}
                    />
                    Historical Accuracy (-33%)
                  </label>
                )}
                {/* Render all custom modifiers, editable and removable using true index */}
                {itemData.modifiers.map((mod, idx) => mod.type === "custom" && (
                  <div className="flex items-center gap-2 mb-1" key={idx}>
                    <input
                      type="text"
                      className="rounded-lg px-2 py-1 bg-zinc-900 text-white border border-zinc-600 w-24 text-center"
                      placeholder="Label"
                      aria-label="Custom modifier label"
                      value={mod.label || ""}
                      onChange={e => updateCustom(idx, e.target.value, mod.value ?? 0)}
                    />
                    <input
                      type="number"
                      className="rounded-lg px-2 py-1 bg-zinc-900 text-white border border-zinc-600 w-16 text-center"
                      placeholder="%"
                      aria-label="Custom modifier value percentage"
                      value={mod.value ?? ""}
                      onChange={e => updateCustom(idx, mod.label ?? "", Number(e.target.value))}
                    />%
                    <button
                      className="text-red-400 px-2"
                      aria-label="Remove custom modifier"
                      onClick={() => removeCustom(idx)}
                    >✕</button>
                  </div>
                ))}
                <button
                  className="rounded-lg bg-blue-800 py-1 px-3 text-white font-semibold w-fit"
                  type="button"
                  onClick={addCustom}
                >+ Add Custom Modifier</button>
              </div>
              <div className="flex justify-between mt-4">
                <button onClick={() => setStep(3)} className="text-sky-400" aria-label="Go back to amount entry">Back</button>
                <button
                  className="rounded-lg bg-green-700 py-2 px-5 font-semibold"
                  aria-label={mode === "add" ? "Add item" : "Save item"}
                  onClick={() => onSave({ ...itemData, id: itemData.id || crypto.randomUUID() })}
                >
                  {mode === "add" ? "Add" : "Save"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
