// utils/ledgerLoader.ts
import { LedgerRecord, SectionData } from '../types/calculator';

// Loads all JSONs in the public/data/ledgers/{eraId}/ folder
export async function loadEraSections(eraId: string): Promise<SectionData[]> {
  // Discover files in /public/data/ledgers/{eraId}/
  // On the client, we cannot list files by folder. So we provide a manifest file.
  // Look for /public/data/ledgers/{eraId}/manifest.json

  const basePath = `/data/ledgers/${eraId}/`;
  let filenames: string[] = [];

  // 1. Try to fetch a manifest of files (generated at build time)
  try {
    const manifestRes = await fetch(`${basePath}manifest.json`);
    if (manifestRes.ok) {
      filenames = await manifestRes.json();
    }
  } catch (e) {
    console.warn(`Could not load manifest.json for era "${eraId}":`, e);
  }

  // 2. Fetch the data files dynamically
  const sections: SectionData[] = [];
  for (const filename of filenames) {
    if (!filename.endsWith('.json') || filename === 'manifest.json') continue;
    try {
      const res = await fetch(`${basePath}${filename}`);
      if (!res.ok) continue;
      const records: LedgerRecord[] = await res.json();
      sections.push({
        sectionName: filename.replace(/\.json$/, '').replace(/_/g, ' '),
        records,
        userSelections: {},
        sectionFilters: {},
      });
    } catch { /* Ignore loading error for this file */ }
  }
  return sections;
}
