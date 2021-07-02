import { getConstantByGroup } from '@/utils/dicts/constdict'
import { LocalStorage } from '@/utils/storage'
import { isEmpty } from 'xe-utils'

// 列表格子字典翻译
const statusMap: any = {
  1: '有效',
  0: '无效'
}

const dicts: any = {}

dicts.status = function (key: any) {
  return key !== '' ? (statusMap[key] ? statusMap[key] : key) : ''
}

dicts.businessStatus = function (key: any) {
  return key !== '' ? (statusMap[key] ? statusMap[key] : key) : ''
}

dicts.schoolStatus = function (key: any) {
  return key !== '' ? (statusMap[key] ? statusMap[key] : key) : ''
}

dicts.subjectStatus = function (key: any) {
  return key !== '' ? (statusMap[key] ? statusMap[key] : key) : ''
}

dicts.gradeStatus = function (key: any) {
  return key !== '' ? (statusMap[key] ? statusMap[key] : key) : ''
}

dicts.studyStatus = function (key: any) {
  return key !== '' ? (statusMap[key] ? statusMap[key] : key) : ''
}

dicts.agentStatus = function (key: any) {
  return key !== '' ? (statusMap[key] ? statusMap[key] : key) : ''
}

export const initDictMap = (groupNames: any) => {
  groupNames.map(async (v: any) => {
    await getConstantByGroup(v)
  })
}

export const dictMap = (groupName: any, val: any) => {
  // getConstantByGroup(groupName)
  const constants = LocalStorage.getObj(`constant-${groupName}`)
  if (isEmpty(constants)) return val
  const res = constants.filter((v: any) => v.key === val)
  return res.length === 1 ? res[0].value : val
}
