<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import api from "./api";

export default {
  created() {

    api.util().persistSession({
      loginUrl: "/login",
      registerUrl: "/register",
      dashboardUrl: "/",
      reloads: 3
    })
  }
}
</script>

<style lang="sass">
@import "assets/Main.sass"
</style>
