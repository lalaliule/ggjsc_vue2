<template>
    <div class="myMain">

        <my-agency-sale />
        <my-sales-finance />
        <my-invest-adviser />
        <my-margin-trading />
        <myFloorOption />
        <myFutures />
        <myIncomeVou />
        <myAssetManagement />
    <!--    <vue-lazy-component :timeout="10">
            <my-agency-sale />
        </vue-lazy-component>
        
        <vue-lazy-component :timeout="10">
            <my-sales-finance />
        </vue-lazy-component>
        
        <vue-lazy-component :timeout="1000">
            <my-invest-adviser />
        </vue-lazy-component>
        
        <vue-lazy-component :timeout="2000">
            <my-margin-trading />
        </vue-lazy-component>

        <vue-lazy-component :timeout="3000">
            <myFloorOption />
        </vue-lazy-component>
        
        <vue-lazy-component :timeout="4000">
            <myFutures />
        </vue-lazy-component>
        
        <vue-lazy-component :timeout="5000">
            <myIncomeVou />
        </vue-lazy-component>
        
        <vue-lazy-component :timeout="6000">
            <myAssetManagement />
        </vue-lazy-component>
        -->
    </div>
</template>

<script>

import myAgencySale from "./components/agencySale.vue"
import mySalesFinance from "./components/salesFinance.vue"
import myInvestAdviser from "./components/investAdviser.vue"
import myMarginTrading from "./components/marginTrading.vue"
import myFloorOption from "./components/floorOption.vue"
import myFutures from "./components/futures.vue"
import myIncomeVou from "./components/incomeVou.vue"
import myAssetManagement from "./components/assetManagement.vue"


export default {
    components:{
        myAgencySale,
        mySalesFinance,
        myInvestAdviser,
        myMarginTrading,
        myFloorOption,
        myFutures,
        myIncomeVou,
        myAssetManagement,
    },
    data(){
        return{
            
        }
    }
}
</script>

<style lang="scss" scoped>
.myMain{
    min-width: 1200px;
    height: 100%;
  overflow-y: scroll;
    background-color: #f0f2f5;
}
</style>