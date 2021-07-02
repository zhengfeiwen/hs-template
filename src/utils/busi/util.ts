import { isEmpty, isType } from '../common'
import { LocalStorage } from '../storage'
interface IUtil {
  [x:string]: any
}

const util:IUtil = {
}
// 去掉form的字段空格并且删除空值对象
util.trimForm = function (form: any) {
  const temp: any = {}
  Object.keys(form).map((key: any) => {
    if (!isEmpty(form[key])) {
      temp[key] = isType(form[key], 'string') ? form[key].trim() : form[key]
    }
  })
  return temp
}

// 日期组件的快捷配置

util.pickerOptions = {
  shortcuts: [
    {
      text: '上一周',
      onClick (picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一个月',
      onClick (picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近三个月',
      onClick (picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }
  ],
  disabledDate: !0,
  firstDayOfWeek: 7,
  cellClassName: () => 'custClass',
  onPick: null
}

const floor = (val: any) => {
  if (!val) return '00'
  if (val.length === 1) return val + '0'
  if (val.length === 2) return val
  if (Number(val[2]) > 4) return val[0] + (val[1] * 1 + 1).toString()
}

util.generatingThousandthPer = (num: any) => {
  if (num === '0' || num === 0) return '0.00'
  if (isNaN(parseInt(num))) return num
  if (!num) return ''
  const _num = num.toString()
  const num1 = _num.split('.')[0]
  const num2 = floor(_num.split('.')[1])
  let c = num1.toString()
  if (parseInt(num) >= 1000) c = c.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return _num.indexOf('.') !== -1 ? c + '.' + num2 : c + '.00'
}

util.getRouterParams = function () {
  return JSON.parse(LocalStorage.get('routerParams') as any || '')
}

util.extendItems = function (items: any) {
  const _items = items || (document.getElementsByClassName('query-block')[0].parentNode as any).getElementsByClassName('el-form-item')
  for (let i = 0; i < _items.length - 1; i++) {
    _items[i].style.display = ''
  }
}

util.foldItems = function (items: any) {
  const _items = items || (document.getElementsByClassName('query-block')[0].parentNode as any).getElementsByClassName('el-form-item')
  const len = util.initFlexFormOption.max
  for (let i = 0; i < _items.length - 1; i++) {
    _items[i].style.display = ''
    if (i >= len) {
      _items[i].style.display = 'none'
    }
  }
}

util.statusChange = function (status: any) {
  setTimeout(() => {
    if (status === 'extend') {
      util.foldItems()
      util.initFlexFormOption.fold.classList.remove('active')
      util.initFlexFormOption.extend.classList.add('active')
    } else {
      util.extendItems()
      util.initFlexFormOption.extend.classList.remove('active')
      util.initFlexFormOption.fold.classList.add('active')
    }
  })
}

const extendBtn = '<a id="extend"><i class="el-icon-d-arrow-right" /></a>'

const foldBtn = '<a id="fold"><i class="el-icon-d-arrow-left" /></a>'

util.initFlexFormOption = {}

util.initFlexForm = function (option: any = { max: 7 }) {
  const $form: any = document.getElementsByClassName('query-block')[0].parentNode
  util.initFlexFormOption = option
  // form 样式处理
  $form.style['padding-right'] = '180px'
  // $form.style['background-image'] = 'linear-gradient(#fff, #f7f4f4)'
  const items = $form.getElementsByClassName('el-form-item')
  if (items.length > util.initFlexFormOption.max + 1) {
    util.foldItems(items)
    const extend = document.createElement('div')
    extend.classList.add('extend')
    extend.classList.add('active')
    extend.innerHTML = extendBtn
    const fold = document.createElement('div')
    fold.classList.add('fold')
    fold.innerHTML = foldBtn
    // $form.append(extend)
    // $form.append(fold)
    const queryBlock: any = document.getElementsByClassName('query-block')[0].getElementsByClassName('el-form-item__content')[0]
    queryBlock.prepend(extend)
    queryBlock.prepend(fold)
    // extend.prependTo(queryBlock)
    // fold.prependTo(queryBlock)
    util.initFlexFormOption.fold = fold
    util.initFlexFormOption.extend = extend
    const extendEl: any = extend.querySelector('#extend')
    const foldEl: any = fold.querySelector('#fold')
    extendEl.addEventListener('click', () => {
      extend.classList.remove('active')
      fold.classList.add('active')
      util.extendItems(items)
    })
    foldEl.addEventListener('click', () => {
      fold.classList.remove('active')
      extend.classList.add('active')
      util.foldItems(items)
    })
  }
}

// 导入功能
util.exportData = function (stream:any, fileName:any) {
  const blob = new Blob([stream]) // 构造一个blob对象来处理数据
  // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
  // IE10以上支持blob但是依然不支持download
  if ('download' in document.createElement('a')) {
    // 支持a标签download的浏览器
    const link = document.createElement('a') // 创建a标签
    link.download = fileName // a标签添加属性
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click() // 执行下载
    URL.revokeObjectURL(link.href) // 释放url
    document.body.removeChild(link) // 释放标签
  } else {
    // 其他浏览器
    navigator.msSaveBlob(blob, fileName)
  }
}

// 根据对象内元素，去重
util.reduplicate = function (arr:any, objKey:string) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i][objKey] === arr[j][objKey]) {
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}

util.sizeToStr = function (size: any){
  var data = "";
    if (size < 0.1 * 1024) { //如果小于0.1KB转化成B  
        data = size.toFixed(2) + "B";
    } else if (size < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
        data = (size / 1024).toFixed(2) + "KB";
    } else if (size < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
        data = (size / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB  
        data = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    var sizestr = data + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {//当小数点后为00时 去掉小数部分  
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
}

export default util
