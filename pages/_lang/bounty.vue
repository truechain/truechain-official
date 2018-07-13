<template lang="pug">
  .bounty-container
    .bounty-banner
      img.bounty-image(:src="require('@/assets/images/bounty.jpg')")
      .bounty-title
        h1 TrueChain Bounty Program
        p The TrueChain Bounty Program provides bounties for bugs. We call on our community and all bug bounty hunters to help identify bugs in the protocols and clients. Earn rewards for finding a vulnerability and get a place on our leaderboard. See Rules & Rewards section for details.
        a.bounty-button(
          target="_blank"
          :href="link[this.$store.state.locale]"
        ) Submit a Vulnerability
    .bounty-rule(v-html="rulesHTML")
</template>
<script>
const rules = require('@/static/bounty.md')

const link = {
  'en': 'https://goo.gl/forms/zRqZu5QPvrCb7cze2',
  'zh': 'https://goo.gl/forms/zRqZu5QPvrCb7cze2',
  'ko': 'https://goo.gl/forms/zRqZu5QPvrCb7cze2',
}

export default {
  data() {
    return {
      link,
      rulesHTML: rules
    }
  },
  head() {
    return {
      title: this.$t('join.head.title'),
      meta: [
        { hid: 'join-keyword', name: 'keyword', content: this.$t('join.head.keyword') },
        { hid: 'join-description', name: 'description', content: this.$t('join.head.description') },
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/mixin.styl'
.bounty-banner
  max-width 1024px
  margin auto
  padding 100px 40px
  display flex
.bounty-image
  width 400px
  flex 400px 0 0
.bounty-title
  padding-left 40px
  flex auto 0 1
  h1
    font-size 28px
    color #1e64b4
    padding-bottom 20px
  p
    color #456c99
    line-height 1.5em
.bounty-button
  display block
  color #fff
  height 40px
  width 280px
  border-radius 20px
  text-align center
  padding 0 20px
  line-height 40px
  background-color #1e64b4
  cursor pointer
  margin-top 40px
  transition background-color .3s
  &:hover
    color #fff
    background-color #143964
.bounty-rule
  margin auto
  max-width 900px
  padding 0px 40px 80px
</style>
