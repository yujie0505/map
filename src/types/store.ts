import { Grid } from "./map";

export interface RootState {
  map: MapState;
}

export interface MapState {
  selectedGrid: Grid | null;
}
