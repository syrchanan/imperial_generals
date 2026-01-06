function renderItems(items: any[], depth = 0): JSX.Element {
  if (!items) return <></>;
  return (
    <ul className={`${depth === 0 ? "pl-6 list-disc" : "pl-2 list-none"} space-y-3 text-base mb-3`}>
      {items.map((item, idx) => (
        <li key={idx} className={depth === 0 ? "" : "flex flex-col items-start"}>
          <div className="flex items-start">
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
          {item.items && <div className="mt-2 w-full">{renderItems(item.items, depth + 1)}</div>}
        </li>
      ))}
    </ul>
  );
}

function isYouTubeEmbedUrl(url: string) {
  return typeof url === 'string' && url.includes('youtube.com/embed');
}

export default function FieldBriefingPage({ eraObj, briefing }: { eraObj: any, briefing: any }) {
  return (
    <main className="p-12">
      <div className="flex flex-col w-4/5 mx-auto">
        <h1 className="text-5xl font-extrabold mb-2 tracking-tight flex flex-col sm:flex-row sm:items-center">
          Field Briefing
          {eraObj && (
            <span className="ml-0 sm:ml-4 mt-2 sm:mt-0 text-2xl font-semibold text-accent block">
              ({eraObj.title})
            </span>
          )}
        </h1>
        <h2 className="mb-8 text-lg text-muted-foreground font-serif flex items-center">
          Watch the briefing for mission-ready instructions and a strategic overview for this campaign/era.
        </h2>
        {briefing?.sections && (briefing.sections as any[]).map(({ title, items, html }: any) => (
          <section className="mb-10" key={title}>
            <h3 className="text-2xl font-semibold mb-3 flex items-center">
              {title}
            </h3>
            {html ? (
              <div className="pl-6 text-base mb-3" dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              renderItems(items)
            )}
          </section>
        ))}
        {briefing?.video && (
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-3xl aspect-[16/9]">
              {isYouTubeEmbedUrl(briefing.video) ? (
                <iframe
                  src={briefing.video}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full rounded shadow-lg"
                  style={{ border: 0 }}
                />
              ) : (
                <video controls src={briefing.video} className="w-full h-full rounded shadow-lg" />
              )}
            </div>
          </div>
        )}
        <div className="text-center text-muted-foreground text-sm font-serif mb-8">
          <strong dangerouslySetInnerHTML={{ __html: briefing?.footer ?? "" }} />
        </div>
      </div>
    </main>
  );
}
