<template>
  <h3>{{ status }}</h3>
  <div v-if="online" class="ipfs-info">
    <h3>
      ID: <span id="ipfs-info-id">{{ node.id }}</span>
    </h3>
    <h3>
      Agent version: <span id="ipfs-info-agent">{{ node.agentVersion }}</span>
    </h3>
  </div>
</template>

<script>
export default {
  name: "IpfsInfo",
  computed:{
    online(){
      return this.$store.state.ipfs.online
    },
    node(){
      return this.$store.state.ipfs.node
    },
    status(){
      return this.$store.state.ipfs.status
    }
  }
  // data: function() {
  //   return {
  //
  //   };
  // },
  // mounted: function() {
  // //  this.getIpfsNodeInfo();
  // },
  // methods: {
  //   async getIpfsNodeInfo() {
  //     try {
  //       // Await for ipfs node instance.
  //       const ipfs = await this.$ipfs;
  //       // Call ipfs `id` method.
  //       // Returns the identity of the Peer.
  //       const { agentVersion, id } = await ipfs.id();
  //       this.agentVersion = agentVersion;
  //       this.id = id;
  //       // Set successful status text.
  //       this.status = "Connected to IPFS =)";
  //       this.online = ipfs.isOnline();
  //     // let folder = await ipfs.files.stat('/')
  //     // console.log(folder)
  //     } catch (err) {
  //       // Set error status text.
  //       this.status = `Error: ${err}`;
  //     }
  //   }
  // }
};
</script>
