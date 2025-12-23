import { Navigation } from "lucide-react";

export default function LocationMap({ lat, long, name }) {

  if (!lat || !long || isNaN(lat) || isNaN(long)) {
    return (
      <div className="rounded-2xl overflow-hidden border border-border shadow-medium animate-fade-in">
        <div className="w-full h-80 md:h-96 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <Navigation className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Location coordinates not available</p>
          </div>
        </div>
        <div className="p-4 bg-card flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Navigation className="w-4 h-4" />
            <span className="text-sm">Coordinates unavailable</span>
          </div>
          <span className="text-sm text-muted-foreground">No directions available</span>
        </div>
      </div>
    );
  }

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
  
  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-medium animate-fade-in">
      <div className="relative w-full h-80 md:h-96">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          src={`https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`}
          title={`${name} Location`}
          className="w-full h-full"
        />
      </div>
      <div className="p-4 bg-card flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Navigation className="w-4 h-4" />
          <span className="text-sm">{lat.toFixed(6)}, {long.toFixed(6)}</span>
        </div>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors duration-300 shadow-brand"
        >
          <Navigation className="w-4 h-4" /> Get Directions
        </a>
      </div>
    </div>
  );
}
