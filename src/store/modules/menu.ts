import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getCookie, setCookie, removeCookie } from '@/utils/cookies'
import { PermissionModule } from '@/store/modules/permission'
import store from '@/store'

export interface IMenuState {
  name: string
  subMenu: any[]
}

@Module({ dynamic: true, store, name: 'menu' })
class Menu extends VuexModule implements IMenuState {
  private tokenKey = 'menu_token'

  public name = getCookie(this.tokenKey) || ''

  // get curMenu () {
  //   return getCookie(this.tokenKey)
  // }

  get subMenu () {
    let menuList: any[] = PermissionModule.routes.filter(v => v.name === this.name)
    if (!menuList || menuList.length === 0) { menuList = PermissionModule.routes.filter(v => v.meta.default) }
    if (menuList && menuList.length > 0) {
      const url = menuList[0].path + '/'
      const routes = menuList[0].children.map((v: any) => {
        v.path.indexOf(url) === -1 && (v.path = url + v.path)
        return v
      })
      return routes
    }
    return []
  }

  @Mutation
  private SET_NAME (name: string) {
    this.name = name
  }

  @Action
  public async updateMenuName (name: any) {
    setCookie(this.tokenKey, name)
    this.SET_NAME(name)
  }

  @Action
  public removeMenuName () {
    removeCookie(this.tokenKey)
    this.SET_NAME('')
  }

  @Action
  public async updatesubMenu (name: any) {
    setCookie(this.tokenKey, name)
    this.SET_NAME(name)
  }
}

export const MenuModule = getModule(Menu)
