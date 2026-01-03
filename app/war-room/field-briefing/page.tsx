export default function FieldBriefing() {
  return (
    <main className="p-8 min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">Field Briefing</h1>
      <p className="mb-6 text-lg">
        Watch this briefing to get mission-ready!<br />
        This video covers everything new Imperial Generals need to know to start playing.
      </p>
      <div className="w-full max-w-5xl aspect-video mx-auto">
        <iframe
          src="https://www.youtube.com/embed/dEJ5va6JuNs?si=rNYgqr_az1l8AJwK"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-lg">
        </iframe>
      </div>
    </main>
  );
}
