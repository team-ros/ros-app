<template>
    <v-container class="pa-10">
        <v-row>
            <v-col class="col-12 mt-10 text-center">
                <img width="60%" src="../assets/ROS_Logo.png">
            </v-col>

            <v-col class="col-12 mt-6">
                <div style="height: 5px; width: 100%; background-color:#0044b2 "></div>
                <v-card flat class="pa-4">
                    <p style="font-weight: 700;font-size: 20px">Login</p>


                    <v-text-field
                            color="#0044b2"
                            dense
                            type="email"
                            label="Email Adresse"
                            outlined
                            v-model="email"

                    ></v-text-field>

                    <v-text-field
                            color="#0044b2"
                            dense
                            label="Passwort"
                            outlined
                            v-model="password"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
                    ></v-text-field>

                    <v-btn @click="toDashboard" style="color: #eeeeee" color="#0044b2" block depressed small>Login
                    </v-btn>

                    <p class=" mt-4" style="font-size: 12px">Passwort vergessen?</p>
                <router-link to="/register"><p class=" mt-2 mb-0" style="font-size: 12px">Registrieren</p></router-link>





                </v-card>
            </v-col>

        </v-row>
        <v-snackbar
                v-model="loginError"
                :timeout=2000
                color="error"
        >
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
            }
        },
        methods: {

            toDashboard: function () {

                if (this.password != "" || this.email != "") {

                    let gebDate = new Date('07.04.2000');

                    let tempUser = {
                        id: 1,
                        vorname: "Sharon",
                        nachname: "Chaveiro",
                        geburtsdatum: gebDate
                    }

                    this.$cookies.set('user', tempUser)
                    this.$router.push("/")
                } else {
                    this.loginError = true
                }


            }

        }
    }
</script>

<style scoped>

    .v-card:not(.v-sheet--tile):not(.v-card--shaped) {
        border-radius: 0px !important;
    }

</style>