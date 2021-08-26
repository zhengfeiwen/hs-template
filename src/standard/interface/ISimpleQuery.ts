import { Column, Pagination, TableData } from '@/standard/types/tables'
import { LooseObject } from '../types/common';
export default interface ISimpleQuery {
  onQuery: Function
  onReset: Function
  columns: Column
  tableData: TableData
  pagination: Pagination
  loading: boolean
  form: LooseObject
}
