interface IApiUrl {
  api: string
  table: string
  json: string
  upload: string
  mock: string
}

interface IUpload {
  filters: Object
}

interface ISettings {
  title: string // Overrides the default title
  showSettings: boolean // Controls settings panel display
  showTagsView: boolean // Controls tagsview display
  showSidebarLogo: boolean // Controls siderbar logo display
  fixedHeader: boolean // If true, will fix the header component
  errorLog: string[] // The env to enable the errorlog component, default 'production' only
  sidebarTextTheme: boolean // If true, will change active text color for sidebar based on theme
  showSubNav: boolean
  devServerPort: number // Port number for webpack-dev-server
  mockServerPort: number // Port number for mock server
  showAllMenuNode: boolean
  apiUrl: IApiUrl
  uploadUrl: string
  upload: IUpload
  ossIp: string
  picPath: string
}

// You can customize below settings :)
const settings: ISettings = {
  title: '高校收费平台',
  showSettings: false,
  showTagsView: false,
  fixedHeader: true,
  showSidebarLogo: true,
  errorLog: ['production'],
  sidebarTextTheme: true,
  showSubNav: false,
  devServerPort: 9629,
  mockServerPort: 9630,
  upload: {
    filters: {
      max_file_size: '20mb'
    }
  },
  showAllMenuNode: true,
  ossIp: 'http://tcsrcz.oss-cn-hangzhou.aliyuncs.com',
  picPath: '/lb/schoolDetail',
  uploadUrl: '/api/core/oss/file/fileUploadPost',
  apiUrl: {
    api: '/api',
    table: '/table',
    json: '/json',
    upload: '/upload',
    mock: '/mock'
  }
}

export default settings
