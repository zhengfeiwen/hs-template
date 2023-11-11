import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const Base: RouteConfig = {
  path: '/base',
  component: Layout,
  redirect: 'noredirect',
  name: 'fcsBaseMenu',
  meta: {
    permission: 'fcsBaseMenu',
    title: 'base',
    icon: 'database'
  },
  children: [
    {
      path: 'schoolmanage/index',
      component: () => import(/* webpackChunkName: "schoolManage" */ '@/views/base/schoolmanage/index.vue'),
      name: 'fcsSchoolMenu',
      meta: {
        title: 'schoolmanage',
        parent: 'fcsBaseMenu',
        permission: 'fcsSchoolMenu',
        noCache: true,
        icon: 'university'
      }
    }]
}

export default Base
