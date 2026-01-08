"use client";

import dynamic from "next/dynamic";
import type { ReactElement } from "react";

// Dynamically import the main mobile calculator
const MobileLedgerCalculator = dynamic(() => import("./MobileLedgerCalculator"), { ssr: false });

interface EraObj {
  id: string;
  title?: string;
  [key: string]: unknown;
}

export default function LedgersRollsPage({ eraObj, ...props }: { eraObj?: EraObj }): ReactElement {
  // Use eraObj.id if provided, fallback to "civil-war"
  const era = eraObj?.id || "civil-war";
  return <MobileLedgerCalculator era={era} {...props} />;
}
