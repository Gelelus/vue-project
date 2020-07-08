<template>
  <div class="time-picker-container">
    <span class="timer-close" @click="vueMode.component = 'dayPicker'"
      >close</span
    >
    <ul class="hour-picker">
      <li>HH</li>
      <li v-for="i in 24" :key="i" @click="setHour(i)">
        {{ prittyTime(i) }}
      </li>
    </ul>
    <ul class="min-picker">
      <li>mm</li>
      <li v-for="i in 60" :key="i" @click="setMinute(i)">
        {{ prittyTime(i) }}
      </li>
    </ul>
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
    this.hour = this.dateObj.h;
    this.min = this.dateObj.m;
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
      this.dateObj.h = this.prittyTime(hour);
      this.$emit("change");
    },
    setMinute(minute) {
      this.dateObj.m = this.prittyTime(minute);
      this.$emit("change");
    },
    prittyTime(i) {
      return i - 1 > 9 ? i - 1 : "0" + (i - 1);
    }
  }
};
</script>

<style lang="scss">
.time-picker-container {
  position: relative;
  height: 280px;
  display: flex;
  justify-content: space-between;
  .timer-close {
    transition: color 0.3s;
    position: absolute;
    right: 1.6em;
    top: -1.4em;
    color: white;
    cursor: pointer;
  }
  .timer-close:hover {
    color: rgb(219, 216, 216);
  }
  ul {
    width: 50%;
    overflow: auto;
    padding: 0;
    li {
      cursor: pointer;
      padding: 0.5em;
      list-style-type: none;
      transition: background-color 0.3s;
      text-align: center;
      font-weight: 500;
    }
    li:hover {
      background-color: rgb(219, 216, 216);
    }
  }
}
</style>
