<template lang="pug">
v-container.fill-height.pa-0(fluid)
  Map
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Map from "@/components/Map.vue";

@Component({
  components: {
    Map,
  },
})
export default class Home extends Vue {}
</script>
