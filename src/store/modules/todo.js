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
  todos: state => state.todos,
  dialog: state => state.dialog,
  editedTodo: state => state.editedTodo,
  edited: state => state.edited,
  detailTodo: state => state.detailTodo
};

const mutations = {
  editMode(state, payload) {
    let todo = {
      name: "",
      todoStatus: false,
      description: ""
    };
    if (payload) {
      todo = payload;
      state.edited = true;
      state.dialog = true;
    } else {
      state.edited = false;
      state.dialog = false;
    }
    Object.assign(state.editedTodo, todo);
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
    Vue.axios
      .get("http://localhost:4200/todo")
      .then(res => {
        commit("setList", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getDetailTodo({ commit }, payload) {
    Vue.axios
      .get("http://localhost:4200/todo/" + payload)
      .then(res => {
        res.data.date = res.data.date.slice(0, 16).replace("T", " ");
        commit("setDetailTodo", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  addTodo: ({ dispatch }, payload) => {
    const postData = {
      name: payload.name,
      todoStatus: payload.todoStatus,
      description: payload.description
    };
    Vue.axios
      .post("http://localhost:4200/todo", postData)
      .then(res => {
        console.log(res);
        if (res.status !== 400) {
          dispatch("getTodoList");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  deleteTodo: ({ dispatch }, payload) => {
    Vue.axios
      .delete("http://localhost:4200/todo/" + payload)
      .then(res => {
        console.log(res);
        if (res.status !== 400) {
          dispatch("getTodoList");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  editTodo: ({ dispatch }, payload) => {
    const putData = {
      name: payload.name,
      description: payload.description,
      todoStatus: payload.todoStatus,
      _id: payload._id
    };
    Vue.axios
      .put("http://localhost:4200/todo/", putData)
      .then(res => {
        if (res.status !== 400) {
          dispatch("getTodoList");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
