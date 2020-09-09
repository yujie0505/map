<template lang="pug">
#map
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { CALLBACK_ON_GOOGLE_MAP_API_LOADED, GOOGLE_MAP_API_URL } from "@/constants/api";
import * as MAP from "@/constants/map";

@Component
export default class Map extends Vue {
  private center_latitude = MAP.DEFAULT_CENTER_LATITUDE;
  private center_longitude = MAP.DEFAULT_CENTER_LONGITUDE;
  private map_type = MAP.DEFAULT_MAP_TYPE;
  private zoom_level = MAP.DEFAULT_ZOOM_LEVEL;

  private map: null | google.maps.Map = null;

  private mounted() {
    window[CALLBACK_ON_GOOGLE_MAP_API_LOADED] = this[CALLBACK_ON_GOOGLE_MAP_API_LOADED];

    const script = document.createElement("script");
    script.src = GOOGLE_MAP_API_URL;

    document.body.appendChild(script);
  }

  private [CALLBACK_ON_GOOGLE_MAP_API_LOADED]() {
    this.map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: this.center_latitude, lng: this.center_longitude },
      mapTypeId: this.map_type,
      zoom: this.zoom_level,
    });
  }
}
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
