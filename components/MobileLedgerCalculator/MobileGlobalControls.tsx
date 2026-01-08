"use client";

// components/MobileLedgerCalculator/MobileGlobalControls.tsx

import React from "react";
import type { GlobalControls } from "./types";

interface Props {
  state: GlobalControls;
  onChange: (next: GlobalControls) => void;
  selectableSides?: string[];
}

export function MobileGlobalControls({ state, onChange, selectableSides }: Props) {
  // If selectableSides is not supplied, default to USA/CSA
  const sideOptions = selectableSides && selectableSides.length ? selectableSides : ["USA", "CSA"];
  return (
    <div className="bg-zinc-900 py-3 px-2 flex gap-3 overflow-x-auto">
      {/* Side */}
      <div className="flex-shrink-0 rounded-md bg-zinc-800 px-4 py-2 flex flex-col items-center min-w-[120px]">
        <label htmlFor="side-select" className="text-xs uppercase mb-1 font-medium tracking-wide">
          Side
        </label>
        <div className="w-full overflow-x-auto">
          <select
            id="side-select"
            aria-describedby="side-desc"
            value={state.side}
            onChange={e =>
              onChange({ ...state, side: e.target.value as GlobalControls["side"] })
            }
            className="rounded max-w-xs w-full bg-zinc-900 text-white border border-zinc-600 px-2 py-1 text-sm"
          >
            {/* Only include each discovered side value as option (no Both/All) */}
            {sideOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <span id="side-desc" className="sr-only">Choose which side is represented in the ledger calculation.</span>
      </div>
      {/* Inflation */}
      <div className="flex-shrink-0 rounded-md bg-zinc-800 px-4 py-2 flex flex-col items-center min-w-[70px]">
        <label htmlFor="inflation-input" className="text-xs uppercase mb-1 font-medium tracking-wide">Inflation (%)</label>
        <input
          id="inflation-input"
          type="number"
          min={0}
          max={99}
          value={state.inflationPercent}
          aria-describedby="inflation-desc"
          onChange={e =>
            onChange({ ...state, inflationPercent: Number(e.target.value) })
          }
          className="rounded bg-zinc-900 text-white border border-zinc-600 px-2 py-1 w-16 text-sm text-center"
        />
        <span id="inflation-desc" className="sr-only">Percentage increase applied to all item prices for inflation calculation.</span>
      </div>
      {/* Armories */}
      <div className="flex-shrink-0 rounded-md bg-zinc-800 px-4 py-2 flex flex-col items-center min-w-[70px]">
        <label htmlFor="armories-input" className="text-xs uppercase mb-1 font-medium tracking-wide">Armories</label>
        <input
          id="armories-input"
          type="number"
          min={0}
          max={99}
          value={state.armories}
          aria-describedby="armories-desc"
          onChange={e =>
            onChange({ ...state, armories: Number(e.target.value) })
          }
          className="rounded bg-zinc-900 text-white border border-zinc-600 px-2 py-1 w-16 text-sm text-center"
        />
        <span id="armories-desc" className="sr-only">Number of armories affects specific section totals and grant calculations.</span>
      </div>
    </div>
  );
}
