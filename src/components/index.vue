<template lang="pug">
  div
    nav
      .container-app-header
        .container-app-header-logo
          img(src="~@/assets/images/logo_top.png")
        .container-app-header-nav
          ul
            router-link(
              v-for="(item, index) in indexList",
              :key="index",
              :to="item.path",
              tag="li",
            ) {{ $t(`nav.${item.tag}`) }}
            li.container-app-header-lang(@click="toggleLanguage") ENGLISH▼
    .container-app-content
      router-view
    .container-app-footer.
      asdasdsa

</template>

<script>

import { setStore, getStore } from '../util'

const indexList = [
  { path: 'join', tag: 'git' },
  { path: 'team', tag: 'about' },
  { path: 'docs', tag: 'join' },
  { path: 'message', tag: 'tec' },
  { path: 'node', tag: 'docs' },
  { path: 'node', tag: 'forum' },
  { path: 'node', tag: 'noderank' }
]

export default {
  data () {
    return {
      indexList
    }
  },
  created () {
    this._i18n.locale = getStore('locale')
  },
  methods: {
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
    mw()
  .container-app-header-logo
    wh(118px, 30px)
    // background red
  .container-app-header-nav
    color $font-light
    ul
      float right
      li
        float left
        color #fff
        opacity .8
        margin-left 40px
        font-size 14px
        cursor pointer
        transition opacity .4
        &:hover
          opacity 1
      .container-app-header-lang
        border solid 1px #fff
  .container-app-content
    background red
</style>
