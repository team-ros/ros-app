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
            fileEnding: ""
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
            const re = /(?:\.([^.]+))?$/;
            this.fileEnding = re.exec(this.entry.name)[1];

            console.log(this.fileEnding)


            if (this.fileEnding === "pdf") {
                this.icon = "<i class=\"far blueAccent fa-file-pdf fa-lg\"></i>"
            } else if (this.fileEnding === "doc" || this.fileEnding === "docx" || this.fileEnding === "dot" || this.fileEnding === "dotx" || this.fileEnding === "docm" || this.fileEnding === "dotm" || this.fileEnding === "odt") {
                this.icon = "<i class=\"far blueAccent fa-file-word fa-lg\"></i>"
            } else if (this.fileEnding === "xlsx" || this.fileEnding === "xlsm" || this.fileEnding === "xlsb" || this.fileEnding === "xlam" || this.fileEnding === "xltx" || this.fileEnding === "xlk" || this.fileEnding === "xll" || this.fileEnding === "xls") {
                this.icon = "<i class=\"far blueAccent fa-file-excel fa-lg\"></i>"
            } else if (this.fileEnding === "txt" || this.fileEnding === "rtf") {
                this.icon = "<i class=\"far blueAccent fa-file-alt fa-lg\"></i>"
            } else if (this.fileEnding === "jpg" || this.fileEnding === "jpeg" || this.fileEnding === "gif" || this.fileEnding === "png") {
                this.icon = "<i class=\"far blueAccent fa-image fa-lg\"></i>"
            } else if (this.fileEnding === "ppt" || this.fileEnding === "pptx") {
                this.icon = "<i class=\"far blueAccent fa-file-powerpoint fa-lg\"></i>"
            } else if (this.fileEnding === "zip" || this.fileEnding === "rar") {
                this.icon = "<i class=\"far blueAccent fa-file-archive fa-lg\"></i>"
            } else if (this.fileEnding === "htm" || this.fileEnding === "html" || this.fileEnding === "mht" || this.fileEnding === "mhtml") {
                this.icon = "<i class=\"far blueAccent fa-file-code fa-lg\"></i>"
            } else if (this.fileEnding === "wav" || this.fileEnding === "mp3") {
                this.icon = "<i class=\"far blueAccent fa-file-audio fa-lg\"></i>"
            } else if (this.fileEnding === "mpg" || this.fileEnding === "mpeg" || this.fileEnding === "avi" || this.fileEnding === "wmv" || this.fileEnding === "mov" || this.fileEnding === "ram") {
                this.icon = "<i class=\"far blueAccent fa-file-video fa-lg\"></i>"
            } else if (this.fileEnding === "csv") {
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
