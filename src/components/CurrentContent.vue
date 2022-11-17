<template>
  <div class="current-content" v-if="current!= null">






    <div class="container py-2">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <hr />
        </div>
      </div>
    </div>

    <div class="container pt-2 pb-4">
      <div class="row">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <p>Right click on an item below.</p>

          <div class="list-group">
            <div
              v-for="(item, index) in itemArray1"
              :key="index"
              @contextmenu.prevent.stop="handleClick1($event, item)"
              class="list-group-item list-group-item-action"
            >
              {{ item.name }}
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <p>Left click on an item below.</p>

          <div class="list-group">
            <div
              v-for="(item, index) in itemArray2"
              :key="index"
              @click.prevent.stop="handleClick2($event, item)"
              class="list-group-item list-group-item-action"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <vue-simple-context-menu
      element-id="myFirstMenu"
      :options="optionsArray1"
      ref="vueSimpleContextMenu1"
      @option-clicked="optionClicked1"
    >
    </vue-simple-context-menu>

    <vue-simple-context-menu
      element-id="mySecondMenu"
      :options="optionsArray2"
      ref="vueSimpleContextMenu2"
      @option-clicked="optionClicked2"
    >
    </vue-simple-context-menu>


















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
      <div v-for="c in content.files" :key="c.cid" style="v-align:center"
      >
      <span v-if="c.name.endsWith('png') || c.name.endsWith('.jps')">🖼   <GatewayPreview :item="c" /></span><span v-else> 📄</span>  <!-- -->

      {{c.name}}
      <GatewayLink :item="c" />

      <!-- <FileContent :item="r" /> -->
    </div>
  </ul>
</div>




</div>
</template>

<script>
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
      itemArray1: [
            {
              name: 'Jim',
              job: 'Salesman',
            },
            {
              name: 'Dwight',
              job: 'Assistant to the Regional Manager',
            },
            {
              name: 'Pam',
              job: 'Receptionist',
            },
          ],
          itemArray2: [
            {
              name: 'Leslie',
              job: 'Deputy Director',
            },
            {
              name: 'Ron',
              job: 'Parks Director',
            },
            {
              name: 'Andy',
              job: 'Shoeshiner',
            },
          ],
          optionsArray1: [
            {
              name: 'Duplicate',
              slug: 'duplicate',
            },
            {
              type: 'divider',
            },
            {
              name: 'Edit',
              slug: 'edit',
            },
            {
              name: '<em>Delete</em>',
              slug: 'delete',
            },
          ],
          optionsArray2: [
            {
              name: 'Add Star',
              slug: 'add-star',
              class: 'my-custom-class',
            },
            {
              name: 'Remove Star',
              slug: 'remove-star',
            },
          ],
        };

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
    handleClick1(event, item) {
     this.$refs.vueSimpleContextMenu1.showMenu(event, item);
   },
   handleClick2(event, item) {
     this.$refs.vueSimpleContextMenu2.showMenu(event, item);
   },
   optionClicked1(event) {
     window.alert(JSON.stringify(event));
   },
   optionClicked2(event) {
     window.alert(JSON.stringify(event));
   },
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
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Muli:400,700');
html {
  width: 100%;
  font-size: 18px;
  color: #333;
}
body {
  margin: 0;
  height: 100%;
  height: 100vh;
  width: 100%;
  font-family: 'Muli', sans-serif;
}
#app {
  height: 100%;
  height: 100vh;
  width: 100%;
  line-height: 1.5;
}
.code-text {
  background: #eee;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}
@media (min-width: 992px) {
  .code-text {
    margin-bottom: 0;
  }
}
.btn {
  text-transform: uppercase;
  font-weight: bold;
}
textarea {
  min-height: 175px;
}

</style>
