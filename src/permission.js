import router from './router'
import store from './store'
import { message } from 'ant-design-vue'
const userInfo = store.getters['common/user/userInfo']
// const allMenu = store.getters['common/user/getAllMenu']

const whiteList = ['/login'] // 无需令牌白名单
router.beforeEach(async (to, from, next) => {
  // console.log(to, from, '...from')
  if (to.path === '/login') {
    next()
  } else {
    const params = {
      operator_code: userInfo.operator_code,
      user_token: userInfo.user_token,
    }
    try {
      const result = await store.dispatch('common/user/loginStatus', params)
      if (result.data[0].return_code === '0') {
        // 遍历allMenu得到所有的url 在beforeEach中判断to的路由是否存在
        let menusList = []
        // const myMenus = localStorage.getItem('myMenus')
        // const allMenu = myMenus ? JSON.parse(myMenus) : []
        const allMenu = store.getters['common/user/getAllMenu']

        // console.log(allMenu, '..allMenu')

        allMenu.length > 0 && allMenu[0].children.forEach(el => {
          if (el.children.length > 0) {
            el.children.forEach(item => {
              menusList.push(item.url)
            })
          } else {
            menusList.push(el.url)
          }
        })
        // console.log(menusList,'..menusList')
        if (menusList.indexOf(to.path) == -1) {
          if (from.query.redirect) {
            next(`${menusList[0]}`)
          }
          next(false)
          return false
        }
        next()
      } else {
        store.commit('common/user/SET_TOKEN', '')
        store.commit('common/user/SET_USER_INFO', {})
        next(`/login?redirect=${to.path}`)
      }
    } catch (error) {
      message.warn('登录失效！')
      // , 0.5, () => {
      //   console.log(111)
      store.commit('common/user/SET_TOKEN', '')
      store.commit('common/user/SET_USER_INFO', {})
      next(`/login?redirect=${to.path}`)
      // })
    }
    // store
    //   .dispatch('common/user/loginStatus', params)
    //   .then((result) => {
    //     console.log(result, '登录状态')
    //     if (result.data[0].return_code === '0') {
    //       next()
    //     } else {
    //       // store.commit('common/user/SET_TOKEN', '')
    //       // store.commit('common/user/SET_USER_INFO', {})
    //       // router.push('/login')
    //     }
    //     // console.log(result, '登录状态');
    //   })
    //   .catch((error) => {
    //     // store.commit('common/user/SET_TOKEN', '')
    //     // store.commit('common/user/SET_USER_INFO', {})
    //     // router.push('/login')
    //     console.log('error', error)
    //   })
    // next()
  }
  // 获取令牌判断用户是否登录
  // const hasToken = localStorage.getItem('token')
  // 已登录
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // 若已登录没有必要显示登录页，重定向至首页
  //     next('/login')
  //   } else {
  //     next()
  //     // console.log('hasRoles')
  //     // // eslint-disable-next-line no-debugger
  //     // // debugger
  //     // const hasRoles = store.getters.roles && store.getters.roles.length > 0;

  //     // if (hasRoles) {
  //     //   // 说明用户已获取过角色信息，放行
  //     //   next()
  //     // } else {
  //     //   try {
  //     //     // 先请求获取用户信息
  //     //     const { roles } = await store.dispatch('user/getInfo')

  //     //     // 根据当前用户角色过滤出可访问路由
  //     //     const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

  //     //     // 添加至路由器
  //     //     router.addRoutes(accessRoutes)

  //     //     // 继续路由切换，确保addRoutes完成
  //     //     next({ ...to, replace: true })
  //     //   } catch (error) {
  //     //     // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
  //     //     await store.dispatch('user/resetToken')
  //     //     next(`/login?redirect=${to.path}`)
  //     //     alert(error || '未知错误')
  //     //   }
  //     // }
  //   }
  // } else {// 未登录
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // 白名单中路由放过
  //     next()
  //   } else {
  //     console.log(to.path)
  //     // 重定向至登录页
  //     next(`/login?redirect=${to.path}`)
  //   }
  // }

  // 判断路由菜单与返回的菜单
  // const urls = allMenu.length > 0 ? allMenu[0].children : []
  // // console.log(to.path, urls[0].url , '...urls')
  // let arr=[]
  // function getPath(data) {
  //   data.forEach(el => {
  //     if (el.children.length > 0) {
  //       getPath(el.children)
  //     } else {
  //       arr.push(el.url)
  //     }
  //   })
  // }
  // getPath(urls)
  // const flag = arr.filter(el => {
  //   return el == to.path
  // })
  // if (flag.length>0) {
  //   console.log(123)
  //   next()
  // } else {
  //   next(false)
  // }

})
// router.beforeEnter()
