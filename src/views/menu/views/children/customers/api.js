import { http } from '@/lib/http'

/**
 * 注册地 private List regisPlaceList;
 * 部门 private List departmentList;
 * 状态 private List stateList;
 */

// IPO家数 时间列表 getIPONumTime
export const getIPONumTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getIPONumTime', proload)
}
// IPO家数 getIPONum
export const getIPONum = async (proload) => {
  return await http.post('/g/cockpit-server/v/getIPONum', proload)
}
// IPO家数 表格 getIPONumTable
export const getIPONumTable = async (proload) => {
  return await http.post('/g/cockpit-server/v/getIPONumTable', proload)
}

// 再融资家数 时间列表 getRefinancingNumTime
export const getRefinancingNumTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getRefinancingNumTime', proload)
}
// 再融资家数 getRefinancingNum
export const getRefinancingNum = async (proload) => {
  return await http.post('/g/cockpit-server/v/getRefinancingNum', proload)
}
// 再融资家数 表格 getRefinancingNumTable
export const getRefinancingNumTable = async (proload) => {
  return await http.post('/g/cockpit-server/v/getRefinancingNumTable', proload)
}

// 债券融资家数 时间列表 getMarginTradingNumTime
export const getMarginTradingNumTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getMarginTradingNumTime', proload)
}
// 债券融资家数 getMarginTradingNum
export const getMarginTradingNum = async (proload) => {
  return await http.post('/g/cockpit-server/v/getMarginTradingNum', proload)
}

// 股权融资金额 时间列表 getSharesMoneyTime
export const getSharesMoneyTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getSharesMoneyTime', proload)
}
// 股权融资金额 getSharesMoney
export const getSharesMoney = async (proload) => {
  return await http.post('/g/cockpit-server/v/getSharesMoney', proload)
}

// 债券融资金额 时间列表 getBondMoneyTime
export const getBondMoneyTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getBondMoneyTime', proload)
}
// 债券融资金额 getBondMoney
export const getBondMoney = async (proload) => {
  return await http.post('/g/cockpit-server/v/getBondMoney', proload)
}

// 投资银行业务净收入 时间列表 getInverstbankMoneyTime
export const getInverstbankMoneyTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getInverstbankMoneyTime', proload)
}
// 投资银行业务净收入 getInverstbankMoney
export const getInverstbankMoney = async (proload) => {
  return await http.post('/g/cockpit-server/v/getInverstbankMoney', proload)
}
// 股票质押 时间列表 getPledgeMoneyTime
export const getPledgeMoneyTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getPledgeMoneyTime', proload)
}
// 股票质押 getPledgeMoney
export const getPledgeMoney = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPledgeMoney', proload)
}
// 股票质押回购利息收入 getPledgeInterest
export const getPledgeInterest = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPledgeInterest', proload)
}
// 跟投战投项目（华富瑞兴） 时间列表 getThrowProjectTime
export const getThrowProjectTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getThrowProjectTime', proload)
}
// 跟投战投项目（华富瑞兴） getThrowProject
export const getThrowProject = async (proload) => {
  return await http.post('/g/cockpit-server/v/getThrowProject', proload)
}
// 跟投战投项目（华富瑞兴）表格 getThrowProjectTable
export const getThrowProjectTable = async (proload) => {
  return await http.post('/g/cockpit-server/v/getThrowProjectTable', proload)
}
// 私募股权基金投资项目（华富嘉业） 时间列表 getPrivateMoneyTime
export const getPrivateMoneyTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getPrivateMoneyTime', proload)
}
// 私募股权基金投资项目（华富嘉业） getPrivateMoney
export const getPrivateMoney = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPrivateMoney', proload)
}
// 私募股权基金投资项目（华富嘉业）表格  getPrivateMoneyTable
export const getPrivateMoneyTable = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPrivateMoneyTable', proload)
}