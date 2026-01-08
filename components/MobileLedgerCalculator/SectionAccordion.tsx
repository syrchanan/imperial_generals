"use client";

import React, { useState } from "react";
import type { MobileLedgerSection, MobileLedgerItem } from "./types";
import { ItemCard } from "./ItemCard";
import { ItemModal } from "./ItemModal";

interface Props {
  section: MobileLedgerSection;
  onUpdate: (next: MobileLedgerSection) => void;
  side: string;
}

export function SectionAccordion({ section, onUpdate, side }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState<null | { mode: 'add' | 'edit', item?: MobileLedgerItem }>(null);

  // Helpers
  function handleAdd(item: MobileLedgerItem) {
    // Add new item to section, always carry over _rawRecords
    onUpdate({
      ...section,
      items: [...section.items, { ...item, id: crypto.randomUUID() }],
      _rawRecords: (section as any)._rawRecords ?? [],
    });
    setModal(null);
  }

  function handleEdit(item: MobileLedgerItem) {
    // Replace by id, always carry over _rawRecords
    onUpdate({
      ...section,
      items: section.items.map(i => i.id === item.id ? item : i),
      _rawRecords: (section as any)._rawRecords ?? [],
    });
    setModal(null);
  }

  function handleDelete(id: string) {
    // Always carry over _rawRecords
    onUpdate({
      ...section,
      items: section.items.filter(i => i.id !== id),
      _rawRecords: (section as any)._rawRecords ?? [],
    });
  }

  return (
    <div className="rounded-xl bg-zinc-800 border border-zinc-700 shadow overflow-hidden">
      <button
        className="flex justify-between items-center w-full px-4 py-3 text-left font-semibold"
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        aria-controls={`section-panel-${section.id}`}
        aria-label={`${expanded ? 'Collapse' : 'Expand'} section ${section.title}`}
      >
        <span className="truncate max-w-[80%]">{section.title}</span>
        <span className="ml-2">{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && (
        <div
          id={`section-panel-${section.id}`}
          className="px-3 pb-3 flex flex-col gap-2"
          role="region"
          aria-label={`Items for section ${section.title}`}
        >
          <div className="mb-2 mt-1 text-base font-bold flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="text-cyan-200">
              Section Subtotal: <span className="text-yellow-200">${Number(section.subtotal.cost ?? 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
            </span>
            <span className="text-cyan-200">
              Upkeep: <span className="text-rose-200">${Number(section.subtotal.upkeep ?? 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
            </span>
          </div>
          <button
            className="my-2 self-end rounded-lg px-4 py-2 text-sm bg-blue-700 text-white font-semibold shadow"
            onClick={() => setModal({mode: 'add'})}
            aria-label={`Add item to ${section.title}`}
          >
            + Add Item
          </button>
          {section.items.length === 0 ? (
            <div className="text-zinc-400 text-center py-8">No items added.</div>
          ) : (
            section.items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={() => setModal({mode: 'edit', item})}
                onDelete={() => handleDelete(item.id)}
              />
            ))
          )}
        </div>
      )}
      {/* Item Modal for add/edit */}
      {modal && (
        <ItemModal
          initial={modal.mode === 'edit' ? modal.item : {}}
          onSave={modal.mode === 'edit' ? handleEdit : handleAdd}
          onCancel={() => setModal(null)}
          mode={modal.mode}
          records={(section as any)._rawRecords || []}
          side={side}
        />
      )}
    </div>
  );
}
