<template>
    <v-app>
        <!-- hier ist die Ansicht des Routers, die anzeigt in welcher Route man sich befindet -->
        <router-view></router-view>
    </v-app>
</template>

<script>
import api from "./api";
export default {
    data() {
        return {
            cookieDialog: false
        }
    },
    methods: {},

    created() {

        api.util().persistSession({
            loginUrl: "/login",
            registerUrl: "/#/register",
            dashboardUrl: "/#/",
            reloads: 3
        })

    },


};
</script>

<style lang="sass">

@import "assets/Main.sass"


</style>
