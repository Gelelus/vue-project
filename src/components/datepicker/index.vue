<template>
  <div class="picker-container">
    <div class="picker-header">
      <div class="picker-year" @click="setPicker('YearPicker')">
        {{ dateObj.year }}
      </div>

      <div class="picker-sub-container">
        <div class="picker-month">
          {{
            daysOfWeek[dateObj.dayOfWeek] +
              ", " +
              monthOfYear[dateObj.month].slice(0, 3) +
              " " +
              dateObj.day
          }}
        </div>
        <div class="picker-time" @click="setPicker(pickerClickTime)">
          {{ dateObj.time.h + " : " + dateObj.time.m }}
        </div>
      </div>
    </div>
    <dayPicker
      v-if="vueMode.component === 'dayPicker'"
      @change="dateChange"
      :vueMode="vueMode"
      :dateObj="dateObj"
      :daysOfWeek="daysOfWeek"
      :monthOfYear="monthOfYear"
      :firstDayOfWeek="firstDayOfWeek"
      :headerDateFormat="headerDateFormat"
    />
    <MonthPicker
      @change="dateChange"
      :vueMode="vueMode"
      :dateObj="dateObj"
      :monthOfYear="monthOfYear"
      :headerDateFormat="headerDateFormat"
      v-if="vueMode.component === 'MonthPicker'"
    />
    <YearPicker
      @change="dateChange"
      :dateObj="dateObj"
      :vueMode="vueMode"
      v-if="vueMode.component === 'YearPicker'"
    />
    <timePicker
      @change="dateChange"
      :dateObj="dateObj"
      :vueMode="vueMode"
      v-if="vueMode.component === 'timePicker'"
    />
  </div>
</template>

<script>
import dayPicker from "./dayPicker";
import timePicker from "./timePicker";
import YearPicker from "./YearPicker";
import MonthPicker from "./MonthPicker";

export default {
  name: "date-picker",
  data: () => ({
    vueMode: { component: "dayPicker", payload: false },
    daysOfWeek: ["San", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthOfYear: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    dateObj: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      dayOfWeek: new Date().getDay(),
      time: { h: new Date().getHours(), m: new Date().getMinutes() },
      maxDate: null,
      minDate: null
    }
  }),
  components: {
    dayPicker: dayPicker,
    timePicker: timePicker,
    YearPicker: YearPicker,
    MonthPicker: MonthPicker
  },
  methods: {
    setPicker(picker) {
      this.vueMode.component = picker;
    },
    dateChange() {
      const date = new Date(
        this.dateObj.year,
        this.dateObj.month,
        this.dateObj.day,
        this.dateObj.time.h,
        this.dateObj.time.m
      );
      this.$emit("dateChange", date);
    }
  },
  created: function() {
    const startDate = new Date(this.date);
    this.dateObj.year = startDate.getFullYear();
    this.dateObj.month = startDate.getMonth();
    this.dateObj.day = startDate.getDate();
    this.dateObj.dayOfWeek = startDate.getDay();
    this.dateObj.time.h = startDate.getHours();
    this.dateObj.time.m = startDate.getMinutes();
    this.dateObj.maxDate = new Date(this.maxDate);
    this.dateObj.minDate = new Date(this.minDate);
  },
  computed: {
    pickerClickTime: function() {
      return this.vueMode.component === "timePicker"
        ? "dayPicker"
        : "timePicker";
    }
  },
  props: {
    date: { type: [String, Date], default: new Date() },
    firstDayOfWeek: { type: [String, Number], default: 0 },
    headerDateFormat: { type: Function, default: null },
    maxDate: { type: [String, Date], default: null },
    minDate: { type: [String, Date], default: null }
  },
  model: {
    prop: "date",
    event: "dateChange"
  }
};
</script>

<style lang="scss">
.picker-container {
  margin: 1rem auto 1rem auto;
  width: 300px;
  text-align: left;
  .picker-header {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: #fff;
    background-color: #1867c0;
    padding: 16px;
    .picker-sub-container {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .picker-time {
        cursor: pointer;
        font-size: 20px;
        font-weight: 500;
        line-height: 1;
      }
    }
    .picker-year {
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .picker-month {
      font-size: 34px;
      font-weight: 500;
      line-height: 1;
    }
  }
}
</style>
