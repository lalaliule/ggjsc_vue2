<template>
  <div class="content" id="content2">
    <!-- <vue-lazy-component :timeout="10"> -->
      <!-- 人员情况 -->
      <personnel />
    <!-- </vue-lazy-component> -->
    
    <!-- <vue-lazy-component :timeout="100"> -->
      <!-- 薪酬情况 -->
      <payment />
    <!-- </vue-lazy-component> -->
  </div>
</template>

<script>
import personnel from './components/personnel.vue'
import payment from './components/payment.vue'
export default {
  components: {
    personnel, 
    payment,
  },
        mounted(){
    window.test={
      name:'human',
      node:document.getElementById('content2')
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