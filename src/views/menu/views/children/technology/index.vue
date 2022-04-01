<template>
  <div class="content" id="content1">
    <!-- <vue-lazy-component :timeout="10"> -->
      <!-- 资管总规模 -->
      <total-size></total-size>
    <!-- </vue-lazy-component> -->
    
    <!-- <vue-lazy-component :timeout="100"> -->
      <!-- 收入结构 -->
    <income-structure></income-structure>
    <!-- </vue-lazy-component> -->
    
    <!-- <vue-lazy-component :timeout="1000"> -->
        <!-- 信用风险 -->
      <credit-risk></credit-risk>
    <!-- </vue-lazy-component> -->
    
    <!-- <vue-lazy-component :timeout="2000"> -->
        <!-- 流动性风险 -->
      <liquidity-risk></liquidity-risk>
    <!-- </vue-lazy-component> -->
    <!-- 合规性风险 -->
    <!-- <compliance-risk></compliance-risk> -->
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import totalSize from './components/totalSize.vue'
import incomeStructure from './components/incomeStructure.vue'
import creditRisk from './components/creditRisk.vue'
// import liquidityRisk from './components/liquidityRisk.vue'
import liquidityRisk from './components/liquidityRisk_1.vue'
import complianceRisk from './components/complianceRisk.vue'
export default {
  components: { 
    totalSize,
    incomeStructure,
    creditRisk, 
    liquidityRisk, 
    complianceRisk 
    },
      mounted(){
    window.test={
      name:'technology',
      node:document.getElementById('content1')
    }
  },
  destroyed(){
    window.test=null
  },
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  padding-bottom: 5px;
  height: 100%;
  overflow-y:scroll;

}
</style>