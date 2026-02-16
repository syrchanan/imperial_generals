import eras from "@/data/eras.json";
import warRoomMeta from "@/data/war_room_meta.json";
import toolData from "@/data/war_room_tool_data.json";
import toolFallbacks from "@/data/tool_fallbacks.json";
import FieldHandbookPage from "@/components/FieldHandbookPage";
import FieldBriefingPage from "@/components/FieldBriefingPage";
import CampaignMapPage from "@/components/CampaignMapPage";
import LedgersRollsPage from "@/components/LedgersRollsPage";
import ForageAheadPage from "@/components/ForageAheadPage";
import TelegraphOfficePage from "@/components/TelegraphOfficePage";
import { ReactElement } from "react";

interface Era {
  id: string;
  title: string;
  [key: string]: unknown;
}

interface ToolMeta {
  title: string;
  slug: string;
  desc: string;
  icon: string;
  section: string;
  eras?: string[];
}

interface PageParams {
  params: {
    era: string;
    tool: string;
  }
}

function matchesEra(entry: { eras?: string[] }, era: string): boolean {
  if (!entry.eras) return true;
  return entry.eras.includes(era) || entry.eras.includes("*");
}

export async function generateStaticParams(): Promise<{ era: string; tool: string }[]> {
  return (eras as Era[]).flatMap((e: Era) =>
    (warRoomMeta.content as ToolMeta[])
      .filter((tool: ToolMeta) => !tool.eras || tool.eras.includes(e.id) || tool.eras.includes("*"))
      .map((tool: ToolMeta) => ({
        era: e.id,
        tool: tool.slug,
      }))
  );
}

function getToolEraData(toolSlug: string, era: string): any {
  const dataset = (toolData as Record<string, any[]>)[toolSlug] || [];
  return (
    dataset.find((entry: any) => matchesEra(entry, era)) ||
    (toolFallbacks as Record<string, any>)[toolSlug]
  );
}

type ToolComponentFn = (eraObj: Era | undefined, era: string) => ReactElement;

const TOOL_COMPONENTS: Record<string, ToolComponentFn> = {
  "field-handbook": (eraObj, era) => (
    <FieldHandbookPage eraObj={eraObj} rules={getToolEraData("field-handbook", era)} />
  ),
  "field-briefing": (eraObj, era) => (
    <FieldBriefingPage eraObj={eraObj} briefing={getToolEraData("field-briefing", era)} />
  ),
  "campaign-map": (eraObj, era) => (
    <CampaignMapPage eraObj={eraObj} mapData={getToolEraData("campaign-map", era)} />
  ),
  "ledgers-rolls": (eraObj, era) => (
    <LedgersRollsPage eraObj={eraObj} />
  ),
  "telegraph-office": () => (
    <TelegraphOfficePage />
  ),
  "forage-ahead": (eraObj, era) => (
    <ForageAheadPage />
  ),
};

export default function WarRoomToolPage({ params }: PageParams): ReactElement {
  const eraObj = (eras as Era[]).find(e => e.id === params.era);
  const tool = (warRoomMeta.content as ToolMeta[]).find(
    (item: ToolMeta) => item.slug === params.tool && matchesEra(item, params.era)
  );

  if (!tool || !TOOL_COMPONENTS[params.tool]) {
    return (
      <main className="p-12">
        <div className="flex flex-col w-4/5 mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-2 tracking-tight">Not Found</h1>
          <p className="mb-8 text-lg text-muted-foreground font-serif">
            No such tool exists for this era.
          </p>
        </div>
      </main>
    );
  }

  return TOOL_COMPONENTS[params.tool](eraObj, params.era);
}
