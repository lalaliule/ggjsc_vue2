<template>
  <div class="content" id="content3">
    <!-- <vue-lazy-component :timeout="10"> -->
      <!-- 业务规模和平仓金额 -->
      <business-scale></business-scale>
    <!-- </vue-lazy-component> -->
    
    <!-- <vue-lazy-component :timeout="100"> -->
      <!-- 融资融券业务 两融余额走势 -->
    <margin-trading></margin-trading>
    <!-- </vue-lazy-component> -->
    
    <!-- <vue-lazy-component :timeout="2000"> -->
      <!-- 股票质押业务 -->
    <plate-distribute></plate-distribute>
    <!-- </vue-lazy-component> -->
  </div>
</template>

<script>
import businessScale from "./components/businessScale.vue";
import marginTrading from "./components/marginTrading.vue";
import plateDistribute from "./components/plateDistribute.vue";
export default {
  components: {
    businessScale,
    marginTrading,
    plateDistribute
  },
  mounted(){
    window.test={
      name:'credit',
      node:document.getElementById('content3')
    }
  },
  destroyed(){
    window.test=null
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  padding-bottom: 5px;
  height: 100%;
  overflow-y:scroll;
}
</style>