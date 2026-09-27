import { Building2, MapPin, Map } from "lucide-react";
import { LabLocation } from "@/types";

export function LabLocationCard({ location }: { location: LabLocation }) {
  const mapsQuery = encodeURIComponent([location.name, ...location.address].join(", "));

  return (
    <div className="flex flex-col gap-4 border-white/10 py-6 px-15">
      <div className="flex items-center gap-2 text-base  text-stone">
        <Building2 size={16} className="text-blaze-500" aria-hidden />
        {location.name}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-contact-gold">
          <MapPin size={13} aria-hidden />
          Location
        </span>
        <address className="text-base not-italic leading-relaxed text-stone">
          {location.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </div>

      <a
        href={`https://maps.google.com/?q=${mapsQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-contact-gold hover:text-gold-300"
      >
        Get Directions
        <Map size={14} aria-hidden />
      </a>
    </div>
  );
}
