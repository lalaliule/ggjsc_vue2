import { http } from '@/lib/http'

// 证券投资收益（季度） 时间列表 getBondProfitTime
export const getBondProfitTime = async (proload) => {
    return await http.get('/g/cockpit-server/v/getBondProfitTime', proload)
}
// 证券投资收益 getBondProfit
export const getBondProfit = async (proload) => {
    return await http.post('/g/cockpit-server/v/getBondProfit', proload)
}
// 营运资金投资收益率 时间列表 getWorkProfitTime
export const getWorkProfitTime = async (proload) => {
    return await http.get('/g/cockpit-server/v/getWorkProfitTime', proload)
}
// 营运资金投资收益率 getWorkProfit
export const getWorkProfit = async (proload) => {
    return await http.post('/g/cockpit-server/v/getWorkProfit', proload)
}
// 自有资金投资收益分部门 时间列表 getOwnProfitTime
export const getOwnProfitTime = async (proload) => {
    return await http.get('/g/cockpit-server/v/getOwnProfitTime', proload)
}
// 自有资金投资收益分部门（公允 + 投资收益） getOwnProfit
export const getOwnProfit = async (proload) => {
    return await http.post('/g/cockpit-server/v/getOwnProfit', proload)
}
// 公司大类资产结构 时间列表 getBroadAssetsTime
export const getBroadAssetsTime = async (proload) => {
    return await http.get('/g/cockpit-server/v/getBroadAssetsTime', proload)
}
// 公司大类资产结构 getBroadAssets
export const getBroadAssets = async (proload) => {
    return await http.post('/g/cockpit-server/v/getBroadAssets', proload)
}
// 公司大类资产结构走势图 getBroadAssetsTrend
export const getBroadAssetsTrend = async (proload) => {
    return await http.post('/g/cockpit-server/v/getBroadAssetsTrend', proload)
}