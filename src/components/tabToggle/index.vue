<template>
  <ul class="tab-toggle">
    <li
      :class="{active:index===current}"
      v-for="(item,index) in tab"
      :key="index"
      @click="tabChange(index)"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TabToggle',
  props: {
    tab: {
      type: Array,
      default: () => [],
    },
    change: {
      type: Function,
    },
    currentIndex:{
      type:[Number,String],
      default:0
    }
  },
  data(){
      return {
          current:this.currentIndex
      }
  },
  methods:{
      tabChange(index){
          this.change(index)
          this.current = index
      }
  }
}
</script>

<style lang="scss" scoped>
.tab-toggle {
  // width: 256px;
  height: 46px;
background: url('../../assets/imgs/tab-bg1.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  margin: 0;
  li {
    // flex: 1;
    padding: 0 50px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #a0abb7;
    height: 100%;
    line-height: 46px;
    cursor: pointer;
    &.active {
      color: #000;
      background: url("../../assets/imgs/tab-bg2.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>