import { http } from '@/lib/http'

// 母公司预算目标完成率
export const getBudgetTarM = async (proload) => {
  return await http.post('/g/cockpit-server/v/getBudgetTarM', proload)
}
// 查看时间列表
export const getBudgetTarTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getBudgetTarTime', proload)
}
export const getBudgetTarGTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getBudgetTarGTime', proload)
}
// 集团预算目标完成率
export const getBudgetTarG = async (proload) => {
  return await http.post('/g/cockpit-server/v/getBudgetTarG', proload)
}


// 查看时间列表
export const getComInIndustryTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getComInIndustryTime', proload)
}
//公司营业收入与行业对比
export const getComInIndustry = async (proload) => {
  return await http.post('/g/cockpit-server/v/getComInIndustry', proload)
}
//公司营业收入与行业对比-历史趋势
export const getIndicators = async (proload) => {
  return await http.post('/g/cockpit-server/v/getIndicators', proload)
}



//获取风险控制指标
export const getCourtNotice = async (proload) => {
  return await http.post('/g/cockpit-server/v/getCourtNotice', proload)
}
// 查看时间列表
export const getCourtNoticeTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getCourtNoticeTime', proload)
}




//获母公司资产详情（季度）
export const getEcManagedetailBySe = async (proload) => {
  return await http.post('/g/cockpit-server/v/getEcManagedetailBySe', proload)
}
//获母公司资产详情（月度）
export const getEcManagedetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getEcManagedetail', proload)
}
// 查看时间列表(季度)
export const getMumHistorySeaList = async (proload) => {
  return await http.get('/g/cockpit-server/v/getMumHistorySeaList', proload)
}
// 查看时间列表(月度)
export const getMumHistoryMonList = async (proload) => {
  return await http.get('/g/cockpit-server/v/getMumHistoryMonList', proload)
}
//获取季度折线图(季度)
export const getSEDataOrderByRank = async (proload) => {
  return await http.post('/g/cockpit-server/v/getSEDataOrderByRank', proload)
}
//获取季度折线图(月度)
export const getEcManagedetailByMon = async (proload) => {
  return await http.post('/g/cockpit-server/v/getEcManagedetailByMon', proload)
}

//集团资产情况年度（左侧）
export const getYearjtValue = async (proload) => {
  return await http.post('/g/cockpit-server/v/getYearjtValue', proload)
}
//集团资产情况年度（右侧）
export const getYearjtValueList = async (proload) => {
  return await http.post('/g/cockpit-server/v/getYearjtValueList', proload)
}

//集团资产情况季度（左侧）
export const getSeaTotalValue = async (proload) => {
  return await http.post('/g/cockpit-server/v/getSeaTotalValue', proload)
}
//集团资产情况季度（右侧）
export const getSeaFiveValue = async (proload) => {
  return await http.post('/g/cockpit-server/v/getSeaFiveValue', proload)
}

// 集团(年度)
export const getCompanyHistoryYearList = async (proload) => {
  return await http.get('/g/cockpit-server/v/getCompanyHistoryYearList', proload)
}
// 集团(季度)
export const getCompanyHistorySeaList = async (proload) => {
  return await http.get('/g/cockpit-server/v/getCompanyHistorySeaList', proload)
}
