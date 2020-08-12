<template>
  <v-container class="pa-10">
    <router-link to="/Login">
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </router-link>
    <div>
      <v-col class="col-12 mt-6">
        <h1 class="mb-10">Impressum</h1>
        <p class="mb-1" style="margin-top: -35px">
        </p>
        <div class="mt-12" style="font-size: 13px">
          <p > Für diese App verantwortlicher Herausgeber:</p>
          <p> Sharon Chaveiro </p>
          <p> Rennweg 89B</p>
          <p> 1030 Wien</p>
          <p> Österreich</p>
          <br>
          <p> Telefon: +43 660 9 26 35 81</p>
          <p> E-Mail: chaveiro@ros-cloud.at
          </p>
          <p> Internet: www.ros-cloud.at</p>
        </div>
        <div class="mt-12" style="font-size: 13px">
          <p> Für etwaige Fragen wenden Sie sich an den Support unter der E-Mail-Adresse:
            info@ros-cloud.at. </p>
        </div>




      </v-col>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Impressum",
  data() {
    return {
    };
  }
};
</script>

<style scoped>
</style>