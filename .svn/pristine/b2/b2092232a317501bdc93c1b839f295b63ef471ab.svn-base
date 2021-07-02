<template>
  <transition name="fade-transform" mode="out-in">
    <div class="busi-drawer-container">
      <header></header>
      <section>
        <div v-for="(item, i) in data" :key="i" :class="itemClass(i, curItem)" @click="itemClick(i)">{{ item.value }}</div>
      </section>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Watch } from 'vue-property-decorator'

@Component({
  name: 'drawer-select'
})
export default class DrawerSelect extends Vue {
  @Prop({ type: Array })
  private data!: any[]

  @PropSync('value', { type: Object })
  private valueSync!: object|any

  @Watch('valueSync', { deep: !0 })
  private curItemChange () {
    this.data.map((v, i) => {
      if (v.key === this.valueSync.key) {
        this.curItem = i
      }
    })
  }

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

  beforeMount () {
    this.data.map((v, i) => {
      if (v.key === this.valueSync.key) {
        this.curItem = i
      }
    })
  }
}
</script>
<style lang="scss">
  .busi-drawer-container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    section{
      width: 100%;
      .item{
        position: relative;
        font-size: 14px;
        width: 80px;
        margin: 10px auto;
        padding: 10px 0;
        text-align: center;
        cursor: pointer;
        &:hover{
          color: #fff;
          background-color:  #FE4066;
          border-radius: 4px;
        }
        &.active{
          color: #fff;
          background-color:  #FE4066;
          border-radius: 4px;
        }
      }
    }
  }
</style>
