import { APIResponseFactory } from '@/lib/common/api-response';
import type { APIResponse } from '@/lib/common/api-response';
import { RoutingPageConstants } from '@/lib/constants/routing.page.constants';
import type { DirectionsReq, RouteDTO, RouteStepDTO } from '@/lib/dto/routing.page.dto';
import { GeoPageUtil } from '@/lib/util/geo.page.util';

export class RoutingPageAPI {
  static async getRoute(
    request: DirectionsReq
  ): Promise<APIResponse<RouteDTO | null>> {
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTESERVICE_API_KEY;
    if (!apiKey) {
      console.error(
        '[RoutingPageAPI] OpenRouteService key not configured, using fallback'
      );
      return APIResponseFactory.ok(
        RoutingPageAPI.buildFallbackRoute(
          request.startLat,
          request.startLng,
          request.endLat,
          request.endLng
        )
      );
    }

    try {
      const response = await fetch(RoutingPageConstants.ORS_DIRECTIONS_URL, {
        method: 'POST',
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: [
            [request.startLng, request.startLat],
            [request.endLng, request.endLat],
          ],
          instructions: true,
        }),
      });

      if (!response.ok) {
        console.error(`[RoutingPageAPI] OpenRouteService error: ${response.status}`);
        return APIResponseFactory.ok(
          RoutingPageAPI.buildFallbackRoute(
            request.startLat,
            request.startLng,
            request.endLat,
            request.endLng
          )
        );
      }

      const data = (await response.json()) as {
        routes?: Array<{
          segments?: Array<{
            steps?: Array<{
              instruction?: string;
              distance?: number;
              duration?: number;
              maneuver?: { type?: string };
            }>;
          }>;
          summary?: { distance?: number; duration?: number };
          geometry?: { coordinates?: number[][] };
        }>;
      };

      const route = data.routes?.[0];
      if (!route) {
        return APIResponseFactory.ok(null);
      }

      const steps: RouteStepDTO[] = [];
      for (const segment of route.segments ?? []) {
        for (const step of segment.steps ?? []) {
          steps.push({
            instruction: step.instruction || 'Continue',
            distance: step.distance || 0,
            duration: step.duration || 0,
            maneuver: step.maneuver?.type,
          });
        }
      }

      const mapped: RouteDTO = {
        steps,
        totalDistance: route.summary?.distance || 0,
        totalDuration: route.summary?.duration || 0,
        coordinates:
          route.geometry?.coordinates?.map((coord) => [
            coord[1],
            coord[0],
          ] as [number, number]) ?? [],
      };

      return APIResponseFactory.ok(mapped);
    } catch (error) {
      console.error('[RoutingPageAPI] Error fetching route:', error);
      return APIResponseFactory.ok(
        RoutingPageAPI.buildFallbackRoute(
          request.startLat,
          request.startLng,
          request.endLat,
          request.endLng
        )
      );
    }
  }

  private static buildFallbackRoute(
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number
  ): RouteDTO {
    const distanceKm = GeoPageUtil.haversineKm(
      startLat,
      startLng,
      endLat,
      endLng
    );
    const estimatedDuration =
      distanceKm * RoutingPageConstants.FALLBACK_MINUTES_PER_KM;

    return {
      steps: [
        {
          instruction: `Head towards ${endLat.toFixed(4)}, ${endLng.toFixed(4)}`,
          distance: distanceKm * 1000,
          duration: estimatedDuration,
        },
      ],
      totalDistance: distanceKm * 1000,
      totalDuration: estimatedDuration,
      coordinates: [
        [startLat, startLng],
        [endLat, endLng],
      ],
    };
  }
}
