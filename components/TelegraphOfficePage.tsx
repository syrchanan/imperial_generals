"use client";

import React, { useState } from "react";
import phillipsCode from "@/data/phillipsCode.json";

const codeToWord: Record<string, string> = phillipsCode;

// Build reverse lookup: lowercase word -> code
const wordToCode: Record<string, string> = {};
for (const [code, word] of Object.entries(codeToWord)) {
  const key = word.toLowerCase();
  // Keep the shortest code for each word
  if (!wordToCode[key] || code.length < wordToCode[key].length) {
    wordToCode[key] = code;
  }
}

function encode(text: string): string {
  // Strip punctuation for lookup but preserve structure
  const words = text.split(/\s+/).filter(Boolean);
  return words
    .map((w) => {
      const stripped = w.replace(/[^a-zA-Z0-9'-]/g, "");
      const lookup = stripped.toLowerCase();
      const code = wordToCode[lookup];
      return code ?? w;
    })
    .join(" ");
}

function decode(text: string): string {
  const words = text.split(/\s+/).filter(Boolean);
  return words
    .map((w) => {
      const lookup = w.toLowerCase();
      const word = codeToWord[lookup];
      return word ?? w;
    })
    .join(" ");
}

export default function TelegraphOfficePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <main className="p-4 sm:p-8">
      <div className="flex flex-col w-full max-w-xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight mb-1">
          Telegraph Office
        </h1>
        <h2 className="text-lg mt-0 mb-6 font-serif text-accent-foreground italic">
          Encode and decode messages using the Phillips Code.
        </h2>

        <section className="mb-6">
          <label
            htmlFor="telegraph-input"
            className="block text-sm font-semibold mb-1"
          >
            Input
          </label>
          <textarea
            id="telegraph-input"
            className="w-full rounded-lg border border-accent/40 bg-secondary p-3 text-base font-mono resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Type or paste your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </section>

        <div className="flex gap-3 mb-6">
          <button
            type="button"
            className="flex-1 rounded-lg bg-primary text-primary-foreground font-semibold py-2 px-4 hover:opacity-90 transition-opacity"
            onClick={() => setOutput(encode(input))}
          >
            Encode &darr;
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg bg-accent text-accent-foreground font-semibold py-2 px-4 hover:opacity-90 transition-opacity"
            onClick={() => setOutput(decode(input))}
          >
            Decode &darr;
          </button>
        </div>

        <section className="mb-8">
          <label
            htmlFor="telegraph-output"
            className="block text-sm font-semibold mb-1"
          >
            Output
          </label>
          <textarea
            id="telegraph-output"
            className="w-full rounded-lg border border-accent/40 bg-secondary p-3 text-base font-mono resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Result will appear here..."
            value={output}
            readOnly
          />
        </section>

        <div className="text-sm text-muted-foreground font-serif text-center border-t border-accent/20 pt-4">
          Based on the Phillips Code (1879) — {Object.keys(codeToWord).length}{" "}
          shorthand entries
        </div>
      </div>
    </main>
  );
}
