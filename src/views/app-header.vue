<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar dense>
      <v-toolbar-title>Vue project</v-toolbar-title>
      <v-divider class="mx-4" inset vertical />
      <router-link to="/todos" v-if="user">
        Todos
      </router-link>
      <v-spacer></v-spacer>
      <router-link to="/auth" v-if="!user">
        <v-btn icon><v-icon>mdi-login-variant</v-icon> </v-btn>
      </router-link>
      <v-btn v-if="user" text @click="logout">
        logout
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "app-header",
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapMutations(["logout"])
  }
};
</script>
