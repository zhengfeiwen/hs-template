import { LocalStorage } from './storage'
// 持久化测试mock方法 待完善
const filter = (list: any, params: any) => {
  const temp = { ...params }
  delete temp.currentPage
  delete temp.layout
  delete temp.pageSize
  delete temp.sizes
  return list.filter((v: any) => {
    for (const key of Object.keys(temp)) {
      if (key.indexOf('date') > -1 || key.indexOf('Date') > -1) {
        const date = temp[key]
        if (v[key] < date[0] || v[key] > date[1]) return !1
      } else {
        if (typeof v[key] !== 'string' && temp[key] && v[key] !== temp[key]) return !1
        else if (temp[key] && typeof v[key] === 'string' && v[key].indexOf(temp[key]) === -1) return !1
      }
    }
    return !0
  })
}

export const mock = {
  query: (key: string, tableData: any, params: any, pagination: any): any => {
    if (!key) return
    const temp: any = LocalStorage.getObj(key)
    if (!temp || Object.keys(temp).length === 0) {
      LocalStorage.setObj(key, tableData)
    }
    const list = filter(temp.list, params)
    const { currentPage, pageSize } = pagination
    const ben = (currentPage - 1) * pageSize
    return {
      list: [...list.slice(ben, ben + pageSize)],
      total: list.length
    }
  },
  update: (key: string, form: any, id: any): any => {
    if (!key) return
    const save = LocalStorage.getObj(key)
    const list: any = [{ ...form }]
    save.list.map((v: any) => {
      if (v[id] !== form[id]) {
        list.push(v)
      }
    })
    save.list = list
    LocalStorage.setObj(key, save)
  },
  updateObj: (key: string, form: any): any => {
    if (!key) return
    LocalStorage.setObj(key, form)
  },
  getObj: (key: any, form: any) => {
    const obj: any = LocalStorage.getObj(key)
    return obj && Object.keys(obj).length > 0 ? obj : form
  }
}
