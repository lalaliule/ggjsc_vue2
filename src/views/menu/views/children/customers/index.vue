<template>
<div class="mycontent">
    <!-- ipo -->
    <!-- <my-initial-public /> -->
    <!-- 再融资 -->
    <!-- <my-refinance/> -->
    <!-- 债券融资 -->
    <!-- <my-debt-finance /> -->
    <!-- 股权融资金额  债券融资金额 -->
    <!-- <my-finance-amount />  -->
    <!-- 投资银行业务净收入  股票质押 -->
    <!-- <my-income-and-pledge /> -->
    <!-- 跟投战投项目 -->
    <!-- <my-follow-invest /> -->
    <!-- 私募股权基金 -->
    <!-- <my-private-equity /> -->
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</div>
</template>

<script>
import myInitialPublic from './components/initialPublic'
import myRefinance from './components/refinance'
import myDebtFinance from './components/debtFinance'
import myFinanceAmount from './components/financeAmount'
import myIncomeAndPledge from './components/incomeAndPledge'
import myFollowInvest from './components/followInvest'
import myPrivateEquity from './components/privateEquity'

export default {
    components:{
        myInitialPublic,
        myRefinance,
        myDebtFinance,
        myFinanceAmount,
        myIncomeAndPledge,
        myFollowInvest,
        myPrivateEquity

    }
}
</script>

<style lang="scss" scoped>
    .mycontent{
        background-color: #f0f2f5;
        height: 100%;
        // overflow-y:scroll;
    }
</style>