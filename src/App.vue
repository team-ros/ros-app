<template>
  <v-app>
    <router-view></router-view>

    <v-overlay z-index="300" :value="cookieDialog">


      <v-card style="color:#000!important;" color="#eee" class="pa-8">
        <h3 class="mb-4 text-center">Wir benutzen Cookies.</h3>
        <p style="text-align: justify; font-size: 14px">Cookies werden zur Benutzerführung und Webanalyse verwendet und
          helfen dabei, diese App zu verbessern. Durch
          die weitere Nutzung dieser Webseite erklären Sie sich mit unserer Cookie-Policy einverstanden.</p>

        <p style="text-align: justify; font-size: 14px"> Mehr Infos hier: <span style="color: #0044b2!important;"><a
            href="https://google.com">DSGVO</a> </span></p>

        <v-row>
          <v-col class="col-6">
            <v-btn @click="denyCookies" style="font-size: 12px!important;" depressed block>Ablehnen</v-btn>
          </v-col>
          <v-col class="col-6">
            <v-btn @click="allowCookies" style="font-size: 12px!important;" depressed block color="#0044b2">
              Akzeptieren
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-overlay>
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

    allowCookies: function () {
      this.$cookies.set('cookiesAllowed', true)
    },

    denyCookies: function () {
      this.$session.set('cookiesDenied', true)
    }

  },

  created() {

    // Falls beim Öffnen der Website auf EGAL WELCHER Seite (AUSSER LOGIN!!) kein Cookie ist -> auf Login leiten.
    if (this.$route.path != "/login") {
      if (!this.$cookies.isKey("user")) {
        this.$router.push('/login')
      }
    }


    if (this.$cookies.isKey('cookiesAllowed')) {
      console.log("Cookies sind erlaubt!")
    } else if (this.$session.has('cookiesDenied')) {
      console.log("Cookies sind verboten!")
    } else {
      this.cookieDialog = true
    }


  },


};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

#app {
  font-family: 'Montserrat', sans-serif !important;
  background: #eee;

}


h1, h2, h3, h4 {
  color: black;
}

a {
  color: #0044b2 !important;
  text-decoration: none;
}


</style>
