<template>
  <v-card color="grey lighten-4 header" flat tile>
    <v-toolbar dense>
      <v-toolbar-title>Vue project</v-toolbar-title>
      <template v-if="user">
        <v-divider class="mx-4" inset vertical />
        <router-link to="/todos">
          <v-toolbar-items>
            Todos
          </v-toolbar-items>
        </router-link>
      </template>
      <v-divider class="mx-4" inset vertical />
      <router-link to="/datepicker">
        <v-toolbar-items>
          DatePicker
        </v-toolbar-items>
      </router-link>
      <v-divider class="mx-4" inset vertical />
      <router-link to="/calendar">
        <v-toolbar-items>
          Calendar
        </v-toolbar-items>
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

<style lang="scss">
.header {
  margin-bottom: 0.5em;
}
a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
.router-link-exact-active {
  color: #42b983 !important;
}
</style>
