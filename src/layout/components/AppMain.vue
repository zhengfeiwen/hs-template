<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view :key="key" v-if="!isRouterAlive()"/>
      <keep-alive v-if="isRouterAlive()">
        <router-view :key="key" v-if="isRouterAlive()"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { TagsViewModule } from '@/store/modules/tags-view'
import { isEmpty } from '@/utils/common'

@Component({
  name: 'AppMain'
})
export default class extends Vue {
  get cachedViews () {
    return TagsViewModule.cachedViews
  }

  get visitedViews () {
    return TagsViewModule.visitedViews.map((v: any) => v.name)
  }

  get key () {
    return this.$route.path
  }

  private isRouterAlive = (flag: any = null) => {
    if (!isEmpty(flag)) return !flag
    return (typeof this.$route.meta.alive === 'undefined') ? !0 : this.$route.meta.alive
  }

  @Provide()
  reload = () => {
    this.setRouterAlive(false)
    this.$nextTick(() => {
      this.setRouterAlive(true)
    })
  }

  private setRouterAlive (flag: boolean) {
    this.isRouterAlive(flag)
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: calc(100% - 35px);
  width: 100%;
  padding: 0;
  position: relative;
  overflow: auto;
  scroll-padding: 1px;
}

.fixed-header+.app-main {
  padding: 20px;
  height: calc(100% - 84px);
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100% - 84px);
  }
}
</style>
