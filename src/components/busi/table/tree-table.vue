<template>
<div class="tree-table-container">
  <el-table
    :data="tableData.list"
    style="width: 100%"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    @expand-change="expandChange">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-table
          :data="tableData.list[props.$index].children"
          style="width: 100%"
          :header-cell-style="{ 'background-color': '#d5d5d5' }"
          :cell-style="{ 'background-color': '#E7EEFF' }">
            <template v-for="(column, i) in childrenColumns">
              <el-table-column
                align="left"
                header-align="left"
                :key="i"
                :show-overflow-tooltip="true"
                :prop="column.prop"
                :label="column.label">
              </el-table-column>
            </template>
          </el-table>
      </template>
    </el-table-column>
      <template v-for="(column, i) in columns">
        <el-table-column
          v-if="!column.custom"
          align="left"
          header-align="left"
          :key="i"
          :show-overflow-tooltip="true"
          :prop="column.prop"
          :label="column.label">
        </el-table-column>
        <el-table-column
          v-else
          align="left"
          header-align="left"
          :key="i"
          :show-overflow-tooltip="true"
          :prop="column.prop"
          :label="column.label">
          <template slot-scope="scope">
            <slot :name="'custom_' + column.prop" :scope="scope"></slot>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="operator"
        align="center"
        header-align="center"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <slot name="operator" :scope="scope"></slot>
        </template>
      </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="pagination.currentPage"
    :page-sizes="[10, 20, 30, 40, 50, 100]"
    :page-size="pagination.pageSize"
    :hide-on-single-page="false"
    :pager-count="pagerCount"
    :layout="'total, sizes, prev, pager, next, jumper'"
    :total="tableData.totalCount">
  </el-pagination>
</div>
</template>

<script lang="ts">
import { Pagination, TableData } from '@/utils/types/tables'
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'

@Component({
  name: 'tree-table'
})
export default class TreeTable extends Vue {
  @PropSync('value', { type: Object })
  private valueSync!: object

  // 页数最多个数
  @Prop({ type: Number, default: 7 })
  private pagerCount!: number

  // 分页信息
  @PropSync('pagination', {
    type: Object,
    default: () => ({
      currentPage: 1,
      pageSize: 10
    })
  })
  private paginationSync!: Pagination

  @Prop({ type: Array })
  private columns!: []|any

  // 列表数据与总数配置
  @Prop({ type: Object })
  private tableData!: TableData

  @Prop({ type: Array })
  private children!: []|any

  @Prop({ type: Array })
  private childrenColumns!: []|any

  @Prop({ type: Boolean, default: !1 })
  private loading!: boolean

  @Prop({ type: Boolean, default: !1 })
  private childrenLoading!: boolean

  @Prop({ type: Object, default: () => ({}) })
  private operator!: object

  // 页数变化
  private handleSizeChange (val: any) {
    this.$listeners['handle-size-change'] && this.$emit('handle-size-change', val)
    this.paginationSync.pageSize = val
    this.paginationSync.currentPage = this.paginationSync.currentPage || 1
    this.$listeners.query && this.$emit('query', this.paginationSync)
  }

  // 翻页
  private handleCurrentChange (val: any) {
    this.$listeners['handle-current-change'] && this.$emit('handle-current-change', val)
    this.paginationSync.pageSize = this.paginationSync.pageSize || 10
    this.$listeners.query && this.$emit('query', {
      pageSize: this.paginationSync.pageSize || 10,
      currentPage: val
    })
  }

  private expandChange (row: any) {
    if (row.children.length > 0) return
    if (this.$listeners['expand-change']) {
      this.$emit('expand-change', row)
    }
  }
}
</script>
<style lang="scss">
.tree-table-container{
  .el-table__expanded-cell{
    padding: 0 !important;
  }
  .el-table td{
    padding: 6px;
  }
  .el-pagination{
    text-align: right;
    margin-top: 4px;
  }
}
</style>
