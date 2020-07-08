<template>
  <div class="day-picker-container">
    <div class="day-picker-header">
      <span @click="nextMonth(0)" class="chevron-container"
        ><i class="chevron chevron-left"></i
      ></span>
      <button @click="setMonthPicker">
        {{ monthOfYear[month] + " " + year }}
      </button>
      <span @click="nextMonth(1)" class="chevron-container"
        ><i class="chevron chevron-right"></i
      ></span>
    </div>
    <div class="day-picker-table">
      <table>
        <thead>
          <tr>
            <th v-for="(day, index) in weekDays" :key="index">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in dataOfMonth" :key="index">
            <td v-for="(day, index) in week" :key="index">
              <button
                v-if="day"
                @click="setDate(day, $event)"
                :disabled="disable(day)"
                :class="{ chosen: chosen(day) }"
              >
                {{ day }}
              </button>
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
    day: -1,
    month: 1,
    year: 2020,
    maxYear: Infinity,
    maxMonth: 11,
    maxDay: 33,
    minYear: 1,
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
    dataOfMonth() {
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
    firstDayOfWeek: { type: [String, Number], default: 0 }
  },
  methods: {
    initilaze() {
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
      this.day = this.dateObj.day;
      this.year = this.dateObj.year;
    },
    setMonthPicker() {
      this.vueMode.component = "MonthPicker";
    },
    setDate(day) {
      this.day = day;
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
    },
    chosen(day) {
      return (
        day === this.day &&
        this.year === this.dateObj.year &&
        this.month === this.dateObj.month
      );
    }
  },
  created: function() {
    this.initilaze();
  },
  beforeDestroy: function() {
    this.vueMode.payload = this.month;
  }
};
</script>

<style lang="scss">
.chosen {
  border: 1px solid #1867c0;
}
.day-picker-container {
  height: 280px;
  .day-picker-header {
    button {
      transition: background-color 0.3s;
      padding: 0.4em;
      border-radius: 5px;
      outline: none;
    }
    button:hover {
      background-color: rgb(219, 216, 216);
    }
    .chevron-container:hover {
      border-radius: 10px;
      background-color: rgb(219, 216, 216);
    }
    .chevron-container {
      padding: 0.2em 0.4em 0 0.2em;
      cursor: pointer;
      .chevron {
        display: inline-block;
        height: 0.8em;
        position: relative;
        width: 0.6em;
        margin: 0em 0.5em 0em 0.5em;
      }
      .chevron:before {
        display: block;
        content: "";
        width: 0;
        height: 0em;
        border-style: solid;
        position: absolute;
      }
      .chevron-right:before {
        right: 0;
        border-width: 0.4em 0 0.4em 0.4em;
        border-color: transparent transparent transparent gray;
      }
      .chevron-left:before {
        right: 0;
        border-width: 0.4em 0.4em 0.4em 0;
        border-color: transparent gray transparent transparent;
      }
    }
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
        button {
          outline: none;
          transition: background-color 0.3s;
          border-radius: 50%;
          height: 32px;
          width: 32px;
          color: black;
          font-size: 1.2em;
          color: rgb(78, 78, 78);
        }
        button:hover {
          background-color: rgb(219, 216, 216);
        }
        button:disabled {
          color: rgb(165, 163, 163);
        }
      }
    }
  }
}
</style>
