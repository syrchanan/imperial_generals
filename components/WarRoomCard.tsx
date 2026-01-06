import React, { ReactNode } from "react";
import Image from "next/image";
import { FaThumbtack } from "react-icons/fa";

export interface WarRoomCardProps {
  title: string;
  desc: string;
  icon: string | ReactNode; // Image URL or React element (SVG/icon)
  pinned?: boolean;
}

const WarRoomCard: React.FC<WarRoomCardProps> = ({
  title,
  desc,
  icon,
  pinned = false,
}) => (
  <div
    className="h-full w-full flex items-center justify-center"
    aria-label={title}
  >
    <div className="bg-secondary rounded-2xl p-6 flex flex-col items-center relative h-full w-full transition-all shadow-lg hover:shadow-2xl hover:ring-2 hover:ring-accent hover:-translate-y-1 cursor-pointer border border-accent/20 hover:bg-accent/30 text-center">
      {pinned && (
        <span
          className="absolute left-2 top-2 z-10 text-secondary-foreground"
          title="Pinned tool"
        >
          <FaThumbtack
            className="inline align-middle"
            role="img"
            aria-label="Pinned"
          />
        </span>
      )}
      <div className="text-5xl mb-2">
        {typeof icon === "string" ? (
          <Image
            src={icon}
            alt={title + " icon"}
            width={48}
            height={48}
            className="mx-auto max-h-12"
            style={{ objectFit: "contain" }}
          />
        ) : (
          icon
        )}
      </div>
      <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center">
        {title}
      </h3>
      <p className="text-center text-base text-muted-foreground">{desc}</p>
    </div>
  </div>
);

export default WarRoomCard;
