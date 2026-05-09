'use client';

import { Place } from '@/lib/types';
import { ArrowRight, MapPin, Star, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PlaceDetailsProps {
  place: Place;
  onNavigate: () => void;
  onBack: () => void;
}

export function PlaceDetails({
  place,
  onNavigate,
  onBack,
}: PlaceDetailsProps) {
  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-3"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <h2 className="text-lg font-bold break-words">{place.name}</h2>
        <p className="text-sm text-muted-foreground mt-1">{place.category}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {place.rating && (
          <Card className="p-3 bg-muted/50">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{place.rating} Rating</span>
            </div>
          </Card>
        )}

        {place.distance && (
          <Card className="p-3 bg-muted/50">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">
                <span className="font-medium">{place.distance.toFixed(1)} km</span>
                <span className="text-muted-foreground"> away</span>
              </span>
            </div>
          </Card>
        )}

        {place.address && (
          <Card className="p-3 bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Address</p>
            <p className="text-sm break-words">{place.address}</p>
          </Card>
        )}

        {place.description && (
          <Card className="p-3 bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">About</p>
            <p className="text-sm text-pretty">{place.description}</p>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <Button
          onClick={onNavigate}
          className="w-full"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Get Directions
        </Button>
      </div>
    </div>
  );
}
