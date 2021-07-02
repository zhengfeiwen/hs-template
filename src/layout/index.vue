<template>
  <div :class="classObj" class="app-wrapper"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="系统登出中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar @update-menu-name="updateMenuName" class="sidebar-container" />
    <div class="right-body">
      <div class="container-header" :style="{'background-color': menuBg}">
        <div class="header-menu-block">
          <hamburger
            id="hamburger-container"
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggle-click="toggleSideBar"
          />
          <div v-if="!showSubNav" class="header-menu">
            <div v-for="(route, i) in routes" :class="{'header-menu-item': !0, 'active': route.name == curMenu }" :key="i" @click="menuClick(route.name, i)">{{ route.meta.titleZh || $t('route.' + route.meta.title) }}</div>
          </div>
        </div>
        <div class="right-menu">
          <header-change-system v-if="singleSignOn" />
          <!-- <span class="right-menu-item" @click="reloadPage" :title="$t('navbar.refresh')"><i class="right-menu-link hs-icon-refresh-right" /></span> -->
          <!-- <span class="right-menu-item" @click="message" :title="$t('navbar.message')"><i class="hs-icon-bell" />&nbsp;</span>
          <span class="right-menu-item" @click="drawer = true" :title="$t('navbar.helper')"><i class="hs-icon-warning-outline" />&nbsp;</span> -->
          <el-dropdown class="right-menu-item avatar-container hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <!-- <hs-image class="head-img" :src="headImgUrl"></hs-image> -->
              <div class="user-name ring-icon text-overflow-line" :title="userInfo.userName">{{ userInfo.userName }}</div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  @click.native="resetPassword">
                <span style="display: block">{{ $t("navbar.resetPassword") }}</span>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">
                <span style="display: block">{{ $t("navbar.logOut") }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <hs-link class="right-menu-item helper" @click="drawer = true">{{ $t("navbar.helper") }}</hs-link> -->
        </div>
      </div>
      <div class="container-body">
        <div :class="{ hasTagsView: showTagsView }" class="main-container">
          <!-- <div :class="{ 'fixed-header': fixedHeader }">
            <navbar />
            <tags-view v-if="showTagsView" />
          </div> -->
          <tags-view/>
          <app-main ref="appMain"/>
          <right-panel v-if="showSettings">
            <settings />
          </right-panel>
        </div>
      </div>
    </div>
    <el-drawer
      :title="$t('navbar.helper')"
      :visible.sync="drawer"
      direction="rtl"
      size="20%"
      :before-close="handleClose">
      <span>do something</span>
    </el-drawer>
    <ResetPassword :visible.sync="resetPasswordVisible"></ResetPassword>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { AppModule } from '@/store/modules/app'
import { SettingsModule } from '@/store/modules/settings'
import { PermissionModule } from '@/store/modules/permission'
import { UserModule } from '@/store/modules/user'
import { RightModule } from '@/store/modules/right'
import Hamburger from '@/components/Hamburger/index.vue'
import { MenuModule } from '@/store/modules/menu'
import variables from '@/styles/_variables.scss'
import HeaderChangeSystem from './components/header-change-system/index.vue'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import RightPanel from '@/components/RightPanel/index.vue'
import ResizeMixin from './mixin/resize'
import { SingleSignOn, usersApi } from '@/api/users'
import { LocalStorage } from '@/utils/storage'
import ResetPassword from './components/resetPassword/index.vue'

@Component({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    HeaderChangeSystem,
    Settings,
    Sidebar,
    TagsView,
    Hamburger,
    ResetPassword
  }
})
export default class extends mixins(ResizeMixin) {
  private toggleSideBar () {
    AppModule.ToggleSideBar(false)
  }

  private reloadPage () {
    (this.$refs.appMain as any).reload()
  }

  private routes: any = PermissionModule.routes.filter(v => !v.meta.hidden)

  get curMenu () {
    return MenuModule.name
  }

  get headImgUrl () {
    return RightModule.userInfo.headImgUrl || require('../assets/statics/pics/favicon.png')
  }

  get classObj () {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation
      // mobile: this.device === DeviceType.Mobile
    }
  }

  get menuBg () {
    if (SettingsModule.menuTheme) {
      return SettingsModule.menuTheme
    } else {
      return variables.menuBg
    }
  }

  get showSettings () {
    return SettingsModule.showSettings
  }

  get showTagsView () {
    return SettingsModule.showTagsView
  }

  get showSubNav () {
    return SettingsModule.showSubNav
  }

  get fixedHeader () {
    return SettingsModule.fixedHeader
  }

  private handleClickOutside () {
    AppModule.CloseSideBar(false)
  }

  get sidebar () {
    return AppModule.sidebar
  }

  get devicetype () {
    return AppModule.device.toString()
  }

  get userInfo () {
    return RightModule.userInfo
  }

  private fullscreenLoading = !1

  private async logout () {
    this.fullscreenLoading = !0
    await usersApi('logout').then(async () => {
      MenuModule.updateMenuName(this.curMenu)
      await UserModule.Logout()
      this.fullscreenLoading = !1
      this.$router
        .push(`/login?redirect=${this.$route.fullPath}`)
        .catch((err) => {
          console.warn(err)
        })
    })
  }

  private resetPasswordVisible = false

  private resetPassword () {
    this.resetPasswordVisible = true
  }

  private drawer = !1

  private menuClick (name: any) {
    // this.curMenu = name
    MenuModule.updateMenuName(name)
    let cur = MenuModule.subMenu[0]
    while (cur && cur.children && cur.children.length > 0) {
      cur = cur.children[0]
    }
    this.$router.push(cur.path)
  }

  private updateMenuName () {
    MenuModule.updateMenuName(this.curMenu)
  }

  private handleClose (done: Function) {
    done()
  }

  private message () {
    // do something
  }

  private singleSignOn = !1

  private async SingleSignOn () {
    const { data } = await SingleSignOn()
    const sysTypes = LocalStorage.getObj('sysTypes').split(',')
    if (data.singleSignOn && sysTypes.length > 0) {
      if (sysTypes.length === 1 && sysTypes[0] === 'tcs') {
        this.singleSignOn = false
      } else {
        this.singleSignOn = true
      }
    } else {
      this.singleSignOn = false
    }
  }

  created () {
    this.SingleSignOn()
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
<style lang="scss">
  .el-drawer__header{
    user-select: none;
  }
</style>
