'use client';

import { Place, Route } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  MapPin,
  Clock,
  Navigation,
  ArrowRight,
  Phone,
  Globe,
} from 'lucide-react';

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedPlace: Place | null;
  route: Route | null;
  showDirections: boolean;
  onNavigate: () => void;
  onBack: () => void;
  onClose: () => void;
}

export function RightSidebar({
  isOpen,
  onToggle,
  selectedPlace,
  route,
  showDirections,
  onNavigate,
  onBack,
  onClose,
}: RightSidebarProps) {
  // If showing directions and route exists
  if (showDirections && route && selectedPlace) {
    const totalMinutes = Math.round(route.totalDuration / 60);
    const totalKm = (route.totalDistance / 1000).toFixed(1);

    return (
      <>
        {/* Toggle button when closed */}
        {!isOpen && (
          <button
            onClick={onToggle}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-card border border-border rounded-l-lg p-2 shadow-md hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full bg-card border-l border-border z-20 transition-transform duration-300 flex flex-col ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ width: '18%', minWidth: '280px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-accent rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Directions
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              To {selectedPlace.name}
            </p>
          </div>

          {/* Summary */}
          <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{totalKm} km</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{totalMinutes} min</span>
            </div>
          </div>

          {/* Steps */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {route.steps.map((step, index) => (
                <Card key={index} className="p-3 bg-muted/50">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
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
      </>
    );
  }

  // If showing place details
  if (selectedPlace) {
    return (
      <>
        {/* Toggle button when closed */}
        {!isOpen && (
          <button
            onClick={onToggle}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-card border border-border rounded-l-lg p-2 shadow-md hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full bg-card border-l border-border z-20 transition-transform duration-300 flex flex-col ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ width: '18%', minWidth: '280px' }}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-semibold">Place Details</h2>
            <div className="flex items-center gap-1">
              <button
                onClick={onClose}
                className="p-1 hover:bg-accent rounded transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={onToggle}
                className="p-1 hover:bg-accent rounded transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Place Name */}
              <div>
                <h3 className="text-lg font-bold break-words">{selectedPlace.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedPlace.category}
                </p>
              </div>

              {/* Rating */}
              {selectedPlace.rating && (
                <Card className="p-3 bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {selectedPlace.rating} Rating
                    </span>
                  </div>
                </Card>
              )}

              {/* Distance */}
              {selectedPlace.distance && (
                <Card className="p-3 bg-muted/50">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      <span className="font-medium">
                        {selectedPlace.distance.toFixed(1)} km
                      </span>
                      <span className="text-muted-foreground"> away</span>
                    </span>
                  </div>
                </Card>
              )}

              {/* Address */}
              {selectedPlace.address && (
                <Card className="p-3 bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Address</p>
                  <p className="text-sm break-words">{selectedPlace.address}</p>
                </Card>
              )}

              {/* Description */}
              {selectedPlace.description && (
                <Card className="p-3 bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">About</p>
                  <p className="text-sm text-pretty">{selectedPlace.description}</p>
                </Card>
              )}

              {/* Hours placeholder */}
              <Card className="p-3 bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Hours</p>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Hours information from Google Maps
                </p>
              </Card>
            </div>
          </ScrollArea>

          {/* Footer - Get Directions */}
          <div className="p-4 border-t border-border bg-muted/30">
            <Button onClick={onNavigate} className="w-full">
              <ArrowRight className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Empty state when no place is selected
  return (
    <>
      {/* Toggle button when closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-card border border-border rounded-l-lg p-2 shadow-md hover:bg-accent transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`absolute right-0 top-0 h-full bg-card border-l border-border z-20 transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '18%', minWidth: '280px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold">Place Details</h2>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">
              Click on a place on the map to view details
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
