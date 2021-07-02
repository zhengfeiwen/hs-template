import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { MessageBox } from 'element-ui'

export interface IStack {
  id: string,
  type: number, // 0 导出
  state: number, // 0 初始 1 进行中 2 结束
  message: string
}

@Module({ dynamic: true, store, name: 'user' })
class StickMessage extends VuexModule {
  public stacks: any = {}

  @Mutation
  private ADD_STACK (stack: IStack) {
    this.stacks[stack.id] = stack
    console.log(stack)
  }

  @Mutation
  private UPDATE_STACK (stack: IStack) {
    if (stack.state === 2) {
      delete this.stacks[stack.id]
      return
    }
    this.stacks[stack.id] && (this.stacks[stack.id].state = stack.state)
  }

  @Action
  public init (stack: IStack) {
    if (!stack.id) {
      MessageBox({
        title: '操作失败',
        type: 'error',
        showCancelButton: true,
        message:'未获取此信息'
      })
      return
    }
    this.ADD_STACK(stack)
  }

  @Action
  public update (stack: IStack) {
    if (!stack.id) {
      MessageBox({
        title: '操作失败',
        type: 'error',
        showCancelButton: true,
        message:'未获取此信息'
      })
      return
    }
    this.UPDATE_STACK(stack)
  }
}

export const StickMessageModule = getModule(StickMessage)
