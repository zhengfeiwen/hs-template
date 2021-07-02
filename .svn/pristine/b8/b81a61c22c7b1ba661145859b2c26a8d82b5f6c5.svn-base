<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link
        @click.native="itemClick(theOnlyOneChild.meta.titleZh || $t('route.' + theOnlyOneChild.meta.title))"
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{'submenu-title-noDropdown': isFirstLevel}"
        >
          <svg-icon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
          />
          <span
            :class="!theOnlyOneChild.meta.icon ? 'no-icon' : ''"
            v-if="theOnlyOneChild.meta.title"
            slot="title"
          >{{ theOnlyOneChild.meta.titleZh || $t('route.' + theOnlyOneChild.meta.title) }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <svg-icon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
        />
        <span
            :class="!item.meta.icon ? 'no-icon' : ''"
          v-if="item.meta && item.meta.title"
          slot="title"
        >{{ item.meta.titleZh || $t('route.' + item.meta.title) }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink.vue'
import { LocalStorage } from '@/utils/storage'

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: 'SidebarItem',
  components: {
    SidebarItemLink
  }
})
export default class extends Vue {
  @Prop({ required: true }) private item!: RouteConfig
  @Prop({ default: false }) private isCollapse!: boolean
  @Prop({ default: true }) private isFirstLevel!: boolean
  @Prop({ default: '' }) private basePath!: string

  get alwaysShowRootMenu () {
    if (this.item.meta && this.item.meta.alwaysShow) {
      return true
    }
    return false
  }

  get showingChildNumber () {
    if (this.item.children) {
      const showingChildren = this.item.children.filter((item) => {
        if (item.meta && item.meta.hidden) {
          return false
        } else {
          return true
        }
      })
      return showingChildren.length
    }
    return 0
  }

  get theOnlyOneChild () {
    if (this.showingChildNumber > 1) {
      return null
    }
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child
        }
      }
    }
    // If there is no children, return itself with path removed,
    // because this.basePath already conatins item's path information
    return { ...this.item, path: '' }
  }

  private resolvePath (routePath: string) {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(this.basePath)) {
      return this.basePath
    }
    return path.resolve(this.basePath, routePath)
  }

  private itemClick (menuName: any) {
    LocalStorage.setObj('menu-name', menuName)
  }
}
</script>

<style lang="scss">
.el-submenu.is-active > .el-submenu__title {
  color: $menuText !important;
}

.full-mode {
  .el-submenu>.el-submenu__title,
  .el-submenu .el-menu-item {
    background-color: $subMenuBg !important;
    span{
      color: $subMenuActiveText !important;
      font-size: 14px;
    }
    i{
      color: $subMenuActiveText !important;
    }
    &:hover {
      background-color: $subMenuHover !important;
      color: $subMenuActiveText !important;
    }
  }
  a .el-menu-item{
    color: $subMenuActiveText !important;
    &:hover {
      color: $subMenuActiveText !important;
      background-color: $subMenuHover !important;
    }
    &.is-active{
      color: $subMenuActiveText !important;
      background-color: $subMenuHover !important;
      // border-right: 4px solid $subMenuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;
      &.is-active{
        background-color: $subMenuHover !important;
      }
      .el-tooltip {
        padding: 0 !important;
      }
    }
    .el-submenu {
      overflow: hidden;
      &>.el-submenu__title {
        padding: 0px !important;
        &:hover{
          color: $subMenuActiveText !important;
          background-color: $subMenuHover !important;
        }
        .el-submenu__icon-arrow {
          display: none;
        }

        &>span {
          visibility: hidden;
        }
      }
    }
  }
}
.el-menu-item{
  .no-icon{
    margin-left: 20px;
  }
  span{
    font-size: 14px;
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
.el-menu-item:focus, .el-menu-item:hover{
  color: #fff;
  background-color: $subMenuHover;
}
.nest-menu{
  background-color: $subMenuBg !important;
  overflow: hidden;
  &:first-child{
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:last-child{
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  // a .is-active{
  //   color: #fff;
  //   background-color: #409EFF;
  // }
}
.el-menu--inline .nest-menu{
  border-radius: 0;
}
</style>
