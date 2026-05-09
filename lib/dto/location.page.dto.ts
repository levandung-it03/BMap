export interface UserLocationDTO {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
}

export interface GeolocationErrorDTO {
  code: number;
  message: string;
}
