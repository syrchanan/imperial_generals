import EraPageGrid from "@/components/EraPageGrid";
import eras from "@/data/eras.json";

export async function generateStaticParams() {
  return eras.map((e: any) => ({ era: e.id }));
}

export default function WarRoomEraPage({ params }: { params: { era: string } }) {
  return <EraPageGrid currentEra={params.era} />;
}
