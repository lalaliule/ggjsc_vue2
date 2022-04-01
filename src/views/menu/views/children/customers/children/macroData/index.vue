<template>
<div class="content">
    <!-- 股权融资金额  债券融资金额 -->
    <my-finance-amount /> 
    <!-- 投资银行业务净收入  股票质押 -->
    <my-income-and-pledge />
</div>
</template>

<script>
import myFinanceAmount from '../../components/financeAmount'
import myIncomeAndPledge from '../../components/incomeAndPledge'

export default {
    components:{
        myFinanceAmount,
        myIncomeAndPledge,
    }
}
</script>

<style lang="scss" scoped>
    .content{
        background-color: #f0f2f5;
        height: 100%;
        overflow-y:scroll;
        padding-bottom: 20px;
    }
</style>