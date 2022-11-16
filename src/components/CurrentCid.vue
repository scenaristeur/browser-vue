<template>
  <div class="current-cid">
    <div v-if="current != null">{{current._path}} : {{ current.cid.toString()}} : {{ current.type}}</div>
  </div>
</template>

<script>
export default {
  name: 'CurrentCid',
  computed:{
    current(){
      return this.$store.state.ipfs.current
    }
  }
}
</script>

<style lang="css" scoped>
.current-cid {

}
</style>
