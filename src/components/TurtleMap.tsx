import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Turtle, Beach } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Activity, Thermometer, ArrowRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom turtle icon
const createTurtleIcon = (status: string) => {
  const colors: Record<string, string> = {
    active: '#22c55e',
    nesting: '#f59e0b',
    migrating: '#3b82f6',
    resting: '#6b7280',
  };
  
  return L.divIcon({
    className: 'custom-turtle-marker',
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: ${colors[status] || colors.active};
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M19.3 16.9c.4-1.7.3-3.7-.3-5.5-.6-1.8-1.6-3.3-2.8-4.5l-.5-.5c-.2-.2-.5-.2-.7 0l-.5.5c-1.2 1.2-2.2 2.7-2.8 4.5-.6 1.8-.7 3.8-.3 5.5.1.3.2.5.4.7.9.9 2.4.9 3.4 0l.2-.2.2.2c.9.9 2.4.9 3.4 0 .1-.2.3-.4.3-.7zM12 6c0-.6-.4-1-1-1H9c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1zM5 12c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1z"/>
        </svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
};

// Custom beach icon
const beachIcon = L.divIcon({
  className: 'custom-beach-marker',
  html: `
    <div style="
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      border-radius: 8px;
      border: 2px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87 7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46M8.88 16.53L7.47 15.12L8.88 16.53Z"/>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -18],
});

interface TurtleMapProps {
  turtles: Turtle[];
  beaches?: Beach[];
  selectedTurtle?: string | null;
  showTrails?: boolean;
  center?: [number, number];
  zoom?: number;
  className?: string;
}

function MapController({ center, zoom, selectedTurtle, turtles }: { 
  center: [number, number]; 
  zoom: number;
  selectedTurtle?: string | null;
  turtles: Turtle[];
}) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedTurtle) {
      const turtle = turtles.find(t => t.id === selectedTurtle);
      if (turtle) {
        map.flyTo([turtle.location.lat, turtle.location.lng], 6, {
          duration: 1.5
        });
      }
    }
  }, [selectedTurtle, turtles, map]);
  
  return null;
}

export function TurtleMap({ 
  turtles, 
  beaches = [],
  selectedTurtle,
  showTrails = true,
  center = [20, -20],
  zoom = 2,
  className = 'h-[600px] w-full'
}: TurtleMapProps) {
  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full rounded-2xl"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapController 
          center={center} 
          zoom={zoom} 
          selectedTurtle={selectedTurtle}
          turtles={turtles}
        />

        {/* Migration trails */}
        {showTrails && turtles.map((turtle) => (
          <Polyline
            key={`trail-${turtle.id}`}
            positions={turtle.migrationTrail.map(p => [p.lat, p.lng] as L.LatLngExpression)}
            color={selectedTurtle === turtle.id ? '#0891b2' : '#94a3b8'}
            weight={selectedTurtle === turtle.id ? 3 : 2}
            opacity={selectedTurtle === turtle.id ? 1 : 0.5}
            dashArray={selectedTurtle === turtle.id ? undefined : '5, 10'}
          />
        ))}

        {/* Beach markers */}
        {beaches.map((beach) => (
          <Marker
            key={beach.id}
            position={[beach.location.lat, beach.location.lng]}
            icon={beachIcon}
          >
            <Popup>
              <div className="p-3 min-w-[200px]">
                <h3 className="font-semibold text-lg mb-1">{beach.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{beach.country}</p>
                <div className="flex gap-4 mb-3">
                  <div>
                    <p className="text-lg font-bold">{beach.nestCount}</p>
                    <p className="text-xs text-muted-foreground">Nests</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{beach.volunteers}</p>
                    <p className="text-xs text-muted-foreground">Volunteers</p>
                  </div>
                </div>
                <Link to={`/beaches/${beach.id}`}>
                  <Button size="sm" className="w-full">View Beach</Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Turtle markers */}
        {turtles.map((turtle) => (
          <Marker
            key={turtle.id}
            position={[turtle.location.lat, turtle.location.lng]}
            icon={createTurtleIcon(turtle.status)}
          >
            <Popup>
              <div className="p-3 min-w-[220px]">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={turtle.image} 
                    alt={turtle.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{turtle.name}</h3>
                    <p className="text-sm text-muted-foreground">{turtle.species}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <Thermometer className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-sm font-medium">{turtle.temperature}°C</p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <Activity className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-sm font-medium">{turtle.speed} km/h</p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <MapPin className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-sm font-medium">{turtle.depth}m</p>
                  </div>
                </div>

                <Link to={`/turtles/${turtle.id}`}>
                  <Button size="sm" className="w-full">
                    View Profile <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
