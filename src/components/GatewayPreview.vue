<template>
  <a class="gateway-preview" :href="'https://ipfs.io/ipfs/'+item.cid" target="_blank">
    <img :src="'https://ipfs.io/ipfs/'+item.cid" width="40" />
  </a>
</template>

<script>
export default {
  name: 'GatewayPreview',
  props: ['item']

}
</script>

<style lang="css" scoped>
.gateway-preview {

}
</style>
