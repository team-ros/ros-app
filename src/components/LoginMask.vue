<template>
  <v-container class="pa-10">
    <v-row>
      <v-col class="col-12 mt-10 text-center">
        <img width="68%" src="../assets/ROS_Logo.png" />
      </v-col>

      <v-col class="col-12 mt-6">
        <v-card flat class="pa-4">
          <h1 style="text-align: center; font-size: 25px" class="mb-8">
            Willkommen!
          </h1>

          <v-text-field
            color="#0044b2"
            type="email"
            label="E-Mail"
            v-model="email"
          ></v-text-field>

          <v-text-field
            color="#0044b2"
            label="Passwort"
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
          ></v-text-field>

          <router-link to="/passwordrecovery">
            <p style="font-size: 12px; text-align: right">
              Passwort vergessen?
            </p>
          </router-link>

          <div style="margin-top: 150px"></div>

          <v-btn
            @click="toDashboard"
            block
            color="#0044b2"
            depressed
            style="color: #eeeeee"
            >Login
          </v-btn>

          <div class="mt-4">
            <span
              class="mr-2"
              style="font-size: 12px;float: left; margin-top: 4px;"
            >
              Noch keinen Account?
            </span>
            <router-link style="font-size: 12px;" to="/register">
              Registrieren
            </router-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="loginError" :timeout="2000" color="error">
      Email oder Passwort leer. Bitte überprüfen.
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      password: "",
      email: "",
      show: false,
      loginError: false
    };
  },
  methods: {
    toDashboard: function() {
      if (this.password != "" || this.email != "") {
        let gebDate = new Date("07.04.2000");

        let tempUser = {
          id: 1,
          vorname: "Sharon",
          nachname: "Chaveiro",
          geburtsdatum: gebDate
        };

        this.$cookies.set("user", tempUser);
        this.$router.push("/");
      } else {
        this.loginError = true;
      }
    }
  }
};
</script>

<style scoped>
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 0px !important;
}
p,
span,
h1,
h2,
h3,
h4,
h5 {
  color: black !important;
}
</style>