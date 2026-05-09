import { useEffect, useState, useCallback } from 'react';
import { Route } from '@/lib/types';
import { RoutingPageAPI } from '@/services/routing.page.api';
import { DirectionsReq } from '@/dto/routing.page.dto';

export function useDirections(
  startLat: number | null,
  startLng: number | null,
  endLat: number | null,
  endLng: number | null
) {
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoute = useCallback(async () => {
    if (
      startLat === null ||
      startLng === null ||
      endLat === null ||
      endLng === null
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await RoutingPageAPI.getRoute(
        new DirectionsReq(startLat, startLng, endLat, endLng)
      );

      if (!res.success) {
        setError(res.error ?? 'Failed to fetch directions');
        setRoute(null);
        return;
      }

      setRoute(res.data ?? null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch directions'
      );
    } finally {
      setLoading(false);
    }
  }, [startLat, startLng, endLat, endLng]);

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);

  return { route, loading, error, refetch: fetchRoute };
}
