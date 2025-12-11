import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Turtle, Beach } from '@/data/mockData';
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
const createBeachIcon = () => L.divIcon({
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

export function TurtleMap({ 
  turtles, 
  beaches = [],
  selectedTurtle,
  showTrails = true,
  center = [20, -20],
  zoom = 2,
  className = 'h-[600px] w-full'
}: TurtleMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polylinesRef = useRef<L.Polyline[]>([]);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle selected turtle fly-to
  useEffect(() => {
    if (!mapRef.current || !selectedTurtle) return;
    
    const turtle = turtles.find(t => t.id === selectedTurtle);
    if (turtle) {
      mapRef.current.flyTo([turtle.location.lat, turtle.location.lng], 6, {
        duration: 1.5
      });
    }
  }, [selectedTurtle, turtles]);

  // Update markers and polylines
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers and polylines
    markersRef.current.forEach(marker => marker.remove());
    polylinesRef.current.forEach(polyline => polyline.remove());
    markersRef.current = [];
    polylinesRef.current = [];

    // Add migration trails
    if (showTrails) {
      turtles.forEach((turtle) => {
        const polyline = L.polyline(
          turtle.migrationTrail.map(p => [p.lat, p.lng] as L.LatLngTuple),
          {
            color: selectedTurtle === turtle.id ? '#0891b2' : '#94a3b8',
            weight: selectedTurtle === turtle.id ? 3 : 2,
            opacity: selectedTurtle === turtle.id ? 1 : 0.5,
            dashArray: selectedTurtle === turtle.id ? undefined : '5, 10',
          }
        ).addTo(mapRef.current!);
        polylinesRef.current.push(polyline);
      });
    }

    // Add beach markers
    beaches.forEach((beach) => {
      const marker = L.marker([beach.location.lat, beach.location.lng], {
        icon: createBeachIcon(),
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div style="padding: 12px; min-width: 200px;">
          <h3 style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">${beach.name}</h3>
          <p style="font-size: 14px; color: #666; margin-bottom: 12px;">${beach.country}</p>
          <div style="display: flex; gap: 16px; margin-bottom: 12px;">
            <div>
              <p style="font-size: 18px; font-weight: 700;">${beach.nestCount}</p>
              <p style="font-size: 12px; color: #888;">Nests</p>
            </div>
            <div>
              <p style="font-size: 18px; font-weight: 700;">${beach.volunteers}</p>
              <p style="font-size: 12px; color: #888;">Volunteers</p>
            </div>
          </div>
          <a href="/beaches/${beach.id}" style="display: block; text-align: center; background: hsl(200, 80%, 25%); color: white; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 14px;">View Beach</a>
        </div>
      `);

      markersRef.current.push(marker);
    });

    // Add turtle markers
    turtles.forEach((turtle) => {
      const marker = L.marker([turtle.location.lat, turtle.location.lng], {
        icon: createTurtleIcon(turtle.status),
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div style="padding: 12px; min-width: 220px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <img 
              src="${turtle.image}" 
              alt="${turtle.name}"
              style="width: 48px; height: 48px; border-radius: 8px; object-fit: cover;"
            />
            <div>
              <h3 style="font-weight: 600; font-size: 16px;">${turtle.name}</h3>
              <p style="font-size: 14px; color: #666;">${turtle.species}</p>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px;">
            <div style="text-align: center; padding: 8px; background: #f5f5f5; border-radius: 8px;">
              <p style="font-size: 12px; color: #888;">Temp</p>
              <p style="font-size: 14px; font-weight: 500;">${turtle.temperature}°C</p>
            </div>
            <div style="text-align: center; padding: 8px; background: #f5f5f5; border-radius: 8px;">
              <p style="font-size: 12px; color: #888;">Speed</p>
              <p style="font-size: 14px; font-weight: 500;">${turtle.speed} km/h</p>
            </div>
            <div style="text-align: center; padding: 8px; background: #f5f5f5; border-radius: 8px;">
              <p style="font-size: 12px; color: #888;">Depth</p>
              <p style="font-size: 14px; font-weight: 500;">${turtle.depth}m</p>
            </div>
          </div>

          <a href="/turtles/${turtle.id}" style="display: block; text-align: center; background: hsl(200, 80%, 25%); color: white; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 14px;">View Profile →</a>
        </div>
      `);

      markersRef.current.push(marker);
    });
  }, [turtles, beaches, selectedTurtle, showTrails]);

  return (
    <div className={className}>
      <div ref={containerRef} className="h-full w-full rounded-2xl" />
    </div>
  );
}
