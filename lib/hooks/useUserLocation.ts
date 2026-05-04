import { useEffect, useState } from 'react';
import { UserLocation, GeolocationError } from '@/lib/types';

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<GeolocationError | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by your browser',
      });
      setLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    const successCallback = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      setLocation({
        lat: latitude,
        lng: longitude,
        accuracy,
        timestamp: position.timestamp,
      });
      setLoading(false);
      setError(null);
    };

    const errorCallback = (err: GeolocationPositionError) => {
      let message = 'Failed to get your location';
      if (err.code === 1) {
        message = 'Permission denied. Please enable location access in your browser settings.';
      } else if (err.code === 2) {
        message = 'Location unavailable. Please check your connection.';
      } else if (err.code === 3) {
        message = 'Location request timed out. Please try again.';
      }
      setError({
        code: err.code,
        message,
      });
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({
          lat: latitude,
          lng: longitude,
          accuracy,
          timestamp: position.timestamp,
        });
        setLoading(false);
      },
      (err: GeolocationPositionError) => {
        setError({
          code: err.code,
          message: 'Failed to get your location. Please try again.',
        });
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return { location, loading, error, refetch };
}
