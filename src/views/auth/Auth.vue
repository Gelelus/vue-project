<template>
  <v-card width="500" class="mx-auto mt-5">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          prepend-icon="mdi-account-circle"
          v-model="authData.email"
        ></v-text-field>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="authData.password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" @click="signup">Register</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    showPassword: false,
    authData: {
      password: "",
      email: ""
    }
  }),
  methods: {
    ...mapActions(["authSignup", "authLogin"]),
    signup() {
      this.authSignup(this.authData);
    },
    login() {
      this.authLogin(this.authData);
    }
  }
};
</script>
