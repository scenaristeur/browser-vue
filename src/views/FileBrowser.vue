<template>
  <div class="browser" v-if="online== true">

    <h3>Browser</h3>
    <div>

      <button @click="getFolder()">GetRoot Folder</button>
      <button @click="addFolder()">add (sub)folder</button>
      <UploadFiles />
      <button @click="openLoader()">Load a remote computer</button>
    </div>
    <hr>
    <CurrentContent />
  </div>
</template>

<script>
import CurrentContent from "@/components/CurrentContent.vue";
import UploadFiles from "@/components/UploadFiles.vue";

export default {
  name: "FileBrowser",
  components: {
    CurrentContent,
    UploadFiles,
  },
  data(){
    return {
      path: null
    }
  },
  methods:{
    getFolder(path='/'){
      this.$get(path)
    },
    async addFolder(){
      var path = prompt("type the path :", this.path)
      path = path.endsWith('/') ? path.slice(0, -1) : path
      path = path.startsWith('/') ? path : '/'+path
      console.log(path);
      await this.$mkdir(path)
    },
    openLoader(){
      var newRoot = prompt("CID of the remote :", '')
      console.log(newRoot)



    }
  },
  watch:{
    online(){
      if (this.online == true) this.getFolder()
    },
    current(){
      this.path = this.current._path
    }
  },
  computed:{
    online(){
      return this.$store.state.ipfs.online
    },
    current(){
      return this.$store.state.ipfs.current
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
