import request from '@/utils/request'
import setting from '@/settings'
const apiUrl = setting.apiUrl

/**
 * 获取用户系统权限
 * @param data
 */
export const getRightInfo = (data: any) =>
  request({
    url: `${apiUrl.api}${apiUrl.sys}/login/getRightInfo`,
    method: 'post',
    data
  })

export const right = {
  getRightInfo: getRightInfo
}
