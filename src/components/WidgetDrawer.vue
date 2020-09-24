<template lang="pug">
v-navigation-drawer(v-bind="options")
  v-tabs(:value="selectedWidgetTab", grow)
    slot(name="tabs")
  v-tabs-items(:dark="dark", :value="selectedWidgetTab")
    slot(name="tab-items")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { WidgetOpts } from "@/types/widget";

@Component
export default class WidgetDrawer extends Vue {
  @Prop({ default: true, type: Boolean }) readonly absolute!: boolean;
  @Prop({ default: false, type: Boolean }) readonly dark!: boolean;
  @Prop({ default: "256", type: String }) readonly width!: string;

  @Prop(String) readonly selectedWidgetTab!: string | null;

  private get options(): WidgetOpts {
    return {
      absolute: this.absolute,
      dark: this.dark,
      width: this.width,
    };
  }
}
</script>
