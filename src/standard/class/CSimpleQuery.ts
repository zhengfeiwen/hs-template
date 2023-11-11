/*
 * @Author: zhengfeiwen zfw_emperor_1993@163.com
 * @Date: 2023-11-10 14:57:22
 * @LastEditors: zhengfeiwen zfw_emperor_1993@163.com
 * @LastEditTime: 2023-11-11 22:35:17
 * @FilePath: \hs-template\src\standard\class\CSimpleQuery.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
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
  initData () {
    ObjFactory.init(this.form)
  }

  // 加载标志
  loading = !1

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
