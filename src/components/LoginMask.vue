<template>
  <v-container class="pa-10">
    <v-row>
      <v-col class="col-12 mt-10 text-center">
        <img width="68%" src="../assets/ROS_Logo.png"/>
      </v-col>

      <v-col class="col-12 mt-6">
        <v-card color="#eee" flat class="pa-4">
          <h1 style="text-align: center" class="mb-8 headingsize">
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
            <p class="smalltextsize linkinblack" style="text-align: right">
              Passwort vergessen?
            </p>
          </router-link>

          <div style="margin-top: 50px"></div>

          <v-btn
              block
              color="#0044b2"
              depressed
              style="color: #eeeeee;"
              class="normaltextsize"
          >Login
          </v-btn>

          <v-btn
              class="my-4 normaltextsize"
              @click="loginWithGoogle"
              block
              color="grey"
              depressed
              style="color: #eeeeee"

          >Login with Google
          </v-btn>

          <div>
            <div class="mt-2">

              <router-link class="smalltextsize linkinblack" to="/register">
                <p style="text-align: right">
                  Noch keinen Account?
                </p>
              </router-link>
            </div>

            <div style="text-align: center" class="mt-12">
              <router-link class="smalltextsize linkinblack" style="margin-right: 5px" to="/impressum">
                <span> Impressum </span>
              </router-link>
              <span style="font-size: 20px; color: grey!important;">
                |
              </span>
              <a href="http://www.google.com" class="smalltextsize linkinblack" style=" margin-left: 5px">
                <span> DSGVO </span>
              </a>
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
import api from "@/api";

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

            // speichern uns hier mal testweise den user
            // den wir von Firebase zurückbekommen
            let tempUser = {
              id: user.uid,
              vorname: user.displayName.split(' ')[0],
              nachname: user.displayName.split(' ')[1],
              email: user.email
            };
            self.$cookies.set("user", tempUser);

            // hier bekommen wir unseren token den wir an die API
            // übergeben um uns in der API zu verifizieren

            user.getIdToken().then(token => {
            api.token().set(token)
              self.$router.push("/");
            })
          }
        });
      });
    }
  },


};
</script>

<style scoped>
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 0px !important;
}

.v-application .mt-10 {
  margin-top: 0px!important;
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
