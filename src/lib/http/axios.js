/**
 * @name:axios请求协议配置
 * @param {type}
 */
'use strict'

import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
import router from '@/router/index'
import { message } from 'ant-design-vue'

let baseUrl = '/api'
if (process.env.NODE_ENV === 'production') {
  baseUrl = '/'
}
const config = {
  baseURL: baseUrl || '/',
  timeout: 6 * 1000, // Timeout
  headers: {
    // 'content-type': 'application/x-www-form-urlencoded',
    'content-type': 'application/json',
  },
  responseType: 'json',
  withCredentials: false, // 表示跨域请求时是否需要使用凭证
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  }, //序列化请求参数
}

const _axios = axios.create(config)

//请求拦截
_axios.interceptors.request.use(
  function (config) {
    // console.log(config, 'config')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

//响应拦截
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data
  },
  function (error) {
    const { data } = error.response.data
    if (data[0].error == 9007 || data[0].error == 9006) {
      // 返回9007时token过期 重新登录
      // message.config({
      //   maxCount: 1,
      // })
      // this.$message.destroy()
      message.warn('登录失效,请重新登录！', 0.5, () => {
        router.push('/login')
      })
    }
    // Do something with response error
    return Promise.reject(error)
  },
)

// eslint-disable-next-line no-unused-vars
Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      },
    },
    $axios: {
      get() {
        return _axios
      },
    },
  })
}
Vue.use(Plugin)

export default Plugin

