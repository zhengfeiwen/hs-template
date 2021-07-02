export const SessionStorage = {
  set: (key: string, value: string) => {
    if (!key) {
      throw Error('key is null')
    }
    sessionStorage.removeItem(key)
    sessionStorage.setItem(key, value)
  },
  get: (key: string, format = '') => {
    if (!key) {
      throw Error('key is null')
    }
    const val = sessionStorage.getItem(key)
    if (format.toLowerCase() === 'object') {
      return (!val || val === 'undefined') ? {} : JSON.parse(val)
    } else if (format.toLowerCase() === 'array') {
      return (!val || val === 'undefined') ? [] : JSON.parse(val)
    }
    return val
  },
  remove: (key: string) => {
    if (!key) {
      throw Error('key is null')
    }
    return sessionStorage.removeItem(key)
  }
}

export const LocalStorage = {
  set: (key: string, value: string) => {
    if (!key) {
      throw Error('key is null')
    }
    localStorage.setItem(key, value)
  },
  get: (key: string) => {
    if (!key) {
      throw Error('key is null')
    }
    return localStorage.getItem(key)
  },
  setObj: (key: string, value: any, expire = 8 * 60 * 60 * 1000) => {
    if (!key) {
      throw Error('key is null')
    }
    const obj = {
      data: value,
      time: Date.now(),
      expire: expire
    }
    localStorage.setItem(key, JSON.stringify(obj))
  },
  getObj: (key: string) => {
    if (!key) {
      throw Error('key is null')
    }
    let val: any = localStorage.getItem(key)
    if (!val) {
      return val
    }
    val = JSON.parse(val)
    if (Date.now() - val.time > val.expire) {
      localStorage.removeItem(key)
      return null
    }
    return val.data
  },
  remove: (key: string) => {
    if (!key) {
      throw Error('key is null')
    }
    return localStorage.removeItem(key)
  }
}
