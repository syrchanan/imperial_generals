import Link from "next/link";
import { FaChalkboardTeacher, FaCalculator, FaBook, FaMapMarkedAlt, FaThumbtack, FaClipboard } from "react-icons/fa";

const tools = [
  {
    title: "Field Briefing",
    desc: "Watch the field briefing for mission-ready instructions and an intro to play.",
    icon: <FaChalkboardTeacher />,
    link: "/war-room/field-briefing",
    pinned: true,
    badge: "Video",
  },
  {
    title: "Field Handbook",
    desc: "Quick reference guide for in-game rules and mechanics.",
    icon: <FaClipboard />,
    link: "/war-room/field-handbook",
    pinned: true,
    badge: "",
  },
  {
    title: "Ledger",
    desc: "Calculate costs for regiments, forts, and more.",
    icon: <FaCalculator />,
    link: "/war-room/calculator",
    pinned: false,
    badge: "",
  },
  {
    title: "Officer's Manual",
    desc: "Official rules and guidelines.",
    icon: <FaBook />,
    link: "/war-room/officers-manual",
    pinned: false,
    badge: "",
  },
  {
    title: "Campaign Map",
    desc: "Browse current maps and territory.",
    icon: <FaMapMarkedAlt />,
    link: "/war-room/map",
    pinned: false,
    badge: "",
  },
];

export default function WarRoom() {
  const pinned = tools.filter(t => t.pinned);
  const others = tools.filter(t => !t.pinned);
  return (
    <main className="p-12">
      <div className="flex flex-col w-4/5 mx-auto">
        <h1 className="text-5xl font-extrabold mb-2 tracking-tight">War Room</h1>
        <p className="mb-8 text-lg text-muted-foreground font-serif">
          No campaign is won without a plan. Gather intelligence, muster your resources, and command your strategy—your War Room awaits below.
        </p>

        {/* Pinned Section Grid: Uniform Row Height and Centered */}
        {pinned.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center mb-8">
            {pinned.map(({ title, desc, icon, link, badge }) => (
              <Link href={link} key={title} className="h-full w-full">
                <div className="bg-secondary rounded-2xl p-6 flex flex-col items-center relative h-full w-full transition-all shadow-lg hover:shadow-2xl hover:ring-2 hover:ring-accent hover:-translate-y-1 cursor-pointer border border-accent/20 hover:bg-accent/30">
                  <span className="absolute left-2 top-2 z-10 text-secondary-foreground" title="Pinned tool">
                    <FaThumbtack className="w-5 h-5 rotate-[-20deg] drop-shadow" />
                  </span>
                  <div className="text-5xl mb-2">{icon}</div>
                  <h3 className="text-2xl font-semibold mb-1 flex items-center justify-center">
                    {title}
                    {badge && (
                      <span className="ml-2 text-xs px-2 py-1 rounded bg-accent text-accent-foreground align-middle">{badge}</span>
                    )}
                  </h3>
                  <p className="text-center text-base text-muted-foreground">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Tools Grid: Uniform Row Height and Centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {others.map(({ title, desc, icon, link, badge }) => (
            <Link href={link} key={title} className="h-full w-full">
              <div className="bg-secondary rounded-2xl p-6 flex flex-col items-center h-full w-full transition-all shadow-lg hover:shadow-2xl hover:ring-2 hover:ring-accent hover:-translate-y-1 cursor-pointer border border-accent/20 hover:bg-accent/30">
                <div className="text-5xl mb-2">{icon}</div>
                <h3 className="text-2xl font-semibold mb-1 flex items-center justify-center">
                  {title}
                  {badge && (
                    <span className="ml-2 text-xs px-2 py-1 rounded bg-accent text-accent-foreground align-middle">{badge}</span>
                  )}
                </h3>
                <p className="text-center text-base text-muted-foreground">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
