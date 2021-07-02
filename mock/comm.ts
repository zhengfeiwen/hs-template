import { Response, Request, NextFunction } from 'express'
import faker from 'faker'
import fakerZh from 'faker/locale/zh_CN'

const optionList: any = []
const count = 37

for (let i = 0; i < count; i++) {
  optionList.push({
    id: fakerZh.random.number(),
    businessName: fakerZh.random.arrayElement(['全日制', '业余学历', '出国留学']),
    memo: fakerZh.random.arrayElement(['', '这是短备注', '这是长备注这是长备注这是长备注这是长备注这是长备注这是长备注这是长备注']),
    businessState: fakerZh.random.number({
      max: 1,
      min: 0
    })
  })
}

export const getOption = (req: Request, res: Response) => {
  const { groupName } = req.body
  let list = optionList.filter((v: any) => groupName === v.groupName)
  return res.json({
    code: 10000,
    message: 'success',
    object: {
      list: [...list]
    }
  })
}


const contantList: any = []
const subjectDegree = ['中专', '高起本', '大专', '本科', '硕士', '博士', '其他']
for (let i = 0; i < subjectDegree.length; i++) {
  contantList.push({
    key: subjectDegree[i],
    value: subjectDegree[i],
    groupName: 'subjectDegree'
  })
}
const subjectLen = ['1年', '2年', '3年', '4年', '5年', '7年', '10年']
for (let i = 0; i < subjectLen.length; i++) {
  contantList.push({
    key: subjectLen[i],
    value: subjectLen[i],
    groupName: 'subjectLen'
  })
}

export const getConstant = (req: Request, res: Response) => {
  const { groupName } = req.body
  let list = contantList.filter((v: any) => groupName === v.groupName)
  return res.json({
    code: 10000,
    message: 'success',
    object: {
      list: [...list]
    }
  })
}