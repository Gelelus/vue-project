import Vue from "vue";
import router from "../../router/index";

const state = {
  user: null
};

const getters = {
  user: state => {
    return state.user;
  },
  token: state => {
    if (state.user) {
      return state.user.token;
    }
    return null;
  }
};

const mutations = {
  logout(state) {
    state.user = null;
    localStorage.setItem("UserData", null);
    router.push({ name: "Auth" });
  },
  authSuccess(state, payload) {
    state.user = payload;
    if (!payload.redirect) {
      router.push({ name: "Todos" });
    }
  }
};

const actions = {
  authSignup({ commit }, payload) {
    Vue.axios.post("http://localhost:4200/users", payload).then(res => {
      localStorage.setItem("UserData", JSON.stringify(res.data));
      commit("authSuccess", res.data);
    });
  },
  authLogin({ commit }, payload) {
    Vue.axios.post("http://localhost:4200/users/login", payload).then(res => {
      localStorage.setItem("UserData", JSON.stringify(res.data));
      commit("authSuccess", res.data);
    });
  },
  autoLogin({ commit }) {
    const userData = JSON.parse(localStorage.getItem("UserData"));
    if (userData && userData.token) {
      userData.redirect = true;
      commit("authSuccess", userData);
    }
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
