<template>
  <div class="month-picker-container">
    
  </div>
</template>

<script>
export default {
  name: "year-picker",
  data: () => ({
    year: 2020
  }),
  props: {
    dateObj: Object,
    vueMode: Object
  },
  created: function() {
    this.year = this.dateObj.year;
  },
  methods: {
    setMonthPicker() {
      this.vueMode.component = "MonthPicker";
    }
  }
};
</script>

<style lang="scss">

</style>
