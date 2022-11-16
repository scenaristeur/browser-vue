<template>
  <div class="operation-result" v-if="result != null">
    Result : {{ result}}
  </div>
</template>

<script>
export default {
  name: 'OperationResult',
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
