export const filter = (list: any, params: any) => {
  const temp = {...params}
  delete temp.currentPage
  delete temp.layout
  delete temp.pageSize
  delete temp.sizes
  return list.filter((v: any) => {
    for(let key of Object.keys(temp)){
      if (key.indexOf('date') > -1 || key.indexOf('Date') > -1) {
        const date = temp[key] ? temp[key].split(',') : null
        if (date && (v[key] < date[0] || v[key] > date[1])) return !1
      } else {
        if (typeof v[key] !== 'string' && temp[key] && v[key] != temp[key]) return !1
        else if (temp[key] && typeof v[key] === 'string' && v[key].indexOf(temp[key]) === -1) return !1
      }
    }
    return !0
  })
}