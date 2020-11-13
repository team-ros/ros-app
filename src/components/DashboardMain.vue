<template>
  <div v-if="responseLoaded === true">
    <v-container style="position: fixed; top:0; background-color:#eee!important">
      <v-row>
        <v-col class="col-12 px-6">
          <div style="width: 100%; color: #0044b2;">
            <span style="font-weight: 700; font-size: 18px">ROS</span>
            <span style="float: right " @click="menuDialog=true"> <i
                class="fas fa-bars fa-lg"></i> </span>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="col-10">
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              color="#0044b2"
              dense
              hide-details
              outlined
              placeholder="Durchsuchen"
              style="border-top-right-radius: 0px; border-bottom-right-radius: 0px; font-size: 14px"
          ></v-text-field>
        </v-col>

        <v-col class="mb-4 col-2">
          <v-btn block color="rgb(118, 118, 118)"
                 height="40px"
                 outlined style="border-top-left-radius: 0px; border-bottom-left-radius: 0px; border-left: none"
                 @click="openFilter()"><i
              class="fas fa-filter"
              style="color: #0044b2;font-size: 17px"></i></v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="pa-0" style="margin-bottom: 100px!important; margin-top: 120px">
      <v-row no-gutters>
        <v-col class="col-12 mt-6">
          <table width="100%">
            <tr v-for="entry in filteredList" :key="entry.id">
              <td v-if="entry.filetype !== 'folder'" @click="openOptions(entry)">
                <DashboardEntry
                    :filename="entry.name"
                    :filesize="entry.size"
                    :filetype="entry.type"></DashboardEntry>
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

    <v-dialog v-model="fileDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card style="padding: 20px!important;" color="#eee">
        <h3 class="mb-4">OPTIONEN</h3>
        <v-btn block class="my-4" color="#0044b2" depressed outlined>Herunterladen</v-btn>
        <v-btn block class="my-4" color="#0044b2" depressed outlined>Löschen</v-btn>
        <v-btn block class="my-4" color="#0044b2" depressed outlined>Verschieben</v-btn>
        <v-btn block class="my-4" color="#0044b2" depressed outlined>Umbenennen</v-btn>
      </v-card>
    </v-dialog>


    <v-dialog v-model="filterDialog" class="fileoption" fullscreen transition="dialog-bottom-transition">
      <v-card style="padding: 20px!important;" class="pa-8" color="#eee">
        <h3 class="mb-4">SORTIERE NACH</h3>
        <v-btn block class="my-4" color="#0044b2" depressed outlined @click="filterName">Name</v-btn>
        <v-btn block class="my-4" color="#0044b2" depressed outlined>Datum</v-btn>
        <v-btn block class="my-4" color="#0044b2" depressed outlined @click="filterType">Dateityp</v-btn>
        <v-btn block class="my-4" color="#0044b2" depressed outlined @click="filterSize">Dateigröße</v-btn>
      </v-card>
    </v-dialog>

    <v-overlay :value="menuDialog" color="#eee" opacity="1" style=" color:#000;" z-index="300">

      <v-card class="pa-12" color="#eee" flat height="100vh" light width="100vw">


        <i class="fas fa-arrow-left fa-lg mt-6" @click="menuDialog = false"></i>

        <h2 class="mb-4 mt-6 headingsize">Projektwebsite</h2>


        <a href=""><p class="blackLink normaltextsize">ROS Cloud</p></a>
        <h2 class="mt-12 mb-4 headingsize">Social Media</h2>
        <a class="blackLink" href="https://www.instagram.com/ros_cloud/"><i
            class="fab fa-instagram"
            style="float: left; margin-right: 5px; margin-top: 3px"></i>
          <p class="normaltextsize">Instagram</p></a>
        <a class="blackLink" href="https://twitter.com/cloud_ros/"><i
            class="fab fa-twitter"
            style="float: left; margin-right: 5px; margin-top: 3px"></i>
          <p class="normaltextsize">Twitter</p></a>
        <a class="blackLink" href="https://www.linkedin.com/in/ros-cloud-5b53aa1b0/"
        ><i class="fab fa-linkedin-in" style="float: left; margin-right: 5px; margin-top: 3px"></i>
          <p class="normaltextsize">LinkedIn</p></a
        >
        <h2 class="mt-12 mb-4 headingsize"> Hilfe </h2>
        <router-link class="blackLink normaltextsize" to="/impressum"><p>Impressum</p></router-link>
        <router-link class="blackLink normaltextsize" to="/support"><p>Support</p></router-link>
        <a class="blackLink" href="https://www.google.com/">
          <p class="normaltextsize">DSGVO</p></a>

      </v-card>

    </v-overlay>
    <div class="pa-2" style="background: #0044b2; height: 75px; width: 100%; position: fixed; bottom: 0">
      <v-row style="color: #eeeeee; text-align: center;">
        <v-col class="col-4"><i class="fas fa-sign-out-alt fa-lg" @click="logout"></i></v-col>
        <v-col class="col-4">
          <input type="file" ref="file" style="display: none"  @change="fileUpload">
          <i @click="$refs.file.click()" class="fas fa-plus fa-lg"></i>
        </v-col>
        <v-col class="col-4"><i class="fas fa-user fa-lg" @click="$router.push('/account')"></i></v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

import firebase from "firebase";
import DashboardEntry from "@/components/DashboardEntry";
import api from "@/api";
export default {
  name: "DashboardMain",
  data() {
    return {
      responseLoaded: false,
      fileDialog: false,
      filterDialog: false,
      selectedFile: {},
      search: '',
      menuDialog: false,
      response: {},
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
        self.$cookies.remove("token");
        self.$router.push('/login')
      })
    },
    fileUpload() {
      const file = this.$refs.file.files[0];
      console.log(file)
      api.object().upload(file)
          .then(uploadResponse => {
            console.log(uploadResponse);
            api.object().get()
                .then(fileResponse => {
                  this.response = fileResponse
                })
          })
          .catch(err => console.log(err))
    },
    // testweise API Call für den Ordner erstellen
    async createFolder() {
      try {
        const response = await api.object().createDir('test', "13a3acd5-fcdd-40c9-bede-93f024cf60a3")
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
    // testweise API Call für bestimmten Ordnerinhalt anzeigen
    async listFolder() {
      try {
        const response = await api.object().get('13a3acd5-fcdd-40c9-bede-93f024cf60a3')
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
    // Upload Funktion um Dateien in die Cloud zu laden
    async selectFile(val) {
      try {
        const response = await api.object().upload(val)
        console.log(response)
      } catch (err) {
        console.log(err)
      }
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
  },
  computed: {
    filteredList() {
      return this.response.listing.filter(file => {
        return file.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  components: {
    DashboardEntry
  },
  mounted() {
    // hier müssen wir aufgrund eines Bugs den Token aus dem
    // Localstorage holen und wieder an die API übergeben
    // das fällt mit dem Bugfix wieder raus
    api.token().set(localStorage.getItem('token'))
    // hier holen wir sobald die Seite geladen hat den
    // Rootordner und den Inhalt dessen

    api.object().get()
        .then(response => {
          console.log(response)
          // this.responseLoaded verwenden wir weil wir erst die
          // Seite mit daten befüllen wollen sobald wir diese von
          // der API bekommen haben
          // wird ganz oben im Template überprüft ob true
          // default: false
          this.responseLoaded = true
          this.response = response
        })
        .catch(err => {
          console.log(err)
        })
  }
};
</script>

<style>

.v-dialog, .v-dialog--fullscreen {

  height: 40% !important;
  top: auto;
  bottom: 0px !important;

}

.blackLink {
  color: black !important;
}

table {
  border-collapse: collapse;
}

table, th, td, tr {
  border: 1px solid #a7a7a7;
}

</style>
