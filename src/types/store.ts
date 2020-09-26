import { Grid } from "./map";

export interface RootState {
  map: MapState;
}

export interface MapState {
  mapInstance: google.maps.Map | null;
  selectedGrid: Grid | null;
  selectedWidgetTab: string | null;
}
