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
                        :error-messages="emailErrors"
                        v-model="email"
                        class="my-2"
                        color="#0044b2"
                        label="E-Mail"
                        type="email"
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                    ></v-text-field>

                    <v-text-field
                        :error-messages="passwordErrors"
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        class="my-2"
                        color="#0044b2"
                        label="Passwort"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        @click:append="show = !show"
                    ></v-text-field>

                    <v-text-field
                        :error-messages="passwordAgainErrors"
                        v-model="passwordAgain"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        class="my-2"
                        color="#0044b2"
                        label="Passwort wiederholen"
                        @input="$v.passwordAgain.$touch()"
                        @blur="$v.passwordAgain.$touch()"
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
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import api from "@/api";




export default {

  mixins: [validationMixin],
    name: "Register",
  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(8)
    },
    passwordAgain: {
      required
    },

  },
    data() {
        return {
            regexPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
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

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Keine gültige E-Mail-Adresse')
      !this.$v.email.required && errors.push('Bitte geben Sie eine E-Mail-Adresse ein')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      if (!this.regexPassword.test(this.password)){
        errors.push('Bitte verwenden Sie Klein- und Großbuchstaben, sowie Zahlen und Sonderzeichen')
      }
      !this.$v.password.required && errors.push('Bitte geben Sie ein Passwort ein')
      !this.$v.password.minLength && errors.push('Bitte geben Sie mehr als 8 Zeichen ein')
      return errors
    },
    passwordAgainErrors () {
      const errors = []
      if (!this.$v.passwordAgain.$dirty) return errors
      if (!this.regexPassword.test(this.passwordAgain)){
        errors.push('Bitte verwenden Sie Klein- und Großbuchstaben, sowie Zahlen und Sonderzeichen')
      }
      !this.$v.passwordAgain.required && errors.push('Bitte geben Sie ein Passwort ein')
      return errors
    },
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
