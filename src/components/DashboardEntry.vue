<template>
  <div>
    <div class="pa-3">
      <div style="width: 40px; float: left; margin-left: 5px" v-html="icon">
      </div>
      <span style=" margin-top: 2px!important;float: left;" class="filenamesize">{{ filename }} </span>
      <span style=" margin-top: 2px!important; margin-left: 20px; float: right;" class="filenamesize">{{
          filesize | prettyBytes
        }} </span>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>


export default {
  name: "DashboardEntry",
  data() {
    return {
      icon: "",
      filetype: ""
    }
  },

  props: {
    filesize: Number,
    filename: {type: String, default: "NaN"}
  },

  mounted() {

    const re = /(?:\.([^.]+))?$/;
    this.filetype = re.exec(this.filename)[1];

    console.log(this.filename)

    if (this.filetype == "pdf") {
      this.icon = "<i class=\"far blueAccent fa-file-pdf fa-lg\"></i>"
    } else if (this.filetype == "doc" || this.filetype == "docx" || this.filetype == "dot" || this.filetype == "dotx" || this.filetype == "docm" || this.filetype == "dotm" || this.filetype == "odt") {
      this.icon = "<i class=\"far blueAccent fa-file-word fa-lg\"></i>"
    } else if (this.filetype == "xlsx" || this.filetype == "xlsm" || this.filetype == "xlsb" || this.filetype == "xlam" || this.filetype == "xltx" || this.filetype == "xlk" || this.filetype == "xll" || this.filetype == "xls") {
      this.icon = "<i class=\"far blueAccent fa-file-excel fa-lg\"></i>"
    } else if (this.filetype == "txt" || this.filetype == "rtf") {
      this.icon = "<i class=\"far blueAccent fa-file-alt fa-lg\"></i>"
    } else if (this.filetype == "jpg" || this.filetype == "jpeg" || this.filetype == "gif") {
      this.icon = "<i class=\"far blueAccent fa-image fa-lg\"></i>"
    } else if (this.filetype == "ppt" || this.filetype == "pptx") {
      this.icon = "<i class=\"far blueAccent fa-file-powerpoint fa-lg\"></i>"
    } else if (this.filetype == "zip" || this.filetype == "rar") {
      this.icon = "<i class=\"far blueAccent fa-file-archive fa-lg\"></i>"
    } else if (this.filetype == "htm" || this.filetype == "html" || this.filetype == "mht" || this.filetype == "mhtml") {
      this.icon = "<i class=\"far blueAccent fa-file-code fa-lg\"></i>"
    } else if (this.filetype == "wav" || this.filetype == "mp3") {
      this.icon = "<i class=\"far blueAccent fa-file-audio fa-lg\"></i>"
    } else if (this.filetype == "mpg" || this.filetype == "mpeg" || this.filetype == "avi" || this.filetype == "wmv" || this.filetype == "mov" || this.filetype == "ram") {
      this.icon = "<i class=\"far blueAccent fa-file-video fa-lg\"></i>"
    } else if (this.filetype == "csv") {
      this.icon = "<i class=\"fas blueAccent fa-file-csv fa-lg\"></i>"
    } else {
      this.icon = "<i class=\"far blueAccent fa-file fa-lg\"></i>"
    }
  }
};
</script>

<style>

.blueAccent {
  color: #0044b2;
}

</style>
