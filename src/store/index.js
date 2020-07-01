import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    todos: state => {
      return state.todos || [];
    }
  },
  mutations: {
    setList(state, payload) {
      state.todos = payload;
    },
    addTodo: (state, todo) => {
      state.todos.push(todo);
    },
    deleteTodo: (state, index) => {
      state.todos.splice(index, 1);
    },
    editTodo: (state, payload) => {
      state.todos[payload.editedIndex].name = payload.editedItem.name;
      state.todos[payload.editedIndex].todoStatus =
        payload.editedItem.todoStatus;
    }
  },
  actions: {
    getList({ commit }) {
      Vue.axios
        .get("http://localhost:8080/todo")
        .then(res => commit("setList", res.data));
    },
    addTodo: ({ dispatch }, payload) => {
      Vue.axios.post("http://localhost:8080/todo", payload).then(res => {
        if (res.status === 200) {
          dispatch("getList");
        }
      });
    },
    deleteTodo: ({ dispatch }, payload) => {
      Vue.axios.delete("http://localhost:8080/todo/" + payload).then(res => {
        if (res.status === 200) {
          dispatch("getList");
        }
      });
    },
    editTodo: ({ dispatch }, payload) => {
      Vue.axios.put("http://localhost:8080/todo/", payload).then(res => {
        if (res.status === 200) {
          dispatch("getList");
        }
      });
    }
  }
});
