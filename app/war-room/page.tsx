import { redirect } from "next/navigation";
import eras from "@/data/eras.json";

export default function WarRoomRootRedirect() {
  // Redirect /war-room to /war-room/:firstEra
  const firstEra = eras[0]?.id || "civil-war";
  redirect(`/war-room/${firstEra}`);
}
