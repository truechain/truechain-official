<template lang="pug">
  .container-app
    .container-app-header
      .container-app-header-logo
        img(src="~@/assets/images/logo_top.png")
      .container-app-header-nav
        ul
          router-link(
<<<<<<< HEAD
            v-for="item in list",
            :to="item.path",
            tag="li",
          ) {{item.name}}
    div.aaaaa
=======
            v-for="(item, index) in indexList",
            :key="index",
            :to="item.path",
            tag="li",
          ) {{ $t(`nav.${item.tag}`) }}
          li ENGLISH▼
    div
>>>>>>> 7f3a23c1aced8e8d61d2f7152d1b8cb0f8302050
      router-view

</template>

<script>
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
<<<<<<< HEAD
      list: [
        {
          path: 'join',
          name: 'GITCLUB'
        },
        {
          path: 'team',
          name: 'ABOUT '
        },
        {
          path: 'docs',
          name: 'JOIN US '
        },
        {
          path: 'message',
          name: 'TECHNICAL'
        },
        {
          path: 'node',
          name: 'DOCS '
        },
        {
          path: 'node',
          name: 'FORUM '
        },
        {
          path: 'node',
          name: '节点排行 '
        },
        {
          path: 'node',
          name: 'ENGLISH▼'
        }
      ]
=======
      indexList
>>>>>>> 7f3a23c1aced8e8d61d2f7152d1b8cb0f8302050
    }
  },
  mounted () {
    // alert('aaa')
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
  .container-app
  .container-app-header
    height 94px
    fc(space-between)
    padding 0 60px
    background green
    background-color $dark-blue
  .container-app-header-logo
    wh(118px, 30px)
    // background red
  .container-app-header-nav
    color $font-light
    ul
      fj()
      li
        color #A9ADBB
        margin-left 30px
        font-size 14px
  .aaa
    wh(100px, 30px)
    border 1px solid white
  .aaaaa
    background red
</style>
