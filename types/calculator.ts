export type Side = 'USA' | 'CSA' | 'Both';

export interface LedgerRecord {
  Class: string;
  Name: string;
  Year?: number | string;
  Cost?: number;
  Upkeep?: number;
  Availability?: Side | string;
  Notes?: string;
  [key: string]: any; // extra fields dynamically
}

export type ModifierType = 'none' | 'starfort' | 'historical' | 'custom';

export interface UserSelection {
  amount: number;
  modifierType: ModifierType;
  customModifierLabel?: string;
  customModifierValue?: number;  // percent, e.g., -10 for -10%
}

export interface SectionData {
  sectionName: string;
  records: LedgerRecord[];
  userSelections: {
    [recordIdx: string]: UserSelection;
  };
  sectionFilters: {
    class?: string[];
    year?: (number | string)[];
    name?: string;
    side?: Side;
  }
}

export interface GlobalState {
  globalFilters: {
    side: Side;
    class?: string[];
    year?: (number | string)[];
    name?: string;
  };
  inflationPercent: number;
  armoryCount: number;
  sections: SectionData[];
}
