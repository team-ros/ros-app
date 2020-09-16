<template>
  <v-container class="pa-10">
    <router-link to="/">
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </router-link>
    <div>
      <v-col class="col-12 mt-6">
        <h1 class="mb-10">Account</h1>
        <p class="mb-1 normaltextsize" style="margin-top: -35px">
          Hier sind Ihre Accountinformationen zu sehen.
        </p>
        <div class="mt-12">
          <v-text-field
                  color="#0044b2"
                  readonly
                  v-model="user.vorname"
          ></v-text-field>
          <v-text-field
                  color="#0044b2"
                  readonly
                  v-model="user.nachname"
          ></v-text-field>
          <v-text-field
                  color="#0044b2"
                  readonly
                  v-model="user.email"
          ></v-text-field>
          <h1 style="font-size: large; margin-top: 30px;" class="mb-7">Passwort zurücksetzen?</h1>
          <v-text-field
                  color="#0044b2"
                  type="email"
                  label="E-Mail"
                  v-model="email"
          ></v-text-field>
          <v-btn block color="#0044b2" depressed style="color: #eeeeee"
          >Zurücksetzen
          </v-btn>
          </div>
      </v-col>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      user: {}
    };
  },

  mounted() {
    this.user = this.$cookies.get("user")
  }

};
</script>

<style scoped>



</style>