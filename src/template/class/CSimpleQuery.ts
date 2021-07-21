import { objToEmpty } from '@/utils/common'
import { TableData, Pagination, Column } from '@/utils/types/tables'
import { Vue } from 'vue-property-decorator'
import ISimplePage from '../interface/ISimpleQuery'

export default class CSimpleQuery extends Vue {

  // 重置方法
  onReset () {
    objToEmpty(this.form)
  }

  // 分页信息
  pagination = {
    currentPage: 1,
    pageSize: 10
  }

  // 加载标志
  loading = !1

  // 查询条件
  form = {}
}
