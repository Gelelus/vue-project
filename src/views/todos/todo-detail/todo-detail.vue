<template>
  <v-card width="500" class="mx-auto mt-5">
    <v-card-title>Detail Todo</v-card-title>
    <v-card-text>
      <v-text-field v-model="detailTodo.name" label="Todo name"></v-text-field>
      <v-text-field
        v-model="detailTodo.description"
        label="Todo description"
      ></v-text-field>
      <v-text-field
        v-model="detailTodo.date"
        label="Todo date of creation"
        readonly
      ></v-text-field>
      <v-text-field
        v-model="detailTodo._id"
        label="Todo Id"
        readonly
      ></v-text-field>
      <v-select
        :items="selectItems"
        label="Status"
        v-model="detailTodo.todoStatus"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="save">
        Save Changes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    selectItems: [
      { text: "compoleted", value: true },
      { text: "uncompleted", value: false }
    ]
  }),
  computed: {
    ...mapGetters(["detailTodo"])
  },
  created() {
    this.getDetailTodo(this.$route.params.id);
  },
  methods: {
    ...mapActions(["getDetailTodo", "editTodo"]),
    save() {
      this.editTodo({ ...this.detailTodo });
      this.$router.push({ name: "Todos" });
    }
  }
};
</script>
