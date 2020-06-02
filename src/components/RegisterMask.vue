<template>
    <v-container class="pa-10">
        <v-row>
            <v-col class="col-12 mt-6">
                <div style="height: 5px; width: 100%; background-color:#0044b2 "></div>
                <v-card class="pa-4" flat>
                    <p style="font-weight: 700;font-size: 20px">Registrieren</p>

                    <v-text-field
                            color="#0044b2"
                            dense
                            label="Vorname"
                            outlined
                            type="vorname"
                            v-model="vorname"

                    ></v-text-field>
                    <v-text-field
                            color="#0044b2"
                            dense
                            label="Nachname"
                            outlined
                            type="nachname"
                            v-model="nachname"

                    ></v-text-field>

                    <v-text-field
                            color="#0044b2"
                            dense
                            label="Email Adresse"
                            outlined
                            type="email"
                            v-model="email"

                    ></v-text-field>

                    <v-text-field
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
                            color="#0044b2"
                            dense
                            label="Passwort"
                            outlined
                            v-model="password"
                    ></v-text-field>

                    <v-text-field
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
                            color="#0044b2"
                            dense
                            label="Passwort wiederholen"
                            outlined
                            v-model="passwordAgain"
                    ></v-text-field>

                    <v-btn @click="register" block color="#0044b2" depressed small style="color: #eeeeee">Registrieren
                    </v-btn>


                    <router-link to="/login"><p class=" mt-2 mb-0" style="font-size: 12px"> Schon registriert? </p>
                    </router-link>


                </v-card>
            </v-col>

        </v-row>
        <v-snackbar
                :timeout=2000
                color="error"
                v-model="registerError"
        >
            Ein Feld ist leer. Bitte überprüfen.
        </v-snackbar>
        <v-snackbar
                :timeout=2000
                color="error"
                v-model="passwordNotEqual"
        >
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
            }
        },
        methods: {

            register: function () {

                if (this.password == "" || this.email == "" || this.vorname == "" || this.nachname == "" || this.passwordAgain == "") {
                    this.registerError = true
                } else if (this.password != this.passwordAgain) {
                    this.passwordNotEqual = true
                } else {
                    this.$router.push("/Login")
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