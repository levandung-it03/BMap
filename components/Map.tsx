'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Place, Route } from '@/lib/types';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
);

interface MapProps {
  userLocation: { lat: number; lng: number } | null;
  places: Place[];
  selectedPlace: Place | null;
  route: Route | null;
  isDark: boolean;
  onPlaceClick: (place: Place) => void;
}

export function Map({
  userLocation,
  places,
  selectedPlace,
  route,
  isDark,
  onPlaceClick,
}: MapProps) {
  const mapRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Avoid importing Leaflet during SSR/prerender; only run in browser.
    if (!mapReady) return;
    let cancelled = false;

    (async () => {
      const leaflet = await import('leaflet');
      if (cancelled) return;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [mapReady]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    const map = mapRef.current;
    const container: HTMLElement | undefined = map.getContainer?.();
    const parent = container?.parentElement ?? container;

    const invalidateSoon = () => {
      requestAnimationFrame(() => {
        map.invalidateSize?.();
      });
    };

    invalidateSoon();

    const ro =
      parent && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => invalidateSoon())
        : null;
    ro?.observe(parent);

    window.addEventListener('resize', invalidateSoon);
    return () => {
      window.removeEventListener('resize', invalidateSoon);
      ro?.disconnect();
    };
  }, [mapReady, isDark, places.length, selectedPlace?.id, route?.coordinates?.length]);

  const mapCenter = useMemo(() => {
    if (selectedPlace) {
      return [selectedPlace.lat, selectedPlace.lng] as [number, number];
    }
    return userLocation ? [userLocation.lat, userLocation.lng] : [40, 0];
  }, [userLocation, selectedPlace]);

  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const tileAttribution = isDark
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  if (!userLocation) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-muted">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      className="w-full h-full"
      whenReady={(e: any) => {
        mapRef.current = e.target;
        setMapReady(true);
      }}
    >
      <TileLayer url={tileUrl} attribution={tileAttribution} />

      {/* User Location */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {/* Place Markers */}
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          eventHandlers={{ click: () => onPlaceClick(place) }}
        >
          <Popup>
            <div className="p-2">
              <p className="font-semibold text-sm">{place.name}</p>
              <p className="text-xs text-muted-foreground">{place.category}</p>
              {place.distance && (
                <p className="text-xs">
                  {(place.distance * 1000).toFixed(0)} m away
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Route Polyline */}
      {route && route.coordinates.length > 1 && (
        <Polyline
          positions={route.coordinates.map((coord) => [coord[0], coord[1]])}
          color="#3b82f6"
          weight={4}
          opacity={0.7}
        />
      )}
    </MapContainer>
  );
}
