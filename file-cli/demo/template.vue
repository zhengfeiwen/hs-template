<template>
  <simple-container @on-query="onQuery" @on-reset="onReset" :more="false">
    <template slot="query">
      <el-form ref="form" :model="form" label-width="98px" :inline="true">
        <el-form-item label="查询条件1">
          <dict-select :val.sync="form.xxx" constant-group-name="xxx" @change="xxxChange"></dict-select>
        </el-form-item>
      </el-form>
    </template>
    <template>
      <simple-table ref="hsTable" :columnable="false" :export-name="exportName" :exportable="exportable" :export-columns="columns" :index="true" :isCheckbox="false" :data="tableData" :columns="columns" :loading="loading" :pagination.sync="pagination" @query="onQuery" @row-dbclick="showDetail" :dicts="['status', 'business']">
        <template slot="operator" slot-scope="{ scope }">
          <hs-button v-permission="['fcsSchoolDetail']" @click.native.prevent="showDetail(scope.row)" type="text" size="small">详情</hs-button>
        </template>
        <template slot="action-block">
          <hs-button type="danger" v-permission="['fcsSchExport']" @click="onExport" icon="hs-icon-download" size="mini">导出</hs-button>
        </template>
      </simple-table>
    </template>
  </simple-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SimpleTable from '@/components/busi/table/simple-table.vue'
import DictSelect from '@/components/busi/custom/dictselect.vue'
import SimpleContainer from '@/components/container/index.vue'
import CSimpleQuery from '@/standard/class/CSimpleQuery'
import ISimpleQuery from '@/standard/interface/ISimpleQuery'
import { ObjFactory } from '@/utils/common'
@Component({
  name: 'templateCLassName',
  components: {
    SimpleTable,
    SimpleContainer,
    DictSelect
  }
})
export default class templateCLassName extends Vue {
  form: any = { status: 1, study: '' }

  // 表格数据
  tableData = {
    list: [],
    totalCount: -1
  }

  // 表格列
  columns = [{
    prop: 'prop',
    label: '列名称'
  }]

  loading = !1

  // 查询方法
  onQuery () {
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 3000)
  }

  initData () {
    ObjFactory.init(this, this.form)
    console.log(this)
    this.form.aaa = 'zfw'
    console.log(this)
  }

  onMounted () {
    this.initData()
  }

  onReset () {
    ObjFactory.toInit(this, this.form)
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
