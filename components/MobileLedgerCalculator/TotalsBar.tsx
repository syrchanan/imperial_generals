"use client";

import React from "react";

interface Props {
  totalCost?: number;
  totalUpkeep?: number;
  onReceipt: () => void;
}

export function TotalsBar({ totalCost = 0, totalUpkeep = 0, onReceipt }: Props) {
  return (
    <div className="sticky bottom-0 w-full z-20 bg-zinc-950 py-3 px-4 flex items-center justify-between shadow-2xl border-t border-zinc-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
        <span
          className="text-cyan-300 text-xl font-bold"
          aria-label={`Grand Total: $${Number(totalCost).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} | Upkeep: $${Number(totalUpkeep).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
        >
          Grand Total:&nbsp;
          <span className="text-yellow-200">${Number(totalCost).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
          <span className="mx-2 text-base font-normal text-cyan-100">| Upkeep:</span>
          <span className="text-rose-200">${Number(totalUpkeep).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
        </span>
      </div>
      <button
        onClick={onReceipt}
        className="ml-4 rounded-lg px-5 py-3 bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2"
        aria-label="Show receipt and copy results"
      >
        <span aria-hidden="true" className="text-xl mr-2">📋</span>
        <span className="sr-only">Show receipt and copy</span>
        Receipt
      </button>
    </div>
  );
}
