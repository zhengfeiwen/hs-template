<template>
<div class="coverlap-container">
  <el-button type="info" plain @click="$router.back(-1)" size="mini"><svg-icon style="font-size: 14px;" name="export" />&nbsp;返回</el-button>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'

@Component({
  name: 'coverlap'
})
export default class Coverlap extends Vue {
  @Prop({ type: Array })
  private data!: any[]

  @PropSync('value', { type: Object })
  private valueSync!: object

  private curItem = -1

  private itemClass (i: number, cur: number) {
    return {
      item: !0,
      active: i === cur
    }
  }

  private itemClick (i: any) {
    this.curItem = i
    this.valueSync = Object.assign(this.data[i])
  }
}
</script>
<style lang="scss">
</style>
