import Vue from "vue";

const state = {
  todos: [],
  editedTodo: {
    name: "",
    todoStatus: false,
    description: ""
  },
  dialog: false,
  edited: false,
  detailTodo: {}
};

const getters = {
  todos: state => {
    return state.todos;
  },
  dialog: state => {
    return state.dialog;
  },
  editedTodo: state => {
    return state.editedTodo;
  },
  edited: state => {
    return state.edited;
  },
  detailTodo: state => {
    return state.detailTodo;
  }
};

const mutations = {
  setEditMode(state, payload) {
    state.edited = true;
    state.dialog = true;
    Object.assign(state.editedTodo, payload);
  },
  unSetEditMode(state) {
    state.edited = false;
    state.dialog = false;
    const defaultTodo = {
      name: "",
      todoStatus: false,
      description: ""
    };
    Object.assign(state.editedTodo, defaultTodo);
  },
  setDetailTodo(state, payload) {
    state.detailTodo = payload;
  },
  showDialog(state) {
    state.dialog = true;
  },
  closeDialog(state) {
    state.dialog = false;
  },
  setList(state, payload) {
    state.todos = payload;
  }
};

const actions = {
  getTodoList({ commit }) {
    Vue.axios.get("http://localhost:4200/todo").then(res => {
      commit("setList", res.data);
    });
  },
  getDetailTodo({ commit }, payload) {
    Vue.axios.get("http://localhost:4200/todo/" + payload).then(res => {
      res.data.date = res.data.date.slice(0, 16).replace("T", " ");
      commit("setDetailTodo", res.data);
    });
  },
  addTodo: ({ dispatch }, payload) => {
    const postData = {
      name: payload.name,
      status: payload.todoStatus,
      description: payload.description
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
