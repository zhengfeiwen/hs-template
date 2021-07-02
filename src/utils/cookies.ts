import Cookies from 'js-cookie'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(sidebarStatusKey, sidebarStatus)

const languageKey = 'language'
export const getLanguage = () => Cookies.get(languageKey)
export const setLanguage = (language: string) => Cookies.set(languageKey, language)

const sizeKey = 'size'
export const getSize = () => Cookies.get(sizeKey)
export const setSize = (size: string) => Cookies.set(sizeKey, size)

// option
const option = {
  expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 8)
}

// User
const tokenKey = 'token'
export const getToken = () => Cookies.get(tokenKey) || ''
export const setToken = (token: string) => Cookies.set(tokenKey, token, option)
export const removeToken = () => Cookies.remove(tokenKey, { domain: window.location.host.substring(window.location.host.indexOf('.') + 1) })
// common
export const getCookie = (key: string) => Cookies.get(key)
export const setCookie = (key: string, value: string) => Cookies.set(key, value, option)
export const removeCookie = (key: string) => Cookies.remove(key)
// Object
export const getJsonCookie = (key: string) => Cookies.getJSON(key)
