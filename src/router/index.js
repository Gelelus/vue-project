import Vue from "vue";
import VueRouter from "vue-router";

import TodoRouter from "./router-todos";
import AuthRouter from "./router-auth";
import DatePickerRouter from "./router-datepicker";

Vue.use(VueRouter);

const routes = [TodoRouter, AuthRouter, DatePickerRouter];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Auth" && !localStorage.getItem("UserData"))
    next({ name: "Auth" });
  else next();
});

export default router;
