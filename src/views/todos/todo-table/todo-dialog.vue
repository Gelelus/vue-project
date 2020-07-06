<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedTodo.name" label="Todo name" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="selectItems"
                label="Status"
                v-model="editedTodo.todoStatus"
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

export default {
  data: () => ({
    selectItems: [
      { text: "compoleted", value: true },
      { text: "uncompleted", value: false }
    ]
  }),
  computed: {
    ...mapGetters(["dialog", "editedTodo", "edited"]),
    formTitle() {
      return !this.edited ? "New Todo" : "Edit Todo";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    ...mapMutations(["showDialog", "closeDialog", "editMode"]),
    ...mapActions(["addTodo", "deleteTodo", "editTodo", "getTodoList"]),
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
    }
  }
};
</script>
