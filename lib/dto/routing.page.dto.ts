export class DirectionsReq {
  constructor(
    public readonly startLat: number,
    public readonly startLng: number,
    public readonly endLat: number,
    public readonly endLng: number
  ) {}
}

export interface RouteStepDTO {
  instruction: string;
  distance: number;
  duration: number;
  maneuver?: string;
}

export interface RouteDTO {
  steps: RouteStepDTO[];
  totalDistance: number;
  totalDuration: number;
  coordinates: Array<[number, number]>;
}
