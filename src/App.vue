<template lang="pug">
v-app#app
  v-main
    router-view
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import "assets/styles/main.scss";
</style>
