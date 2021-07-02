interface IRightRoute {
  [x: string]: any
  id: string,
  name: string,
  pid: string
}

export type RightRoute  = IRightRoute

export interface IUserInfo {
  [x: string]: any
  id: number
  userName: string
  userAlias: string
}

export type UserInfo  = IUserInfo

export interface IOpType {
  opType: string
  opCode: string
}

export type OpType  = IOpType