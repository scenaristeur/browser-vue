<template>
  <div class="execute-code" id="execute-code">
    QmeXsnQ15uuXj1ek5HEwWNcbhUon9nz4XdmJPzk8mEJC8t execute correctement vm16bit-vm browserified https://github.com/scenaristeur/16bits-js-vm


    <select class="form-select" aria-label="Default select example"  @change="onChange($event)" v-model="key">
      <option selected>Open this select menu</option>
      <option v-for="c in cids" :key="c.name" :value="c.cid">{{ c.name}}</option>
      <!-- <option value="2">Two</option>
      <option value="3">Three</option> -->
    </select>


    bloid display : <input ref="script_input" placeholder="script CID" v-model="cid"/>





    <button @click="loadScript()"> Load & Execute console script</button>
    <button @click="unloadScript()"> Unload console script</button>

    <hr>
    <button @click="loadScript('vm')"> Load & Execute vm script</button>
    <button @click="unloadScript('vm')"> Unload vm script</button>

    <div v-html="log_message"></div>

  </div>
</template>

<script>

// loading a node module https://stackoverflow.com/questions/57614232/loading-a-javascript-module-stored-on-ipfs
// import GatewayLink from "@/components/GatewayLink.vue";
// import GatewayPreview from "@/components/GatewayPreview.vue";
// // import FileContent from "@/components/FileContent.vue";

export default {
  name: 'ExecuteCode',
  data(){
    return {
      cids : [
        {name: 'console', cid : "QmdUc2BE8qU4F5i7Coq6axavDU1xCd3STEQmqH152ee2z3"},
        { name: 'test loadscripts bloid display' , cid: 'QmXYjq1E5RrEEj7UMz31sDRtqFjGVPWNFZvkZcBYRrF9no' },
        {name: 'test_import', cid : "Qma3mjrFmu7iYgzFGjKNGYvZULZyYsiJRNeavCVZBV4gxo"},
        {name: "vm16bits browserified", cid: 'QmVriSWGhgsd385mbCDqJriiUcqn7gryBnfzksrUc3QLH6'}
      ],
      vm: "https://cdn.jsdelivr.net/gh/scenaristeur/16bits-js-vm@latest/index.js",
      cid : "QmVriSWGhgsd385mbCDqJriiUcqn7gryBnfzksrUc3QLH6",
      scripts: [],
      log_message : "",
      key: null
    }
  },
  // components: {
  //   GatewayLink,
  //   GatewayPreview,
  //   // FileContent
  // },
  methods:{
    async loadScript(cid = this.cid){
      console.log(cid)
      let script = cid == 'vm' ? this.vm : "https://ipfs.io/ipfs/"+cid
      // let script = "https://ipfs.io/ipfs/QmdUc2BE8qU4F5i7Coq6axavDU1xCd3STEQmqH152ee2z3?filename=console.js"
      // https://ipfs.io/ipfs/QmdUc2BE8qU4F5i7Coq6axavDU1xCd3STEQmqH152ee2z3?filename=console.js
      // As an instance method inside a component
      this.log("loading "+ script)

      this.$loadScript(script)
      .then(() => {
        this.log('loaded '+ script)
        // this.scripts.push(script)
        this.scripts.indexOf(script) === -1 ? this.scripts.push(script) : this.log("This script is already loaded"+ script);
        this.log("scripts loaded "+ Array.from(this.scripts))
        // Script is loaded, do something
      })
      .catch(() => {
        this.log('ERROR: cannot load '+ script)
        // Failed to fetch script
      });

      // let url = "https://ipfs.io/ipfs/QmdUc2BE8qU4F5i7Coq6axavDU1xCd3STEQmqH152ee2z3?filename=console.js"
      // let externalScript = document.createElement('script')
      // externalScript.setAttribute('src', url)
      // document.head.appendChild(externalScript)
    },

    async unloadScript(cid = this.cid){
      let script = cid == 'vm' ? this.vm : "https://ipfs.io/ipfs/"+cid

      this.log("unloading "+ script)
      // As an instance method inside a component
      this.$unloadScript(script)
      .then(() => {
        this.log("unloaded "+ script)
        this.scripts = this.scripts.filter(s => s != script)
        this.log("scripts loaded"+ Array.from(this.scripts))
        // Script was unloaded successfully
      })
      .catch(() => {
        this.log("ERROR: cannot unload "+ script)
        // Script couldn't be found to unload; make sure it was loaded and that you passed the same URL
      });
    },
    log(text){
      console.log(text)
      this.log_message = text
    },
    onChange(event) {
      console.log(event.target.value)
      console.log(this.key)
      this.loadScript(this.key)
    }




  }
  // computed:{
  //   result(){
  //     return this.$store.state.ipfs.result
  //   },
  //
  // }


}
</script>

<style lang="css" scoped>
.execute-code {

}
</style>
