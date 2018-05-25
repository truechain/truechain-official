import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/components/index'
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
          path: '/join',
          name: 'TrueJoin',
          component: TrueJoin
        },
        {
          path: '/docs',
          name: 'TrueDocs',
          component: TrueDocs
        },
        {
          path: '/node',
          name: 'TrueNode',
          component: TrueNode
        },
        {
          path: '/message',
          name: 'TrueMessage',
          component: TrueMessage
        },
        {
          path: '/team',
          name: 'TrueTeam',
          component: TrueTeam
        }
      ]
    }
  ]
})
