import { http } from '@/lib/http'

// 获取区域下拉框所有区域 http://172.119.0.48:8088/dev/cockpit-server/v/getAreaNameList
export const getAreaNameList = async (proload) => {
  return await http.post('/g/cockpit-server/v/getAreaNameList', proload)
}
// 根据区域获取对应的所有营业部 /dev/cockpit-server/v/getBranchNameList
export const getBranchNameList = async (proload) => {
  return await http.post('/g/cockpit-server/v/getBranchNameList', proload)
}
// 非通道业务收入可视化展示与表格展示接口（统一接口）  /dev/cockpit-server/v/getUnBusinessDetail
export const getUnBusinessDetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getUnBusinessDetail', proload)
}
// 客户集中度可视化展示与表格展示数据 （同一接口）  /dev/cockpit-server/v/getCustCrDetail
export const getCustCrDetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getCustCrDetail', proload)
}
// 分支机构 时间列表 getBranchDetailTime
export const getBranchDetailTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getBranchDetailTime', proload)
}
// 获取营业部目标完成情况   getBusDepartTar
export const getBusDepartTar = async (proload) => {
  return await http.post('/g/cockpit-server/v/getBusDepartTar', proload)
}
// 获取营业部目标完成情况走势 getFinanceDepartTarHistory
export const getFinanceDepartTarHistory = async (proload) => {
  return await http.post('/g/cockpit-server/v/getFinanceDepartTarHistory', proload)
}
// 获取营业部目标完成情况 表格 getBusDepartTarTable
export const getBusDepartTarTable = async (proload) => {
  return await http.post('/g/cockpit-server/v/getBusDepartTarTable', proload)
}
// 获取财务指标排名情况 getFinanceDepartTar
export const getFinanceDepartTar = async (proload) => {
  return await http.post('/g/cockpit-server/v/getFinanceDepartTar', proload)
}
// 获取财务指标排名情况 表格 getFinanceDepartTarTable
export const getFinanceDepartTarTable = async (proload) => {
  return await http.post('/g/cockpit-server/v/getFinanceDepartTarTable', proload)
}