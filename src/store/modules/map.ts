import { Module, Mutation, VuexModule } from "vuex-module-decorators";

import { MUTATION_MAP_SET_SELECTED_GRID, MUTATION_MAP_SET_SELECTED_WIDGET_TAB } from "@/constants/mutations";
import { Grid } from "@/types/map";
import { MapState } from "@/types/store";

@Module({
  namespaced: true,
})
export default class MapModule extends VuexModule implements MapState {
  selectedGrid: Grid | null = null;
  selectedWidgetTab: string | null = null;

  @Mutation
  [MUTATION_MAP_SET_SELECTED_GRID](payload: Grid | null) {
    this.selectedGrid = payload;
  }

  @Mutation
  [MUTATION_MAP_SET_SELECTED_WIDGET_TAB](payload: string | null) {
    this.selectedWidgetTab = payload;
  }
}
