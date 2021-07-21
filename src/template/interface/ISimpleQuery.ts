import { Column, Pagination, TableData } from '@/utils/types/tables'
export default interface ISimplePage {
  onQuery: Function
  onReset: Function
  columns: Column
  tableData: TableData
  pagination: Pagination
  loading: boolean
  form: object|any
}
