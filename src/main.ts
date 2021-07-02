import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue, { DirectiveOptions } from 'vue'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
// import { AppModule } from '@/store/modules/app.ts'
import router from '@/router'
// 国际化
import i18n from './lang'
import 'hs-elementui/src/icons/components'
import '@/permission'
import * as directives from '@/directives'
import * as filters from '@/filters'

import 'prismjs/themes/prism.css'
import '@/styles/markdown-segmentfault.css'

import 'hs-elementui/lib/hs-elementui.css'
import HsElementui from 'hs-elementui'

Vue.use(HsElementui)
// Element
Vue.use(ElementUI)

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
