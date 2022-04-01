import { http } from '@/lib/http/index.js'
// import http from 'http/index'
// 定义action type
export const LOGIN = 'LOGIN'
export const LOGIN2 = 'LOGIN2'
export const USERINFO = 'USERINFO'
export const AuthMenus = 'AuthMenus'
export const ButtonShow = 'ButtonShow'
export const LOGOUT = 'LOGOUT'
export const LOGIN_STATUS = 'LOGIN_STATUS'
export const UpdatePwd = 'UpdatePwd'
export const SendCode = 'SendCode'
export const ResetPwd = 'ResetPwd '
// 指定对应api
export const api = {
  // [LOGIN]: `/assetManage-server/v/login`, // 登录
  [LOGIN2]: `/g/hsxone.omc/v/submitLogin`, // 登录
  [LOGOUT]: `/g/hsxone.omc/v/logout`, // 退出登录
  [LOGIN_STATUS]: `/g/hsxone.omc/v/getCurrUserIdByToken`, // 用户登录状态
  // [USERINFO]: `/assetManage-server/v/getUserByAccount`, // 获取用户信息
  [AuthMenus]: `/g/hsxone.omc/v/getUserAuthMenus`, // 获取用户菜单
  [ButtonShow]: `/g/hsxone.omc/v/getUserPermissions`, // 获取用户菜单
  [UpdatePwd]: `/g/hsxone.omc/v/updatePwd`, // 修改密码
  [SendCode]: '/g/authority-server/v/sendCode', // 发送验证码
  [ResetPwd]: '/g/authority-server/v/resetPwd', // 重置密码
  // [LOGIN]: `/g/authority-server/v/submitLogin`, // 登录
  // [LOGIN2]: `/g/authority-server/v/submitLogin`, // 登录
  // [LOGOUT]: `/g/authority-server/v/logout`, // 退出登录
  // // [LOGIN_STATUS]: `/g/authority-server/v/getCurrUserIdByToken`, // 用户登录状态
  // [USERINFO]: `/g/authority-server/v/getUserByAccount`, // 获取用户信息
  // [AuthMenus]: `/g/authority-server/v/getUserAuthMenus`, // 获取用户菜单
  // [ButtonShow]: `/g/authority-server/v/getUserAuthMenus`, // 获取用户菜单
  // [UpdatePwd]: `/g/authority-server/v/updatePwd`, // 修改密码
  // [SendCode]: '/g/authority-server/v/sendCode', // 发送验证码
  // [ResetPwd]: '/g/authority-server/v/resetPwd', // 重置密码
  // 检查当前登录用户密码是否是初始化密码接口 checkDefaultPwd
}
// 初始化store对象
const state = {
  userInfo: {
    //用户信息
    account: 'zhangsan',
    deleted: '1',
    dept: 10,
    id: 6,
    password: '123456',
    real_name: '张三',
    role: 'qa',
    role_name: null,
  },
  token: '',
  currentMenu: {}, //当前菜单项
  allMenu: [], //用户菜单
  userTheme: 'default', //主题
  btnAuthority: {},
  pageBtnAuthority: [],
}

// 异步操作放到action handler里
const actions = {
  //获取菜单按钮
  getUserPermissions({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[ButtonShow], payload)
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  //获取用户菜单
  getUserAuthMenus({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[AuthMenus], payload)
        http.post(api[ButtonShow], payload).then(res => {
          commit('SET_BTN_AUTHORITY', res.data[0])
          resolve(rst)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  //用户登录状态
  loginStatus({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[LOGIN_STATUS], payload)
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  //退出登录
  logout({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[LOGOUT], payload)
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  //登录
  doLogin2({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[LOGIN2], payload)
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  //登录
  doLogin({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[LOGIN], payload)
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  getUserInfo({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[USERINFO], payload)
        // console.log(rst,'rst')
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  //异步更新当前菜单
  doCurrentMenu({ commit }, payload) {
    commit('SET_CURRENT_MENU', payload)
  },
  doSetTheme({ commit }, payload) {
    commit('SET_USER_THEME', payload)
  },
  //异步page按钮
  doPageBtnAuthority({ commit }, payload) {
    commit('SET_PAGE_BTN_AUTHORITY', payload)
  },
  // 修改密码
  updatePwd({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[UpdatePwd], payload)
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  sendCode({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[SendCode], payload)
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  },
  resetPwd({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[ResetPwd], payload)
        resolve(rst)
      } catch (error) {
        reject(error)
      }
    })
  }
}

// 根据commit更新store
const mutations = {
  //修改用户信息
  SET_USER_INFO(state, info) {
    state.userInfo = info;
  },
  //修改主题
  SET_USER_THEME(state, theme) {
    state.userTheme = theme;
  },
  //改变菜单项方法
  SET_CURRENT_MENU(state, info) {
    state.currentMenu = info;
  },
  //改变菜单项方法
  SET_ALL_CURRENT_MENU(state, info) {
    state.allMenu = info;
  },
  //按钮集合
  SET_BTN_AUTHORITY(state, info) {
    state.btnAuthority = info;
  },
  //page按钮集合
  SET_PAGE_BTN_AUTHORITY(state, info) {
    state.pageBtnAuthority = info;
  },
  //用户登录token
  SET_TOKEN(state, info) {
    state.token = info;
  },
}

const getters = {
  //获取用户token
  getToken(state) {
    return state.token;
  },
  //用户信息
  userInfo(state) {
    return state.userInfo;
  },
  //主题
  userTheme(state) {
    return state.userTheme;
  },
  //获取菜单项
  getCurrentMenu(state) {
    return state.currentMenu;
  },
  //获取菜单项
  getAllMenu(state) {
    return state.allMenu;
  },
  //获取按钮集合
  getBtnAuthority(state) {
    return state.btnAuthority;
  },
  //获取page按钮集合
  getPageBtnAuthority(state) {
    return state.pageBtnAuthority;
  },
}

// 导出vuex模块
export default {
  // 模块开启命名空间
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
