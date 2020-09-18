export interface Target {
  latitude: number;
  longitude: number;
  value: number;
}

export interface Grid {
  items: Array<Target>;
  latitude_span: [number, number];
  longitude_span: [number, number];
  value: number;
}
