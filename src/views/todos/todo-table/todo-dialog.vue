<template>
  <v-dialog :value="dialog" @input="closeDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <template v-if ="!edited">
          <app-datepicker v-model="editedTodo.date" width="auto" />
          <v-row>
            <v-col>
              Todo date
              <br />
              {{ prittyDate }}</v-col
            >
          </v-row>
          </template>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedTodo.name" label="Todo name" />
            </v-col>
            <v-col cols="12" sm="6" md="4" v-if ="!edited">
              <v-select
                v-model="editedTodo.todoType"
                :items="selectItems"
                label="Type of Todo"
              />
            </v-col>
            <v-col cols="12" sm="12" md="8">
              <v-text-field
                v-model="editedTodo.description"
                label="Todo description"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import datepicker from "../../../components/datepicker";

export default {
  data: () => ({
    selectItems: ["Common", "EveryDay", "EveryWeek", "EveryMonth"],
    weekDays: [
      "каждое воскресенье",
      "каждый понедельник",
      "каждый вторник",
      "каждую среду",
      "каждый четверг",
      "каждую пятницу",
      "каждую субботу"
    ],
    selectType: "Common",
  }),
  components: {
    appDatepicker: datepicker,
  },
  computed: {
    ...mapGetters(["dialog", "editedTodo", "edited"]),
    formTitle() {
      return !this.edited ? "New Todo" : "Edit Todo";
    },
    prittyDate() {
      if (this.editedTodo.todoType === "EveryMonth") {
        return "Каждый месяц " + this.editedTodo.date.getDate() + " числа";
      } else if (this.editedTodo.todoType === "EveryDay") {
        return "Каждый день";
      } else if (this.editedTodo.todoType === "EveryWeek") {
        return this.weekDays[this.editedTodo.date.getDay()]
      } else {
        return this.editedTodo.date
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");
      }
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    ...mapMutations(["closeDialog", "editMode"]),
    ...mapActions(["addTodo", "editTodo"]),
    close() {
      this.editMode(false);
    },
    save() {
      if (this.edited) {
        this.editTodo({ ...this.editedTodo });
      } else {
        this.addTodo({ ...this.editedTodo });
      }
      this.close();
    },
  },
};
</script>
