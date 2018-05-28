<template lang="pug">
  .container-app
    .container-app-header
      .container-app-header-logo
        img(src="~@/assets/images/logo_top.png")
      .container-app-header-nav
        ul
          router-link(
            v-for="item in list",
            :to="item.path",
            tag="li",
          ) {{item.name}}
    div.aaaaa
      router-view

</template>
<script>
export default {
  data () {
    return {
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
