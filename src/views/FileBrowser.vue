<template>
  <div class="browser">

    <h3>Browser</h3>
    <button @click="getFolder()"> GetRoot Folder </button>
    <CurrentContent />
  </div>
</template>

<script>
import CurrentContent from "@/components/CurrentContent.vue";

export default {
  name: "FileBrowser",
  components: {
    CurrentContent,
  },
  methods:{
    getFolder(path="/"){
      this.$get(path)
    }
  },
  watch:{
    online(){
      if (this.online == true) this.getFolder()
    }
  },
  computed:{
    online(){
      return this.$store.state.ipfs.online
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
