<template lang="pug">
i(:class="icon")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class Icon extends Vue {
  @Prop(String) readonly icon!: string;
}
</script>
