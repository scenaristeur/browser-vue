<template>
  <div class="file-content">
    content : {{ content}}
  </div>
</template>

<script>
// https://proto.school/regular-files-api/04
import toBuffer from 'it-to-buffer'

export default {
  name: 'FileContent',
  props: ['item'],
  data(){
    return {
      content: null
    }
  },
  created(){
    this.getContent()
  },
  methods:{
    async getContent(){
      // console.log(this.item)
      // let cat = await this.$ipfs.cat(this.item.cid)
      // console.log(cat)
      const bufferedContents = await toBuffer(this.$ipfs.cat(this.item.cid))
      // console.log(bufferedContents)
      this.content = bufferedContents.toString()
      console.log(this.content)
    }
  },
  watch:{
    item(){
      this.getContent()
    }
  }

}
</script>

<style lang="css" scoped>
.file-content {

}
</style>
