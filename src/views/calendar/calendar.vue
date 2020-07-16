<template>
  <div class="container-box">
    <div class="container-left">
      <app-datepicker
        v-model="date"
        :first-day-of-week="firstDayOfWeek"
        :displaySec="false"
        :displayHeader="false"
        :freeDays="freeDays"
        @newData="setDataFromPicker"
      />
      <v-divider></v-divider>
      <v-select :items="selectItems" v-model="calendarMode" solo dense />
    </div>
    <div class="container-center">
      <!-- отделить не забыть -->
      <template v-if="calendarMode">
        <div class="row-calendar" v-for="(week, i) in monthData" :key="i">
          <div class="col-calendar" v-for="(dayData, j) in week" :key="j">
            <div v-if="i === 0">{{ daysOfWeek[j] }}</div>
            <div :class="{ outMonth: dayData.out }">
              {{ dayData.day }}
            </div>
            <div class="day-event event-holiday" v-if="dayData.holiday">
              {{ dayData.holiday.name }}
            </div>
            <div
              class="day-event event-todo-day"
              v-for="(day, i) in dayTodos"
              :key="i"
            >
              {{ day.name }}
            </div>
            <span v-for="(day, index) in monthTodos" :key="index + '0'">
              <div
                v-if="day.date === dayData.day"
                class="day-event event-todo-month"
              >
                {{ day.name }}
              </div>
            </span>
            <span v-for="(day, index) in weekTodos" :key="index + '1'">
              <div v-if="day.date === j" class="day-event event-todo-week">
                {{ day.name }}
              </div>
            </span>
            <span v-for="(day, index) in commonTodos" :key="index + '2'">
              <div
                v-if="
                  checkDate(
                    day.date,
                    dayData.date.year,
                    dayData.date.month,
                    dayData.day
                  )
                "
                class="day-event event-todo-common"
              >
                {{ day.name }}
              </div>
            </span>
          </div>
        </div>
      </template>
      <!--  -->
      <!-- отделить не забыть -->
      <template v-else>
        <div class="day-calendar">
          <div class="row-calendar row-day">
            <div class="col-calendar " v-for="(day, i) in week" :key="i">
              <div class="day-title">
                <span class="day-name">{{ daysOfWeek[i] }}</span>
                <br />
                <span
                  class="day-number"
                  :style="{ color: day.holiday ? 'rgb(131, 1, 1)' : 'black' }"
                  >{{ day.day }}</span
                >
              </div>
            </div>
          </div>
          <div class="row-calendar row-day" v-for="i in 24" :key="i">
            <span class="time">{{ i - 1 + ":" + "00" }}</span>
            <div class="col-calendar" v-for="i in 7" :key="i"></div>
          </div>
        </div>
      </template>
      <!--  -->
    </div>
  </div>
</template>

<script>
import datepicker from "../../components/datepicker";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "calendar",
  data: () => ({
    date: new Date(),
    monthData: [],
    firstDayOfWeek: "1",
    selectItems: [
      { text: "month", value: true },
      { text: "week", value: false },
    ],
    calendarMode: true,
    daysOfWeek: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  }),
  components: {
    appDatepicker: datepicker,
  },
  computed: {
    ...mapGetters([
      "freeDays",
      "commonTodos",
      "monthTodos",
      "weekTodos",
      "dayTodos",
    ]),
    week() {
      return (
        this.monthData.find((item) => {
          return item.some((day) => {
            return day.chosen;
          });
        }) || this.monthData[0]
      );
    },
  },
  methods: {
    ...mapActions(["getfreeDays", "getTodoDays"]),
    setDataFromPicker(data) {
      this.monthData = data;
    },
    checkDate(date, year, month, day) {
      const dayArray = date.split(/[-T]/);
      return (
        +dayArray[0] === year && +dayArray[1]-1 === month && +dayArray[2] === day
      );
    },
  },
  watch: {
    monthData(newData, oldData) {
      if (
        oldData.length === 0 ||
        newData[1][0].date.month !== oldData[1][0].date.month
      ) {
        this.getTodoDays({
          year: newData[1][0].date.year,
          month: newData[1][0].date.month,
        });
      }
    },
  },
  created() {
    this.getfreeDays();
  },
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
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .day-event {
          overflow: hidden;
          border-radius: 5px;
          color: white;
          border-bottom: 1px solid white;
          height: 1.5em;
          font-size: 0.7em;
          padding: 0 5px 5px 5px;
          cursor: pointer;
        }
        .event-holiday {
          background-color: rgb(2, 88, 2);
        }
        .event-todo-day {
          background-color: rgb(81, 88, 199);
        }
        .event-todo-month {
          background-color: rgb(64, 201, 160);
        }
        .event-todo-week {
          background-color: rgb(231, 135, 210);
        }
        .event-todo-common {
          background-color: rgb(53, 46, 51);
        }
        .day-title {
          position: absolute;
          top: -1.5em;
          padding-left: 5%;
          .day-name {
            color: #70757a;
            font-size: 11px;
          }
          .day-number {
            color: #70757a;
            font-size: 26px;
          }
        }

        .outMonth {
          color: rgb(187, 186, 186);
        }
      }
    }
  }
}
</style>
