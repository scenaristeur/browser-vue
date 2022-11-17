<template>
  <div class="current-content" v-if="current!= null">
    <!-- {{ current._path}} -->
    <input ref="current" v-model="current._path" />

    <span v-if="content.folders!= undefined"> {{ content.folders.length}} folders | {{ content.files.length}} files</span>


    <div v-if="selected.length > 0">
      selected : {{selected}}
      <button @click="cut">cut</button>
      <button @click="paste">paste</button>
      <button @click="move" disabled>move</button>
      <button @click="remove" >delete</button>

    </div>


    <div class="scroll">
      <ul>

        <li v-if="current._path != '/'">
          <button @click="getParent"> 📁 ..</button>
        </li>

        <li v-for="c in content.folders" :key="c.cid">
          <input type="checkbox" :value="c.name" :id="c.name" v-model="selected">

          <!-- gestion d'un autre rootfolder avec load, get ne fonctionne pas sur un CID -->
          <button @click="getFolder(c.name)" v-if="c.type == 'directory'"> 📁 {{c.name}}</button>
          <button @click="load(c)" v-else>load {{ c.root }} 📁 {{c.name}}</button>
          <GatewayLink :item="c" />
          <!-- <GatewayPreview :item="c" /> -->
          <!-- <FileContent :item="r" /> -->
        </li>
        <li v-for="c in content.files" :key="c.cid" style="v-align:center">
          <input type="checkbox" :value="c.name" :id="c.name" v-model="selected">
          <span v-if="c.name.endsWith('png') || c.name.endsWith('.jpg') || c.name.endsWith('.jpeg')">🖼   <GatewayPreview :item="c" /></span><span v-else> 📄</span>  <!-- -->

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
      content: {},
      selected : []
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
    },
    cut(){
      let actualPath = this.current._path.endsWith('/') ? this.current._path : this.current._path+'/'
      console.log(this.selected)
      //this.$cut()
      let cuted = this.selected.map(x => actualPath+x)
      this.$store.commit('ipfs/setClipboard', cuted)
    },
    async paste(){
      // let actualPath = this.current._path.endsWith('/') ? this.current._path : this.current._path+'/'
      // console.log(this.selected)
      console.log(this.clipboard)
      // let actualPath = this.current._path.endsWith('/') ? this.current._path : this.current._path+'/'
      for await (const f of this.clipboard){
        await this.$ipfs.files.mv(f, this.current._path, {parents: true, flush: true})
      }
      this.$get(this.current._path)
      this.selected = []
    },
    move(){
      // let actualPath = this.current._path.endsWith('/') ? this.current._path : this.current._path+'/'
      console.log(this.selected)
      this.$move()
    },
    async remove(){
      // let actualPath = this.current._path.endsWith('/') ? this.current._path : this.current._path+'/'
      console.log(this.selected)
      let actualPath = this.current._path.endsWith('/') ? this.current._path : this.current._path+'/'
      console.log(this.selected)
      //this.$cut()
      let cuted = this.selected.map(x => actualPath+x)

      for await (const f of cuted){
        await this.$ipfs.files.rm(f, { recursive: true })
      }

      this.$get(this.current._path)
      this.selected = []
    },
    async load(c){
      console.log(c.cid.toString())
      this.$load('/'+c.cid.toString())
    }
  },
  watch:{
    currentContent(){
      this.content.folders = this.currentContent.filter(x => x.type.startsWith("dir")).sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      this.content.files = this.currentContent.filter(x => x.type == "file").sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      console.log(this.content)

    }
  },


  computed:{
    currentContent(){
      return this.$store.state.ipfs.currentContent
    },
    current(){
      return this.$store.state.ipfs.current
    },
    clipboard(){
      return this.$store.state.ipfs.clipboard
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
