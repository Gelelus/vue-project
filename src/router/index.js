import Vue from "vue";
import VueRouter from "vue-router";
import Todo from "../views/Todo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Todo",
    component: Todo
  },
  {
    path: "/auth",
    name: "Auth",

    component: () => import("../views/Auth.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
