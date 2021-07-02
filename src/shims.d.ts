declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'element-ui/lib/locale/lang/*' {
  export const elementLocale: any
}

declare module '*.gif' {
  export const gif: any
}

// TODO: remove this part after vue-count-to has its typescript file
declare module 'vue-count-to'

// TODO: remove this part after vue2-dropzone has its typescript file
declare module 'vue2-dropzone'

// TODO: remove this part after vue-image-crop-upload has its typescript file
declare module 'vue-image-crop-upload'

// declare module 'hs-elementui' {
//   export const hselementui: any
// }
declare module 'apiDatas'

declare module '*.md'

declare module 'ELEMENT'

declare module 'xlsx-style'

declare module '@/utils/LodopFuncs'
