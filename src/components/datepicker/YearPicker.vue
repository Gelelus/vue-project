<template>
  <div class="year-picker-container">
    <v-list>
      <v-list-item
        v-for="(item, i) in data"
        :key="i"
        @click="setMonthPicker(item)"
      >
        <span v-if="item === year" ref="element">{{ item }}</span>
        <span v-else>{{ item }}</span>
      </v-list-item>
    </v-list>
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
  mounted: function() {
    this.$refs.element[0].style = "font-size: 26px; color: #1867c0";
    this.$refs.element[0].scrollIntoView({
      block: "center"
    });
  },
  computed: {
    data() {
      let startYear = this.year - 100 > 0 ? this.year - 100 : 1;
      const endYear = this.year + 100;
      let data = [];
      for (let i = 0; startYear <= endYear; i++) {
        data[i] = startYear;
        startYear++;
      }
      return data;
    }
  },
  methods: {
    setMonthPicker(year) {
      this.dateObj.year = year;
      this.vueMode.component = "MonthPicker";
    }
  }
};
</script>

<style lang="scss">
.year-picker-container {
  height: 300px;
  overflow: auto;
  .v-list-item {
    justify-content: center;
    font-weight: 500;
  }
}
</style>
