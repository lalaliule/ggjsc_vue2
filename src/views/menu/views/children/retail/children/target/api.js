import { http } from '@/lib/http'

// 获取A股账户历史时间 / getAShareAccountHistoryTime
export const getAShareAccountHistoryTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getAShareAccountHistoryTime', proload)
}
// 获取A股账户最新数据  /getAShareAccountDetail
export const getAShareAccountDetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getAShareAccountDetail', proload)
}
// 获取A股账户数历史走势 /getAShareAccountHistoryData
export const getAShareAccountHistoryData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getAShareAccountHistoryData', proload)
}
// 新增投资者数量历史走势 / getInvestorAddHistoryData
export const getInvestorAddHistoryData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getInvestorAddHistoryData', proload)
}
// 获取近13个月新增投资者历史时间 / getInvestoeAddHistoryTime
export const getInvestoeAddHistoryTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getInvestoeAddHistoryTime', proload)
}
// 获取资管产品带动新开户 / getAssetPrdAccountAddData
export const getAssetPrdAccountAddData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getAssetPrdAccountAddData', proload)
}
// 资管产品带动新开户历史时间 / getAssetProdCustHistoryTime
export const getAssetProdCustHistoryTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getAssetProdCustHistoryTime', proload)
}
// 获取托管客户历史时间 / getDepositAssetHistoryTime
export const getDepositAssetHistoryTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getDepositAssetHistoryTime', proload)
}
// 获取托管客户资产最新数据 / getDepositCustAssetData
export const getDepositCustAssetData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getDepositCustAssetData', proload)
}
// 托管客户资产历史走势 / getDepositAssetHistoryData
export const getDepositAssetHistoryData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getDepositAssetHistoryData', proload)
}
// 获取估计交易额（全年累计）时间 getTradeVolumeTime
export const getTradeVolumeTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getTradeVolumeTime', proload)
}
// 获取股基交易额（全年累计） getTradeVolume
export const getTradeVolume = async (proload) => {
  return await http.post('/g/cockpit-server/v/getTradeVolume', proload)
}
// 获取主要经营指标营业收入时间 getBusinessIncomeTime
export const getBusinessIncomeTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getBusinessIncomeTime', proload)
}
// 获取主要经营指标 营业收入 getBusinessIncome
export const getBusinessIncome = async (proload) => {
  return await http.post('/g/cockpit-server/v/getBusinessIncome', proload)
}
// 获取客户结构时间 getCustomerTime
export const getCustomerTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getCustomerTime', proload)
}
// 获取客户结构 getCustomer
export const getCustomer = async (proload) => {
  return await http.post('/g/cockpit-server/v/getCustomer', proload)
}
// 获取金融产品覆盖率时间 getFinancialCoverageTime
export const getFinancialCoverageTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getFinancialCoverageTime', proload)
}
// 获取金融产品覆盖率 getFinancialCoverage
export const getFinancialCoverage = async (proload) => {
  return await http.post('/g/cockpit-server/v/getFinancialCoverage', proload)
}
