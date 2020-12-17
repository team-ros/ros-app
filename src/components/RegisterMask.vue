<template>
    <v-container class="pa-10">
        <router-link to="/login">
            <v-btn icon>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </router-link>
        <v-row>
            <v-col class="col-12 mt-6">
                <h1 class="mb-8 headingsize">Registrieren</h1>
                <p class="mb-1 normaltextsize" style="margin-top: -28px;">
                    Hier können Sie sich registrieren, wenn
                    Sie noch keinen Account haben.</p>
                <v-card class="pa-4" color="#eee" flat>


                    <v-text-field
                        v-model="email"
                        class="my-2"
                        color="#0044b2"
                        label="E-Mail"
                        type="email"
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        class="my-2"
                        color="#0044b2"
                        label="Passwort"
                        @click:append="show = !show"
                    ></v-text-field>

                    <v-text-field
                        v-model="passwordAgain"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        class="my-2"
                        color="#0044b2"
                        label="Passwort wiederholen"
                        @click:append="show = !show"
                    ></v-text-field>

                    <v-btn
                        block
                        color="#0044b2"
                        depressed
                        style="color: #eeeeee"
                        @click="register"
                    >Registrieren
                    </v-btn>

                </v-card>
            </v-col>
        </v-row>
        <v-snackbar v-model="registerError" :timeout="2000" color="error">
            Ein Feld ist leer. Bitte überprüfen.
        </v-snackbar>
        <v-snackbar v-model="passwordNotEqual" :timeout="2000" color="error">
            Die Passwörter sind nicht ident. Bitte überprüfen.
        </v-snackbar>
        <v-snackbar v-model="firebaseError" :timeout="2000" color="error">
            {{firebaseErrorMessage }}
        </v-snackbar>
    </v-container>
</template>

<script>
import api from "@/api";
export default {
    name: "Register",
    data() {
        return {
            email: "",
            password: "",
            passwordAgain: "",
            show: false,
            registerError: false,
            passwordNotEqual: false,
            firebaseError: false,
            firebaseErrorMessage: ""
        };
    },
    methods: {
        register: function () {
            if (
                this.email == "" ||
                this.password == "" ||
                this.passwordAgain == ""
            ) {
                this.registerError = true;
            } else if (this.password != this.passwordAgain) {
                this.passwordNotEqual = true;
            } else {

                api.firebase().auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        this.$router.push("/Login");
                    })
                    .catch((error) => {
                        this.firebaseError = true;
                        this.firebaseErrorMessage = error;
                    });

            }
        }
    }
};
</script>

<style scoped>
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    border-radius: 0px !important;
}

.v-label, .v-input {
    font-size: 14px !important;
}

</style>
