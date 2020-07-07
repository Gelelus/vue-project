<template>
  <div class="time-picker-container">
    <v-list class="hour-picker">
      <v-subheader>HH</v-subheader>
      <v-list-item v-for="i in 24" :key="i" @click="setHour(i)">
        {{ prittyTime(i) }}
      </v-list-item>
    </v-list>
    <v-list class="min-picker">
      <v-subheader>mm</v-subheader>
      <v-list-item v-for="i in 60" :key="i" @click="setMinute(i)">
        {{ prittyTime(i) }}
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "year-picker",
  data: () => ({
    hour: 12,
    min: 15
  }),
  props: {
    dateObj: Object,
    vueMode: Object
  },
  created: function() {
    this.hour = this.dateObj.time.h;
    this.min = this.dateObj.time.m;
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
    setHour(hour) {
      this.dateObj.time.h = this.prittyTime(hour);
    },
    setMinute(minute) {
      this.dateObj.time.m = this.prittyTime(minute);
    },
    prittyTime(i) {
      return i - 1 > 9 ? i - 1 : "0" + (i - 1);
    }
  }
};
</script>

<style lang="scss">
.time-picker-container {
  height: 300px;
  display: flex;
  justify-content: space-between;
  .v-list {
    width: 50%;
    height: 300px;
    overflow: auto;
    .v-subheader {
      justify-content: center;
    }
    .v-list-item {
      justify-content: center;
      font-weight: 500;
    }
  }
}
</style>
