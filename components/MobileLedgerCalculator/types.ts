export interface MobileLedgerItem {
  id: string;
  class: string;
  name: string;
  amount: number;
  modifiers: Modifier[];
}

export type Modifier =
  | { type: 'starfort' }
  | { type: 'historical' }
  | { type: 'custom', label?: string, value?: number };

export interface MobileLedgerSection {
  id: string;
  title: string;
  subtotal: { cost: number; upkeep: number };
  items: MobileLedgerItem[];
  _rawRecords?: any[];
}

export interface GlobalControls {
  side: string;
  inflationPercent: number;
  armories: number;
}
