<template>
  <div>
    <v-card flat height="200px" tile>
      <v-app-bar color="#1565C0">
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="dialog = true"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-dialog
        overlay-color="#E0E0E0"
        overlay-opacity="1"
        max-width="290"
        v-model="dialog"
      >
        <v-card class="pa-12" color="#E0E0E0">
          <h3>Projektwebsite</h3>
          <a href=""><p>ROS Cloud</p></a>

          <h3>Social Media</h3>
          <v-icon style="float: left; margin-right: 10px"> {{ svgInstagram }}</v-icon
          ><a href="https://www.instagram.com/ros_cloud/"> <p>Instagram</p></a>
          <v-icon style="float: left; margin-right: 10px"> {{ svgTwitter }}</v-icon>
          <a href="https://twitter.com/cloud_ros/"><p>Twitter</p></a>
          <v-icon style="float: left; margin-right: 10px"> {{ svgLinkedIn }}</v-icon>
          <a href="https://www.linkedin.com/in/ros-cloud-5b53aa1b0/"
            ><p>LinkedIn</p></a
          >
          <h3> Hilfe </h3>
          <v-icon style="float: left; margin-right: 10px"> {{ svgImpressum }}</v-icon
        ><router-link to="/impressum"> <p>Impressum</p></router-link>
          <v-icon style="float: left; margin-right: 10px"> {{ svgSupport }}</v-icon
          ><router-link to="/support"> <p>Support</p></router-link>


        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DashboardHeader",
  data: () => ({
    dialog: true,
    svgInstagram: "mdi mdi-instagram",
    svgLinkedIn: "mdi mdi-linkedin",
    svgTwitter: "mdi mdi-twitter",
    svgImpressum: "mdi mdi-information-outline",
    svgSupport: "mdi mdi-email-outline"
  })
};
</script>

<style scoped></style>