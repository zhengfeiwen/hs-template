<template>
<div class="static-item-container" :style="{ width: width + 'px', 'flex-direction': direction, 'align-items': align }">
  <div class="static-label"><span style="color: #f56c6c; margin-right:3px;" v-if="required">*</span>{{ label }}</div>
  <div class="static-content" :style="{ width: (width - 80) + 'px' }"><slot></slot></div>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'static-item'
})
export default class StaticItem extends Vue {
  @Prop({ type: String })
  private label!: string

  @Prop({ type: Number })
  private width!: number

  @Prop({ type: Boolean, default: !1 })
  private required!: boolean

  @Prop({ type: String, default: 'center' })
  private align!: string

  @Prop({ type: String, default: 'row' })
  private direction!: string
}
</script>
<style lang="scss">
  .static-item-container{
    width: 310px;
    display: flex;
    align-items: center;
    .static-label{
      width: 95px;
      text-align: right;
      font-size: 14px;
      font-weight: 400;
      user-select: none;
      word-break: keep-all;
      &:after{
        content: ':';
        margin: 0 12px 0 3px;
      }
    }
    .static-content{
      width: calc(100% - 100px);
      font-size: 14px;
      font-weight: bolder;
      overflow-wrap: break-word;
    }
  }
</style>
