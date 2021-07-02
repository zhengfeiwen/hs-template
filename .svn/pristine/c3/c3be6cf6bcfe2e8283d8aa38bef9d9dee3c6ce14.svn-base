<template>
  <el-popover
  placement="top"
  v-if="tbsUrlTag || tesUrlTag"
  width="200"
  v-model="visible" trigger="hover">
  <ul class="change-system-list">
    <li v-if="tbsUrlTag">
      <i class="el-icon-office-building"></i> <a :href="tbsUrlTag">猎学公共基础数据平台</a>
    </li>
    <!-- <li v-if="fcsUrlTag">
      <i class="el-icon-notebook-1"></i> <a :href="tcsUrlTag">财务2.0系统</a>
    </li> -->
    <li  v-if="tesUrlTag">
      <i class="el-icon-notebook-1"></i> <a :href="tesUrlTag">猎学CRM招生管理系统</a>
    </li>
  </ul>
  <el-button slot="reference" size="mini" class="btn-text can-hover" type="text">
    <img src="../../../assets/statics/pics/change_system.png" alt="" style="width: 18px;">
  </el-button>
</el-popover>
</template>

<script>
import { LocalStorage } from '@/utils/storage'
// import { OtherSysUrl } from '@api/sys.login'
export default {
  data () {
    return {
      visible: false,
      fcsUrlTag: 0,
      tbsUrlTag: 0,
      tesUrlTag: 0
    }
  },
  created () {
    const sysTypes = LocalStorage.getObj('sysTypes').split(',')
    const changeSystem = JSON.parse(process.env.VUE_APP_VARIABLE).system_change
    if (sysTypes.indexOf('tbs') !== -1) {
      this.tbsUrlTag = changeSystem.tbs
    }
    // if (sysTypes.indexOf('fcs') !== -1) {
    //   this.fcsUrlTag = changeSystem.fcs
    // }
    if (sysTypes.indexOf('tes') !== -1) {
      this.tesUrlTag = changeSystem.tes
    }
  }

}
</script>
<style lang="scss">
.change-system-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: block;
    li {
      text-align: left;
      a {
          text-decoration:none;
          line-height: 30px;
          vertical-align: baseline;
      }
      a:link {color:#666;}
      a:visited {color:#666;}
      a:hover {color:rgb(11, 65, 82);}
      a:active{color:#666;}
    }
    img {
        width: 120px;
        height: 120px;
      }
    p {
      margin: 0;
      font-size: 12px;
    }
  }
  .can-hover{
    &:hover{
      transform: rotate(180deg);
    }
  }
</style>
