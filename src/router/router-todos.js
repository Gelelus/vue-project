export default {
  path: "/todos",
  component: () =>
    import(/* webpackChunkName: "todos" */ "../views/todos/Todos.vue"),
  children: [
    {
      path: ":id",
      name: "TodoDetail",
      component: () =>
        import(
          /* webpackChunkName: "todos" */ "../views/todos/todo-detail/todo-detail.vue"
        )
    },
    {
      path: "/",
      name: "Todos",
      component: () =>
        import(
          /* webpackChunkName: "todos" */ "../views/todos/todo-table/todo-table.vue"
        )
    }
  ]
};
