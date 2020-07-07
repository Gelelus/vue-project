<template>
  <div class="month-picker-container">
    <div class="month-picker-header">
      <v-icon class="mr-2" @click="nextYear(0)">mdi-chevron-left</v-icon>
      <v-btn text @click="setYearPicker()">{{ year }}</v-btn>
      <v-icon class="mr-2" @click="nextYear(1)">mdi-chevron-right</v-icon>
    </div>
    <div class="month-picker-table">
      <table>
        <tbody>
          <tr v-for="i in 4" :key="i">
            <td v-for="j in 3" :key="j">
              <v-btn text @click="setDayPicker(j + 3 * i - 4)">
                {{ monthOfYear[j + 3 * i - 4].slice(0, 3) }}
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
  name: "month-picker",
  data: () => ({
    year: 2020
  }),
  props: {
    dateObj: Object,
    vueMode: Object,
    monthOfYear: Array
  },
  created: function() {
    this.year = this.dateObj.year;
  },
  methods: {
    setDayPicker(month) {
      this.dateObj.year = this.year;
      this.vueMode.payload = month;
      this.vueMode.component = "dayPicker";
    },
    setYearPicker() {
      this.vueMode.component = "YearPicker";
    },
    nextYear(val) {
      if (val) {
        this.year++;
      } else {
        this.year--;
      }
    }
  }
};
</script>

<style lang="scss">
.month-picker-container {
  height: 300px;
  .month-picker-header {
    padding: 4px;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .month-picker-table {
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
