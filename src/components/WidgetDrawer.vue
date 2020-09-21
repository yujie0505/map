<template lang="pug">
v-navigation-drawer(absolute, dark)
  v-tabs(v-model="tabs", grow)
    slot(name="tabs")
  v-tabs-items(v-model="tabs")
    slot(name="tab-items")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { Grid } from "@/types/map";

@Component
export default class WidgetDrawer extends Vue {
  @Prop(Object) readonly selectedMetadata!: Grid | null;

  private tabs: number | string | null = null;
}
</script>
