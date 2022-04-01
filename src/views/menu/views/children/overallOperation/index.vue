<template>
    <div class="content" id="content">
      <!-- <vue-lazy-component :timeout="10"> -->
        <!-- 母公司资产情况 -->
        <parent-company></parent-company>
      <!-- </vue-lazy-component> -->

      <!-- <vue-lazy-component :timeout="1000"> -->
        <!-- 集团资产情况 -->
        <group></group>
      <!-- </vue-lazy-component> -->

      <!-- <vue-lazy-component  :timeout="2000"> -->
                <!-- 预算目标完成率 -->
        <budget-target></budget-target>
      <!-- </vue-lazy-component> -->

      <!-- <vue-lazy-component  :timeout="3000"> -->
                <!-- 公司营业收入与行业对比 -->
        <company-business></company-business>
      <!-- </vue-lazy-component> -->

      <!-- <vue-lazy-component  :timeout="4000"> -->
                <!-- 风险控制指标监管 -->
        <risk-control></risk-control>
      <!-- </vue-lazy-component> -->
    </div>
</template>

<script>
import parentCompany from './components/parent-company.vue'
import group from './components/group'
import budgetTarget from './components/budget-target'
import companyBusiness from './components/company-business'
import riskControl from './components/risk-control'

export default {
    components: {
    parentCompany,
    group,
    budgetTarget, 
    companyBusiness,
    riskControl,
  },
  mounted(){
    window.test={
      name:'operation',
      node:document.getElementById('content')
    }
  },
  destroyed(){
    window.test=null
  },
  methods:{
  }
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