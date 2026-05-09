'use client';

import { useEffect } from 'react';
import { useUserLocation } from '@/lib/hooks/useUserLocation';
import { AlertCircle, MapPin, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationLoaderProps {
  onLocationReady: (location: { lat: number; lng: number }) => void;
}

export function LocationLoader({ onLocationReady }: LocationLoaderProps) {
  const { location, loading, error, refetch } = useUserLocation();

  useEffect(() => {
    if (!location) return;
    onLocationReady({ lat: location.lat, lng: location.lng });
  }, [location, onLocationReady]);

  if (loading && !location) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <MapPin className="w-8 h-8 mb-3 animate-bounce text-primary" />
        <p className="text-sm font-medium">Getting your location...</p>
        <p className="text-xs text-muted-foreground mt-1">
          Please allow location access when prompted
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
        <AlertCircle className="w-8 h-8 text-destructive" />
        <div>
          <p className="text-sm font-medium">Location Access Error</p>
          <p className="text-xs text-muted-foreground mt-1">{error.message}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refetch}
          className="mt-2"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Try Again
        </Button>
      </div>
    );
  }

  return null;
}
