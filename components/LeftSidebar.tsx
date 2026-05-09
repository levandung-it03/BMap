'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin,
  Navigation,
  Utensils,
  UtensilsCrossed,
  Theater,
  ShoppingBag,
  Landmark,
  Trees,
  Plane,
} from 'lucide-react';

interface LeftSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  radiusKm: number;
  onRadiusChange: (radius: number) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  onManualLocationSearch: (query: string) => void;
}

const CATEGORY_OPTIONS = [
  { id: 'all', label: 'All Categories', icon: MapPin },
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed },
  { id: 'theater', label: 'Theater', icon: Theater },
  { id: 'mall', label: 'Mall', icon: ShoppingBag },
  { id: 'landmarks', label: 'Landmarks', icon: Landmark },
  { id: 'landscape', label: 'Landscape', icon: Trees },
  { id: 'travel', label: 'Travel', icon: Plane },
];

const RADIUS_OPTIONS = [5, 10, 15, 20];

export function LeftSidebar({
  isOpen,
  onToggle,
  radiusKm,
  onRadiusChange,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onSearch,
  onManualLocationSearch,
}: LeftSidebarProps) {
  const [manualLocation, setManualLocation] = useState('');

  const handleManualLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      onManualLocationSearch(manualLocation.trim());
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="relative flex-shrink-0 h-full" style={{ width: isOpen ? '18%' : '0', minWidth: isOpen ? '280px' : '0' }}>
      {/* Toggle button when closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-card border border-border rounded-r-lg p-2 shadow-md hover:bg-accent transition-colors"
          style={{ transform: 'translateX(0) translateY(-50%)' }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`h-full bg-card border-r border-border transition-all duration-300 flex flex-col overflow-hidden ${
          isOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Navigation</h2>
          </div>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Places</label>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <Input
                  placeholder="Search nearby..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" variant="secondary">
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{cat.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Radius Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Radius (km)</label>
              <Select
                value={radiusKm.toString()}
                onValueChange={(v) => onRadiusChange(parseInt(v, 10))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RADIUS_OPTIONS.map((r) => (
                    <SelectItem key={r} value={r.toString()}>
                      {r} km
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Manual Location Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Manual Location
              </label>
              <form onSubmit={handleManualLocationSubmit} className="space-y-2">
                <Input
                  placeholder="Enter address or place..."
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                />
                <Button type="submit" variant="outline" className="w-full">
                  Set Location
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Search for a specific location instead of using your current position
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
