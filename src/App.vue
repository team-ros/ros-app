<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  data() {
    return {}
  },

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

<style>

#app {
  font-family: 'Montserrat', sans-serif;
  background: #eee;
}

h1, h2, h3, h4 {
  color: black;
}

a {
  color: #0044b2;
  text-decoration: none;
}

h1 {
  font-size: 20px !important;
}

</style>
