import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'
import { RightRoute } from '@/utils/types'
import store from '@/store'

const hasPermission = (rights: RightRoute[], route: RouteConfig) => {
  let flag = !1
  if ((process.env.VUE_APP_BASE_API as any).indexOf('mock') > -1) return !0
  if (route.meta && route.meta.permission) {
    const pm = route.meta.permission
    rights.forEach(right => {
      if (right.name === pm) {
        flag = !0
        route.meta.order = right.meta.order
        route.meta.titleZh = right.meta.title
        return flag
      }
      if (right.children) {
        if (hasPermission(right.children, route)) {
          flag = !0
          return flag
        }
      }
    })
    return flag
  }
  if (route.meta && route.meta.hidden) {
    return !0
  } else {
    return !1
  }
}

export const filterAsyncRoutes = (routes: RouteConfig[], rights: RightRoute[]) => {
  const res: RouteConfig[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(rights, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, rights)
      }
      res.push(r)
    }
  })
  return res
}

export const orderRoutes = (routes: RouteConfig[]) => {
  const len = routes.length
  let temp: any
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (routes[i].meta.order > routes[j].meta.order) {
        temp = { ...routes[j] }
        routes[j] = { ...routes[i] }
        routes[i] = { ...temp }
      }
    }
    routes[i].children && (routes[i].children = orderRoutes(routes[i].children as any))
  }
  return routes
}

export const initOrder = (rights: RightRoute[]) => {
  const len = rights.length
  for (let i = 0; i < len; i++) {
    rights[i].meta.order = i
    rights[i].children && (rights[i].children = initOrder(rights[i].children))
  }
  return rights
}

export interface IPermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []
  public dynamicRoutes: RouteConfig[] = []

  @Mutation
  private SET_ROUTES (routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes)
    this.dynamicRoutes = routes
  }

  @Action
  public GenerateRoutes (rights: RightRoute[]) {
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, initOrder(rights))
    this.SET_ROUTES(orderRoutes(accessedRoutes))
  }
}

export const PermissionModule = getModule(Permission)
