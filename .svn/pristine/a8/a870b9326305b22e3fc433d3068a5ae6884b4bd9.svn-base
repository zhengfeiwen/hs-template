import { Response, Request, NextFunction } from 'express'
import faker from 'faker'
import fakerZh from 'faker/locale/zh_CN'
import { filter } from './utils'

const feeItemList: any[] = []
const num = 6

for (let i = 0; i < num; i++) {
  feeItemList.push({
    studyType: fakerZh.random.arrayElement(['全日制', '业余学历']),
    gradeName: fakerZh.random.arrayElement([2021, 2020]),
    subjectName: fakerZh.random.arrayElement(['会计','产品设计']),
    len: fakerZh.random.arrayElement(['第一学年', '第二学年']),
    code: fakerZh.random.arrayElement([50021, 50020]),
    feeItem: fakerZh.random.arrayElement(['学费', '预交教材费']),
    feeItemCode: fakerZh.random.arrayElement([10000, 1111]),
    money: fakerZh.random.arrayElement([2000, 13800]),
    status: fakerZh.random.arrayElement([1, 0]),
    must: fakerZh.random.arrayElement([1, 0]),
    reduce: fakerZh.random.arrayElement([1, 0])
  })
}

export const feeitemList = (req: Request, res: Response) => {
  const { currentPage, pageSize } = req.body
  const ben = (currentPage - 1) * pageSize
  const list = filter(feeItemList, req.body)
  return res.json({
    code: 10000,
    object: {
      list: [...list.slice(ben, ben + pageSize)],
      totalCount: list.length
    }
  })
}

export const feeitemDetail = (req: Request, res: Response) => {
  const { currentPage, pageSize } = req.body
  const ben = (currentPage - 1) * pageSize
  const list = filter(feeItemList, req.body)
  return res.json({
    code: 10000,
    object: {
      list: [...list.slice(ben, ben + pageSize)],
      totalCount: list.length
    }
  })
}

const businessList: any[] = []

for (let i = 0; i < num; i++) {
  businessList.push({
    businessCode: fakerZh.random.arrayElement(['1000', '1001']),
    businessName: fakerZh.random.arrayElement(['全日制', '业余学历']),
    memo: fakerZh.random.arrayElement(['会计','产品设计']),
    status: fakerZh.random.arrayElement([1, 0]),
    ifMust: fakerZh.random.arrayElement([1, 0]),
    amount: fakerZh.random.arrayElement([1232300, 2121212100]),
    amounts: fakerZh.random.arrayElement([1232300, 2121212100]),
    businessStateName: fakerZh.random.arrayElement(['有效', '无效'])
  })
}

export const businessSeach = (req: Request, res: Response) => {
  const { groupName } = req.body
  let list = businessList.filter((v: any) => groupName === v.groupName)
  return res.json({
    code: 10000,
    message: 'success',
    object: {
      list: [...list],
      totalCount: businessList.length
    }
  })
}


const userlist: any[] = []

for (let i = 0; i < num * 3; i++) {
  userlist.push({
    userName: fakerZh.random.arrayElement(['全日制', '业余学历']),
    userCode: fakerZh.random.number({
      max: 100000,
      min: 0
    })
  })
}
export const userList = (req: Request, res: Response) => {
  const { groupName } = req.body
  let list = userlist.filter((v: any) => groupName === v.groupName)
  return res.json({
    code: 10000,
    message: 'success',
    object: {
      list: [...list]
    }
  })
}
export const userCount = (req: Request, res: Response) => {
  return res.json({
    code: 10000,
    message: 'success',
    object: {
      totalCount: userlist.length
    }
  })
}