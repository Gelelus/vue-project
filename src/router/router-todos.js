export default {
  path: "/todos",
  name: "Todos",
  component: () =>
    import(/* webpackChunkName: "todos" */ "../views/todos/Todos.vue"),
  children: [
    {
      path: "",
      name: "TodoTable",
      component: () =>
        import(
          /* webpackChunkName: "todos" */ "../views/todos/todo-table/todo-table.vue"
        )
    },
    {
      path: ":id",
      name: "TodoDetail",
      component: () =>
        import(
          /* webpackChunkName: "todos" */ "../views/todos/todo-detail/todo-detail.vue"
        )
    }
  ]
};
