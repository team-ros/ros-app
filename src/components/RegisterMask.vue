<template>
  <v-container class="pa-10">
    <router-link to="/login">
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </router-link>
    <v-row>
      <v-col class="col-12 mt-6">
        <h1 class="mb-8">Registrieren</h1>
        <p class="mb-1" style="margin-top: -35px">
          Hier können Sie sich Registrieren
        </p>
        <v-card flat class="pa-4">
          <v-text-field
            color="#0044b2"
            class=" mt-12 mb-44"
            label="Vorname"
            type="vorname"
            v-model="vorname"
          ></v-text-field>
          <v-text-field
            color="#0044b2"
            class="my-2"
            label="Nachname"
            type="nachname"
            v-model="nachname"
          ></v-text-field>

          <v-text-field
            color="#0044b2"
            class="my-2"
            label="E-Mail"
            type="email"
            v-model="email"
          ></v-text-field>

          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            color="#0044b2"
            label="Passwort"
            v-model="password"
            class="my-2"
          ></v-text-field>

          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            color="#0044b2"
            label="Passwort wiederholen"
            v-model="passwordAgain"
            class="my-2"
          ></v-text-field>

          <div style="margin-top: 93px"></div>

          <v-btn
            @click="register"
            block
            color="#0044b2"
            depressed
            style="color: #eeeeee"
            >Registrieren
          </v-btn>

          <div class="mt-4">
            <span
              class="mr-2"
              style="font-size: 12px;float: left; margin-top: 4px"
            >
              Schon registriert?
            </span>
            <router-link style="font-size: 12px;" to="/login">
              Login
            </router-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar :timeout="2000" color="error" v-model="registerError">
      Ein Feld ist leer. Bitte überprüfen.
    </v-snackbar>
    <v-snackbar :timeout="2000" color="error" v-model="passwordNotEqual">
      Die Passwörter sind nicht ident. Bitte überprüfen.
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      vorname: "",
      nachname: "",
      email: "",
      password: "",
      passwordAgain: "",
      show: false,
      registerError: false,
      passwordNotEqual: false
    };
  },
  methods: {
    register: function() {
      if (
        this.password == "" ||
        this.email == "" ||
        this.vorname == "" ||
        this.nachname == "" ||
        this.passwordAgain == ""
      ) {
        this.registerError = true;
      } else if (this.password != this.passwordAgain) {
        this.passwordNotEqual = true;
      } else {
        this.$router.push("/Login");
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
