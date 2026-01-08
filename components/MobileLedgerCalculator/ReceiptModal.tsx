"use client";

import React from "react";
import type { MobileLedgerSection, GlobalControls, Modifier } from "./types";

interface Props {
  sections: MobileLedgerSection[];
  global: GlobalControls;
  onClose: () => void;
}

// Markdown receipt generator
function generateMarkdownReceipt(sections: MobileLedgerSection[], global: GlobalControls) {
  let lines: string[] = [];
  lines.push(`# Ledgers & Rolls Receipt`);
  lines.push("");

  for (const s of sections) {
    if (!s.items.length) continue;
    lines.push(`## ${s.title}`);

    // Discord-aligned table rendering
    const header = ["Class", "Name", "Amount", "Modifiers"];
    const rows = s.items.map(row => [
      row.class,
      row.name,
      String(row.amount),
      (
        Array.isArray(row.modifiers) && row.modifiers.length > 0
          ? (row.modifiers as Modifier[]).map(mod => {
            switch (mod.type) {
              case "starfort":
                return "Starfort (+100%)";
              case "historical":
                return "Historical Accuracy (-33%)";
              case "custom":
                return `${mod.label || "Custom"} (${mod.value ?? 0}%)`;
              default:
                return "Unknown modifier";
            }
          }).join(", ")
          : "-"
      )
    ]);
    const table = [header, ...rows];
    const colWidths = header.map((_, colIdx) =>
      Math.max(...table.map(row => (row[colIdx] ? row[colIdx].length : 0)))
    );
    const formatRow = (row: string[]) =>
      "| " +
      row.map((cell, i) => cell.padEnd(colWidths[i], " ")).join(" | ") +
      " |";
    lines.push(formatRow(header));
    lines.push("|" + colWidths.map(w => "-".repeat(w + 2)).join("|") + "|");
    for (const row of rows) {
      lines.push(formatRow(row));
    }
    lines.push(""); // blank line after table

    lines.push(
      `Section subtotal: $${Number(s.subtotal.cost ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Upkeep: $${Number(s.subtotal.upkeep ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`
    );
    lines.push(""); // blank line after subtotal
  }

  const grandCost = sections.reduce((acc, s) => acc + (s.subtotal.cost || 0), 0);
  const grandUpkeep = sections.reduce((acc, s) => acc + (s.subtotal.upkeep || 0), 0);
  lines.push(`Grand Total: $${Number(grandCost).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Upkeep: $${Number(grandUpkeep).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`);
  lines.push(
    `Inflation: ${global.inflationPercent}% | Armories: ${global.armories} | Side: ${global.side}`
  );
  lines.push(`Generated: ${new Date().toLocaleString()}`);

  // Return as a plain fenced code block
  return "```\n" + lines.join("\n") + "\n```";
}

export function ReceiptModal({ sections, global, onClose }: Props) {
  const md = generateMarkdownReceipt(sections, global);
  function handleCopy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(md)
        .then(() => alert("Receipt copied to clipboard!"))
        .catch(() => {
          // fallback for unsupported browsers / permissions
          try {
            // Create a temporary textarea and select/copy
            const textarea = document.createElement("textarea");
            textarea.value = md;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            alert("Receipt copied to clipboard!");
          } catch (err) {
            alert("Could not copy to clipboard. Please copy manually.");
          }
        });
    } else {
      alert("Copy feature not supported in this browser.");
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-70 z-40" />
      {/* Centered modal container */}
      <div className="relative w-full sm:max-w-lg mx-auto max-h-[90vh] bg-zinc-900 rounded-2xl p-5 shadow-2xl overflow-y-auto z-50">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-lg" id="receipt-modal-title">Receipt</span>
          <button className="text-2xl leading-4" aria-label="Close receipt modal" onClick={onClose}>×</button>
        </div>
        <span id="receipt-modal-desc" className="sr-only">Final breakdown of all items, totals, and controls in markdown format. Use the copy button to copy the result to your clipboard.</span>
        <pre className="text-xs whitespace-pre-wrap bg-zinc-950 p-3 rounded max-h-[60vh] overflow-y-auto mb-4">{md}</pre>
        <button
          onClick={handleCopy}
          className="rounded-lg px-5 py-3 bg-green-600 text-white font-bold shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 w-full text-lg flex items-center justify-center gap-2"
          aria-label="Copy receipt markdown to clipboard"
        >
          <span aria-hidden="true" className="text-xl">📋</span>
          <span className="sr-only">Copy receipt markdown</span>
          Copy Markdown
        </button>
      </div>
    </div>
  );
}
