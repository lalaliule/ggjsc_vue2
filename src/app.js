import '@/assets/css/init.css' //默认css
import '@/assets/css/scroll.scss' //默认滚动条css
import '@/lib/http/axios' //axios
import { http } from '@/lib/http/index' //封装后的axios
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import * as echarts from 'echarts'
// import VueLazyComponent from '@xunlei/vue-lazy-component'

import Vue from 'vue'
// 设置cookie
import VueCookies from 'vue-cookies'
import Fragment from 'vue-fragment'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import components from './components/index'
import directives from './directives/index'
import router from './router'
import store from './store'
import utils from './utils/index'
import views from './views/index'
// import './permission' //路由守卫
import { message } from 'ant-design-vue'
message.config({
  maxCount: 1,
})

// Vue.use(VueLazyComponent)
Vue.use(VueCookies)

Vue.use(components)//全局组件
Vue.use(directives)//全局指令
Vue.use(utils)//全局工具函数
// Vue.use(Http)//this.http
sync(store, router)//route和store结合

Vue.use(Antd)//ui框架

Vue.use(Fragment.Plugin)//跟元素

Vue.prototype.http = http
Vue.prototype.echarts = echarts

Vue.use(views, router, store)

Vue.config.productionTip = false
export default new Vue({
  router,
  store,
  render: h => h(App),
})

Number.prototype.toFixed = function (n) {
  if (n > 20 || n < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20')
  }
  const number = this
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString()
  }
  if (typeof (n) == 'undefined' || n == 0) {
    return (Math.round(number)).toString()
  }
  let result = number.toString()
  const arr = result.split('.')
  // 整数的情况下
  if (arr.length < 2) {
    result += '.'
    for (let i = 0; i < n; i += 1) {
      result += '0'
    }
    return result
  }
  const integer = arr[0]
  const decimal = arr[1]
  if (decimal.length == n) {
    return result
  }
  if (decimal.length < n) {
    for (let i = 0; i < n - decimal.length; i += 1) {
      result += '0'
    }
    return result
  }
  result = integer + '.' + decimal.substr(0, n)
  const last = decimal.substr(n, 1)
  // 四舍五入 转为整数再处理 避免浮点数精度的损失 正数+1 负数-1
  if (parseInt(last, 10) >= 5) {
    const x = Math.pow(10, n)
    // result = (Math.round((parseFloat(result) * x)) + 1) / x
    result = (Math.round((parseFloat(result) * x)) + (parseFloat(result) > 0 ? 1 : -1)) / x
    result = result.toFixed(n)
  }
  return result
}


// Number.prototype.toFixed = function (d) {
//    var s = this +''
//    if (!d) d = 0
//    if (s.indexOf('.') == -1) s +='.'
//    s += new Array(d + 1).join('0')
//    if (new RegExp('^ (-|\\+) ? (\\d + (\\.\\d{ 0, ' + (d + 1) +' })?) \\d * $').test(s)) {
//      var s ='0'+RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true
//      if (a == d + 2) {
//        a = s.match(/\d/g)
//        if (parseInt(a[a.length - 1]) > 4) {
//          for (var i = a.length - 2; i >= 0; i--) {
//            a[i] = parseInt(a[i]) + 1
//            if (a[i] == 10) {
//              a[i] = 0
//              b = i != 1
//           } else break
//         }
//       }
//        s = a.join('').replace(new RegExp('(\\d +)(\\d{' + d + '}) \\d$'), '$1.$2')
//   } if (b) s = s.substr(1)
//   return (pm + s).replace(/\.$/, '')

//    }
//    return this + ''
// };