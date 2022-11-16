<template>
  <div class="current-content">
    {{ currentContent.length}}

    <ul>
      <li v-for="c in currentContent" :key="c.cid">
        {{c.name}}
        <GatewayLink :item="c" />
        <GatewayPreview :item="c" />
        <!-- <FileContent :item="r" /> -->
      </li>
    </ul>
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
  computed:{
    currentContent(){
      return this.$store.state.ipfs.currentContent
    }
  }
}
</script>

<style lang="css" scoped>
.current-content {

}
</style>
