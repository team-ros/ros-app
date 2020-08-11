<template>
  <v-container>
    <v-row>
      <v-col class="col-12 px-6">
        <div style="height: 60px; width: 100%; color: #0044b2;">
          <span style="font-weight: 700; font-size: 18px">ROS</span>
          <span @click="dialog=true" style="float: right "> <i
              class="fas fa-bars fa-lg"></i> </span>
        </div>
      </v-col>
    </v-row>


    <v-dialog
        style="background: red!important;"
        overlay-opacity="1"
        max-width="290"
        v-model="dialog"

    >

      <h2 class="mt-12 mb-4">Projektwebsite</h2>
      <a href=""><p>ROS Cloud</p></a>
      <h2 class="mt-12 mb-4">Social Media</h2>
      <a href="https://www.instagram.com/ros_cloud/"><i style="float: left; margin-right: 5px; margin-top: 3px"
                                                        class="fab fa-instagram"></i>
        <p>Instagram</p></a>
      <a href="https://twitter.com/cloud_ros/"><i style="float: left; margin-right: 5px; margin-top: 3px"
                                                  class="fab fa-twitter"></i>
        <p>Twitter</p></a>
      <a href="https://www.linkedin.com/in/ros-cloud-5b53aa1b0/"
      ><i style="float: left; margin-right: 5px; margin-top: 3px" class="fab fa-linkedin-in"></i>
        <p>LinkedIn</p></a
      >
      <h2 class="mt-12 mb-4"> Hilfe </h2>
      <router-link to="/impressum"><p>Impressum</p></router-link>
      <router-link to="/support"><p>Support</p></router-link>


    </v-dialog>

  </v-container>
</template>

<script>
export default {
  name: "DashboardHeader",
  data: () => ({
    dialog: false,
    svgInstagram: "mdi mdi-instagram",
    svgLinkedIn: "mdi mdi-linkedin",
    svgTwitter: "mdi mdi-twitter",
    svgImpressum: "mdi mdi-information-outline",
    svgSupport: "mdi mdi-email-outline"
  })
};
</script>

<style scoped>

.v-dialog, v-dialog--active {
  position: absolute !important;
  top: 0px !important;
  max-width: 100% !important;
  margin: 50px !important;
  border-radius: 0px !important;
  box-shadow: none !important;
  color: #eeeeee !important;


}

.v-overlay__scrim {
  background-image: url("https://images.wallpapersden.com/image/download/huawei-4k-stock-abstract_66336_1920x1080.jpg");
  background-size: cover;
}

a, h2 {
  text-decoration: none;
  color: #eeeeee !important;
}


</style>