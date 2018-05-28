<template lang="pug">
  div
    nav
      .container-app-header
        router-link(
          to="/"
        ).container-app-header-logo
          img(src="~@/assets/images/logo_top.png")
        .container-app-header-nav
          ul
            li(
              v-for="(item, index) in indexList",
              :key="index",
              @click="jumpTo(item.path)",
            ) {{ $t(`nav.${item.tag}`) }}
            li.container-app-header-lang(@click="toggleLanguage") ENGLISH
    .container-app-content
      router-view
    .container-app-footer.
      asdasdsa

</template>

<script>

import { setStore, getStore } from '@/util'

const indexList = [
  { path: 'https://github.com/truechain', tag: 'git' },
  { path: 'team', tag: 'about' },
  { path: 'join', tag: 'join' },
  { path: 'docs', tag: 'docs' },
  { path: 'https://www.truechain.pro/', tag: 'forum' },
  { path: 'node', tag: 'noderank' }
]

export default {
  data () {
    return {
      indexList
    }
  },
  created () {
    this._i18n.locale = getStore('locale') || 'sc'
  },
  methods: {
    jumpTo (path) {
      if (/http[s]?:\/\//.test(path)) {
        window.open(path)
      } else {
        this.$router.push(path)
      }
    },
    toggleLanguage () {
      if (getStore('locale') === 'sc') {
        setStore('locale', 'en')
      } else {
        setStore('locale', 'sc')
      }
      this._i18n.locale = getStore('locale')
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
  .container-app
  nav
    height 100px
    background-color $dark-blue
  .container-app-header
    padding 35px
    mw()
  .container-app-header-logo
    wh(118px, 30px)
    float left
  .container-app-header-nav
    color $font-light
    ul
      float right
      li
        float left
        color #fff
        font-weight 200
        opacity .6
        margin-left 10px
        font-size 14px
        cursor pointer
        transition opacity .4s
        line-height 20px
        padding 5px 15px
        &:hover
          opacity 1
      .container-app-header-lang
        padding 4px 14px
        border solid 1px #fff
        border-radius 15px
        opacity 1
  .container-app-content
    background red
</style>
