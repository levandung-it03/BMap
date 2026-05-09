import { APIResponseFactory, type APIResponse } from '@/lib/common/api-response';
import { PlacesPageConstants } from '@/constants/places.page.constants';
import type {
  NearbyPlacesReq,
  PlaceDTO,
  SerpApiMapsSearchRes,
  SerpApiPlaceRes,
} from '@/dto/places.page.dto';

export class PlacesPageAPI {
  static async getNearby(
    request: NearbyPlacesReq,
  ): Promise<APIResponse<PlaceDTO[]>> {
    const apiKey = process.env.NEXT_PUBLIC_SERPAPI_API_KEY?.trim();
    if (!apiKey) {
      console.warn('[PlacesPageAPI] SerpApi key not configured');
      return APIResponseFactory.fail('SerpApi key not configured');
    }

    try {
      const params = new URLSearchParams({
        engine: PlacesPageConstants.ENGINE,
        q: PlacesPageConstants.DEFAULT_QUERY,
        location_latitude: request.lat.toString(),
        location_longitude: request.lng.toString(),
        radius: (request.radiusKm * 1000).toString(),
        type: PlacesPageConstants.PLACE_TYPE,
        api_key: apiKey,
      });

      const response = await fetch(`${PlacesPageConstants.SERPAPI_BASE_URL}?${params}`);
      if (!response.ok) {
        console.error(`[PlacesPageAPI] SerpApi error: ${response.status}`);
        return APIResponseFactory.fail(
          `SerpApi error: ${response.status}`,
          response.status,
        );
      }

      const data = (await response.json()) as SerpApiMapsSearchRes;
      if (!data.places_results?.length) {
        return APIResponseFactory.ok([]);
      }

      const places = data.places_results
        .slice(0, request.limit)
        .map((place: SerpApiPlaceRes, index: number) =>
          PlacesPageAPI.mapPlace(place, request.lat, request.lng, index),
        );

      return APIResponseFactory.ok(places);
    } catch (error) {
      console.error('[PlacesPageAPI] Error fetching places:', error);
      return APIResponseFactory.fail(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  private static mapPlace(
    place: SerpApiPlaceRes,
    fallbackLat: number,
    fallbackLng: number,
    index: number,
  ): PlaceDTO {
    return {
      id: place.place_id || `place-${index}`,
      name: place.title || place.name || 'Unknown',
      category: place.type || place.category || 'Attraction',
      lat: place.latitude ?? fallbackLat,
      lng: place.longitude ?? fallbackLng,
      rating: place.rating,
      address: place.address,
      description: place.description,
    };
  }
}

