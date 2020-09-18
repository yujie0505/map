import { Module, Mutation, VuexModule } from "vuex-module-decorators";

import { MapState } from "@/types/store";

@Module({
  namespaced: true,
})
export default class MapModule extends VuexModule implements MapState {
  selected_grid = null;
}
