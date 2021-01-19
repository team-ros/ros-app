<template>
    <v-container class="pa-10">
        <router-link to="/login">
            <v-btn icon>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </router-link>
        <v-row>
            <v-col class="col-12 mt-6">
                <h1 class="mb-10 headingsize">{{ $t('site.password_recovery.title') }}</h1>
                <p class="mb-1 normaltextsize" style="margin-top: -35px">
                  {{ $t('site.password_recovery.description') }}
                </p>

                <div class="mt-12">
                    <v-text-field
                        color="#0044b2"
                        type="email"
                        :label="$t('site.password_recovery.email')"
                        v-model="email"
                    ></v-text-field>
                    <v-btn @click="sendMail" block color="#0044b2" depressed style="color: #eeeeee" class="normaltextsize"
                    >                  {{ $t('site.password_recovery.recovery_button') }}

                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-snackbar v-model="sent" :timeout="2000" color="success">
          {{ $t('site.password_recovery.email_sent') }}        </v-snackbar>
        <v-snackbar v-model="emailError" :timeout="2000" color="error">
            {{ errorMessage }}
        </v-snackbar>
    </v-container>
</template>

<script>
import api from "@/api";

export default {
    name: "PasswordRecovery",
    data() {
        return {
            email: "",
            sent: false,
            emailError: false,
            errorMessage: ""
        };
    },
    methods: {
        sendMail() {
            const self = this;
            api.firebase().auth().sendPasswordResetEmail(this.email).then(function () {
                self.sent = true
            }).catch(function (error) {
                self.errorMessage = error
                self.emailError = true
            });
        }
    }
};
</script>

<style scoped></style>