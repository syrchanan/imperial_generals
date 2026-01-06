export default function CampaignMapPage({ eraObj, mapData }: { eraObj: any, mapData: any }) {
  const src = mapData?.iframe;
  return (
    <main className="p-12">
      <div className="flex flex-col w-4/5 mx-auto">
        <h1 className="text-5xl font-extrabold mb-2 tracking-tight flex flex-col sm:flex-row sm:items-center">
          Campaign Map
          {eraObj && (
            <span className="ml-0 sm:ml-4 mt-2 sm:mt-0 text-2xl font-semibold text-accent block">
              ({eraObj.title})
            </span>
          )}
        </h1>
        <h2 className="mb-8 text-lg text-muted-foreground font-serif flex items-center">
          Preview and interact with current strategic theaters of war and movement.
        </h2>
        {src && (
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-3xl aspect-[4/3]">
              <iframe
                src={src}
                title="Campaign Map Preview"
                allowFullScreen
                className="w-full h-full rounded shadow-lg border border-secondary"
                style={{ border: 0 }}
              />
            </div>
          </div>
        )}
        <div className="text-center text-muted-foreground text-sm font-serif mb-8">
          <strong dangerouslySetInnerHTML={{ __html: mapData?.footer ?? "" }} />
        </div>
      </div>
    </main>
  );
}
