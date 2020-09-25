<template lang="pug">
v-container.fill-height.pa-0(fluid)
  WidgetDrawer(dark, width="408", :selectedWidgetTab="selectedWidgetTab")
    template(#tabs)
      v-tab(
        v-for="tab in tabs",
        :disabled="tab.disabled",
        :href="`#${tab.key}`",
        :key="tab.key",
        @click="MUTATION_MAP_SET_SELECTED_WIDGET_TAB(tab.key)",
        ref="tab"
      )
        v-icon(v-text="tab.icon", large)
    template(#tab-items)
      v-tab-item(value="source")
      v-tab-item(value="metadata")
        v-card(ref="card")
          v-subheader General
          v-list(subheader, two-line)
            v-list-item(ref="listItem")
              v-list-item-content
                v-list-item-title.text--accent-1(
                  v-text="gridValue",
                  :class="selectedGrid ? color(selectedGrid.value) : ''"
                )
                v-list-item-subtitle the average value of targets in this grid
            v-list-item
              v-list-item-content
                v-list-item-title(v-text="gridLatitudeSpan")
                v-list-item-subtitle the span of latitude of this grid
            v-list-item
              v-list-item-content
                v-list-item-title(v-text="gridLongitudeSpan")
                v-list-item-subtitle the span of longitude of this grid
          v-divider
          v-subheader Targets
        v-virtual-scroll(:height="scrollViewportHeight", :item-height="listItemHeight")
  Map(@selectGrid="MUTATION_MAP_SET_SELECTED_GRID")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";

import Map from "@/components/Map.vue";
import WidgetDrawer from "@/components/WidgetDrawer.vue";
import { NUMBER_OF_DIGITS_TO_FIXED } from "@/constants/format";
import { MUTATION_MAP_SET_SELECTED_GRID, MUTATION_MAP_SET_SELECTED_WIDGET_TAB } from "@/constants/mutations";
import { Grid } from "@/types/map";
import { WidgetTab } from "@/types/widget";

const MapModule = namespace("map");

@Component({
  components: {
    Map,
    WidgetDrawer,
  },
})
export default class Home extends Vue {
  @MapModule.State("selectedGrid") readonly selectedGrid!: Grid | null;
  @MapModule.State("selectedWidgetTab") readonly selectedWidgetTab!: string | null;
  @MapModule.Mutation(MUTATION_MAP_SET_SELECTED_GRID) [MUTATION_MAP_SET_SELECTED_GRID]!: (payload: Grid | null) => void;
  @MapModule.Mutation(MUTATION_MAP_SET_SELECTED_WIDGET_TAB) [MUTATION_MAP_SET_SELECTED_WIDGET_TAB]!: (
    payload: string | null,
  ) => void;

  private cardHeight = 0;
  private listItemHeight = 0;
  private tabHeight = 0;
  private windowHeight = window.innerHeight;

  private get gridLatitudeSpan(): string {
    return this.selectedGrid
      ? this.selectedGrid.latitudeSpan.map((it) => `${it.toFixed(NUMBER_OF_DIGITS_TO_FIXED)}°N`).join(" ~ ")
      : "";
  }

  private get gridLongitudeSpan(): string {
    return this.selectedGrid
      ? this.selectedGrid.longitudeSpan.map((it) => `${it.toFixed(NUMBER_OF_DIGITS_TO_FIXED)}°E`).join(" ~ ")
      : "";
  }

  private get gridValue(): string {
    return this.selectedGrid ? this.selectedGrid.value.toFixed(NUMBER_OF_DIGITS_TO_FIXED) : "";
  }

  private get scrollViewportHeight(): number {
    return this.windowHeight - this.tabHeight - this.cardHeight;
  }

  private get tabs(): Array<WidgetTab> {
    return [
      { icon: "twicon-postbox2", key: "source" },
      { disabled: !this.selectedGrid, icon: "twicon-fortune", key: "metadata" },
    ];
  }

  private color(value: number): string {
    return `${0 < value ? "red" : "indigo"}--text`;
  }

  private created(): void {
    this[MUTATION_MAP_SET_SELECTED_WIDGET_TAB]("metadata");
  }

  private mounted(): void {
    this.cardHeight = (this.$refs.card as Vue).$el.clientHeight;
    this.listItemHeight = (this.$refs.listItem as Vue).$el.clientHeight;
    this.tabHeight = (this.$refs.tab as Array<Vue>)[0].$el.clientHeight;
  }
}
</script>
