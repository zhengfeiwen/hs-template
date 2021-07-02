<template>
  <div class="range-input-container">
    <div class="range-input">
      <hs-input :title="value.start" class="range-left" size="mini" v-model="value.start" :placeholder="startPlaceholder"></hs-input>
      <div class="range-tip">{{ rangeSeparator }}</div>
      <hs-input :title="value.end" class="range-left" size="mini" v-model="value.end" :placeholder="endPlaceholder"></hs-input>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'range-input'
})
export default class RangeInput extends Vue {
  @Prop({ type: Object, default: () => ({ start: '', end: '' }) })
  private value!: object

  @Prop({ type: Object })
  private option!: object

  @Prop({ type: String, default: '至' })
  private rangeSeparator!: string

  @Prop({ type: String, default: '请输入' })
  private startPlaceholder!: string

  @Prop({ type: String, default: '请输入' })
  private endPlaceholder!: string
}
</script>
<style lang="scss">
  .range-input-container{
    width: 198px;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    .range-input{
      width: 198px;
      height: 28px;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: flex;
      font-size: inherit;
      line-height: 26px;
      outline: 0;
      padding: 0 3px;
      .hs-input .hs-input__inner{
        height: 26px;
        border: none;
        outline: 0;
        &:focus{
          border: none;
          outline: 0;
        }
      }
      &:focus{
        border-color: #409eff;
        outline: 0;
      }
      .range-left{
        width: calc(50% - 18px);
      }
      .range-tip{
        width: 20px;
        text-align: center;
      }
      .range-right{
        width: calc(50% - 18px);
      }
    }
  }
</style>
