<template>
    <div v-if="responseLoaded === true">
        <v-container style="position: fixed; top:0; background-color:#eee!important">
            <!-- ==== HEADER  ==== -->
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
                           outlined
                           style="border-top-left-radius: 0px; border-bottom-left-radius: 0px; border-left: none"
                           @click="openFilter()"><i
                        class="fas fa-filter"
                        style="color: #0044b2;font-size: 17px"></i></v-btn>
                </v-col>
            </v-row>
        </v-container>

        <v-overlay :value="menuDialog" color="#eee" opacity="1" style=" color:#000;" z-index="300">
            <v-card class="pa-12" color="#eee" flat height="100vh" light width="100vw">
                <i class="fas fa-arrow-left fa-lg mt-6" @click="menuDialog = false"></i>
                <h2 class="mb-4 mt-6 headingsize">Ihr Account</h2>
                <router-link class="blackLink normaltextsize" to="/account"><p>ROS Account bearbeiten</p></router-link>
                <h2 class="mb-4 mt-12 headingsize">Projektwebsite</h2>
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

        <!-- ==== BODY  ==== -->
        <v-container class="pa-0" style="margin-bottom: 100px!important; margin-top: 120px">
            <v-row no-gutters>
                <v-col class="col-12 mt-4 pl-4">
                    <i v-if="parentIDStorage.length === 0" class="fas fa-arrow-left backarrow"></i>
                    <i v-else class="fas fa-arrow-left backarrow-blue" @click="goBack"></i>
                </v-col>
                <v-col class="col-12 mt-4">
                    <table width="100%">
                        <tr v-for="entry in response" :key="entry.id">
                            <td v-if="entry.type === 'file'">
                                <DashboardEntry @openOptions="openOptions"
                                                :entry="entry"
                                ></DashboardEntry>
                            </td>
                            <td v-else>
                                <DashboardEntry @openOptions="openOptions" @openFolder="showFolderContent"
                                                :entry="entry"
                                ></DashboardEntry>
                            </td>
                        </tr>
                    </table>
                </v-col>
            </v-row>
        </v-container>

        <!-- ==== DIALOGS  ==== -->
        <v-dialog v-model="fileDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card color="#eee" style="padding: 20px!important;">
                <h3 class="mb-4">OPTIONEN</h3>
                <v-btn block class="my-4" color="#0044b2" depressed outlined>Herunterladen</v-btn>
                <v-btn @click="deleteEntry" block class="my-4" color="#0044b2" depressed outlined>Löschen</v-btn>
                <v-btn block class="my-4" color="#0044b2" depressed outlined>Verschieben</v-btn>
                <v-btn @click="renameEntry" block class="my-4" color="#0044b2" depressed outlined>Umbenennen</v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="filterDialog" class="fileoption" fullscreen transition="dialog-bottom-transition">
            <v-card class="pa-8" color="#eee" style="padding: 20px!important;">
                <h3 class="mb-4">SORTIERE NACH</h3>
                <v-btn block class="my-4" color="#0044b2" depressed outlined @click="filterName">Name</v-btn>
                <v-btn block class="my-4" color="#0044b2" depressed outlined>Datum</v-btn>
                <v-btn block class="my-4" color="#0044b2" depressed outlined @click="filterType">Dateityp</v-btn>
                <v-btn block class="my-4" color="#0044b2" depressed outlined @click="filterSize">Dateigröße</v-btn>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="uploadError" :timeout="2000" color="error">
            Die Datei ist zu groß.
        </v-snackbar>
        <v-snackbar v-model="error" :timeout="3210 " color="error">
            {{errorMessage}}
        </v-snackbar>
        <!-- ==== FOOTER  ==== -->

        <div class="pa-2" style="background: #0044b2; height: 75px; width: 100%; position: fixed; bottom: 0">
            <v-row style="color: #eeeeee; text-align: center;">
                <v-col class="col-4"><i class="fas fa-sign-out-alt fa-lg" @click="logout"></i></v-col>
                <v-col class="col-4">
                    <input ref="file" style="display: none" type="file" @change="fileUpload">
                    <i class="fas fa-file fa-lg" @click="$refs.file.click()"></i>
                </v-col>
                <v-col @click="createFolder" class="col-4"><i class="fas fa-folder fa-lg"></i></v-col>
            </v-row>
        </div>
    </div>

</template>
<script>

import _ from 'lodash';
import DashboardEntry from "@/components/DashboardEntry";
import api from "@/api";

export default {
    name: "DashboardMain",
    data() {
        return {
            responseLoaded: false,
            fileDialog: false,
            filterDialog: false,
            menuDialog: false,
            selectedFile: {},
            search: '',
            response: {},
            currentParentID: null,
            parentIDStorage: [],
            uploadError: false,
            error: false,
            errorMessage: ""
        }
    },
    methods: {
        logout: function () {
            let self = this;
            api.firebase().auth().signOut().catch(function (error) {
                //Falls beim LogOut ein Fehler ist ->
                console.log(error)
            }).then(function () {
                // DEPRECATED
                //Falls beim LogOut kein Fehler ist:
                // Lösche Cookie und leite auf Login weiter
                // self.$cookies.remove("user");
                // self.$cookies.remove("token");
                self.$router.push('/login')
            })
        },
        // Upload Funktion um Dateien in die Cloud zu laden
        fileUpload() {
            const file = this.$refs.file.files[0];
            const self = this

            if (file.size < 100000000) {
                api.object().upload(file, null, this.currentParentID)
                    .then(function (response) {
                        if(response.status === false){
                            self.error = true
                            self.errorMessage = response.message
                        }
                        self.showFolderContent(self.currentParentID)
                    })
                    .catch(err => console.log(err))
            } else {
                this.uploadError = true;
            }

        },
        // testweise API Call für den Ordner erstellen
        async createFolder() {
            let self = this
            let name = window.prompt("Bitte geben Sie einen Ordnernamen an:", "Neuer Ordner");

            if (name) {
                api.object().createDir(name, this.currentParentID)
                    .then(function (response) {
                        if(response.status === false){
                            self.error = true
                            self.errorMessage = response.message
                        }
                        self.showFolderContent(self.currentParentID)
                    })
                    .catch(err => console.log(err))

            }
        },
        // testweise API Call für bestimmten Ordnerinhalt anzeigen
        async showFolderContent(id, goBack) {

            if (id && !goBack) {
                this.parentIDStorage.push(this.currentParentID)
            }

            if (id) {
                this.currentParentID = id
            }

            console.log(this.currentParentID)
            let response
            if(!id){
                response = await api.object().get()
                console.log("NEIN")
            }else {
                response = await api.object().get(this.currentParentID)
                console.log("JA")
            }
            this.responseLoaded = true
            this.response = response.listing
            console.log(response)
        },

        async goBack() {

            this.showFolderContent(this.parentIDStorage[this.parentIDStorage.length - 1], true)
            this.parentIDStorage.pop()
        },

        async deleteEntry() {
            const self = this
            api.object().remove(this.selectedFile.id)
                .then(function () {
                    self.showFolderContent(self.currentParentID);
                    self.fileDialog = false;
                })
                .catch(err => console.log(err))

        },

        async renameEntry() {
            const self = this
            let name = window.prompt("Bitte geben Sie einen neuen Dateinamen an:", this.selectedFile.name);

            if (name) {
                api.object().move(this.selectedFile.id, this.currentParentID , name)
                    .then(function () {
                        console.log("RENAMED")
                        self.showFolderContent(self.currentParentID);
                        self.fileDialog = false;
                    })
                    .catch(err => console.log(err))
            }
        },

        openOptions: function (value) {
            if (this.filterDialog == true) {
                this.filterDialog = false
                return
            }
            this.fileDialog = true;
            this.selectedFile = value
        },
        openFilter: function () {
            if (this.fileDialog == true) {
                this.fileDialog = false
                return
            }
            this.filterDialog = true;
        },
        filterName: function () {
            this.response.sort(function (a, b) {
                let fileA = a.name.toLowerCase();
                let fileB = b.name.toLowerCase();
                return (fileA < fileB) ? -1 : (fileA > fileB) ? 1 : 0;
            });
            this.filterDialog = false;
        },
        filterType: function () {
            this.response.sort(function (a, b) {
                let fileA = a.filetype.toLowerCase();
                let fileB = b.filetype.toLowerCase();
                return (fileA < fileB) ? -1 : (fileA > fileB) ? 1 : 0;
            });
            this.filterDialog = false;
        },
        filterSize: function () {
            this.response.sort(function (a, b) {
                let fileA = a.size;
                let fileB = b.size;
                return (fileA > fileB) ? -1 : (fileA < fileB) ? 1 : 0;
            });
            this.filterDialog = false;
        },

        debounceElasticSearch: _.debounce(function () {
            if (this.search) {
                this.elasticSearch()
            } else {
                this.showFolderContent()
            }
        }, 500),

        async elasticSearch() {
            try {
                const response = await api.object().search(this.search);
                this.response = response.search
                console.log("JETZT")
            } catch (err) {
                console.log(err)
            }
        }
    },

    components: {
        DashboardEntry
    },

    watch: {

        search: function () {
            this.debounceElasticSearch()
        }

    },

    mounted() {
        this.showFolderContent()
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
