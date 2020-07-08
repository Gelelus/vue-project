<template>
  <div class="day-picker-container">
    <div class="day-picker-header">
      <v-icon class="mr-2" @click="nextMonth(0)">mdi-chevron-left</v-icon>
      <v-btn text @click="setMonthPicker">{{
        headerDateFormat
          ? headerDateFormat(month + "-" + year)
          : monthOfYear[month] + " " + year
      }}</v-btn>
      <v-icon class="mr-2" @click="nextMonth(1)">mdi-chevron-right</v-icon>
    </div>
    <div class="day-picker-table">
      <table>
        <thead>
          <tr>
            <th v-for="(day, index) in weekDays" :key="index">
              {{ day.slice(0, 1) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in data" :key="index">
            <td v-for="(day, index) in week" :key="index">
              <v-btn
                icon
                v-if="day"
                @click="setDate(day)"
                :disabled="disable(day)"
              >
                {{ day }}
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "day-picker",
  data: () => ({
    month: 1,
    year: 2020,
    maxYear: Infinity,
    maxMonth: 11,
    maxDay: Infinity,
    minYear: 2000,
    minMonth: 0,
    minday: -1
  }),
  computed: {
    weekDays() {
      if (this.firstDayOfWeek) {
        return this.daysOfWeek
          .slice(this.firstDayOfWeek)
          .concat(this.daysOfWeek.slice(0, this.firstDayOfWeek));
      }
      return this.daysOfWeek;
    },
    data() {
      const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
      let firstDay =
        (new Date(this.year, this.month, 1).getDay() -
          this.firstDayOfWeek +
          7) %
        7;
      let start = false;
      let data = [[], [], [], [], [], []];
      let startDay = 1;
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
          if ((j === firstDay || start) && startDay <= daysInMonth) {
            if (!start) {
              start = true;
            }
            data[i][j] = startDay;
            startDay++;
          } else {
            data[i][j] = 0;
          }
        }
      }
      return data;
    }
  },
  props: {
    dateObj: Object,
    monthOfYear: Array,
    daysOfWeek: Array,
    vueMode: Object,
    firstDayOfWeek: { type: [String, Number], default: 0 },
    headerDateFormat: { type: Function, default: null }
  },
  created: function() {
    if (typeof this.vueMode.payload === "number") {
      this.month = this.vueMode.payload;
      this.vueMode.payload = false;
    } else {
      this.month = this.dateObj.month;
    }
    if (this.dateObj.maxDate) {
      this.maxYear = this.dateObj.maxDate.getFullYear();
      this.maxMonth = this.dateObj.maxDate.getMonth();
      this.maxDay = this.dateObj.maxDate.getDate();
    }
    if (this.dateObj.minDate) {
      this.minYear = this.dateObj.minDate.getFullYear();
      this.minMonth = this.dateObj.minDate.getMonth();
      this.minDay = this.dateObj.minDate.getDate();
    }

    this.year = this.dateObj.year;
  },
  methods: {
    setMonthPicker() {
      this.vueMode.component = "MonthPicker";
    },
    setDate(day) {
      this.dateObj.dayOfWeek = new Date(this.year, this.month, day).getDay();
      this.dateObj.year = this.year;
      this.dateObj.month = this.month;
      this.dateObj.day = day;
      this.$emit("change");
    },
    nextMonth(val) {
      if (val) {
        if (this.month === 11 && this.year < this.maxYear) {
          this.year++;
          this.month = 0;
        } else {
          if (this.year === this.maxYear && this.month === this.maxMonth) {
            return;
          }
          this.month++;
        }
        return;
      } else if (!val) {
        if (this.month === 0 && this.year > this.minYear) {
          this.year--;
          this.month = 11;
        } else {
          if (this.year === this.minYear && this.month === this.minMonth) {
            return;
          }
          this.month--;
        }
        return;
      }
    },
    disable(day) {
      if (this.maxYear === this.year && this.month === this.maxMonth) {
        if (day > this.maxDay) {
          return true;
        }
        return false;
      } else if (this.year === this.minYear && this.month === this.minMonth) {
        if (day < this.minDay) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss">
.day-picker-container {
  height: 300px;
  .day-picker-header {
    padding: 4px;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .day-picker-table {
    table {
      table-layout: fixed;
      padding: 8px 0;
      font-weight: 600;
      text-align: center;
      width: 100%;
      font-size: 12px;
      th {
        color: rgba(0, 0, 0, 0.38);
      }
      th,
      td {
        .v-btn {
          height: 32px;
          width: 32px;
          color: black;
        }
      }
    }
  }
}
</style>
