"use client";
import { useRouter } from "next/navigation";
import EraPills from "@/components/EraPills";
import warRoomMeta from "@/data/war_room_meta.json";
import eras from "@/data/eras.json";
import WarRoomCard from "@/components/WarRoomCard";
import { FaChalkboardTeacher, FaCalculator, FaBook, FaMapMarkedAlt, FaClipboard, FaUsers } from "react-icons/fa";
import Link from "next/link";

const iconMap: Record<string, JSX.Element> = {
  FaChalkboardTeacher: <FaChalkboardTeacher />,
  FaCalculator: <FaCalculator />,
  FaBook: <FaBook />,
  FaMapMarkedAlt: <FaMapMarkedAlt />,
  FaClipboard: <FaClipboard />,
  FaUsers: <FaUsers />
};

function matchesEra(entry: { eras?: string[] }, era: string): boolean {
  if (!entry.eras) return true;
  return entry.eras.includes(era) || entry.eras.includes("*");
}

export default function EraPageGrid({ currentEra }: { currentEra: string }) {
  const router = useRouter();

  const handleEraChange = (eraId: string) => {
    router.push(`/war-room/${eraId}`);
  };

  // Read sections/content metadata from unified meta JSON
  const warRoomSections = warRoomMeta.sections;
  const warRoomContent = warRoomMeta.content;

  // Calculate if any cards are visible for this era
  const allVisibleSectionContent = warRoomSections.map(section =>
    warRoomContent.filter(
      (item: any) =>
        item.section === section.id &&
        matchesEra(item, currentEra)
    )
  );
  const totalVisibleCards = allVisibleSectionContent.reduce((acc, arr) => acc + arr.length, 0);

  return (
    <main className="p-4 sm:p-8 md:p-12">
      <div className="flex flex-col w-full max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight text-left">
          War Room
        </h1>
        <p className="mb-8 text-lg text-muted-foreground font-serif text-left">
          No campaign is won without a plan. Choose your era to view available tools and content.
        </p>
        <EraPills eras={eras} currentEra={currentEra} onChange={handleEraChange} />
        {totalVisibleCards > 0 ? (
          warRoomSections.map((section, idx) => {
            const sectionContent = allVisibleSectionContent[idx];
            if (sectionContent.length === 0) return null;
            return (
              <section key={section.id} className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-left">{section.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center min-h-[120px]">
                  {sectionContent.map((tool: any) => (
                    <Link
                      key={tool.title + (tool.eras ?? "")}
                      href={`/war-room/${currentEra}/${tool.slug}`}
                      className="w-full"
                    >
                      <WarRoomCard
                        {...tool}
                        icon={iconMap[tool.icon] ?? <FaClipboard />}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          <div className="w-full text-center text-muted-foreground text-lg py-16 italic opacity-70">
            No war room cards are available for this era.<br />
            Please select another era or check back later!
          </div>
        )}
      </div>
    </main>
  );
}
