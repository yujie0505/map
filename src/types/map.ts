export interface Target {
  latitude: number;
  longitude: number;
  value: number;
}

export interface Grid {
  items: Array<Target>;
  latitudeSpan: [number, number];
  longitudeSpan: [number, number];
  value: number;
}
