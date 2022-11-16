<template>
  <div class="browser">

    <h3>Browser</h3>
    <button @click="getFolder()"> GetRoot Folder </button>
  </div>
</template>

<script>
export default {
  name: "FileBrowser",
  methods:{
    getFolder(path="/"){
      this.$get(path)
    }
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
