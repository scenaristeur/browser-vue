<template>
  <!-- <div class="upload-files"> -->
  <!-- <input type="file" ref="input"  multiple @change="upload"/> -->
  <!-- {{ keys }} -->
  <button @click="getKeys">publications</button>
  <ul>
    <li v-for="k in keys" :key="k.id"><button @click="resolve(k)" >{{k.name}}</button></li>
  </ul>
  <!-- </div> -->
</template>

<script>

// voir https://medium.com/textileio/the-definitive-guide-to-publishing-content-on-ipfs-ipns-dfe751f1e8d0for dns name ?

export default {
  name: 'IpnsView',
  methods: {
    async resolve(k){
      console.log(k)

      const addr = '/ipns/'+k.id

      for await (const name of this.$ipfs.name.resolve(addr)) {
        console.log(name)
        // /ipfs/QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm

        this.$get(name)
      }
    },
    async getKeys(){
      let keys = await this.$ipfs.key.list();
      // let r = keys.find((k) => k.name == keyName);
      console.log(keys/*,JSON.stringify(r)*/);
      // }
      this.$store.commit('ipfs/setKeys', keys)
    }
  },
  computed:{
    keys(){
      return this.$store.state.ipfs.keys
    }
  }

}
</script>

<style lang="css" scoped>
.upload-files {

}
</style>
