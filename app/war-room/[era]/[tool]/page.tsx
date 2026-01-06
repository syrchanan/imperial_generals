import eras from "@/data/eras.json";
import warRoomContent from "@/data/war_room_content.json";
import rulesets from "@/data/quick-rules.json";
import {
  FaClipboard, FaChevronRight, FaCrown, FaUserShield,
  FaMoneyCheckAlt, FaFlag, FaUserSecret, FaTrophy,
  FaArrowRight
} from "react-icons/fa";

const iconMap: Record<string, any> = {
  FaClipboard,
  FaChevronRight,
  FaCrown,
  FaUserShield,
  FaMoneyCheckAlt,
  FaFlag,
  FaUserSecret,
  FaTrophy
};

function renderItems(items: any[], depth = 0): JSX.Element {
  if (!items) return <></>;
  return (
    <ul className={`${depth === 0 ? "pl-6 list-disc" : "pl-2 list-none"} space-y-3 text-base mb-3`}>
      {items.map((item, idx) => (
        <li key={idx} className={depth === 0 ? "" : "flex flex-col items-start"}>
          <div className="flex items-start">
            {depth > 0 && <FaArrowRight className="mr-2 mt-[2px] text-muted-foreground" size={16} />}
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
          {item.items && <div className="mt-2 w-full">{renderItems(item.items, depth + 1)}</div>}
        </li>
      ))}
    </ul>
  );
}

export async function generateStaticParams() {
  // Static generation for all era/tool combos that exist
  return eras.flatMap((e: any) =>
    warRoomContent
      .filter((tool: any) => !tool.eras || tool.eras.includes(e.id))
      .map((tool: any) => ({
        era: e.id,
        tool: tool.slug,
      }))
  );
}

export default function WarRoomToolPage({ params }: { params: { era: string; tool: string } }) {
  const eraObj = eras.find(e => e.id === params.era);

  // Find the tool for this era
  const tool = warRoomContent.find(
    (item: any) =>
      item.slug === params.tool && (!item.eras || item.eras.includes(params.era))
  );

  if (!tool) {
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

  // Special rendering for Field Handbook
  if (tool.slug === "field-handbook") {
    const rules =
      rulesets.find((set: any) => Array.isArray(set.eras) && set.eras.includes(params.era)) ||
      rulesets.find((set: any) => !set.eras);
    const mutedColor = "text-muted-foreground";
    return (
      <main className="p-12">
        <div className="flex flex-col w-4/5 mx-auto">
          <h1 className="text-5xl font-extrabold mb-2 tracking-tight">
            Field Handbook {eraObj && <span className="ml-4 text-2xl font-semibold text-accent">({eraObj.title})</span>}
          </h1>
          <h2 className="mb-8 text-lg text-muted-foreground font-serif">
            Your campaign cheat sheet: the essential rules and roles for fast reference in play. For full detail, see the <a href="/war-room/officers-manual" className="underline">Officer’s Manual</a>.
          </h2>
          {(rules?.sections as any[] ?? []).map(({ icon, title, items, html }) => {
            const Icon = iconMap[icon] ?? FaClipboard;
            return (
              <section className="mb-10" key={title}>
                <h3 className="text-2xl font-semibold mb-3 flex items-center">
                  <Icon className={`mr-2 ${mutedColor}`} />{title}
                </h3>
                {html ? (
                  <div className="pl-6 text-base mb-3" dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                  renderItems(items)
                )}
              </section>
            );
          })}

          <div className="text-center text-muted-foreground text-sm font-serif mb-8">
            <strong dangerouslySetInnerHTML={{ __html: rules?.footer ?? "" }} />
          </div>
        </div>
      </main>
    );
  }

  // For all other tools: generic detail page
  return (
    <main className="p-12">
      <div className="flex flex-col w-4/5 mx-auto">
        <h1 className="text-4xl font-bold mb-8">{tool.title} {eraObj && `(${eraObj.title})`}</h1>
        <div className="mb-4">{tool.desc}</div>
        {tool.link && (
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-accent-foreground"
          >
            Go to {tool.title}
          </a>
        )}
      </div>
    </main>
  );
}
