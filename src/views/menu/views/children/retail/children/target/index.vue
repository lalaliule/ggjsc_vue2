<template>
    <div class="myMain">

        <my-account/>
        <my-investors/>
        <my-prd-account/>
        <my-deposit-cust/>
        <my-trade-volume/>
        <my-customer/>
        <my-financial-cover/>
    <!--      <vue-lazy-component :timeout="10">
             <my-account/>
         </vue-lazy-component>
        
        <vue-lazy-component :timeout="10">
            <my-investors/>
        </vue-lazy-component>
        
        <vue-lazy-component :timeout="10">
            <my-prd-account/>
        </vue-lazy-component>

        <vue-lazy-component :timeout="2000">
            <my-deposit-cust/>
        </vue-lazy-component>

        <vue-lazy-component :timeout="3000">
            <my-trade-volume/>
        </vue-lazy-component>
        
        <vue-lazy-component :timeout="4000">
            <my-customer/>
        </vue-lazy-component>
        
        <vue-lazy-component :timeout="5000">
            <my-financial-cover/>
        </vue-lazy-component>
        -->
    </div>
</template>

<script>
import myAccount from "./components/account.vue"
import myInvestors from './components/investors'
import myPrdAccount from './components/prdAccount'
import myDepositCust from './components/depositCust'
import myTradeVolume from './components/tradeVolume'
import myCustomer from './components/customer'
import myFinancialCover from './components/financialCover'

import * as api from './api.js'
import moment from 'moment'
export default {
    components: {
        myAccount,
        myInvestors,
        myPrdAccount,
        myDepositCust,
        myTradeVolume,
        myCustomer,
        myFinancialCover
    },
}
</script>

<style lang="scss" scoped>
.myMain{
    min-width: 1200px;
    height: 100%;
  overflow-y: scroll;
    background-color: #f0f2f5;
    // background-color: #eff1f7;
}

</style>
    
