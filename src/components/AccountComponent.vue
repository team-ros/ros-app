<template>
    <v-container class="pa-10">
        <router-link to="/">
            <v-btn icon>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </router-link>
        <div>
            <v-col class="col-12 mt-6">
                <h1 class="mb-10 headingsize">Account</h1>
                <p class="mb-1 normaltextsize" style="margin-top: -35px">
                    Hier sind Ihre Accountinformationen zu sehen.
                </p>
                <div class="mt-6">
                    <v-text-field
                        color="#0044b2"
                        readonly
                        v-if="user.displayName"
                        v-model="user.displayName"
                    ></v-text-field>
                    <v-text-field
                        color="#0044b2"
                        readonly
                        v-model="user.email"
                    ></v-text-field>
                    <h1 style="font-size: large; margin-top: 30px;" class="mb-6">Passwort zurücksetzen?</h1>
                    <v-text-field
                        color="#0044b2"
                        type="email"
                        label="E-Mail"
                        v-model="email"
                    ></v-text-field>
                    <v-btn @click="sendMail" block color="#0044b2" depressed style="color: #eeeeee"
                    >Zurücksetzen
                    </v-btn>
                </div>
            </v-col>
        </div>
        <v-snackbar v-model="sent" :timeout="2000" color="success">
            Email wurde versendet!
        </v-snackbar>
        <v-snackbar v-model="emailError" :timeout="2000" color="error">
            {{ errorMessage }}
        </v-snackbar>
    </v-container>
</template>

<script>
import api from "@/api"

export default {
    name: "Account",
    data() {
        return {
            user: {},
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
    },

    mounted() {
        this.user = api.firebase().auth().currentUser
    }

};
</script>

<style scoped>


</style>