<template>
<div class="mycontent">
     <keep-alive>
          <router-view></router-view>
     </keep-alive>
</div>
</template>
    
<script>
export default {
    
}
</script>
<style lang="scss" >
.mycontent{
     height: 100%;
     // overflow-y: scroll;
}
</style>