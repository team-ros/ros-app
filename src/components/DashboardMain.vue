<template>
  <div>
    <v-container style="position: fixed; top:0px">
      <v-row>
        <v-col class="col-12 px-6">
          <div style="height: 60px; width: 100%; color: #0044b2;">
            <span style="font-weight: 700; font-size: 18px">ROS</span>
            <span @click="menuDialog=true" style="float: right "> <i
                class="fas fa-bars fa-lg"></i> </span>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div>
      <v-container style="position: fixed; top:70px;">
        <v-row no-gutters>
          <v-col class="col-10">
            <v-text-field
                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px; font-size: 14px"
                dense
                hide-details
                placeholder="Durchsuchen"
                outlined
                color="#0044b2"
                append-icon="mdi-magnify"
                v-model="search"

            ></v-text-field>
          </v-col>

          <v-col class="mb-4 col-2">

            <v-btn @click="openFilter()" block
                   style="border-top-left-radius: 0px; border-bottom-left-radius: 0px; border-left: none"
                   height="40px" color="rgb(118, 118, 118)" outlined><i
                style="color: #0044b2;font-size: 17px"
                class="fas fa-filter"></i></v-btn>

          </v-col>
        </v-row>
      </v-container>

      <v-container class="pa-0">
        <v-row no-gutters>
          <v-col class="col-12 mt-6">

            <v-btn v-if="depth > 0" @click="backFolder" icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <table width="100%">
              <tr v-for="entry in filteredList" :key="entry.id">
                <td v-if="entry.filetype !== 'folder'" @click="openOptions(entry)">
                  <DashboardEntry
                      :filetype="entry.filetype"
                      :filename="entry.name"
                      :filesize="entry.size"></DashboardEntry>

                </td>
                <td v-else @click="openFolder(entry)">
                  <DashboardEntry
                      :filename="entry.name"></DashboardEntry>

                </td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-dialog v-model="fileDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card color="#eee" class="pa-8">
        <h3 class="mb-4">OPTIONEN</h3>

        <v-btn color="#0044b2" block class="my-4" outlined depressed>Herunterladen</v-btn>
        <v-btn color="#0044b2" block class="my-4" outlined depressed>Löschen</v-btn>
        <v-btn color="#0044b2" block class="my-4" outlined depressed>Verschieben</v-btn>
        <v-btn color="#0044b2" block class="my-4" outlined depressed>Umbenennen</v-btn>

      </v-card>
    </v-dialog>


    <v-dialog v-model="filterDialog" fullscreen class="fileoption" transition="dialog-bottom-transition">

      <v-card color="#eee" class="pa-8">
        <h3 class="mb-4">SORTIERE NACH</h3>
        <v-btn color="#0044b2" @click="filterName" block class="my-4" outlined depressed>Name</v-btn>
        <v-btn color="#0044b2" block class="my-4" outlined depressed>Datum</v-btn>
        <v-btn color="#0044b2" @click="filterType" block class="my-4" outlined depressed>Dateityp</v-btn>
        <v-btn color="#0044b2" @click="filterSize" block class="my-4" outlined depressed>Dateigröße</v-btn>
      </v-card>

    </v-dialog>

    <v-overlay z-index="300" color="#eee" style="color:#000;" opacity="1" :value="menuDialog">

      <v-card flat color="#eee" class="pa-12" light width="100vw" height="100vh">


        <i @click="menuDialog = false" class="fas fa-arrow-left fa-lg mt-6"></i>

        <h2 class="mb-4 mt-6">Projektwebsite</h2>


        <a href=""><p class="blackLink">ROS Cloud</p></a>
        <h2 class="mt-12 mb-4">Social Media</h2>
        <a href="https://www.instagram.com/ros_cloud/" class="blackLink"><i style="float: left; margin-right: 5px; margin-top: 3px"
                                                          class="fab fa-instagram"></i>
          <p>Instagram</p></a>
        <a href="https://twitter.com/cloud_ros/" class="blackLink"><i style="float: left; margin-right: 5px; margin-top: 3px"
                                                    class="fab fa-twitter"></i>
          <p>Twitter</p></a>
        <a href="https://www.linkedin.com/in/ros-cloud-5b53aa1b0/" class="blackLink"
        ><i style="float: left; margin-right: 5px; margin-top: 3px" class="fab fa-linkedin-in"></i>
          <p>LinkedIn</p></a
        >
        <h2 class="mt-12 mb-4"> Hilfe </h2>
        <router-link class="blackLink" to="/impressum"><p>Impressum</p></router-link>
        <router-link class="blackLink" to="/support"><p>Support</p></router-link>

      </v-card>

    </v-overlay>


  </div>
</template>

<script>

import firebase from "firebase";
import DashboardEntry from "@/components/DashboardEntry";


export default {
  name: "DashboardMain",
  data() {
    return {
      fileDialog: false,
      filterDialog: false,
      selectedFile: {},
      search: '',
      menuDialog: false,
      depth: 0,
      lastLocation: [],
      ApiResponse: {

        files: [
          {id: 1, name: "Test1", filetype: "pdf", size: 8898171},
          {id: 2, name: "Test2", filetype: "pdf", size: 12331},
          {id: 3, name: "Testbild", filetype: "jpg", size: 23112231},
          {id: 4, name: "Test3", filetype: "txt", size: 3221},
          {id: 5, name: "Worddatei1", filetype: "docx", size: 1233},
          {id: 6, name: "Worddatei2", filetype: "csv", size: 5123312},
          {id: 7, name: "AAAAA", filetype: "avasdasdi", size: 122},
          {
            id: 8, name: "IchBinEinOrdner", filetype: "folder", files: [
              {id: 9, name: "Test1", filetype: "pdf", size: 8898171},
              {
                id: 8, name: "IchBinEinOrdner", filetype: "folder", files: [
                  {id: 13, name: "Test3", filetype: "txt", size: 3221},
                  {id: 14, name: "Worddatei1", filetype: "docx", size: 1233},
                ]
              },
              {id: 10, name: "Test2", filetype: "pdf", size: 12331},
              {id: 11, name: "Testbild", filetype: "jpg", size: 23112231},
              {id: 12, name: "Test3", filetype: "txt", size: 3221},
            ]
          },
        ]

      }

    }
  },
  methods: {
    logout: function () {

      let self = this;
      firebase.auth().signOut().catch(function (error) {
        //Falls beim LogOut ein Fehler ist ->
        console.log(error)
      }).then(function () {
        //Falls beim LogOut kein Fehler ist:
        // Lösche Cookie und leite auf Login weiter
        self.$cookies.remove("user");
        self.$router.push('/login')
      })

    },

    openOptions: function (file) {

      if (this.filterDialog == true) {
        this.filterDialog = false
        return
      }
      this.fileDialog = true;
      this.selectedFile = file

    },

    openFilter: function () {

      if (this.fileDialog == true) {
        this.fileDialog = false
        return
      }
      this.filterDialog = true;
    },

    filterName: function () {

      this.filteredList.sort(function (a, b) {
        let fileA = a.name.toLowerCase();
        let fileB = b.name.toLowerCase();
        return (fileA < fileB) ? -1 : (fileA > fileB) ? 1 : 0;
      });

      this.filterDialog = false;
    },

    filterType: function () {

      this.filteredList.sort(function (a, b) {
        let fileA = a.filetype.toLowerCase();
        let fileB = b.filetype.toLowerCase();
        return (fileA < fileB) ? -1 : (fileA > fileB) ? 1 : 0;
      });

      this.filterDialog = false;
    },

    filterSize: function () {
      this.filteredList.sort(function (a, b) {
        let fileA = a.size;
        let fileB = b.size;
        return (fileA > fileB) ? -1 : (fileA < fileB) ? 1 : 0;
      });

      this.filterDialog = false;
    },

    openFolder: function (folder) {

      // let tmpFolder = folder.id

      if(this.depth == 0){
        this.lastLocation[this.lastLocation.length] = this.ApiResponse.files;
      }else{
        console.log(this.lastLocation)
        console.log( this.lastLocation[this.lastLocation.length])
        //  this.lastLocation[this.lastLocation.length] = this.ApiResponse.files.find(x => x.id === folder.id)
      }

      this.ApiResponse.files = folder.files
      this.depth++;
      console.log("OPENED FOLDER")
      console.log(this.depth)

    },

    backFolder: function () {
      this.ApiResponse.files = this.lastLocation[this.depth]
      this.depth--;
      console.log("BACK")
      console.log(this.depth)
      console.log(this.lastLocation)

    }

  },

  computed: {
    filteredList() {
      return this.ApiResponse.files.filter(file => {
        return file.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  components: {
    DashboardEntry
  },

  mounted() {



  }
};
</script>

<style>


.v-dialog, .v-dialog--fullscreen {

  height: 40% !important;
  top: auto;
  bottom: 0px !important;


}

.blackLink{
  color: black!important;
}

table {
  border-collapse: collapse;
}

table, th, td, tr {
  border: 1px solid #a7a7a7;
}

</style>