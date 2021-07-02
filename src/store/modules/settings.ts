import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import variables from '@/styles/_variables.scss'
import defaultSettings from '@/settings'

export interface ISettingsState {
  menuTheme: string
  theme: string
  subMenuBg: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
  showSubNav: boolean
  showAllMenuNode: boolean
}

@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements ISettingsState {
  public menuTheme = variables.menuTheme
  public theme = variables.theme
  public subMenuBg = variables.subMenuBg
  public fixedHeader = defaultSettings.fixedHeader
  public showSettings = defaultSettings.showSettings
  public showTagsView = defaultSettings.showTagsView
  public showSidebarLogo = defaultSettings.showSidebarLogo
  public sidebarTextTheme = defaultSettings.sidebarTextTheme
  public showSubNav = defaultSettings.showSubNav
  public showAllMenuNode = defaultSettings.showAllMenuNode

  @Mutation
  private CHANGE_SETTING (payload: { key: string, value: any }) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as any)[key] = value
    }
  }

  @Action
  public ChangeSetting (payload: { key: string, value: any}) {
    this.CHANGE_SETTING(payload)
  }
}

export const SettingsModule = getModule(Settings)
