import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import { ROUTE_NAME_CIRCLE, ROUTE_NAME_GRID } from "@/constants/routes";
import Grid from "@/views/grid/Index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/grid",
    name: ROUTE_NAME_GRID,
    component: Grid,
  },
  {
    path: "*",
    redirect: { name: ROUTE_NAME_GRID },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
