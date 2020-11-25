<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<script>

export default {
    data() {
        return {
            cookieDialog: false
        }
    },
    methods: {},

    created() {

        // Falls beim Öffnen der Website auf EGAL WELCHER Seite (AUSSER LOGIN!!) kein Cookie ist -> auf Login leiten.
        if (this.$route.path != "/login") {
            if (!this.$cookies.isKey("user")) {
                this.$router.push('/login')
            }
        }


    },


};
</script>

<style lang="sass">

@import "assets/Main.sass"


</style>
