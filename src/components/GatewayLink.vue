<template>
  <!-- <div class="gateway-link"> -->
    <a :href="'https://ipfs.io/ipfs/'+item.cid" target="_blank">{{item.name || item.cid}}</a>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'GatewayLink',
  props: ['item']

}
</script>

<style lang="css" scoped>
.gateway-link {

}
</style>
