<template>
    <div class="pa-2" style="background: #0044b2; height: 60px; width: 100%; position: fixed; bottom: 0">
        <v-row style="color: white; text-align: center;">
            <v-col class="col-4"><p>Test</p></v-col>
            <v-col class="col-4"><p>Test</p></v-col>
            <v-col class="col-4"><i @click="logout" class="fas fa-sign-out-alt fa-lg"></i></v-col>

        </v-row>
    </div>
</template>

<script>

    import firebase from "firebase";

    export default {

        name: "DashboardFooter",
        data() {
            return {}
        },
        methods: {
            logout: function () {

                let self = this;
                firebase.auth().signOut().catch(function (error) {
                    //Falls beim LogOut ein Fehler ist ->
                    console.log(error)
                }).then(function () {
                    //Falls beim LogOut kein Fehler ist:
                    // Lösche Cookie und leite auf Login weiter
                    self.$cookies.remove("user");
                    self.$router.push('/login')
                })


            }
        }
    };
</script>

<style scoped></style>