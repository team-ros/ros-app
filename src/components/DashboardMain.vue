<template>
  <div>
    <div>
      <v-container style="position: fixed; top:50px; background: #eeeeee">
        <v-row no-gutters>
          <v-col class="mt-4 col-10">
            <v-text-field
                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px"
                dense
                hide-details
                placeholder="Durchsuchen"
                outlined
                color="#0044b2"
                append-icon="mdi-magnify"
                v-model="search"
            ></v-text-field>
          </v-col>
          <v-col class="mt-4 mb-4 col-2">

            <v-btn @click="openFilterOptions()" block style="border-top-left-radius: 0px; border-bottom-left-radius: 0px; border-left: none"
                   height="40px" color="rgb(118, 118, 118)" outlined><i
                style="color: #0044b2;float: right; font-size: 17px"
                class="fas fa-filter"></i></v-btn>

          </v-col>
        </v-row>
      </v-container>
      <v-container class="pa-0">
        <v-row no-gutters>
          <v-col class="col-12 mt-6">

            <table width="100%">
              <tr v-for="file in filteredList" :key="file">
                <td>
                  <DashboardEntry v-long-press="300"
                                  @long-press-start="openOptions(file.id)" :filetype="file.filetype"
                                  :filename="file.name"></DashboardEntry>
                </td>
              </tr>
            </table>


          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-dialog v-model="fileDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="pa-8">
        <h3 class="mb-4">Optionen</h3>

        <v-btn color="#0044b2" block class="my-4" outlined depressed>Umbenennen</v-btn>
        <v-btn color="#0044b2" block class="my-4" outlined depressed>Löschen</v-btn>





      </v-card>
    </v-dialog>





    <v-dialog v-model="filterDialog" fullscreen class="fileoption"  transition="dialog-bottom-transition">

      <v-card class="pa-8">
        <h3 class="mb-4">Filtern nach</h3>
        <v-btn color="#0044b2" @click="FilterName" block class="my-4" outlined depressed>Name</v-btn>
        <v-btn color="#0044b2" @click="FilterDate" block class="my-4" outlined depressed>Datum</v-btn>
        <v-btn color="#0044b2" @click="FilterType" block class="my-4" outlined depressed>Dateityp</v-btn>
        <v-btn color="#0044b2" @click="FilterSize" block class="my-4" outlined depressed>Dateigröße</v-btn>
      </v-card>

    </v-dialog>





  </div>
</template>

<script>

import firebase from "firebase";
import DashboardEntry from "@/components/DashboardEntry";

export default {

  name: "DashboardFooter",
  data() {
    return {
      fileDialog: false,
      filterDialog: false,
      selectedFile: {},
      search: '',
      ApiResponse: {

        files: [
          {id: 1, name: "Test", filetype: "pdf", size: "5mb"},
          {id: 2, name: "Test2", filetype: "pdf", size: "3mb"},
          {id: 3, name: "Hallo", filetype: "jpg", size: "1mb"},
          {id: 4, name: "Ich bin eine Textdatei_V2", filetype: "txt", size: "12kb"},
          {id: 5, name: "WORdDdd", filetype: "docx", size: "21mb"},
          {id: 6, name: "WORdDdd", filetype: "docx", size: "21mb"},
          {id: 7, name: "WORdDdd", filetype: "jpg", size: "21mb"},
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

    openOptions: function (id) {
      this.fileDialog = true;
      this.selectedFile = this.ApiResponse.files.find(x => x.id === id)

    },

    openFilterOptions: function (){
      this.filterDialog = true;

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
  }
};
</script>

<style>


.v-dialog, .v-dialog--fullscreen {

  height: 40% !important;
  top: auto;
  bottom: 0px !important;

}

table {
  border-collapse: collapse;
}

table, th, td, tr {
  border: 1px solid #a7a7a7;
}

</style>