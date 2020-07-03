<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="width: 800">
      <v-data-table :headers="headers" :items="todos" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Todo list</v-toolbar-title>
            <v-divider class="mx-4" inset vertical />
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="newItem()"
              >New Todo</v-btn
            >
            <app-dialog />
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)"
            >mdi-delete</v-icon
          >
          <v-icon small class="mr-2" @click="save(item)"
            >mdi-content-save-move-outline</v-icon
          >
        </template>
        <template v-slot:item.status="{ item }">
          <v-checkbox
            :label="item.todoStatus ? 'compoleted' : 'uncompleted'"
            v-model="item.todoStatus"
          />
        </template>
        <template v-slot:item.name="{ item }">
          <span style="cursor: pointer" @click="detail(item)">{{
            item.name
          }}</span>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import dialog from "./todo-dialog";

export default {
  data: () => ({
    headers: [
      { text: "Status", value: "status", sortable: false },
      {
        text: "Names",
        align: "start",
        sortable: false,
        value: "name",
      },

      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapGetters(["todos"]),
  },
  created() {
    this.getTodoList();
  },
  components: {
    appDialog: dialog,
  },
  methods: {
    ...mapActions(["deleteTodo", "editTodo", "getTodoList"]),
    ...mapMutations(["setEditMode", "showDialog"]),
    editItem(item) {
      this.setEditMode(item);
    },
    newItem() {
      this.showDialog();
    },
    deleteItem(item) {
      this.deleteTodo(item._id);
    },
    save(item) {
      this.editTodo(item);
    },
    detail(item) {
      console.log(item);
    },
  },
};
</script>
