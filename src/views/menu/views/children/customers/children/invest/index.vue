<template>
<div class="content">

 <!-- <vue-lazy-component :timeout="10"> -->
        <!-- ipo -->
        <my-initial-public />
    <!-- </vue-lazy-component> -->

    <!-- <vue-lazy-component :timeout="1000"> -->
        <!-- 再融资 -->
        <my-refinance/>
    <!-- </vue-lazy-component> -->

    <!-- <vue-lazy-component :timeout="2000"> -->
         <!-- 债券融资 -->
        <my-debt-finance />
    <!-- </vue-lazy-component> -->
</div>
</template>

<script>
import myInitialPublic from '../../components/initialPublic'
import myRefinance from '../../components/refinance'
import myDebtFinance from '../../components/debtFinance'

export default {
    components:{
        myInitialPublic,
        myRefinance,
        myDebtFinance,
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