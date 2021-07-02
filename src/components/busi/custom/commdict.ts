// 下拉框本地字典
const DICT: any = {
  state: [
    {
      key: '-1',
      value: '全部'
    },
    {
      key: 1,
      value: '有效'
    },
    {
      key: 0,
      value: '无效'
    }
  ],
  state2: [
    {
      key: '-1',
      value: '全部'
    },
    {
      key: 1,
      value: '启用'
    },
    {
      key: 0,
      value: '禁用'
    }
  ],
  radio: [
    {
      key: 1,
      value: '是'
    },
    {
      key: 0,
      value: '否'
    }
  ],
  subjectDegree: [
    {
      key: -1,
      value: '全部'
    },
    {
      key: 1,
      value: '大专'
    },
    {
      key: 2,
      value: '本科'
    },
    {
      key: 3,
      value: '其他'
    }
  ]
}

export default class comm {
  static dict (val: any) {
    return val ? DICT[val] : []
  }
}
