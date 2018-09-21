<template lang="pug">
div
  p.p hello
</template>

<script>
export default {
  head () {
    return {
      title: this.$t('node.head.title'),
      meta: [
        { hid: 'node-keyword', name: 'keyword', content: this.$t('node.head.keyword') },
        { hid: 'node-description', name: 'description', content: this.$t('node.head.description') }
      ]
    }
  },

  data () {
    return {
      
    }
  },
  async created () {
  },
  methods: {
    
  }
}
</script>


<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'

.p
  font-size 100px
</style>