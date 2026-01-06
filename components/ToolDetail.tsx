import React from "react";
import eras from "@/data/eras.json";

export default function ToolDetail({ tool, era, onBack }: {
  tool: any;
  era: string;
  onBack: () => void;
}) {
  const eraObj = eras.find((e:any) => e.id === era);
  return (
    <div className="p-8 w-full max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-4 underline text-accent-foreground hover:text-accent">
        ← Back to War Room
      </button>
      <div className="flex items-center gap-4 mb-4">
        {tool.icon ? tool.icon : <></>} 
        <h2 className="text-3xl font-bold ">{tool.title}</h2>
      </div>
      <div className="mb-2 italic text-muted-foreground">
        Era: {eraObj ? eraObj.title : era}
      </div>
      <div className="mb-8">{tool.desc}</div>
      {/* Optionally show more, like static HTML or embed the tool's content here */}
    </div>
  );
}
