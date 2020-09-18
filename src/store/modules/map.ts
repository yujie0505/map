import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
  namespaced: true,
})
export default class map extends VuexModule {
  selected_grid = null;
}
