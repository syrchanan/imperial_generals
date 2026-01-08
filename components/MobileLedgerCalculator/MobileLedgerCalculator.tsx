"use client";

import React, { useState, useEffect } from "react";
import { MobileGlobalControls } from "./MobileGlobalControls";
import { SectionAccordion } from "./SectionAccordion";
import { TotalsBar } from "./TotalsBar";
import { ReceiptModal } from "./ReceiptModal";
import { loadSectionsForEra } from "./dataLoader";
import { MobileLedgerSection, GlobalControls, Modifier } from "./types";
import { calculateSubtotal } from "./subtotalCalc";

export function MobileLedgerCalculator({ era }: { era?: string }) {
  const realEra = era || "civil-war";
  const eraDisplay = realEra
    .replace(/-/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());
  const SECTIONS_KEY = `ledgerCalc_sections_${realEra}`;
  const GLOBALS_KEY = `ledgerCalc_globals_${realEra}`;

  // State holds sections WITH _rawRecords property guaranteed
  const [sections, setSections] = useState<(MobileLedgerSection & { _rawRecords: any[] })[]>([]);
  const [globalControls, setGlobalControls] = useState<GlobalControls | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clearedNotice, setClearedNotice] = useState<string | null>(null);

  // Loader: only runs when era changes!
  useEffect(() => {
    setLoading(true);
    loadSectionsForEra(realEra)
      .then(loadedSections => {
        setSections(loadedSections as (MobileLedgerSection & { _rawRecords: any[] })[]);
        // Dynamically set initial side from available sides
        const sides = getSelectableSides(loadedSections);
        setGlobalControls({
          side: sides[0] || "All",
          inflationPercent: 0,
          armories: 0
        });
        setLoading(false);
      })
      .catch(e => setLoading(false));
  }, [realEra]);

  // Global controls effect: only updates .subtotal field
  useEffect(() => {
    if (!globalControls) return;
    setSections(prevSections =>
      prevSections.map(section => ({
        ...section,
        subtotal: calculateSubtotal(section, globalControls)
      }))
    );
  }, [globalControls]);

  function resetAll() {
    localStorage.removeItem(SECTIONS_KEY);
    localStorage.removeItem(GLOBALS_KEY);
    window.location.reload();
  }

  function getSelectableSides(sections: any[]) {
    const sides = new Set<string>();
    for (const s of sections) {
      if (typeof s.side === "string" && s.side !== "All") sides.add(s.side);
    }
    const arr = Array.from(sides);
    return arr.length ? arr : sections
      .map(s => typeof s.side === "string" && s.side !== "All" ? s.side : null)
      .filter((v, i, a) => v && a.indexOf(v) === i) as string[];
  }
  const selectableSides = getSelectableSides(sections);

  const totalCost = !loading
    ? sections.reduce((acc, s) => acc + (s.subtotal?.cost || 0), 0)
    : 0;
  const totalUpkeep = !loading
    ? sections.reduce((acc, s) => acc + (s.subtotal?.upkeep || 0), 0)
    : 0;

  // Update section handler
  function updateSection(index: number, next: MobileLedgerSection) {
    // preserve _rawRecords from previous
    const prevSection = sections[index];
    const updated = {
      ...prevSection,
      ...next,
      subtotal: globalControls ? calculateSubtotal({ ...prevSection, ...next }, globalControls) : { cost: 0, upkeep: 0 },
      _rawRecords: prevSection._rawRecords
    };
    setSections(prev =>
      prev.map((section, i) =>
        i === index ? updated : section
      )
    );
  }

  // ...rest of your hooks, effects, etc. (unchanged)...

  if (!globalControls) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-zinc-400">Loading ledgers...</div>
    );
  }
  return (
    <div className="mobile-ledger-calc dark bg-zinc-900 text-white min-h-screen flex flex-col">
      {/* Desktop/Tablet header: only show above md, NOT sticky */}
      <div className="hidden md:flex w-full justify-center bg-zinc-900 shadow">
        <div className="flex flex-row items-center justify-between md:w-4/5 px-8 py-3">
          <div>
            <h1 className="text-5xl font-extrabold mb-2 tracking-tight flex flex-col sm:flex-row sm:items-center">
              Ledgers & Rolls
              <span className="ml-0 sm:ml-4 mt-2 sm:mt-0 text-2xl font-semibold text-accent block">
                ({eraDisplay})
              </span>
            </h1>
            <h2 className="mb-2 text-lg text-muted-foreground font-serif">
              Your campaign ledger and rolls tracker.
            </h2>
          </div>
          <div className="flex gap-3 items-center">
            <button
              className="rounded-lg px-4 py-2 bg-blue-700 font-semibold"
              onClick={() => setReceiptOpen(true)}
            >📋 Receipt</button>
            <button
              onClick={resetAll}
              className="rounded-lg px-3 py-2 bg-red-700 text-white font-bold text-xs ml-2"
              title="Reset all data (clear session)"
            >Reset</button>
          </div>
        </div>
      </div>
      {/* Mobile fallback header: simple, stacked, NOT sticky */}
      <div className="flex flex-col px-4 py-3 bg-zinc-900 shadow md:hidden">
        <span className="font-bold text-lg mb-0">Ledgers & Rolls</span>
        <span className="mb-0 text-2xl font-semibold text-accent">({eraDisplay})</span>
        <span className="mb-2 text-lg text-muted-foreground font-serif">Your campaign ledger and rolls tracker.</span>
        <div className="flex gap-3 items-center self-end">
          <button
            className="rounded-lg px-4 py-2 bg-blue-700 font-semibold"
            onClick={() => setReceiptOpen(true)}
          >📋 Receipt</button>
          <button
            onClick={resetAll}
            className="rounded-lg px-3 py-2 bg-red-700 text-white font-bold text-xs ml-2"
            title="Reset all data (clear session)"
          >Reset</button>
        </div>
      </div>
      {/* Show cleared items notice when present */}
      {clearedNotice && (
        <div className="bg-yellow-600 text-white px-4 py-2 text-center rounded shadow-lg mb-2 font-bold">
          {clearedNotice}
        </div>
      )}
      <div className="w-full md:w-4/5 mx-auto">
        <MobileGlobalControls state={globalControls} onChange={setGlobalControls} selectableSides={selectableSides} />
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto px-2 py-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-40 text-zinc-400">Loading ledgers...</div>
          ) : sections.map((section, i) => (
            <SectionAccordion
              key={section.id}
              section={section as any}
              onUpdate={next => updateSection(i, next)}
              side={globalControls.side}
            />
          ))}
        </div>
        <TotalsBar totalCost={totalCost} totalUpkeep={totalUpkeep} onReceipt={() => setReceiptOpen(true)} />
      </div>
      {receiptOpen && (
        <ReceiptModal
          sections={sections}
          global={globalControls}
          onClose={() => setReceiptOpen(false)}
        />
      )}
    </div>
  );
}

export default MobileLedgerCalculator;
