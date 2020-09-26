import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { ACTION_MAP_ADD_GEOJSON } from "@/constants/actions";
import {
  DEFAULT_PROPERTY_NAME_FILL_COLOR,
  DEFAULT_PROPERTY_NAME_METADATA,
  DEFAULT_STYLE_FILL_OPACITY,
  DEFAULT_STYLE_STROKE_WEIGHT,
} from "@/constants/map";
import {
  MUTATION_MAP_SET_MAP_INSTANCE,
  MUTATION_MAP_SET_SELECTED_GRID,
  MUTATION_MAP_SET_SELECTED_WIDGET_TAB,
} from "@/constants/mutations";
import { Grid } from "@/types/map";
import { MapState } from "@/types/store";

@Module({
  namespaced: true,
})
export default class MapModule extends VuexModule implements MapState {
  mapInstance: google.maps.Map | null = null;
  selectedGrid: Grid | null = null;
  selectedWidgetTab: string | null = null;

  @Action
  [ACTION_MAP_ADD_GEOJSON](payload: object) {
    if (!this.mapInstance) return;

    this.mapInstance.data.addGeoJson(payload);
    this.mapInstance.data.setStyle((it) => ({
      fillColor: it.getProperty(DEFAULT_PROPERTY_NAME_FILL_COLOR),
      fillOpacity: DEFAULT_STYLE_FILL_OPACITY,
      strokeWeight: DEFAULT_STYLE_STROKE_WEIGHT,
    }));
    this.mapInstance.data.addListener("click", (it) => {
      this.context.commit(MUTATION_MAP_SET_SELECTED_GRID, it.feature.getProperty(DEFAULT_PROPERTY_NAME_METADATA));
      this.context.commit(MUTATION_MAP_SET_SELECTED_WIDGET_TAB, DEFAULT_PROPERTY_NAME_METADATA);
    });
  }

  @Mutation
  [MUTATION_MAP_SET_MAP_INSTANCE](payload: google.maps.Map | null) {
    this.mapInstance = payload;
  }

  @Mutation
  [MUTATION_MAP_SET_SELECTED_GRID](payload: Grid | null) {
    this.selectedGrid = payload;
  }

  @Mutation
  [MUTATION_MAP_SET_SELECTED_WIDGET_TAB](payload: string | null) {
    this.selectedWidgetTab = payload;
  }
}
