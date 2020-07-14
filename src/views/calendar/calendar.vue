<template>
  <div class="container-box">
    <div class="container-left">
      <app-datepicker
        v-model="date"
        :first-day-of-week="firstDayOfWeek"
        :displaySec="false"
        :displayHeader="false"
        @newData="setDataFromPicker"
      />
      <v-divider></v-divider>
      <v-select
        :items="selectItems"
        v-model="calendarMode"
        label="Режим просмотра"
        solo
        dense
      />
    </div>
    <div class="container-center">
      <template v-if="calendarMode">
        <div class="row-calendar" v-for="(week, i) in monthData" :key="i">
          <div class="col-calendar" v-for="(dayData, j) in week" :key="j">
            <div v-if="i === 0">{{ daysOfWeek[j] }}</div>
            <div :class="{ outMonth: dayData.out }">
              {{ dayData.day }}
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="day-calendar">
          <div class="row-calendar row-day">
            <div
              class="col-calendar"
              v-for="(dayName, i) in daysOfWeek"
              :key="i"
            >
              {{ dayName }}
              <br />
              15
            </div>
          </div>
          <div class="row-calendar row-day" v-for="i in 24" :key="i">
            <span class="time">{{ i + " AM" }}</span>
            <div class="col-calendar" v-for="i in 7" :key="i">
              {{ "" }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import datepicker from "../../components/datepicker";

export default {
  name: "calendar",
  data: () => ({
    date: new Date(),
    monthData: null,
    firstDayOfWeek: "1",
    selectItems: [
      { text: "month", value: true },
      { text: "week", value: false }
    ],
    calendarMode: true,
    daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "San"]
  }),
  components: {
    appDatepicker: datepicker
  },
  methods: {
    setDataFromPicker(data) {
      this.monthData = data;
    }
  }
};
</script>

<style lang="scss">
.container-box {
  display: flex;
  height: 100%;
  .container-left {
    border-right: 0.5px solid rgb(165, 163, 163);
    .v-divider {
      border-color: rgb(165, 163, 163);
    }
  }
  .container-center {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    .day-calendar {
      border-left: 0.5px solid rgb(165, 163, 163);
      margin: 2em 0 0 3em;
      .row-day {
        position: relative;
        left: -0.5em;
        width: 100%;
        height: 5vh;
        .time {
          position: absolute;
          font-size: 10px;
          top: -0.8em;
          left: -3em;
        }
      }
    }
    .row-calendar {
      display: flex;
      height: 100%;
      justify-content: space-between;
      .col-calendar {
        width: 100%;
        padding: 2px;
        border-bottom: 0.5px solid rgb(165, 163, 163);
        border-right: 0.5px solid rgb(165, 163, 163);
        .outMonth {
          color: rgb(187, 186, 186);
        }
      }
    }
  }
}
</style>
