'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Utensils,
  UtensilsCrossed,
  Theater,
  ShoppingBag,
  Landmark,
  Trees,
  Plane,
} from 'lucide-react';

export interface FilterConfig {
  radiusKm: number;
  categories: string[];
}

interface WelcomeScreenProps {
  onGo: (config: FilterConfig) => void;
  onSkip: () => void;
}

const CATEGORY_OPTIONS = [
  { id: 'food', label: 'Food', icon: Utensils, query: 'food' },
  { id: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed, query: 'restaurant' },
  { id: 'theater', label: 'Theater', icon: Theater, query: 'theater cinema' },
  { id: 'mall', label: 'Mall', icon: ShoppingBag, query: 'shopping mall' },
  { id: 'landmarks', label: 'Landmarks', icon: Landmark, query: 'museum church bridge monument' },
  { id: 'landscape', label: 'Landscape', icon: Trees, query: 'park mountain river lake' },
  { id: 'travel', label: 'Travel', icon: Plane, query: 'tourism eco-tourism national park' },
];

export function WelcomeScreen({ onGo, onSkip }: WelcomeScreenProps) {
  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleGo = () => {
    const categories = selectedCategories.length > 0
      ? selectedCategories.map(
          (id) => CATEGORY_OPTIONS.find((c) => c.id === id)?.query || ''
        )
      : ['attractions'];
    onGo({ radiusKm, categories });
  };

  const handleRadiusChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setRadiusKm(Math.min(20, Math.max(5, num)));
    }
  };

  // Calculate positions for surrounding circles (evenly distributed)
  const getCirclePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 160; // Distance from center
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden">
      {/* Skip button */}
      <button
        onClick={onSkip}
        className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors text-xl z-10"
      >
        Skip
      </button>

      {/* Main circular layout */}
      <div className="relative w-[420px] h-[420px]">
        {/* Center circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-primary/10 border-2 border-primary flex flex-col items-center justify-center shadow-lg z-10">
          {/* Top half - radius input */}
          <div className="flex flex-col items-center gap-1 -mt-2">
            <label className="text-xs text-muted-foreground">Radius (km)</label>
            <Input
              type="number"
              min={5}
              max={20}
              value={radiusKm}
              onChange={(e) => handleRadiusChange(e.target.value)}
              className="w-16 h-8 text-center text-sm font-medium"
            />
          </div>
          
          {/* Bottom half - Go button */}
          <Button
            onClick={handleGo}
            className="mt-3 px-6"
            size="sm"
          >
            Go
          </Button>
        </div>

        {/* Surrounding category circles with connecting lines */}
        {CATEGORY_OPTIONS.map((category, index) => {
          const { x, y } = getCirclePosition(index, CATEGORY_OPTIONS.length);
          const isSelected = selectedCategories.includes(category.id);
          const Icon = category.icon;

          return (
            <div key={category.id}>
              {/* Connecting line */}
              <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <line
                  x1="210"
                  y1="210"
                  x2={210 + x}
                  y2={210 + y}
                  stroke={isSelected ? 'var(--primary)' : 'var(--border)'}
                  strokeWidth={isSelected ? 2 : 1}
                  strokeDasharray={isSelected ? 'none' : '4 4'}
                />
              </svg>

              {/* Category circle */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={`absolute w-16 h-16 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-200 z-20 ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                    : 'bg-card border border-border hover:border-primary hover:bg-primary/5'
                }`}
                style={{
                  left: `calc(50% + ${x}px - 32px)`,
                  top: `calc(50% + ${y}px - 32px)`,
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium leading-tight">{category.label}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-muted-foreground">
          Select categories to filter, then tap <strong>Go</strong>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Radius: 5-20 km
        </p>
      </div>
    </div>
  );
}
