export class NearbyPlacesReq {
  constructor(
    public readonly lat: number,
    public readonly lng: number,
    public readonly radiusKm: number,
    public readonly limit: number
  ) {}
}

export interface PlaceDTO {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  distance?: number;
  rating?: number;
  address?: string;
  description?: string;
}

/** Raw SerpAPI place item (subset used for mapping). */
export interface SerpApiPlaceRes {
  place_id?: string;
  title?: string;
  name?: string;
  type?: string;
  category?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;
  address?: string;
  description?: string;
}

export interface SerpApiMapsSearchRes {
  places_results?: SerpApiPlaceRes[];
}
