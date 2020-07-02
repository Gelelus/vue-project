<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="width: 800">
      <v-data-table :headers="headers" :items="todos" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Todo list</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-icon class="mr-2" @click="saveAll()"
              >mdi-content-save-move-outline</v-icon
            >
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  >New Item</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Todo name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="selectItems"
                          label="Status"
                          v-model="editedItem.todoStatus"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)"
            >mdi-delete</v-icon
          >
        </template>
        <template v-slot:item.status="{ item }">
          <v-checkbox
            :label="item.todoStatus ? 'good' : 'poor'"
            v-model="item.todoStatus"
          ></v-checkbox>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    selectItems: [
      { text: "good", value: true },
      { text: "poor", value: false },
    ],
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
    edited: false,
    editedItem: {
      name: "",
      todoStatus: false,
    },
    defaultItem: {
      name: "",
      todoStatus: false,
    },
  }),
  computed: {
    ...mapGetters(["todos"]),
    formTitle() {
      return !this.edited ? "New Item" : "Edit Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.getTodoList();
  },
  methods: {
    ...mapActions(["addTodo", "deleteTodo", "editTodo", "getTodoList"]),
    editItem(item) {
      this.edited = true;
      this.editedItem = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.deleteTodo(item._id);
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.edited = false;
      });
    },
    saveAll() {
      console.log("тут сейв");
    },
    save() {
      if (this.edited) {
        this.editTodo(this.editedItem);
      } else {
        this.addTodo(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
