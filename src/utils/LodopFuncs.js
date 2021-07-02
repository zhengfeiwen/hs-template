import { MessageBox } from 'element-ui'

// ====页面动态加载C-Lodop云打印必须的文件CLodopfuncs.js====
var head =
  document.head ||
  document.getElementsByTagName('head')[0] ||
  document.documentElement
var oscript = document.createElement('script')
oscript = document.createElement('script')
oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=2'
head.insertBefore(oscript, head.firstChild)
oscript = document.createElement('script')
oscript.src = 'http://localhost:18000/CLodopfuncs.js?priority=1'
head.insertBefore(oscript, head.firstChild)

// 下载loadLodop
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function loadLodop () {
  // console.log('http://tcsrcz.oss-cn-hangzhou.aliyuncs.com/fcs/template/CLodop.zip')
  // window.open(link)
  var link = 'http://tcsrcz.oss-cn-hangzhou.aliyuncs.com/fcs/template/CLodop.zip'
  var a=document.createElement('a');
  a.href=link;
  a.download="file";
  a.click();
}

// ====获取LODOP对象的主过程：====
function getLodop () {
  var LODOP
  try {
    // eslint-disable-next-line no-undef
    LODOP = getCLodop()
    if (!LODOP && document.readyState !== 'complete') {
      MessageBox.alert('C-Lodop打印控件还没准备好，请稍后再试！')
      return
    }
    LODOP.SET_LICENSES ("福建联迪商用设备有限公司", "E8BAAE945BE17DEFE4A29F536083CA26", "", "");
    return LODOP
  } catch (err) {
    // MessageBox({
    //   title: '温馨提示',
    //   type: 'warning',
    //   showCancelButton: true,
    //   // message: '您还未安装打印控件，点击确定下载打印控件，安装成功后刷新页面即可进行打印'
    //   message:
    //     '您还未安装打印控件，先安装打印控件，安装成功后刷新页面即可进行打印',

    //   callback: res => {
    //     if (res === 'confirm') {
    //       loadLodop()
    //     }
    //   }
    // })
  }
}
const lodopFunc = {}
lodopFunc.getLodop = getLodop
export default lodopFunc
