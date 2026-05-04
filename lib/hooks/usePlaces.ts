import { useEffect, useState, useCallback } from 'react';
import { Place } from '@/lib/types';
import { PlacesPageService } from '@/lib/services/places.page.service';

export function usePlaces(
  lat: number | null,
  lng: number | null,
  radiusKm: number = 5
) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaces = useCallback(async () => {
    if (lat === null || lng === null) return;

    setLoading(true);
    setError(null);

    try {
      const sorted = await PlacesPageService.loadNearbySorted(
        lat,
        lng,
        radiusKm
      );
      setPlaces(sorted);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch nearby places'
      );
    } finally {
      setLoading(false);
    }
  }, [lat, lng, radiusKm]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return { places, loading, error, refetch: fetchPlaces };
}
