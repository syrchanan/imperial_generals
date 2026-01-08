import React from "react";
import { FaExternalLinkAlt, FaStore } from "react-icons/fa";

export default function ForageAheadPage() {
  return (
    <main className="p-4 sm:p-8">
      <div className="flex flex-col w-full max-w-xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Forage Ahead
          </h1>
        </div>
        <h2 className="text-lg mt-0 mb-6 font-serif text-accent-foreground italic">
          A fast-paced miniatures game of Civil War foraging, survival, and unexpected encounters!
        </h2>
        <section className="mb-8 bg-accent/10 border border-accent/40 rounded-lg p-4 shadow-sm">
          <p className="mb-3">
            The year is 1861, and the first shots of the Civil War have thundered across Fort Sumter. The nation is divided, and chaos reigns. Supplies are scarce, and armies are fragile, and now every decision could mean survival—or destruction.
          </p>
          <p className="mb-3">
            Now, it&apos;s your turn to <span className="font-semibold">FORAGE AHEAD</span> through history. In FORAGE AHEAD, players lead squads of Civil War soldiers on quick, daring foraging missions across a countryside torn apart by war.
          </p>
          <p className="mb-3">
            Each miniature represents a unique soldier with specialized training, unique backgrounds, and skills. Navigate treacherous terrain, scavenge for food, arms, and vital supplies—all while evading hostile foraging parties!
          </p>
        </section>
        <div className="flex flex-col gap-2 mt-2 mb-12 text-base">
          <a
            className="inline-flex items-center gap-2 underline text-primary font-semibold"
            href="https://safarikiwi.weebly.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt className="text-primary" /> Official Website
          </a>
          <a
            className="inline-flex items-center gap-2 underline text-primary font-semibold"
            href="https://www.wargamevault.com/en/publisher/31199/safari-kiwi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaStore className="text-primary" /> Buy on Wargame Vault
          </a>
        </div>
        <div className="text-sm text-muted-foreground font-serif text-center border-t border-accent/20 pt-4">
          Made by a player in our community — support indie wargaming!
        </div>
      </div>
    </main>
  );
}
