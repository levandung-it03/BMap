import { NearbyPlacesReq } from '@/lib/dto/places.page.dto';
import type { PlaceDTO } from '@/lib/dto/places.page.dto';
import { PlacesPageAPI } from '@/lib/api/places.page.api';
import { GeoPageUtil } from '@/lib/util/geo.page.util';
import { PlacesPageConstants } from '@/lib/constants/places.page.constants';

export class PlacesPageService {
  static async loadNearbySorted(
    lat: number,
    lng: number,
    radiusKm: number = PlacesPageConstants.DEFAULT_RADIUS_KM
  ): Promise<PlaceDTO[]> {
    const res = await PlacesPageAPI.getNearby(
      new NearbyPlacesReq(
        lat,
        lng,
        radiusKm,
        PlacesPageConstants.DEFAULT_LIMIT
      )
    );

    if (!res.success || !res.data) {
      return [];
    }

    const enriched = PlacesPageService.withDistances(res.data, lat, lng);
    return PlacesPageService.sortByDistance(enriched);
  }

  static withDistances(
    places: PlaceDTO[],
    originLat: number,
    originLng: number
  ): PlaceDTO[] {
    return places.map((place) => ({
      ...place,
      distance: GeoPageUtil.haversineKm(
        originLat,
        originLng,
        place.lat,
        place.lng
      ),
    }));
  }

  static sortByDistance(places: PlaceDTO[]): PlaceDTO[] {
    return [...places].sort(
      (a, b) => (a.distance ?? 0) - (b.distance ?? 0)
    );
  }
}
