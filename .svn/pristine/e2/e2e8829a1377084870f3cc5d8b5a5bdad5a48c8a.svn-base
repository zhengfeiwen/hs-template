<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger
  }
})
export default class extends Vue {
  get sidebar () {
    return AppModule.sidebar
  }

  private toggleSideBar () {
    AppModule.ToggleSideBar(false)
  }
}
</script>

<style lang="scss" scoped>
.user-name {
  font-size: 14px;
}
.navbar {
  height: 40px;
  overflow: hidden;
  position: relative;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #d6d6d6;

  .hamburger-container {
    line-height: 35px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

}
</style>
