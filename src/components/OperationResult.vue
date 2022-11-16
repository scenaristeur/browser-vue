<template>
  <div class="operation-result" v-if="result != null">

    <ul>
      <li v-for="r in result" :key="r.cid">
        <GatewayLink :item="r" />
        <GatewayPreview :item="r" />
        <!-- <FileContent :item="r" /> -->
      </li>
    </ul>
    Result : {{ result}}

  </div>
</template>

<script>

import GatewayLink from "@/components/GatewayLink.vue";
import GatewayPreview from "@/components/GatewayPreview.vue";
// import FileContent from "@/components/FileContent.vue";

export default {
  name: 'OperationResult',
  components: {
    GatewayLink,
    GatewayPreview,
    // FileContent
  },
  computed:{
    result(){
      return this.$store.state.ipfs.result
    },

  }


}
</script>

<style lang="css" scoped>
.operation-result {

}
</style>
