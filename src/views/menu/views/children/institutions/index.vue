<template>
<div class="content">
    <!-- 基金托管规模 -->
    <fund-custody-scale />
    <!-- 券商结算公募规模 -->
    <securities-trader />
    <!-- 提供经纪服务的机构客户资产 -->
    <brokerage-services />
    <!-- 机构两融客户余额 -->
    <institution />
    <!-- 席位租赁收入 -->
    <seat-rental />
    <!-- 场外衍生品名义本金规模 -->
    <otc-derivative />
    <!-- 代理机构客户买卖证券交易额 -->
    <institutional-clients />
</div>
</template>

<script>
import fundCustodyScale from './components/fundCustodyScale'
import securitiesTrader from './components/securitiesTrader'
import brokerageServices from './components/brokerageServices'
import institution from './components/institution'
import seatRental from './components/seatRental'
import otcDerivative from './components/otcDerivative'
import institutionalClients from './components/institutionalClients'

export default {
    components:{
        fundCustodyScale,
        securitiesTrader,
        brokerageServices,
        institution,
        seatRental,
        otcDerivative,
        institutionalClients
    }
}
</script>
<style lang="scss" scoped>
.content{
    background-color: #f0f2f5;
    height: 100%;
    overflow-y:scroll;
}
</style>