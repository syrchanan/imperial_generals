export default function OfficersManualPage({ eraObj, manualData }: { eraObj: any, manualData: any }) {
  const src = manualData?.iframe;
  return (
    <main className="p-12">
      <div className="flex flex-col w-4/5 mx-auto">
        <h1 className="text-5xl font-extrabold mb-2 tracking-tight flex flex-col sm:flex-row sm:items-center">
          Officer&apos;s Manual
          {eraObj && (
            <span className="ml-0 sm:ml-4 mt-2 sm:mt-0 text-2xl font-semibold text-accent block">
              ({eraObj.title})
            </span>
          )}
        </h1>
        <h2 className="mb-8 text-lg text-muted-foreground font-serif">
          The complete rules and guidelines for this era of play.
        </h2>
        {src && (
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-4xl">
              <iframe
                src={src}
                title="Officer's Manual"
                className="w-full rounded shadow-lg border border-secondary"
                style={{ border: 0, height: "800px" }}
              />
            </div>
          </div>
        )}
        <div className="text-center text-muted-foreground text-sm font-serif mb-8">
          <strong dangerouslySetInnerHTML={{ __html: manualData?.footer ?? "" }} />
        </div>
      </div>
    </main>
  );
}
