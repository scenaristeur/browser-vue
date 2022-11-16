<template>
  <!-- <div class="upload-files"> -->
  <input type="file" ref="input"  multiple @change="upload"/>

  <!-- </div> -->
</template>

<script>
export default {
  name: 'UploadFiles',
  methods: {
    upload(){
      let files = this.$refs.input.files
      console.log(files)
      this.$upload(files)
      // TODO mask long name file after upload one file
      // this.$refs.input.value = "yep"
    }
  }

}
</script>

<style lang="css" scoped>
.upload-files {

}
</style>
