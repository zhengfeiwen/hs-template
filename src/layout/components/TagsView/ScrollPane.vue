<template>
  <div class="menu-block">
    <span class="scrollbar-btn" @click="moveToLeft"><i class="el-icon-arrow-left" /></span>
    <el-scrollbar
      ref="scrollContainer"
      :vertical="!1"
      class="scroll-container"
      @wheel.native.prevent="handleScroll"
    >
    <slot />
    </el-scrollbar>
    <span class="scrollbar-btn" @click="moveToRight"><i class="el-icon-arrow-right" /></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const tagSpacing = 4

@Component({
  name: 'ScrollPane'
})
export default class extends Vue {
  get scrollWrapper () {
    return (this.$refs.scrollContainer as Vue).$refs.wrap as HTMLElement
  }

  mounted () {
    this.scrollWrapper.addEventListener('scroll', this.emitScroll, true)
  }

  beforeDestroy () {
    this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
  }

  private moveToLeft () {
    const scrollWrapper = this.scrollWrapper
    scrollWrapper.scrollLeft = scrollWrapper.scrollLeft + 125
  }

  private moveToRight () {
    const scrollWrapper = this.scrollWrapper
    scrollWrapper.scrollLeft = scrollWrapper.scrollLeft - 125
  }

  private handleScroll (e: WheelEvent) {
    const eventDelta = (e as any).wheelDelta || -e.deltaY * 40
    const scrollWrapper = this.scrollWrapper
    scrollWrapper.scrollLeft = scrollWrapper.scrollLeft + eventDelta / 4
  }

  private emitScroll () {
    this.$emit('scroll')
  }

  public moveToTarget (currentTag: HTMLElement) {
    const container = (this.$refs.scrollContainer as Vue).$el as HTMLElement
    const containerWidth = container.offsetWidth
    const scrollWrapper = this.scrollWrapper
    const tagList = this.$parent.$refs.tag as any[]

    let firstTag = null
    let lastTag = null

    // find first tag and last tag
    if (tagList.length > 0) {
      firstTag = tagList[0]
      lastTag = tagList[tagList.length - 1]
    }

    if (firstTag === currentTag) {
      scrollWrapper.scrollLeft = 0
    } else if (lastTag === currentTag) {
      scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - containerWidth
    } else {
      // find preTag and nextTag
      const currentIndex = tagList.findIndex(item => item === currentTag)
      const prevTag = tagList[currentIndex - 1]
      const nextTag = tagList[currentIndex + 1]
      // the tag's offsetLeft after of nextTag
      const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagSpacing
      // the tag's offsetLeft before of prevTag
      const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagSpacing

      if (afterNextTagOffsetLeft > scrollWrapper.scrollLeft + containerWidth) {
        scrollWrapper.scrollLeft = afterNextTagOffsetLeft - containerWidth
      } else if (beforePrevTagOffsetLeft < scrollWrapper.scrollLeft) {
        scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
      }
    }
  }
}
</script>

<style lang="scss">
.menu-block{
  width: 96%;
  .scroll-container {
    width: calc(100% - 60px);
    margin-left: 30px;
    display: inline-block;
    .el-scrollbar__wrap {
      word-break: keep-all;
      white-space: nowrap;
    }
  }
  .scrollbar-btn{
    z-index: -1;
    position: absolute;
    background-color: rgba(25, 34, 44, 0.11);
    color: #fff;
    border-radius: 50%;
    padding: 3px;
    opacity: 0;
    margin: 6px;
    cursor: pointer;
    height: 24px;
    width: 24px;
    line-height: 20px;
    text-align: center;
    &:first-child{
      transition: .3s;
      left: 0px;
      float: left;
    }
    &:last-child{
      float: right;
      transition: .3s;
      right: -10px;
    }
  }
  &:hover{
    .scrollbar-btn{
      transition: .5s;
      opacity: 0.8;
      z-index: 99;
      &:first-child{
        transition: .5s;
        left: 32px;
      }
      &:last-child{
        transition: .5s;
        right: 0;
      }
      &:hover{
        background-color: rgba(31,45,61,.23);
      }
    }
  }
}
</style>
