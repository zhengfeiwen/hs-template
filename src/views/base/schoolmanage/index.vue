<template>
  <simple-container @on-query="onQuery" @on-reset="onReset" :more="!1">
    <template slot="query">
      <el-form ref="form" :model="form" label-width="98px" :inline="true">
        <el-form-item label="业务类型">
          <dict-select :val.sync="form.business" constant-group-name="businessType" @change="businessChange"></dict-select>
        </el-form-item>
        <el-form-item label="学习类型">
          <dict-select ref="study" :option="options.study" :prop="{ key: 'id', value: 'studyName' }" :val.sync="form.study"></dict-select>
        </el-form-item>
        <el-form-item label="院校代码">
          <hs-input
            size="mini"
            v-model="form.schoolCode"
            placeholder="请输入院校代码"
          ></hs-input>
        </el-form-item>
        <el-form-item label="院校名称">
          <hs-input
            size="mini"
            v-model="form.schoolName"
            placeholder="请输入院校名称"
          ></hs-input>
        </el-form-item>
        <el-form-item label="院校状态">
          <dict-select :isInit="!0" :val.sync="form.status" constant-group-name="status"></dict-select>
        </el-form-item>
      </el-form>
    </template>
    <template>
      <simple-table ref="hsTable" :columnable="!1" :index="!0" :isCheckbox="!1" :data="tableData" :columns="columns" :loading="loading" :pagination.sync="pagination" @query="onQuery" @row-dbclick="showDetail" :dicts="['status', 'business']">
        <template slot="operator" slot-scope="{ scope }">
          <hs-button
            v-permission="['fcsSchoolDetail']"
            @click.native.prevent="showDetail(scope.row)"
            type="text"
            size="small">
            详情
          </hs-button>
        </template>
      </simple-table>
    </template>
    <detail-dialog title="详情" :data="detailData" :visible.sync="visible"  :dicts="['status', 'business']"></detail-dialog>
  </simple-container>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import SimpleTable from '@/components/busi/table/simple-table.vue'
import DetailDialog from '@/components/busi/table/detail.vue'
import DictSelect from '@/components/busi/custom/dictselect.vue'
import DialogSelect from '@/components/busi/custom/dialogselect.vue'
import SimpleContainer from '@/components/container/index.vue'
import CSimpleQuery from '@/standard/class/CSimpleQuery'
@Component({
  name: 'fcsSchoolMenu',
  components: {
    SimpleTable,
    SimpleContainer,
    DetailDialog,
    DictSelect,
    DialogSelect
  }
})
export default class SchoolManage extends CSimpleQuery {
  form: any = { status: 1, study: '' }

  tableData = {
    list: [{
      schoolCode: '1000',
      schoolName: '福州大学',
      business: '1',
      studyName: '全日制',
      status: '1'
    }],
    totalCount: -1
  }

  columns = [{
    prop: 'schoolCode',
    label: '院校代码'
  },
  {
    prop: 'schoolName',
    label: '院校名称'
  },
  {
    prop: 'business',
    label: '业务类型',
    export: 'businessName'
  },
  {
    prop: 'studyName',
    label: '学习类型'
  },
  {
    prop: 'status',
    label: '状态',
    export: 'statusName',
    'style-format': {
      f: [0],
      t: [1]
    }
  },
  {
    prop: 'createTime',
    label: '创建时间',
    format: 'date'
  }]

  pagination: any = {
    currentPage: 1,
    pageSize: 10
  }

  private options: any = {
    study: {
      url: '/fcs/study/getStudySelect',
      data: {
        businessId: this.form.business || null
      }
    }
  }

  private async businessChange () {
    this.form.study = ''
    this.options.study.data.businessId = this.form.business || null;
    (this.$refs.study as any).getList()
  }

  private currentPage = 1

  private visible = !1

  private detailData = {}

  private async showDetail (row: any) {
    this.visible = !0
    this.detailData = row
  }

  private businessOption = {
    key: 'business',
    params: {

    },
    conditions: [
      {
        label: '业务名称',
        value: 'businessName'
      }
    ],
    table: {
      url: '/fcs/business/search',
      columns: [{
        prop: 'businessName',
        label: '业务名称'
      },
      {
        prop: 'memo',
        label: '备注'
      }]
    }
  }

  private studyOption: any = {
    key: 'study',
    conditions: [
      {
        label: '学习类型代码',
        value: 'studyCode'
      },
      {
        label: '学习类型名称',
        value: 'studyName'
      }
    ],
    table: {
      url: '/fcs/study/search',
      columns: [{
        prop: 'studyName',
        label: '学习类型名称'
      },
      {
        prop: 'studyCode',
        label: '学习类型代码'
      }]
    }
  }

  private studyOpen (done: Function) {
    if (!this.form.businessName) {
      this.$alert('请选择业务', '提示', { type: 'error' })
    } else {
      done()
    }
  }

  activated () {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
