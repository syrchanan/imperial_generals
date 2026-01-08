import type { MobileLedgerSection } from "./types";

// Helper: Title-case a string, replace underscores, etc.
function toTitleCase(str: string): string {
  return str.replace(/_/g, ' ')
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    .replace(/\b(\d+)\b/g, '$1'); // leave numbers as is
}

// Returns list of MobileLedgerSection definitions loaded from the manifest in a specific era folder
export async function loadSectionsForEra(era: string): Promise<MobileLedgerSection[]> {
  // The manifest is: public/data/ledgers/<era>/manifest.json
  const manifestUrl = `/data/ledgers/${era}/manifest.json`;
  let fileList: string[] = [];
  try {
    const raw = await fetch(manifestUrl);
    fileList = await raw.json();
  } catch (e) {
    console.error("Failed to load manifest", e);
    return [];
  }
  // For each file in manifest, fetch and parse content
  const sectionPromises = fileList.map(async (fname) => {
    const fileUrl = `/data/ledgers/${era}/${fname}`;
    try {
      const raw = await fetch(fileUrl);
      const ledgerJson = await raw.json();
      // Fallback logic: if there's a "sectionName"/"title" in JSON use it, else filename
      const sectionTitle = ledgerJson.sectionName || ledgerJson.title || toTitleCase(fname.replace(/\.json$/, ''));
      // Start with an items array empty; user will add their own
      return {
        id: fname.replace(/\.json$/, ''),
        title: sectionTitle,
        subtotal: { cost: 0, upkeep: 0 },
        items: [],
        _rawRecords: Array.isArray(ledgerJson) ? ledgerJson : (ledgerJson.records || []), // supports array or records field
      } as MobileLedgerSection & { _rawRecords: any[] };
    } catch (e) {
      console.error(`Failed to fetch section file: ${fileUrl}`, e);
      return null;
    }
  });
  const loaded = await Promise.all(sectionPromises);
  // Only sections that loaded successfully
  return loaded.filter(Boolean) as MobileLedgerSection[];
}
