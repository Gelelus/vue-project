<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar dense>
      <v-toolbar-title>Vue project</v-toolbar-title>
      <v-divider class="mx-4" inset vertical />

      <router-link to="/todos">
        Todos
      </router-link>
      <v-spacer></v-spacer>
      <router-link to="/auth">
        <v-btn icon>
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: "app-header",
};
// <router-link to="/todos">Todo</router-link> |
//       <router-link to="/auth">Auth</router-link>
</script>
