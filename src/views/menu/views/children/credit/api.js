import { http } from '@/lib/http'
// 业务规模和平仓金额 /g/cockpit-server/v/getBusinessScale
export const getBusinessScale = async (proload) => {
  return await http.post('/g/cockpit-server/v/getBusinessScale', proload)
}
// 业务规模和平仓金额 亏损列表 /g/cockpit-server/v/getBusinessLoss
export const getBusinessLoss = async (proload) => {
  return await http.post('/g/cockpit-server/v/getBusinessLoss', proload)
}
// 融资融券业务 两融余额走势  /g/cockpit-server/v/getMarginTrading
export const getMarginTrading = async (proload) => {
  return await http.post('/g/cockpit-server/v/getMarginTrading', proload)
}


// 融资融券维保比例  8/g/cockpit-server/v/getMaintenance
export const getMaintenance = async (proload) => {
  return await http.post('/g/cockpit-server/v/getMaintenance', proload)
}

// 利息收入 dev/cockpit-server/v/getInterestIncome
export const getInterestIncome = async (proload) => {
  return await http.post('/g/cockpit-server/v/getInterestIncome', proload)
}


// 业务规模和平仓金额 时间列表  /cockpit-server/v/getBusinessScaleTime
export const getBusinessScaleTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getBusinessScaleTime', proload)
}

// 融资融券业务 时间列表  cockpit-server/v/getMarginTradingTime
export const getMarginTradingTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getMarginTradingTime', proload)
}

// 融资规模期限分布数据  /cockpit-server/v/getFinanceScaleFbDetail
export const getFinanceScaleFbDetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getFinanceScaleFbDetail', proload)
}

// 利息收入：应收未收利息占比列表  /cockpit-server/v/getUncollectInterest
export const getUncollectInterest = async (proload) => {
  return await http.post('/g/cockpit-server/v/getUncollectInterest', proload)
}

// 平仓情况 /g/cockpit-server/v/getClosePositionDetail
export const getClosePositionDetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getClosePositionDetail', proload)
}
// 重复接口 getClosePositionDetail   8.26解决
// 平仓分支机构列表 /cockpit-server/v/getClosePositionDetail
export const getClosePositionTable = async (proload) => {
  return await http.post('/g/cockpit-server/v/getClosePositionTable', proload)
}

// 股票质押业务：板块分布  /cockpit-server/v/getPlateDistributeData
export const getPlateDistributeData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPlateDistributeData', proload)
}

// 低于平成线140%的客户 /cockpit-server/v/getLowClosePositionDetail
export const getLowClosePositionDetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getLowClosePositionDetail', proload)
}

// 股票质押履约保证比  /cockpit-server/v/getPledgeShareData
export const getPledgeShareData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPledgeShareData', proload)
}

// 获取股票质押业务历史时间 /cockpit-server/v/getpledgeShareHistoryTime
export const getpledgeShareHistoryTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getpledgeShareHistoryTime', proload)
}
