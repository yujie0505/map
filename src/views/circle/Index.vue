<template lang="pug">
v-container.fill-height.pa-0(fluid)
  WidgetDrawer(dark, width="408", :selectedWidgetTab="selectedWidgetTab")
    template(#tabs)
      v-tab(
        v-for="tab in tabs",
        :disabled="tab.disabled",
        :href="`#${tab.key}`",
        :key="tab.key",
        @click="MUTATION_MAP_SET_SELECTED_WIDGET_TAB(tab.key)"
      )
        v-icon(v-text="tab.icon", large)
  Map(@setMapInstance="MUTATION_MAP_SET_MAP_INSTANCE")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";

import Map from "@/components/Map.vue";
import WidgetDrawer from "@/components/WidgetDrawer.vue";
import { MUTATION_MAP_SET_MAP_INSTANCE, MUTATION_MAP_SET_SELECTED_WIDGET_TAB } from "@/constants/mutations";
import { WidgetTab } from "@/types/widget";

const MapModule = namespace("map");

@Component({
  components: {
    Map,
    WidgetDrawer,
  },
})
export default class Index extends Vue {
  @MapModule.State("selectedWidgetTab") readonly selectedWidgetTab!: string | null;
  @MapModule.Mutation(MUTATION_MAP_SET_MAP_INSTANCE) [MUTATION_MAP_SET_MAP_INSTANCE]!: (
    payload: google.maps.Map | null,
  ) => void;
  @MapModule.Mutation(MUTATION_MAP_SET_SELECTED_WIDGET_TAB) [MUTATION_MAP_SET_SELECTED_WIDGET_TAB]!: (
    payload: string | null,
  ) => void;

  private tabs: Array<WidgetTab> = [{ icon: "twicon-postbox2", key: "source" }];
}
</script>
