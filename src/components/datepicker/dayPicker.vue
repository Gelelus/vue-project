<template>
  <div class="day-picker-container">
    <div class="day-picker-header">
      <v-icon class="mr-2" @click="nextMonth(0)">mdi-chevron-left</v-icon>
      <v-btn text @click="setMonthPicker">{{
        monthOfYear[month] + " " + year
      }}</v-btn>
      <v-icon class="mr-2" @click="nextMonth(1)">mdi-chevron-right</v-icon>
    </div>
    <div class="day-picker-table">
      <table>
        <thead>
          <tr>
            <th v-for="(day, index) in daysOfWeek" :key="index">
              {{ day.slice(0, 1) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in data" :key="index">
            <td v-for="(day, index) in week" :key="index">
              <v-btn icon v-if="day" @click="setDate(day)">
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
    year: 2020
  }),
  computed: {
    data() {
      const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
      const firstDay = new Date(this.year, this.month, 1).getDay();
      let start = false;
      let data = [[], [], [], [], []];
      let startDay = 1;
      for (let i = 0; i < 5; i++) {
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
    vueMode: Object
  },
  created: function() {
    if (this.vueMode.payload) {
      this.month = this.vueMode.payload;
      this.vueMode.payload = false;
    } else {
      this.month = this.dateObj.month;
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
    },
    nextMonth(val) {
      if (val) {
        if (this.month === 11) {
          this.year++;
          this.month = 0;
        } else {
          this.month++;
        }
      } else {
        if (this.month === 0) {
          this.year--;
          this.month = 11;
        } else {
          this.month--;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.day-picker-container {
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
