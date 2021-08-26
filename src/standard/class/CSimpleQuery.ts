import { ObjFactory, objToEmpty } from '@/utils/common'
import { LooseObject } from '../types/common'
import { TableData, Pagination, Column } from '@/standard/types/tables'
import { Vue } from 'vue-property-decorator'
import ISimplePage from '../interface/ISimpleQuery'

export default class CSimpleQuery extends Vue {

  // 分页信息
  pagination: Pagination = {
    currentPage: 1,
    pageSize: 10
  }

  // 初始化数据方法
  initData() {
    ObjFactory.init(this.form)
  }

  // 加载标志
  loading: boolean = !1

  // 查询条件
  form: LooseObject = {}

  // 网格列配置
  columns: Column = []

  // 列表信息
  tableData: TableData = {
    list: [],
    totalCount: -1
  }
}
