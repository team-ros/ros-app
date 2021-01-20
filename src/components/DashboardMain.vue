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
                        :placeholder="$t('site.dashboard.search')"
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
                <h2 class="mb-4 mt-6 headingsize">{{$t('site.dashboard.account_title')}}
                </h2>
                <router-link class="blackLink normaltextsize" to="/account"><p>{{$t('site.dashboard.account_link')}}</p></router-link>
                <h2 class="mb-4 mt-12 headingsize">{{$t('site.dashboard.project_website')}}</h2>
                <a href="https://project.ros-cloud.at/"><p class="blackLink normaltextsize">ROS Cloud</p></a>
                <h2 class="mt-12 mb-4 headingsize">{{$t('site.dashboard.socials')}}</h2>
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
                <h2 class="mt-12 mb-4 headingsize"> {{$t('site.dashboard.help')}} </h2>
                <router-link class="blackLink normaltextsize" to="/impressum"><p>{{$t('site.dashboard.imprint')}}</p></router-link>
                <router-link class="blackLink normaltextsize" to="/support"><p>Support</p></router-link>
                <a class="blackLink" href="https://www.ros-cloud.at/impressum/">
                    <p class="normaltextsize">{{$t('site.dashboard.dsgvo')}}</p></a>
            </v-card>
        </v-overlay>

        <!-- ==== BODY  ==== -->
        <v-container class="pa-0 " style="margin-bottom: 100px!important; margin-top: 105px">
            <v-row no-gutters>
                <v-col style="height: 62.5px"  class="col-2">
                    <v-btn v-if="parentIDStorage.length !== 0" style="float: right" small  class="my-4" color="#0044b2" depressed outlined>
                        <i  class="fas fa-arrow-left backarrow-blue" @click="goBack"></i>
                    </v-btn>
                    <v-btn color="#bdbdbd" v-else style="float: right" small class="my-4" depressed outlined>
                        <i  class="fas fa-arrow-left"></i>
                    </v-btn>
                </v-col>
                <v-col class="col-10 pr-2">
                    <v-btn @click="insertFile" v-if="moveFile" style="float: right" small  class="my-4" color="#0044b2" depressed outlined>
                      {{$t('site.dashboard.move_to')}}                    </v-btn>

                </v-col>
                <v-col class="col-12">
                    <table width="100%">
                        <tr v-for="entry in response" :key="entry.id">
                            <td v-if="entry.type === 'file'">
                                <DashboardEntry @openOptions="openFileOptions"
                                                :entry="entry"
                                ></DashboardEntry>
                            </td>
                            <td v-else>
                                <DashboardEntry @openOptions="openFolderOptions" @openFolder="showFolderContent"
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
                <h3 class="mb-4">{{$t('site.dashboard.options')}}</h3>
                <v-btn @click="downloadEntry" block class="my-4" color="#0044b2" depressed outlined>{{$t('site.dashboard.download')}}
                </v-btn>
                <v-btn @click="deleteEntry" block class="my-4" color="#0044b2" depressed outlined>{{$t('site.dashboard.delete')}}</v-btn>
                <v-btn @click="moveEntry" block class="my-4" color="#0044b2" depressed outlined>{{$t('site.dashboard.move')}}</v-btn>
                <v-btn @click="renameEntry" block class="my-4" color="#0044b2" depressed outlined>{{$t('site.dashboard.rename')}}</v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="folderDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card color="#eee" style="padding: 20px!important;">
                <h3 class="mb-4">{{$t('site.dashboard.options')}}</h3>
                <v-btn @click="deleteEntry" block class="my-4" color="#0044b2" depressed outlined>{{$t('site.dashboard.delete')}}</v-btn>
                <v-btn @click="renameEntry" block class="my-4" color="#0044b2" depressed outlined>{{$t('site.dashboard.rename')}}</v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="filterDialog" class="fileoption" fullscreen transition="dialog-bottom-transition">
            <v-card class="pa-8" color="#eee" style="padding: 20px!important;">
                <h3 class="mb-4">{{$t('site.dashboard.sort')}}</h3>
                <v-btn block class="my-4" color="#0044b2" depressed outlined @click="filterName">Name</v-btn>
                <v-btn block class="my-4" color="#0044b2" depressed outlined @click="filterSize">{{$t('site.dashboard.size')}}</v-btn>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="uploadError" :timeout="2000" color="error">
          {{$t('site.dashboard.size_error')}}        </v-snackbar>
        <v-snackbar v-model="error" :timeout="3210 " color="error">
            {{ errorMessage }}
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
            folderDialog: false,
            filterDialog: false,
            menuDialog: false,
            selectedFile: {},
            search: '',
            response: {},
            currentParentID: null,
            parentIDStorage: [],
            uploadError: false,
            error: false,
            errorMessage: "",
            moveFile: null,

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
                        if (response.status === false) {
                            self.error = true
                            self.errorMessage = self.$t('site.dashboard.upload_error')
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
            let name = window.prompt(this.$t('site.dashboard.folder_name'), this.$t('site.dashboard.folder_placeholder'));

            if (name) {
                api.object().createDir(name, this.currentParentID)
                    .then(function (response) {
                        if (response.status === false) {
                            self.error = true
                            self.errorMessage = self.$t('site.dashboard.folder_exists')
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
            if (!id) {
                response = await api.object().get()
            } else {
                response = await api.object().get(this.currentParentID)
            }
            this.responseLoaded = true
            this.response = response.listing
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
            let name = window.prompt(this.$t('site.dashboard.file_name'), this.selectedFile.name);

            if (name) {
                api.object().move(this.selectedFile.id, this.currentParentID, name)
                    .then(function () {
                        self.showFolderContent(self.currentParentID);
                        self.fileDialog = false;
                    })
                    .catch(err => console.log(err))
            }
        },

        async downloadEntry() {
            const self = this

            api.object().get(this.selectedFile.id)
                .then(function (object_url_response) {

                    api.object().download(object_url_response.url)
                        .then(function (blob_response) {
                            self.fileDialog = false;

                            let dl = document.createElement("a")
                            dl.style.display = "none";
                            dl.setAttribute("href", blob_response);
                            dl.setAttribute("download", self.selectedFile.name);
                            dl.click()
                        })
                        .catch (function (err) {
                            console.log(err)
                        })
                })

        },
        moveEntry: function () {
            this.moveFile = this.selectedFile
            this.fileDialog = false;
        },
        async insertFile() {
            let self = this;
            api.object().move(this.moveFile.id, this.currentParentID, this.moveFile.name)
            .then (function (response) {
                console.log(response)
                self.showFolderContent (self.currentParentID)
                self.moveFile = null;
            })

                .catch (function (err) {
                    console.log(err)
                })


        },
        openFileOptions: function (value) {
            if (this.filterDialog == true) {
                this.filterDialog = false
                return
            }
            this.fileDialog = true;
            this.selectedFile = value
        },
        openFolderOptions: function (value) {
            if (this.filterDialog == true) {
                this.filterDialog = false
                return
            }

            this.folderDialog = true;
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
                this.response = response.listing
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

    height: 28% !important;
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
