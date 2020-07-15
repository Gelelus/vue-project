import Vue from "vue";
import Vuex from "vuex";
import todo from "./modules/todo";
import user from "./modules/user";
import calendar from "./modules/calendar";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todo,
    user,
    calendar
  }
});
