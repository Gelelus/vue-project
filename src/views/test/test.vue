<template>
  <div>
    {{ date }}

    <app-datepicker
      v-model="date"
      :first-day-of-week="firstDayOfWeek"
      :max-date="maxDate"
      :min-date="minDate"
    />
  </div>
</template>

<script>
import datepicker from "../../components/datepicker";

export default {
  name: "testVue",
  data: () => ({
    date: new Date(),
    maxDate: new Date(2040, 1, 10),
    minDate: new Date(2000, 3, 12),
    firstDayOfWeek: "1"
  }),
  methods: {
    dateFormat(date) {
      return date;
    }
  },
  components: {
    appDatepicker: datepicker
  }
};
</script>
