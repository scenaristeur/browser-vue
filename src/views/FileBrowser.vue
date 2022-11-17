<template>
  <div class="browser" v-if="online== true">

    <h3>Browser</h3>
    <div>

      <button @click="getFolder">GetRoot Folder</button>
      <button @click="addFolder">add (sub)folder</button>
      <UploadFiles />
      <button @click="openLoader">Load a remote computer</button>
      <button @click="publish" >Publish</button>
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
      let data = {}
      data.cid = prompt("CID of the remote :", '/ipfs/QmYLMaBa9bd2cfkD8UU3boFC7bRrCR74KnxGF2cFrpbyLf')
      data.workspace = prompt("desired workspace :", 'wkspace')
      console.log(data)
      this.$load(data.cid)
    },
    async publish(){
      let keyName = prompt("Name of the publication :", '')
      console.log(keyName, this.current.cid.toString())
      let currentCid = this.current.cid.toString()
      let content = '/ipfs/'+currentCid
      // let browserNode = await this.$ipfs.id();
      //
      // let keys = { name: "self", id: browserNode.id }; // default init
      //
      // if (keyName != "self") {
      //   if (!(await this.$ipfs.key.list()).find((k) => k.name == keyName)) {
      //     // skip if custom key exists already
      //     await this.createKey(keyName);
      //   }

      let key = await this.$ipfs.key.gen(keyName, {
        type: 'ed25519'
      })
      console.log(key)
      // let keys = await this.$ipfs.key.list()

      let keys = await this.$ipfs.key.list();
      let r = keys.find((k) => k.name == keyName);
      console.log(keys,JSON.stringify(r));
      // }
      this.$store.commit('ipfs/setKeys', keys)


      const results = await this.$ipfs.name.publish(content, {
        resolve: true,
        key: keyName,
      });
      console.log(results)

    },
    // async createKey(keyName) {
    //   return new Promise( (resolve, reject) => {
    //     try {
    //       // generate a key on the browser IPNS keychain with the specified name
    //        this.$ipfs.key.gen(keyName, {
    //         type: 'ed25519'
    //       })
    //
    //       // now this key can be used to publish to this ipns publicKey
    //       resolve(true);
    //     } catch (err) {
    //       console.log(`Error creating Key ${keyName}: \n ${err}`);
    //       reject(false);
    //     }
    //   });
    // }
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
