import Vue from "vue";
import VueRouter from "vue-router";

import TodoRouter from "./router-todos";
import AuthRouter from "./router-auth";

Vue.use(VueRouter);

const routes = [TodoRouter, AuthRouter];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
