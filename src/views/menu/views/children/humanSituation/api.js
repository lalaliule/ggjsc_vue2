import { http } from '@/lib/http'

//薪酬情况
export const getPayDetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPayDetail', proload)
}

//薪酬情况时间表
export const getPayDetailTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getPayDetailTime', proload)
}

//母公司分布
export const getPayDetailMa = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPayDetailMa', proload)
}

//母公司趋势
export const getPayDetailMaLink = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPayDetailMaLink', proload)
}

//子公司分布
export const getPayDetailChild = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPayDetailChild', proload)
}

//子公司趋势
export const getPayDetailChildLink = async (proload) => {
  return await http.post('/g/cockpit-server/v/getPayDetailChildLink', proload)
}


//人员情况时间表
export const getHistoryResourcesTime = async (proload) => {
  return await http.get('/g/cockpit-server/v/getHistoryResourcesTime', proload)
}

//人员情况card
export const getHuresourcesDetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getHuresourcesDetail', proload)
}

//人员情况母公司
export const getMumHuresourcesDetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getMumHuresourcesDetail', proload)
}

//人员情况子公司
export const getChildHuresourcesDetail = async (proload) => {
  return await http.post('/g/cockpit-server/v/getChildHuresourcesDetail', proload)
}