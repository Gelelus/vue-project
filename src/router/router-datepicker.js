export default {
  path: "/datepicker",
  name: "datepicker",
  component: () =>
    import(/* webpackChunkName: "auth" */ "../components/datepicker")
};
