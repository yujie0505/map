import Vue from "vue";
import Vuex from "vuex";

import { RootState } from "@/types/store";
import MapModule from "./modules/map";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: {
    map: MapModule,
  },
});
