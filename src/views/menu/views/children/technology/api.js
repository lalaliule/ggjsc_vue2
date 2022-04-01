import { http } from '@/lib/http'

// 资产总规模时间
export const getOverallScopeTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getOverallScopeTime', proload)
}
// 资产总规模左边
export const getOverallScopeNewMon = async (proload) => {
  return await http.post('/g/cockpit-server/v/getOverallScopeNewMon', proload)
}
// 资产总规模柱状
export const getOverallScopeSpanMon = async (proload) => {
  return await http.post('/g/cockpit-server/v/getOverallScopeSpanMon', proload)
}


// 收入结构时间
export const getIncomeStructureTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getIncomeStructureTime', proload)
}

// 收入结构
export const getIncomeStructure = async (proload) => {
  return await http.post('/g/cockpit-server/v/getIncomeStructure', proload)
}


// 违约债券总体情况时间
export const getCreditRiskHistory = async (proload) => {
  return await http.get('/g/cockpit-server/v/getCreditRiskHistory', proload)
}

// 违约债券总体情况
export const getBreakAllDetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getBreakAllDetail', proload)
}

// 高风险持仓成本与违约债券处理情况
export const getHighRiskCBData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getHighRiskCBData', proload)
}

// 存量违约
export const getNewBreakAllTable = async (proload) => {
  return await http.post('/g/cockpit-server/v/getNewBreakAllTable', proload)
}

// 评级下调债券
export const getXTZQTable = async (proload) => {
  return await http.post('/g/cockpit-server/v/getXTZQTable', proload)
}

// 违约高风险债券分析列表
export const getHighRiskWYZQData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getHighRiskWYZQData', proload)
}

// 负面债券舆情
export const getPassiveBondsData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPassiveBondsData', proload)
}

// 产品申诉情况
export const getProductRansomData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getProductRansomData', proload)
}

// 新增集合产品清单
export const getAggregateList = async (proload) => {
  return await http.post('/g/cockpit-server/v/getAggregateList', proload)
}
// 产品申诉情况
export const getFiveProductRansomData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getFiveProductRansomData', proload)
}

// 产品申诉情况时间
export const getProductRansomHistory = async (proload) => {
  return await http.get('/g/cockpit-server/v/getProductRansomHistory', proload)
}

// 合规性风险查看历史时间
export const getComplianceRiskHistory = async (proload) => {
  return await http.get('/g/cockpit-server/v/getComplianceRiskHistory', proload)
}
// 合规性风险
export const getComplianceRiskData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getComplianceRiskData', proload)
}

export const getStressData = async (proload) => {
  return await http.post('/g/cockpit-server/v/getStressData', proload)
}