<template>
  <div class="dashboard-container">
    <div class="dashboard-main">
      home
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Dashboard'
})
export default class extends Vue {
}
</script>
<style lang="scss">
  .dashboard-container{
    height: 100%;
    width: 100%;
    padding: 10px 10px 0 10px;
    background-color: #EAEAEA;
    min-width: 1450px;
    overflow: auto;
    .dashboard-main{
      height: 100%;
      width: 100%;
      overflow: auto;
      background-color: #fff;
      padding: 0 10px;
    }
  }
</style>
