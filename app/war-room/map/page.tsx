export default function Page() {
    return (
        <main className="p-12">
            <div className="flex flex-col w-4/5 mx-auto">
                <h1 className="text-5xl font-extrabold mb-2 tracking-tight">Campaign Maps</h1>
                <p className="mb-8 text-lg text-muted-foreground font-serif">
                    Explore the interactive campaign map for Imperial Generals below.<br />
                    Zoom and pan to see borders, armies, and important landmarks as the campaign evolves.<br />
                    <span className="text-muted-foreground">
                        For the best experience, open the map in a new tab or on your mobile device.
                    </span>
                </p>
                <div className="w-full max-w-5xl aspect-video mx-auto flex justify-center">
                    <iframe
                        src="https://www.google.com/maps/d/u/0/embed?mid=1t_ZaLrHasGcjf7nVakLD1VY3W3PV8cw&ehbc=2E312F&ll=48.80569%2C8.138&z=4"
                        className="w-full h-full rounded-lg shadow-lg border"
                        allowFullScreen
                        title="Imperial Generals Campaign Map"
                    />
                </div>
            </div>
        </main>
    );
}
