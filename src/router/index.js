import Vue from 'vue'
import Router from 'vue-router'
import EntryInfo from '@/components/EntryInfo'
import GetInfo from '@/components/GetInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/entryInfo',
      name: 'entryInfo',
      component: EntryInfo
    },
    {
      path: '/getInfo',
      name: 'getInfo',
      component: GetInfo
    }
  ]
})
