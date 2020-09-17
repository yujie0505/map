<template lang="pug">
v-app#app
  WidgetDrawer
  v-main
    router-view
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import WidgetDrawer from "@/components/WidgetDrawer.vue";

@Component({
  components: {
    WidgetDrawer,
  },
})
export default class App extends Vue {}
</script>
