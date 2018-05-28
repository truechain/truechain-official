import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/components/index'
import TrueAbout from '@/components/true-about'
import TrueJoin from '@/components/true-join'
import TrueTeam from '@/components/true-team'
import TrueDocs from '@/components/true-docs'
import TrueNode from '@/components/true-node'
import TrueMessage from '@/components/true-message'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeIndex',
      component: HomeIndex,
      children: [
        {
          path: '',
          redirect: 'about'
        },
        {
          path: '/about',
          name: 'about',
          component: TrueAbout
        },
        {
          path: '/join',
          name: 'join',
          component: TrueJoin
        },
        {
          path: '/docs',
          name: 'docs',
          component: TrueDocs
        },
        {
          path: '/node',
          name: 'node',
          component: TrueNode
        },
        {
          path: '/message',
          name: 'message',
          component: TrueMessage
        },
        {
          path: '/team',
          name: 'team',
          component: TrueTeam
        }
      ]
    }
  ]
})
