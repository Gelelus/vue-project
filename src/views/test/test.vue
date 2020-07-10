<template>
  <div>
    <input v-model="date" placeholder="отредактируй меня" style="width: 60%" />
    <app-datepicker
      v-model="date"
      :first-day-of-week="firstDayOfWeek"
      :header-date-format="dateFormat"
      :displaySec="false"
      :maxDate="maxDate"
      :minDate="minDate"
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
    firstDayOfWeek: "1",
    dateFormat: "xxx-ddd-ddd"
  }),
  components: {
    appDatepicker: datepicker
  }
};
</script>
