<template>
    <div>
        <div class="pa-3">


            <div @click="$emit('openOptions',entry)" style="display: flex;" v-if="entry.type === 'file'">
                <div  style="flex: 80%;">
                    <div style="float: left; width: 40px; margin-left: 5px" v-html="icon"></div>
                    <div style="margin-top: 2px!important; display: block;">
                        <p class="filenamesize">{{
                                entry.name
                            }} </p>
                    </div>
                </div>
                <div style="flex: 20%">
                    <span style=" margin-top: 4px!important; float: right;"
                          class="filenamesize">{{
                        entry.size | prettyBytes
                        }} </span>
                    <div style="clear: both"></div>
                </div>
            </div>


            <div style="display: flex;" v-else>
                <div @click="$emit('openFolder',entry.id)" style="width: 100%">
                    <div style="width: 40px; float: left; margin-left: 5px" v-html="icon">
                    </div>
                    <div style=" margin-top: 2px!important;float: left;flex: 80%">
                        <span class="filenamesize">{{
                                entry.name
                            }} </span>
                    </div>
                </div>
                <div @click="$emit('openOptions',entry)" style="flex: 20%">
                    <i class="fas fa-ellipsis-h fa-lg" style="float:right; margin-top: 4px!important"></i>
                    <div style="clear: both"></div>
                </div>
            </div>




        </div>
    </div>
</template>

<script>


export default {
    name: "DashboardEntry",
    data() {
        return {
            icon: "",

        }
    },

    props: {
        entry: {
            type: Object,
            required: true
        }
    },

    methods: {
        getFileTypeAndIcon() {

            if ( this.entry.fileExtention === "pdf") {
                this.icon = "<i class=\"far blueAccent fa-file-pdf fa-lg\"></i>"
            } else if ( this.entry.fileExtention === "doc" ||  this.entry.fileExtention === "docx" ||  this.entry.fileExtention === "dot" ||  this.entry.fileExtention === "dotx" ||  this.entry.fileExtention === "docm" ||  this.entry.fileExtention === "dotm" ||  this.entry.fileExtention === "odt") {
                this.icon = "<i class=\"far blueAccent fa-file-word fa-lg\"></i>"
            } else if ( this.entry.fileExtention === "xlsx" ||  this.entry.fileExtention === "xlsm" ||  this.entry.fileExtention === "xlsb" ||  this.entry.fileExtention === "xlam" ||  this.entry.fileExtention === "xltx" ||  this.entry.fileExtention === "xlk" ||  this.entry.fileExtention === "xll" ||  this.entry.fileExtention === "xls") {
                this.icon = "<i class=\"far blueAccent fa-file-excel fa-lg\"></i>"
            } else if ( this.entry.fileExtention === "txt" ||  this.entry.fileExtention === "rtf") {
                this.icon = "<i class=\"far blueAccent fa-file-alt fa-lg\"></i>"
            } else if ( this.entry.fileExtention === "jpg" ||  this.entry.fileExtention === "jpeg" ||  this.entry.fileExtention === "gif" ||  this.entry.fileExtention === "png") {
                this.icon = "<i class=\"far blueAccent fa-image fa-lg\"></i>"
            } else if ( this.entry.fileExtention === "ppt" ||  this.entry.fileExtention === "pptx") {
                this.icon = "<i class=\"far blueAccent fa-file-powerpoint fa-lg\"></i>"
            } else if ( this.entry.fileExtention === "zip" ||  this.entry.fileExtention === "rar") {
                this.icon = "<i class=\"far blueAccent fa-file-archive fa-lg\"></i>"
            } else if ( this.entry.fileExtention === "htm" ||  this.entry.fileExtention === "html" ||  this.entry.fileExtention === "mht" ||  this.entry.fileExtention === "mhtml") {
                this.icon = "<i class=\"far blueAccent fa-file-code fa-lg\"></i>"
            } else if ( this.entry.fileExtention === "wav" ||  this.entry.fileExtention === "mp3") {
                this.icon = "<i class=\"far blueAccent fa-file-audio fa-lg\"></i>"
            } else if ( this.entry.fileExtention === "mpg" ||  this.entry.fileExtention === "mpeg" ||  this.entry.fileExtention === "avi" ||  this.entry.fileExtention === "wmv" ||  this.entry.fileExtention === "mov" ||  this.entry.fileExtention === "ram") {
                this.icon = "<i class=\"far blueAccent fa-file-video fa-lg\"></i>"
            } else if ( this.entry.fileExtention === "csv") {
                this.icon = "<i class=\"fas blueAccent fa-file-csv fa-lg\"></i>"
            } else if (this.entry.type === 'directory') {
                this.icon = "<i class=\"far blueAccent fa-folder-open fa-lg\"></i>"
            } else {
                this.icon = "<i class=\"far blueAccent fa-file fa-lg\"></i>"
            }
        }
    },


    updated() {
        this.getFileTypeAndIcon();
    },
    mounted() {
        this.getFileTypeAndIcon();
    }
};
</script>

<style>

.blueAccent {
    color: #0044b2;
}

</style>
