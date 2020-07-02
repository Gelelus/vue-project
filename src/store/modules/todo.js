import Vue from "vue";

const state = {
  todos: []
};

const getters = {
  todos: state => {
    return state.todos;
  }
};

const mutations = {
  setList(state, payload) {
    state.todos = payload;
    console.log(state.todos);
  },
  editTodo: (state, payload) => {
    Object.assign(state.todos[payload.editedIndex], payload.editedItem);
  }
};

const actions = {
  getTodoList({ commit }) {
    Vue.axios.get("http://localhost:4200/todo").then(res => {
      commit("setList", res.data);
    });
  },
  addTodo: ({ dispatch }, payload) => {
    const postData = {
      name: payload.name,
      status: payload.todoStatus,
      description: "test description"
    };
    Vue.axios.post("http://localhost:4200/todo", postData).then(res => {
      console.log(res);
      if (res.status !== 400) {
        dispatch("getTodoList");
      }
    });
  },
  deleteTodo: ({ dispatch }, payload) => {
    Vue.axios.delete("http://localhost:4200/todo/" + payload).then(res => {
      console.log(res);
      if (res.status !== 400) {
        dispatch("getTodoList");
      }
    });
  },
  editTodo: ({ dispatch }, payload) => {
    Vue.axios.put("http://localhost:4200/todo/", payload).then(res => {
      if (res.status !== 400) {
        dispatch("getTodoList");
      }
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
