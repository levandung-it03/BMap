'use client';

import { useState, useEffect, useCallback } from 'react';
import { LocationLoader } from '@/components/LocationLoader';
import { Map } from '@/components/Map';
import { PlacesList } from '@/components/PlacesList';
import { PlaceDetails } from '@/components/PlaceDetails';
import { DirectionsView } from '@/components/DirectionsView';
import { usePlaces } from '@/lib/hooks/usePlaces';
import { useDirections } from '@/lib/hooks/useDirections';
import { Place } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import './home.page.css';

export default function HomePage() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { places, loading: placesLoading } = usePlaces(
    userLocation?.lat ?? null,
    userLocation?.lng ?? null
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
    },
    []
  );

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setShowDirections(false);
    setShowMobileMenu(false);
  };

  const handleNavigate = () => {
    setShowDirections(true);
  };

  const handleBack = () => {
    setShowDirections(false);
  };

  const handleBackToPlaces = () => {
    setSelectedPlace(null);
    setShowDirections(false);
    setShowMobileMenu(false);
  };

  if (!userLocation) {
    return (
      <div className="discovery_shell-loading">
        <div className="discovery_shell-loading-inner">
          <h1 className="discovery_shell-loading-title">Travel Discovery</h1>
          <LocationLoader onLocationReady={handleLocationReady} />
        </div>
      </div>
    );
  }

  const sidebarPanel =
    selectedPlace && showMobileMenu ? (
      showDirections && route ? (
        <DirectionsView
          route={route}
          placeName={selectedPlace.name}
          onBack={handleBack}
        />
      ) : !showDirections ? (
        <PlaceDetails
          place={selectedPlace}
          onNavigate={handleNavigate}
          onBack={handleBackToPlaces}
        />
      ) : null
    ) : (
      <PlacesList
        places={places}
        selectedPlace={selectedPlace}
        loading={placesLoading}
        onPlaceSelect={handlePlaceSelect}
      />
    );

  const desktopDetail =
    selectedPlace ? (
      showDirections && route ? (
        <DirectionsView
          route={route}
          placeName={selectedPlace.name}
          onBack={handleBack}
        />
      ) : !showDirections ? (
        <PlaceDetails
          place={selectedPlace}
          onNavigate={handleNavigate}
          onBack={handleBackToPlaces}
        />
      ) : null
    ) : (
      <div className="discovery_shell-detail-placeholder">
        <p className="discovery_shell-detail-hint">
          Select a place to view details
        </p>
      </div>
    );

  return (
    <div className="discovery_shell">
      <header className="discovery_shell-header">
        <h1 className="discovery_shell-header-title">Travel Discovery</h1>
        <div className="discovery_shell-header-actions">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="discovery_shell-menu-button"
          >
            {showMobileMenu ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </Button>
        </div>
      </header>

      <div className="discovery_shell-main">
        <div
          className={
            showMobileMenu
              ? 'discovery_shell-sidebar discovery_shell-sidebar_mobile-open'
              : 'discovery_shell-sidebar discovery_shell-sidebar_mobile-closed'
          }
        >
          {sidebarPanel}
        </div>

        <div className="discovery_shell-detail">{desktopDetail}</div>

        <div className="discovery_shell-map">
          <Map
            userLocation={userLocation}
            places={places}
            selectedPlace={selectedPlace}
            route={showDirections ? route : null}
            isDark={isDark}
            onPlaceClick={handlePlaceSelect}
          />
        </div>
      </div>
    </div>
  );
}
