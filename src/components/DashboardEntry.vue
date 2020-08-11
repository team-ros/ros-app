<template>
  <div class="pa-3">
    <div class="mr-6" style="float: left" v-html="icon">
    </div>
    <span style=" display:block; margin-top: 2px!important;">{{ filename }} </span>
  </div>
</template>

<script>


export default {


  data() {
    return {
      icon: "<i class=\"far fa-file fa-lg\"></i>"
    }
  },

  props: {
    filetype: String,
    filename: {type: String, default: "NaN"}
  },

  mounted() {

    if (this.filetype == "pdf") {
      this.icon = "<i class=\"far fa-file-pdf fa-lg\"></i>"
    } else if (this.filetype == "docx") {
      this.icon = "<i class=\"far fa-file-word fa-lg\"></i>"
    }


  }

};
</script>

<style scoped></style>