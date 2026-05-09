'use client';

import { Route } from '@/lib/types';
import { Clock, MapPin, Navigation, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DirectionsViewProps {
  route: Route;
  placeName: string;
  onBack: () => void;
}

export function DirectionsView({
  route,
  placeName,
  onBack,
}: DirectionsViewProps) {
  const totalMinutes = Math.round(route.totalDuration / 60);
  const totalKm = (route.totalDistance / 1000).toFixed(1);

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
        <h2 className="text-lg font-bold break-words">
          <Navigation className="w-4 h-4 inline mr-2" />
          Directions to {placeName}
        </h2>
      </div>

      {/* Summary */}
      <div className="p-4 border-b border-border bg-muted/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">
              <span className="font-medium">{totalKm} km</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm">
              <span className="font-medium">{totalMinutes} min</span>
            </span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {route.steps.map((step, index) => (
            <Card key={index} className="p-3 bg-muted/50">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm break-words">{step.instruction}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    {step.distance > 0 && (
                      <span>{(step.distance / 1000).toFixed(1)} km</span>
                    )}
                    {step.duration > 0 && (
                      <span>{Math.round(step.duration / 60)} min</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
