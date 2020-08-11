<template>
  <v-container class="pa-10">
    <v-row>
      <v-col class="col-12 mt-10 text-center">
        <img width="68%" src="../assets/ROS_Logo.png"/>
      </v-col>

      <v-col class="col-12 mt-6">
        <v-card color="#eee" flat class="pa-4">
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

          <div style="margin-top: 50px"></div>

          <v-btn
              @click="login"
              block
              color="#0044b2"
              depressed
              style="color: #eeeeee"
          >Login
          </v-btn>

          <v-btn
              class="my-4"
              @click="loginWithGoogle"
              block
              color="grey"
              depressed
              style="color: #eeeeee"
          >Login with Google
          </v-btn>

          <div style="text-align: center">
            <div class="mt-8">
            <span
                class="mr-2"
                style="font-size: 12px; text-align: center; margin-top: 4px"
            >
              Keinen Account?
            </span>
              <router-link style="font-size: 12px;" to="/register">
                <span>Registrieren</span>
              </router-link>
            </div>

            <div class="mt-3">
              <router-link style="font-size: 12px;" to="/impressum">
                <span> Impressum </span>
              </router-link>
            </div>
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

import firebase from "firebase";

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
    login: function () {
      if (this.password != "" || this.email != "") {


        let tempUser = {
          id: 1,
          vorname: "Sharon",
          nachname: "Chaveiro",
        };

        this.$cookies.set("user", tempUser);
        this.$router.push("/");
      } else {
        this.loginError = true;
      }
    },

    loginWithGoogle: function () {

      let self = this;
      const GoogleProvider = new firebase.auth.GoogleAuthProvider()

      GoogleProvider.addScope('profile')
      GoogleProvider.addScope('email')
      firebase.auth().useDeviceLanguage()

      firebase.auth().signInWithPopup(GoogleProvider)
          .catch(error => {
            // Wenn ein Fehler beim Anmelden auftritt:
            console.log(error)
          }).then(function () {

        //Wenn kein Fehler auftritt gehts hier weiter

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            let tempUser = {
              id: user.uid,
              vorname: user.displayName.split(' ')[0],
              nachname: user.displayName.split(' ')[1],
              email: user.email
            };
            self.$cookies.set("user", tempUser);

            user.getIdToken().then(token => {
              self.$cookies.set("token", token);
            })

          }
        });


        self.$router.push("/");


      });


    }

  },


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