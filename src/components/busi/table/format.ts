/*
 * @Author: zhengfeiwen zfw_emperor_1993@163.com
 * @Date: 2023-11-10 14:57:22
 * @LastEditors: zhengfeiwen zfw_emperor_1993@163.com
 * @LastEditTime: 2023-11-11 22:36:08
 * @FilePath: \hs-template\src\components\busi\table\format.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// 列表数据 格式化工具
import util from '@/utils/busi/util'
import dayjs from 'dayjs'
import { isEmpty } from '@/utils/common'

export const format = (list: any, type: any, str: any) => {
  if (!list || list.length === 0 || !type) return []
  let res = [...list]
  if (type === 'date') res = formatTime(res, str)
  if (type === 'day') res = formatTime(res, str, 'YYYY-MM-DD')
  if (type === 'timeSecond') res = formatTimeSecond(res, str)
  if (type === 'state') res = formaState(res, str)
  if (type === 'money') res = formaMoney(res, str)
  if (type === 'trim') res = formaTrim(res, str)
  return res
}

const formatTime = (list: any, str: any, format = 'YYYY-MM-DD HH:mm') => {
  if (!list || list.length === 0) return []
  return list.map((v: any) => {
    if (v[str]) {
      v[str] = (v[str] === '-1' || v[str] === -1) ? '' : dayjs(v[str]).format(format)
    }
    return v
  })
}

const formatTimeSecond = (list: any, str: any) => {
  if (!list || list.length === 0) return []
  return list.map((v: any) => {
    if (v[str]) {
      v[str] = (v[str] === '-1' || v[str] === -1) ? '' : dayjs(v[str]).format('YYYY-MM-DD HH:mm:ss')
    }
    return v
  })
}

const stateDict: any = {
  stuSchoolRollStatus: {
    0: '无效',
    1: '有效'
  },
  state: {
    0: '无效',
    1: '有效'
  }
}

const formaState = (list: any, str: any) => {
  if (!list || list.length === 0) return []
  return list.map((v: any) => {
    if (v[str]) {
      v[str] = stateDict[str][v[str]]
    }
    return v
  })
}

const formaMoney = (list: any, str: any) => {
  if (!list || list.length === 0) return []
  return list.map((v: any) => {
    if (!isEmpty(v[str])) {
      v[str] = util.generatingThousandthPer(v[str])
    }
    return v
  })
}

const formaTrim = (list: any, str: any) => {
  if (!list || list.length === 0) return []
  return list.map((v: any) => {
    if (v[str]) {
      v[str] = (v[str] === '-1' || v[str] === -1) ? '' : v[str]
    }
    return v
  })
}

const strSlice = (val: any, type: any) => {
  const rule = type.split(':')
  const len = rule.length === 2 ? rule[1] * 1 : 0
  if (isEmpty(val)) return val
  return len < 0 ? val.slice(len) : val.slice(0, len)
}

export const formatValue = (val: any, type: any) => {
  if (isEmpty(val) || val === -1 || val === '-1') return ''
  if (type === 'date') return dayjs(val).format('YYYY-MM-DD HH:mm')
  if (type === 'day') return dayjs(val).format('YYYY-MM-DD')
  if (type === 'timeSecond') return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  if (type === 'state') return stateDict.state[val]
  if (type.indexOf('str:') > -1) return strSlice(val, type)
  if (type === 'money') return util.generatingThousandthPer([val])
  return val
}
