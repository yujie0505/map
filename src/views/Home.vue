<template lang="pug">
v-container.fill-height.pa-0(fluid)
  WidgetDrawer
  Map(@selectGrid="MUTATION_MAP_SET_SELECTED_GRID")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";

import Map from "@/components/Map.vue";
import WidgetDrawer from "@/components/WidgetDrawer.vue";
import { MUTATION_MAP_SET_SELECTED_GRID } from "@/constants/mutations";
import { Grid } from "@/types/map";

const MapModule = namespace("map");

@Component({
  components: {
    Map,
    WidgetDrawer,
  },
})
export default class Home extends Vue {
  @MapModule.Mutation(MUTATION_MAP_SET_SELECTED_GRID) [MUTATION_MAP_SET_SELECTED_GRID]!: (payload: Grid | null) => void;
}
</script>
