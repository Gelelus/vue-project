<template>
  <div class="picker-container">
    <div class="picker-header">
      <div class="picker-year">{{ dateObj.year }}</div>
      <div class="picker-month">
        {{
          daysOfWeek[dateObj.dayOfWeek] +
            ", " +
            monthOfYear[dateObj.month].slice(0, 3) +
            " " +
            dateObj.day
        }}
      </div>
    </div>
    <dayPicker
      v-if="vueMode.component === 'dayPicker'"
      :vueMode="vueMode"
      :dateObj="dateObj"
      :daysOfWeek="daysOfWeek"
      :monthOfYear="monthOfYear"
    />
    <MonthPicker
      :vueMode="vueMode"
      :dateObj="dateObj"
      :monthOfYear="monthOfYear"
      v-if="vueMode.component === 'MonthPicker'"
    />
    <YearPicker :vueMode="vueMode" v-if="vueMode.component === 'YearPicker'" />
  </div>
</template>

<script>
import dayPicker from "./dayPicker";
// import timePicker from "./timePicker";
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
      dayOfWeek: new Date().getDay()
    }
  }),
  components: {
    dayPicker: dayPicker,
    // timePicker: timePicker,
    YearPicker: YearPicker,
    MonthPicker: MonthPicker
  }
};

// 2. компонент должен потдерживать v-model
// 3. реализовать функционал: first-day-of-week, header-date-format, max-date, min-date

// (если останется время максимально приблизится к функционалу пикера из vuetify)
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
    .picker-year {
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
