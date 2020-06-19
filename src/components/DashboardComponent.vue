<template>
  <!-- <div v-if="this.$cookies.get('user') != undefined">
        <p> {{this.$cookies.get('user').vorname}}</p>
    </div> -->
  <v-container class="pa-0">
    <v-card flat height="200px" tile>
      <v-app-bar color="#1565C0">
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute right>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <!--<v-bottom-navigation height="60" class="mt-12"
              v-model="bottomNav"
      >
          <v-btn value="recent">
              <span>Recent</span>
              <v-icon>mdi-history</v-icon>
          </v-btn>

          <v-btn value="favorites">
              <span>Favorites</span>
              <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn value="nearby">
              <span>Nearby</span>
              <v-icon>mdi-map-marker</v-icon>
          </v-btn>
      </v-bottom-navigation> -->
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    drawer: false
  }),
  beforeCreate() {
    if (this.$cookies.get("user") == undefined) {
      this.$router.push("/Login");
    }
  }
};
</script>

<style scoped></style>