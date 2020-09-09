<template lang="pug">
v-app#app
  v-navigation-drawer(app, dark, expand-on-hover, permanent)
    NavDrawer
  v-main
    router-view
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import NavDrawer from "@/components/NavDrawer.vue";

@Component({
  components: {
    NavDrawer,
  },
})
export default class App extends Vue {}
</script>
