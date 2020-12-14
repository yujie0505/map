import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import { ROUTE_NAME_CIRCLE, ROUTE_NAME_GRID } from "@/constants/routes";
import Circle from "@/views/circle/Index.vue";
import Grid from "@/views/grid/Index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/circle",
    name: ROUTE_NAME_CIRCLE,
    component: Circle,
  },
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
