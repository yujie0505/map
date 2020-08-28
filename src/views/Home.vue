<template lang="pug">
v-container.fill-height.pa-0
  Map
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

import Map from "@/components/Map.vue";

@Component({
  components: {
    Map,
  },
})
export default class Home extends Vue {}
</script>
