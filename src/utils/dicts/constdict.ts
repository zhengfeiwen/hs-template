// 根据字段key自动翻译字典
import { getConstant, commonApi } from '@/api/common'
import { isEmpty, isType } from '../common'
import { LocalStorage } from '../storage'
const dicts: any = {
  status: { 0: '无效', 1: '正常' },
  ifMust: { 0: '否', 1: '是' },
  ifRefund: { 0: '否', 1: '是' },
  openInvoice: { 0: '否', 1: '是' },
  schoolYear: {},
  degree: {},
  business: {},
  len: {},
  payType: {},
  schoolStatus: {},
  tradeType: {}
}
const custGroup = ['stuSource']

export const DICT_MONEY_KEY = dicts

// 是否是常量
const isDict = (key: any) => Object.keys(dicts).includes(key)

const studentSource = async (groupName: any, params: any = {}) => {
  let constants: any = []
  const key = `constant-${groupName}`
  await commonApi('studentSourceList', params).then((res: any) => {
    if (res.code === 10000) {
      if (res.object.list && res.object.list.length > 0) {
        constants = res.object.list.map((v: any) => {
          return {
            key: v.optionKey * 1,
            value: v.optionValue
          }
        })
      }
      LocalStorage.setObj(key, constants)
    }
  })
  return constants
}

// 获取常量列表
export const getConstantByGroup = async (groupName: any, params: any = {}) => {
  if (!groupName) return {}
  const key = `constant-${groupName}`
  let constants: any = LocalStorage.getObj(key)
  if ((isEmpty(constants) || params.update) && !params.init) {
    if (!custGroup.includes(groupName)) {
      await getConstant({
        groupName: groupName
      }).then((res: any) => {
        constants = res.object.list.map((v: any) => {
          if (groupName === 'len') {
            return {
              key: v.key,
              value: v.value + '年'
            }
          }
          return {
            key: v.key,
            value: v.value
          }
        })
        LocalStorage.setObj(key, constants)
      })
    } else {
      constants = await studentSource(groupName, params)
    }
  }
  return constants
}

// 字典翻译
const translate = async (key: any, obj: any, option: any = {}) => {
  const dict: any = await getConstantByGroup(key, option)
  const nameKey = `${key}Name`
  if (isEmpty(obj[key])) {
    obj[nameKey] = obj[key]
    return obj
  }
  // eslint-disable-next-line eqeqeq
  const val = dict.filter((v: any) => v.key == obj[key])
  if (val.length > 0) {
    obj[nameKey] = val[0].value
  } else {
    obj[nameKey] = `字典不存在该值${key}:${obj[key]}`
  }
  return obj
}

// 常量字典标准化
export const dictStandardization = async (key: any, val: any, option: any) => {
  if (isDict(key) && isType(val, 'object')) return await translate(key, val, option)
  return val
}
