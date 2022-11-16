<template>
  <!-- <div class="gateway-link"> -->
  <a :href="'https://ipfs.io/ipfs/'+item.cid" target="_blank"> 🔗 </a>
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
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:active {
  text-decoration: underline;
}
</style>
