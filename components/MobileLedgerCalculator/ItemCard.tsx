"use client";

import React from "react";
import type { MobileLedgerItem, Modifier } from "./types";

interface Props {
  item: MobileLedgerItem;
  onEdit: () => void;
  onDelete: () => void;
}

export function ItemCard({ item, onEdit, onDelete }: Props) {
  return (
    <div
      className="bg-zinc-900 rounded-lg p-4 shadow border border-zinc-700 flex items-center gap-3"
      role="group"
      aria-label={`Details for ${item.class} / ${item.name}`}
    >
      <div className="flex-1 min-w-0">
        <div className="font-bold truncate mb-1">
          {item.class} <span className="mx-1">/</span> {item.name}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-block px-2 py-1 rounded-full bg-cyan-900 text-cyan-200 text-xs font-semibold">
            Qty: {item.amount}
          </span>
          {item.modifiers && item.modifiers.length > 0 && (
            <span className="inline-block px-2 py-1 rounded bg-green-800 text-green-100 text-xs font-medium">
              {item.modifiers.map((mod, i) => (
                <span key={i} className="mr-2">
                  {mod.type === "starfort" && "Starfort (+100%)"}
                  {mod.type === "historical" && "Historical Accuracy (-33%)"}
                  {mod.type === "custom" && `${mod.label || "Custom"} (${mod.value || 0}%)`}
                </span>
              ))}
            </span>
          )}
        </div>
      </div>
      <button
        className="rounded-lg px-2 py-1 bg-zinc-700 hover:bg-zinc-600 focus:outline-none"
        title="Edit"
        aria-label={`Edit ${item.class} / ${item.name}`}
        onClick={onEdit}
      >
        ✏️
      </button>
      <button
        className="rounded-lg px-2 py-1 bg-red-900 hover:bg-red-700 focus:outline-none"
        title="Delete"
        aria-label={`Remove ${item.class} / ${item.name}`}
        onClick={onDelete}
      >
        🗑️
      </button>
    </div>
  );
}
