import { LocalStorage } from '@/utils/storage'
import { DirectiveOptions } from 'vue'
// 权限控制命令
export const permission: DirectiveOptions = {
  inserted (el, binding) {
    if (process.env.VUE_APP_BASE_API?.includes('mock')) return !0
    const { value } = binding
    const rights: any[] = LocalStorage.getObj('rpc-right-mark-set')
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = rights.some(right => {
        return permissionRoles.includes(right)
      })
      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    }
  }
}
