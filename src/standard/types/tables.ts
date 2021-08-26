export type Pagination = {
  [x: string]: any
  pageSize: number
  currentPage:Number
}

export type TableData = {
  [x: string]: any
  list: object[]
  totalCount: number
}

export type Column = Array<{
  [x: string]: any
  prop: string
  label: string
}>