<template>
  <div class="current-content" v-if="current!= null">
    <!-- {{ current._path}} -->
    <input ref="current" v-model="current._path" />

    <span v-if="content.folders!= undefined"> {{ content.folders.length}} folders | {{ content.files.length}} files</span>
    <div class="scroll">
      <ul>

        <li v-if="current._path != '/'">
          <button @click="getParent"> 📁 ..</button>
        </li>

        <li v-for="c in content.folders" :key="c.cid">
          <button @click="getFolder(c.name)"> 📁 {{c.name}}</button>
          <GatewayLink :item="c" />
          <!-- <GatewayPreview :item="c" /> -->
          <!-- <FileContent :item="r" /> -->
        </li>
        <li v-for="c in content.files" :key="c.cid" style="v-align:center">
          <span v-if="c.name.endsWith('png') || c.name.endsWith('.jps')">🖼   <GatewayPreview :item="c" /></span><span v-else> 📄</span>  <!-- -->

          {{c.name}}
          <GatewayLink :item="c" />

          <!-- <FileContent :item="r" /> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// icons https://emojicombos.com/open-folder-ascii-art
import GatewayLink from "@/components/GatewayLink.vue";
import GatewayPreview from "@/components/GatewayPreview.vue";
export default {
  name: 'CurrentContent',
  components: {
    GatewayLink,
    GatewayPreview,
    // FileContent
  },
  data(){
    return {
      content: {}
    }
  },
  methods:{
    getFolder(subpath){
      let actualPath = this.current._path.endsWith('/') ? this.current._path : this.current._path+'/'
      let path = actualPath+subpath
      console.log(path)
      this.$get(path)
    },
    getParent(){
      let  new_path = this.current._path.split('/').filter((basename, index, array) => index !== array.length - (basename === '' ? 2 : 1)).join('/');
      // let path_array = this.current._path.split('/')
      // path_array = p
      //
      // let actualPath = this.current._path.endsWith('/') == true ? this.current._path : this.current._path+'/'
      // console.log(actualPath)
      // let parent = actualPath.substring(0, actualPath.lastIndexOf('/'));
      console.log("parent", new_path)
      new_path.length == 0 ? new_path = '/' : ""
      this.$get(new_path)
    }
  },
  watch:{
    currentContent(){
      this.content.folders = this.currentContent.filter(x => x.type == "directory").sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      this.content.files = this.currentContent.filter(x => x.type == "file").sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }
  },


  computed:{
    currentContent(){
      return this.$store.state.ipfs.currentContent
    },
    current(){
      return this.$store.state.ipfs.current
    }
  }
}
</script>

<style lang="css" scoped>
.current-content {

}
.scroll{
  width: 90vw;
  max-height: 30vh;
  min-height: 30vh;
  margin-bottom: 10px;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
  border: thick double #32a1ce;
  text-align: left;
}
</style>
