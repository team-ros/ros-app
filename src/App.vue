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
  methods: {


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

<style lang="sass">

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap')

$font: 'Montserrat', sans-serif !important
$backgroundcolor: #eee
$rosblue: #0044b2 !important
$smalltextsize: 12px
$normaltextsize: 16px
$filenamesize: 14px


#app
  font-family: $font
  background: $backgroundcolor
n

h1, h2, h3, h4
  color: black


a
  color: $rosblue
  text-decoration: none

.smalltextsize
  font-size: $smalltextsize!important

.normaltextsize
  font-size: $normaltextsize!important

.filenamesize
  font-size: $filenamesize!important

</style>
