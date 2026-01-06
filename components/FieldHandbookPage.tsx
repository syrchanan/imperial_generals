import { FaClipboard, FaChevronRight, FaCrown, FaUserShield, FaMoneyCheckAlt, FaFlag, FaUserSecret, FaTrophy, FaArrowRight } from "react-icons/fa";

const iconMap: Record<string, any> = {
  FaClipboard,
  FaChevronRight,
  FaCrown,
  FaUserShield,
  FaMoneyCheckAlt,
  FaFlag,
  FaUserSecret,
  FaTrophy,
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

export default function FieldHandbookPage({ eraObj, rules }: { eraObj: any, rules: any }) {
  const mutedColor = "text-muted-foreground";
  return (
    <main className="p-12">
      <div className="flex flex-col w-4/5 mx-auto">
        <h1 className="text-5xl font-extrabold mb-2 tracking-tight flex flex-col sm:flex-row sm:items-center">
          Field Handbook
          {eraObj && (
            <span className="ml-0 sm:ml-4 mt-2 sm:mt-0 text-2xl font-semibold text-accent block">
              ({eraObj.title})
            </span>
          )}
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
