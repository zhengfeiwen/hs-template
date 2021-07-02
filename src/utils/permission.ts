import { LocalStorage } from '@/utils/storage'
// 检验权限字段
export const checkPermission = (value: string[]): boolean => {
  if (process.env.VUE_APP_BASE_API?.includes('mock')) return !0
  if (value && value instanceof Array && value.length > 0) {
    const rights: any[] = LocalStorage.getObj('rpc-right-mark-set')
    const permissionRoles = value
    if(!rights || rights.length === 0) return !1
    const hasPermission = rights.some(right => {
      return permissionRoles.includes(right)
    })
    return hasPermission
  } else {
    console.error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    return false
  }
}
