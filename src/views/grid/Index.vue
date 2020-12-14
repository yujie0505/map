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
        v-card.mr-1.-scroll(:height="tabItemHeight", flat)
          v-subheader Upload GeoJSON
          v-file-input.mx-3(
            v-model="geojson",
            :loading="loading",
            dense,
            filled,
            hide-details,
            outlined,
            placeholder="File input"
          )
            template(#append-outer)
              v-btn.ml-2(height="100%", :disabled="!geojson", :loading="loading", @click.stop.prevent="upload")
                v-icon mdi-cloud-upload
      v-tab-item(:value="propertyNameMetadata")
        v-card(flat, ref="card")
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
        v-virtual-scroll.mr-1.-scroll(
          :height="scrollViewportHeight",
          :item-height="listItemHeight",
          :items="selectedGrid ? selectedGrid.items : []"
        )
          template(v-slot="{ item }")
            v-list-item
              v-list-item-content
                v-list-item-title.text--accent-1(v-text="fixNumber(item.value)", :class="color(item.value)")
                v-list-item-subtitle #[v-icon(small) mdi-map-marker] {{ fixNumber(item.latitude) }}°N, {{ fixNumber(item.longitude) }}°E
  Map(@setMapInstance="MUTATION_MAP_SET_MAP_INSTANCE")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";

import Map from "@/components/Map.vue";
import WidgetDrawer from "@/components/WidgetDrawer.vue";
import { ACTION_MAP_ADD_GEOJSON } from "@/constants/actions";
import { NUMBER_OF_DIGITS_TO_FIXED } from "@/constants/format";
import { DEFAULT_PROPERTY_NAME_METADATA } from "@/constants/map";
import { MUTATION_MAP_SET_MAP_INSTANCE, MUTATION_MAP_SET_SELECTED_WIDGET_TAB } from "@/constants/mutations";
import { Grid } from "@/types/map";
import { WidgetTab } from "@/types/widget";
import { read } from "@/utils/fs";

const MapModule = namespace("map");

@Component({
  components: {
    Map,
    WidgetDrawer,
  },
})
export default class Index extends Vue {
  @MapModule.State("selectedGrid") readonly selectedGrid!: Grid | null;
  @MapModule.State("selectedWidgetTab") readonly selectedWidgetTab!: string | null;
  @MapModule.Action(ACTION_MAP_ADD_GEOJSON) [ACTION_MAP_ADD_GEOJSON]!: (payload: object) => void;
  @MapModule.Mutation(MUTATION_MAP_SET_MAP_INSTANCE) [MUTATION_MAP_SET_MAP_INSTANCE]!: (
    payload: google.maps.Map | null,
  ) => void;
  @MapModule.Mutation(MUTATION_MAP_SET_SELECTED_WIDGET_TAB) [MUTATION_MAP_SET_SELECTED_WIDGET_TAB]!: (
    payload: string | null,
  ) => void;

  private propertyNameMetadata = DEFAULT_PROPERTY_NAME_METADATA;

  private cardHeight = 0;
  private listItemHeight = 0;
  private tabHeight = 0;
  private tabItemHeight = 0;
  private windowHeight = window.innerHeight;

  private geojson: File | null = null;
  private loading = false;

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
      { disabled: !this.selectedGrid, icon: "twicon-fortune", key: this.propertyNameMetadata },
    ];
  }

  private color(value: number): string {
    return `${0 < value ? "red" : "indigo"}--text`;
  }

  private fixNumber(num: number): string {
    return num.toFixed(NUMBER_OF_DIGITS_TO_FIXED);
  }

  private async upload(): Promise<void> {
    if (!this.geojson) return;

    this.loading = true;
    try {
      const data = await read(this.geojson);

      if ("string" === typeof data) {
        this[ACTION_MAP_ADD_GEOJSON](JSON.parse(data));
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.geojson = null;
      this.loading = false;
    }
  }

  private created(): void {
    window.onresize = () => (this.windowHeight = window.innerHeight);

    this[MUTATION_MAP_SET_SELECTED_WIDGET_TAB](this.propertyNameMetadata);
  }

  private mounted(): void {
    this.cardHeight = (this.$refs.card as Vue).$el.clientHeight;
    this.listItemHeight = (this.$refs.listItem as Vue).$el.clientHeight;
    this.tabHeight = (this.$refs.tab as Array<Vue>)[0].$el.clientHeight;
    this.tabItemHeight = this.windowHeight - this.tabHeight;

    this[MUTATION_MAP_SET_SELECTED_WIDGET_TAB]("source");
  }
}
</script>

<style lang="scss" scoped>
.-scroll {
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 2px;
  }
}
</style>
