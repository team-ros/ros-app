<template>
    <v-container class="pa-10">
        <router-link to="/login">
            <v-btn icon>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </router-link>
        <v-row>
            <v-col class="col-12 mt-6">
                <h1 class="mb-8 headingsize">                  {{ $t('site.register.title') }}
                </h1>
                <p class="mb-1 normaltextsize" style="margin-top: -28px;">
                  {{ $t('site.register.description') }}</p>
                <v-card class="pa-4" color="#eee" flat>


                    <v-text-field
                        :error-messages="emailErrors"
                        v-model="email"
                        class="my-2"
                        color="#0044b2"
                        :label="$t('site.register.email')"
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
                        :label="$t('site.register.password')"
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
                        :label="$t('site.register.passwordAgain')"
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
                    >{{$t('site.register.register_button')}}
                    </v-btn>

                </v-card>
            </v-col>
        </v-row>
        <v-snackbar v-model="registerError" :timeout="2000" color="error">
          {{ $t('site.register.field_empty_error') }}        </v-snackbar>
        <v-snackbar v-model="passwordNotEqual" :timeout="2000" color="error">
          {{ $t('site.register.passwordSameAs_error') }}        </v-snackbar>
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
      !this.$v.email.email && errors.push(this.$t('site.register.invalid_email_error'))
      !this.$v.email.required && errors.push(this.$t('site.register.put_email_error'))
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      if (!this.regexPassword.test(this.password)){
        errors.push(this.$t('site.register.requirements_password_error'))
      }
      !this.$v.password.required && errors.push(this.$t('site.register.put_password_error'))
      !this.$v.password.minLength && errors.push(this.$t('site.register.more_characters_error'))
      return errors
    },
    passwordAgainErrors () {
      const errors = []
      if (!this.$v.passwordAgain.$dirty) return errors
      if (!this.regexPassword.test(this.passwordAgain)){
        errors.push(this.$t('site.register.requirements_password_error'))
      }
      !this.$v.passwordAgain.required && errors.push(this.$t('site.register.put_password_error'))
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
