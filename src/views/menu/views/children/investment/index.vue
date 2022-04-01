<template>
    <div class="content">
      <!-- 证券投资收益 -->
      <portfolio-investment />
      <!-- 营运资金投资收益率 -->
      <working-capital />
      <!-- 自有资金投资收益分部门(公允+投资收益) -->
      <own-funds />
      <!-- 公司大类资产结构 -->
      <company-cate />
    </div>
</template>

<script>
import portfolioInvestment from './components/portfolioInvestment'
import workingCapital from './components/workingCapital'
import ownFunds from './components/ownFunds'
import companyCate from './components/companyCate'

export default {
    components:{
      portfolioInvestment,
      workingCapital,
      ownFunds,
      companyCate,
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