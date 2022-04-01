import { http } from '@/lib/http'

// 代理买卖证券业务查看历史 getSecuritiesBusinessTime
export const getSecuritiesBusinessTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getSecuritiesBusinessTime', proload)
}
// 代理买卖证券业务 getSecuritiesBusiness
export const getSecuritiesBusiness = async (proload) => {
  return await http.post('/g/cockpit-server/v/getSecuritiesBusiness', proload)
}
// 代理销售金融产品保有量查看历史 getFinanceRetentionTime
export const getFinanceRetentionTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getFinanceRetentionTime', proload)
}
// 代理销售金融产品保有量  getFinanceRetention
export const getFinanceRetention = async (proload) => {
  return await http.post('/g/cockpit-server/v/getFinanceRetention', proload)
}
// 代销金融产品净收入查看历史 getFinanceIncomeTime
export const getFinanceIncomeTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getFinanceIncomeTime', proload)
}
// 代销金融产品净收入 getFinanceIncome
export const getFinanceIncome = async (proload) => {
  return await http.post('/g/cockpit-server/v/getFinanceIncome', proload)
}
// 近13个月投顾业务查看历史 getInvestBusinessHistoryTime
export const getInvestBusinessHistoryTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getInvestBusinessHistoryTime', proload)
}
// 近13个月投顾业务  getInvestBusinessHistory
export const getInvestBusinessHistory = async (proload) => {
  return await http.post('/g/cockpit-server/v/getInvestBusinessHistory', proload)
}
// 投资咨询业务净收入查看历史 getInvestBusinessRetentionTime
export const getInvestBusinessRetentionTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getInvestBusinessRetentionTime', proload)
}
// 投资咨询业务净收入  getInvestBusinessRetention
export const getInvestBusinessRetention = async (proload) => {
  return await http.post('/g/cockpit-server/v/getInvestBusinessRetention', proload)
}
// 融资融券业务余额查看历史 getMarginTradingBalanceTime
export const getMarginTradingBalanceTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getMarginTradingBalanceTime', proload)
}
// 融资融券业务余额  getMarginTradingBalance
export const getMarginTradingBalance = async (proload) => {
  return await http.post('/g/cockpit-server/v/getMarginTradingBalance', proload)
}
// 融资融券业务利息收入查看历史 getMarginTradingInterestTime
export const getMarginTradingInterestTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getMarginTradingInterestTime', proload)
}
// 融资融券业务利息收入   getMarginTradingInterest
export const getMarginTradingInterest = async (proload) => {
  return await http.post('/g/cockpit-server/v/getMarginTradingInterest', proload)
}
// 已开信用证券账号数查看历史 getSecuritiesAccountsNumTime
export const getSecuritiesAccountsNumTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getSecuritiesAccountsNumTime', proload)
}
// 已开信用证券账号数 getSecuritiesAccountsNum
export const getSecuritiesAccountsNum = async (proload) => {
  return await http.post('/g/cockpit-server/v/getSecuritiesAccountsNum', proload)
}
// 场内期权业务查看历史 getOptionBusinessTime
export const getOptionBusinessTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getOptionBusinessTime', proload)
}
// 场内期权业务 getOptionBusiness
export const getOptionBusiness = async (proload) => {
  return await http.post('/g/cockpit-server/v/getOptionBusiness', proload)
}
// 期货业务查看历史 getFuturesBusinessTime
export const getFuturesBusinessTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getFuturesBusinessTime', proload)
}
// 期货业务 月度经营指标 getOperaIndicatorsMon
export const getOperaIndicatorsMon = async (proload) => {
  return await http.post('/g/cockpit-server/v/getOperaIndicatorsMon', proload)
}
// 收益凭证查看历史  getIncomeVoucherTime
export const getIncomeVoucherTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getIncomeVoucherTime', proload)
}
// 收益凭证 getIncomeVoucher
export const getIncomeVoucher = async (proload) => {
  return await http.post('/g/cockpit-server/v/getIncomeVoucher', proload)
}
// 收益凭证 表格 getIncomeVoucherTable
export const getIncomeVoucherTable = async (proload) => {
  return await http.post('/g/cockpit-server/v/getIncomeVoucherTable', proload)
}
// 资管业务月度经营指标查看历史 getAssetBusinessMMTime
export const getAssetBusinessMMTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getAssetBusinessMMTime', proload)
}
// 资管业务月度经营指标 getAssetBusinessMM
export const getAssetBusinessMM = async (proload) => {
  return await http.post('/g/cockpit-server/v/getAssetBusinessMM', proload)
}
// 资管业务季度经营指标查看历史 getAssetBusinessSETime
export const getAssetBusinessSETime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getAssetBusinessSETime', proload)
}
// 资管业务季度经营指标 getAssetBusinessSE
export const getAssetBusinessSE = async (proload) => {
  return await http.post('/g/cockpit-server/v/getAssetBusinessSE', proload)
}