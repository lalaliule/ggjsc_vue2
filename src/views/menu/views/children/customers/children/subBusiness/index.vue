<template>
<div class="content">
  <!-- <vue-lazy-component :timeout="10"> -->
        <!-- 跟投战投项目 -->
    <my-follow-invest />
    <!-- </vue-lazy-component> -->
    
    <!-- <vue-lazy-component :timeout="1000"> -->
        <!-- 私募股权基金 -->
        <my-private-equity />
    <!-- </vue-lazy-component> -->
</div>
</template>

<script>
import myFollowInvest from '../../components/followInvest'
import myPrivateEquity from '../../components/privateEquity'

export default {
    components:{
        myFollowInvest,
        myPrivateEquity

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