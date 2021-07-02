import faker from 'faker'
import { Response, Request } from 'express'
import { IUserData } from '../src/api/types'

const userList: IUserData[] = [
  {
    id: 1,
    userAlias: 'admin',
    password: 'any',
    userName: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '1234567890',
    roles: ['admin'],
  },
  {
    id: 2,
    userAlias: 'editor',
    password: 'any',
    userName: 'Normal Editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am an editor',
    email: 'editor@test.com',
    phone: '1234567890',
    roles: ['editor'],
  }
]
const userCount = 100

for (let i = 2; i < userCount; i++) {
  userList.push({
    id: i,
    userAlias: 'cs04',
    password: faker.random.alphaNumeric(20),
    userName: faker.name.findName(),
    avatar: faker.image.imageUrl(),
    introduction: faker.lorem.sentence(20),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    roles: ['visitor']
  })
}

export const register = (req: Request, res: Response) => {
  return res.json({
    code: 10000
  })
}

export const login = (req: Request, res: Response) => {
  const { userAlias } = req.body
  console.log('-----------login-----------------')
  for (const user of userList) {
    if (user.userAlias) {
      return res.json({
        code: 10000,
        token: userAlias + '-token',
        object: {
          userName: user.userName,
          id: user.id,
          tcsUserId: user.id,
          uuid: 112
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
}

export const logOut = (req: Request, res: Response) => {
  return res.json({
    code: 10000
  })
}

export const singleSignOn = (req: Request, res: Response) => {
  return res.json({
    code: 10000,
    singleSignOn: !1
  })
}

export const getUserInfo = (req: Request, res: Response) => {
  // Mock data based on access token
  return res.json({
    code: 10000,
    data: {
      user: req.header('X-Access-Token') == 'admin-token' ? userList[0] : userList[1]
    }
  })
}
