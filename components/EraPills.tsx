import React from "react";

export default function EraPills({
  eras,
  currentEra,
  onChange,
}: {
  eras: { id: string; title: string }[];
  currentEra: string;
  onChange: (eraId: string, eraTitle: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap mb-6 justify-center">
      {eras.map((era) => (
        <button
          key={era.id}
          type="button"
          onClick={() => onChange(era.id, era.title)}
          className={`px-5 py-2 rounded-full font-semibold transition border outline-none focus:ring-2 focus:ring-accent
            ${
              currentEra === era.id
                ? "bg-accent-foreground text-accent border-accent-foreground shadow-md font-extrabold ring-2 ring-accent-foreground"
                : "bg-accent text-accent-foreground border-accent hover:bg-accent-foreground hover:text-accent"
            }
          `}
          aria-current={currentEra === era.id ? "true" : undefined}
        >
          {era.title}
        </button>
      ))}
    </div>
  );
}
