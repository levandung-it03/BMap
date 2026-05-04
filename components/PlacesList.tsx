'use client';

import { Place } from '@/lib/types';
import { MapPin, Star } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface PlacesListProps {
  places: Place[];
  selectedPlace: Place | null;
  loading: boolean;
  onPlaceSelect: (place: Place) => void;
}

export function PlacesList({
  places,
  selectedPlace,
  loading,
  onPlaceSelect,
}: PlacesListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading places...</p>
        </div>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <MapPin className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
          <p className="text-sm text-muted-foreground">No places found nearby</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 p-4">
        {places.map((place) => (
          <Button
            key={place.id}
            variant={selectedPlace?.id === place.id ? 'default' : 'ghost'}
            className="w-full justify-start text-left h-auto py-3 px-3"
            onClick={() => onPlaceSelect(place)}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{place.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs opacity-75">{place.category}</span>
                {place.distance && (
                  <span className="text-xs opacity-75">
                    {place.distance.toFixed(1)} km
                  </span>
                )}
              </div>
              {place.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-yellow-400" />
                  <span className="text-xs">{place.rating}</span>
                </div>
              )}
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
