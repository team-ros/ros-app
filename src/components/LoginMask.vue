<template>
    <v-container class="pa-10 login">
        <v-row>
            <v-col class="col-12 mt-10 text-center">
                <img width="68%" src="../assets/ROS_Logo.png"/>
            </v-col>

            <v-col class="col-12 mt-6">
                <v-card color="#eee" flat class="pa-4">
                    <h1 class="mb-8 headingsize text-center">
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
                        <p class="smalltextsize linkinblack text-right">
                            Passwort vergessen?
                        </p>
                    </router-link>

                    <div class="mt-12"></div>

                    <v-btn
                        @click="login"
                        block
                        color="#0044b2"
                        depressed
                        class="normaltextsize color_eee"
                    >Login
                    </v-btn>

                    <v-btn
                        class="my-4 normaltextsize color_eee"
                        @click="loginWithGoogle"
                        block
                        color="grey"
                        depressed

                    >Login with Google
                    </v-btn>

                    <div>
                        <div class="mt-2">

                            <router-link class="smalltextsize linkinblack" to="/register">
                                <p class="text-right">
                                    Noch keinen Account?
                                </p>
                            </router-link>
                        </div>

                        <div class="mt-12 text-center">
                            <router-link class="smalltextsize linkinblack" to="/impressum">
                                <span> Impressum </span>
                            </router-link>
                            <span class="footer">
                |
              </span>
                            <a href="http://www.google.com" class="smalltextsize linkinblack">
                                <span> DSGVO </span>
                            </a>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar v-model="loginError" :timeout="2000" color="error">
            {{ errorMessage }}
        </v-snackbar>
    </v-container>
</template>

<script>


import api from "@/api";

export default {
    name: "Login",
    data() {
        return {
            password: "",
            email: "",
            show: false,
            loginError: false,
            errorMessage: "",
        };
    },
    methods: {
        loginWithGoogle: function () {
            let self = this;
            const PreGoogleProvider = api.firebase().auth;
            const GoogleProvider = new PreGoogleProvider.GoogleAuthProvider();

            GoogleProvider.addScope('profile')
            GoogleProvider.addScope('email')

            api.firebase().auth().useDeviceLanguage()
            api.firebase().auth().signInWithPopup(GoogleProvider)
                .catch(error => {
                    // Wenn ein Fehler beim Anmelden auftritt:
                    console.log(error)
                }).then(function () {

                //Wenn kein Fehler auftritt gehts hier weiter

                api.firebase().auth().onAuthStateChanged(function (user) {
                    if (user) {
                        self.$router.push("/");
                    }
                });
            });
        },
        login: function () {
            api.firebase().auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.push("/");
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    this.loginError = true
                });

        }
    },


};
</script>
