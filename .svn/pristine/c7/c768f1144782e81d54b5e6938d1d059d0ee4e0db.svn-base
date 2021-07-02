<template>
  <div class="simple-container">
    <div class="bg-block"></div>
    <div class="simple-container-scroll_wrap">
      <div class="sc-title">
        <div class="menu-name">{{ getMenuName }}</div>
        <slot name="title"/>
      </div>
      <div :class="isMore" v-if="$slots.query">
        <div class="sc-query-title">
          <span class="title-potint">{{ queryTitle || '搜索区' }}</span>
          <div class="btn-block">
            <template v-if="!$slots['query-action']">
              <hs-button type="danger" @click="onQuery" size="mini" icon="hs-icon-search">查询</hs-button>
              <hs-button type="info" plain @click="onReset" size="mini" icon="hs-icon-refresh-right">重置</hs-button>
            </template>
            <slot v-else name="query-action"/>
          </div>
        </div>
        <slot name="query"/>
        <span v-if="more" class="more" @click="onMore">more<i :class="'el-icon-arrow-' + moreBtn" /></span>
      </div>
      <div class="sc-custom" v-if="$slots.custom">
        <slot name="custom"/>
      </div>
      <div class="sc-main" v-if="$slots.default">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { LocalStorage } from '@/utils/storage'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'simple-container'
})

export default class SimpleContainer extends Vue {
  @Prop({ type: Boolean, default: !1 })
  private more!: boolean

  @Prop({ type: String })
  private menuName!: string

  @Prop({ type: String })
  private queryTitle!: string

  get defaultname () {
    return LocalStorage.getObj('menu-name')
  }

  private moreBtn = 'left'

  get getMenuName () {
    return this.menuName ? this.defaultname + '-' + this.menuName : this.defaultname
  }

  get isMore () {
    return {
      'sc-query': !0,
      short: this.moreBtn === 'right' ? !1 : !0,
      expend: this.moreBtn === 'right' ? !0 : !1
    }
  }

  private onQuery () {
    this.$listeners['on-query'] && this.$emit('on-query')
  }

  private onReset () {
    this.$listeners['on-reset'] && this.$emit('on-reset')
  }

  private onMore () {
    if (this.moreBtn === 'left') this.moreBtn = 'right'
    else this.moreBtn = 'left'
  }
}
</script>
<style lang="scss">
@import "./index";
</style>
