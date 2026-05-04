'use client';

import { useState, useEffect, useCallback } from 'react';
import { LocationLoader } from '@/components/LocationLoader';
import { Map } from '@/components/Map';
import { WelcomeScreen, FilterConfig } from '@/components/WelcomeScreen';
import { LeftSidebar } from '@/components/LeftSidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { usePlaces } from '@/lib/hooks/usePlaces';
import { useDirections } from '@/lib/hooks/useDirections';
import { Place } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import './home.page.css';

type AppView = 'welcome' | 'loading' | 'main';

export default function HomePage() {
  const [appView, setAppView] = useState<AppView>('welcome');
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Filter states
  const [radiusKm, setRadiusKm] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sidebar states
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  const { places, loading: placesLoading } = usePlaces(
    userLocation?.lat ?? null,
    userLocation?.lng ?? null,
    radiusKm
  );

  const { route } = useDirections(
    userLocation?.lat ?? null,
    userLocation?.lng ?? null,
    selectedPlace?.lat ?? null,
    selectedPlace?.lng ?? null
  );

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleLocationReady = useCallback(
    (location: { lat: number; lng: number }) => {
      setUserLocation(location);
      setAppView('main');
    },
    []
  );

  const handleWelcomeGo = (config: FilterConfig) => {
    setRadiusKm(config.radiusKm);
    setAppView('loading');
  };

  const handleWelcomeSkip = () => {
    setAppView('loading');
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setShowDirections(false);
    setRightSidebarOpen(true);
  };

  const handleNavigate = () => {
    setShowDirections(true);
  };

  const handleBack = () => {
    setShowDirections(false);
  };

  const handleClosePlaceDetails = () => {
    setSelectedPlace(null);
    setShowDirections(false);
  };

  const handleSearch = () => {
    // Search functionality - triggers re-fetch with updated query
    console.log('Search triggered:', searchQuery);
  };

  const handleManualLocationSearch = (query: string) => {
    // Geocode the query and update location
    console.log('Manual location search:', query);
    // This would typically call a geocoding API
  };

  // Welcome screen
  if (appView === 'welcome') {
    return <WelcomeScreen onGo={handleWelcomeGo} onSkip={handleWelcomeSkip} />;
  }

  // Loading screen (getting location)
  if (appView === 'loading' || !userLocation) {
    return (
      <div className="discovery_shell-loading">
        <div className="discovery_shell-loading-inner">
          <h1 className="discovery_shell-loading-title">Travel Discovery</h1>
          <LocationLoader onLocationReady={handleLocationReady} />
        </div>
      </div>
    );
  }

  // Main map view
  return (
    <div className="discovery_shell">
      {/* Header */}
      <header className="discovery_shell-header">
        <h1 className="discovery_shell-header-title">Travel Discovery</h1>
        <div className="discovery_shell-header-actions">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      {/* Main content area */}
      <div className="discovery_shell-main relative">
        {/* Left Sidebar - Navigation & Filters */}
        <LeftSidebar
          isOpen={leftSidebarOpen}
          onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
          radiusKm={radiusKm}
          onRadiusChange={setRadiusKm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          onManualLocationSearch={handleManualLocationSearch}
        />

        {/* Map */}
        <div className="discovery_shell-map-container">
          <Map
            userLocation={userLocation}
            places={places}
            selectedPlace={selectedPlace}
            route={showDirections ? route : null}
            isDark={isDark}
            onPlaceClick={handlePlaceSelect}
          />

          {/* Loading indicator */}
          {placesLoading && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-card px-4 py-2 rounded-full shadow-lg border border-border z-10">
              <span className="text-sm text-muted-foreground">
                Loading places...
              </span>
            </div>
          )}
        </div>

        {/* Right Sidebar - Place Details */}
        <RightSidebar
          isOpen={rightSidebarOpen}
          onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
          selectedPlace={selectedPlace}
          route={route}
          showDirections={showDirections}
          onNavigate={handleNavigate}
          onBack={handleBack}
          onClose={handleClosePlaceDetails}
        />
      </div>
    </div>
  );
}
