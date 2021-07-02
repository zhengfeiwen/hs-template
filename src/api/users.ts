import request from '@/utils/request'
import setting from '@/settings'
import qs from 'qs'
const apiUrl = setting.apiUrl

const usersConfig: any = {
  getUserInfo: { url: '/users/info' }, // 获取用户信息
  resetPassword: { url: '/fcs/user/updatePassword' }, // 修改密码
  logout: { url: '/fcs/login/logout' } // 登出
}

export const api: any = {}

Object.keys(usersConfig).map(key => {
  api[key] = (params: any = {}) =>
    request({
      url: `${apiUrl.api}${usersConfig[key].url}`,
      method: 'post',
      data: params,
      headers: usersConfig[key].headers
    }).then(async (res:any) => {
      // 分页链式
      const countKey = `${key}Count`
      if (api[countKey]) {
        const resCnt = await api[countKey](params)
        res.object.totalCount = resCnt.object.totalCount
      }
      return res
    })
})

// 所有系统判断是否需要单点登录
export function SingleSignOn () {
  return request({
    url: `${apiUrl.api}/coreSso/common/singleSignOn`,
    method: 'post'
  })
}

export const usersApi = (key: any, params: any = {}) => {
  if (api[key]) {
    return api[key](params)
  } else {
    throw Error('不存在该方法：' + key)
  }
}

export const login = (data: any) =>
  request({
    url: `${apiUrl.api}/fcs/login/login`,
    method: 'post',
    data: qs.stringify(data)
  })
