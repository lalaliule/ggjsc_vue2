<template>
    <div>
        <a-date-picker
            v-model="timeSelect"
            size="large"
            format="YYYY-MM-DD"
            :showToday="false"
            :open="isOpen"
            :disabled-date="disabledDate"
            :align="{ offset: [0, 30] }"
            :getCalendarContainer="triggerNode=>triggerNode.parentNode"
          >
            <span class="goSelect" @click="isOpen = true">查看历史</span>
            <template #renderExtraFooter>
              <div class="date-footer-box">
                <span>
                  {{
                  timeSelect ? moment(timeSelect).format("YYYY-MM-DD") : ""
                  }}
                </span>
                <div class="button-box">
                  <!-- <a-button shape="round" @click="clear">清空</a-button> -->
                  <a-button type="primary" shape="round" ghost @click="currtentMonth">最新</a-button>
                  <a-button type="primary" shape="round" @click.native.prevent="confrim">确定</a-button>
                </div>
              </div>
            </template>
          </a-date-picker>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'DatePicker',
    props:{
        histroyDate:{
            type:Array,
            default:()=>[]
        },
        timeSel:{
          type:[String,Object]
        }
    },
    data(){
        return {
            timeSelect: undefined,
            isOpen:false,
            myDate:[]
        }
    },
    watch:{
      timeSel(newV){
        this.timeSelect=newV
      },
        histroyDate:{
            handler (arr) {
                this.myDate=arr
            },
            immediate:true,
            deep: true
        }
    },
    mounted() {
      window.addEventListener("click", this.closeDateTip);
    },
    beforeDestroy(){
      window.removeEventListener("click", this.closeDateTip);
    },
    methods:{
        moment,
        // 不可选择的
        disabledDate(current){
            return !(
            current &&
                this.myDate.includes(moment(current).format("YYYY-MM-DD"))
            );   
        },
        confrim(){
            if (this.timeSelect == "") {
            message.warning("请先选择日期！");
            return;
            }
          this.isOpen = false;
          // 日期变化重新获取数据 
          // console.log(this.timeSelect,'..this.timeSelect')
          this.$emit('getTime',this.timeSelect)
      },
      currtentMonth(){
        this.timeSelect = this.myDate.length > 0 && this.myDate[0];
        // this.$emit('getCurrentTime',this.timeSelect)
      },
      closeDateTip(e){
      const cal = document.querySelector(".ant-calendar-picker-container");
      const root = document.querySelector(".goSelect");

      let seM=e.target.className!='ant-calendar-month-panel-year-select-content'
      let seY=e.target.className!='ant-calendar-year-panel-year'
      let seD=e.target.className!='ant-calendar-month-panel-month'

      let seYZ=e.target.className!='ant-calendar-year-panel-decade-select-content'
      let seYZS=e.target.className!='ant-calendar-decade-panel-decade'

      // console.log(e.target.className,'..e.target.className')
      if (cal && e.target.className !== root.className) {
        if (!cal.contains(e.target)&&seM&&seY&&seD&&seYZ&&seYZS) {
          this.isOpen = false;
        }
      }
      },
      // 跟随页面滚动
      getCalendarContainer(){
        return triggerNode=>triggerNode.parentNode
      }
    }

}
</script>

<style lang="scss" scoped>
    .goSelect {
      margin-left: 0px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #363fc8;
      cursor: pointer;
    }
</style>
<style lang="scss">
  .ant-calendar-picker-container{
    z-index: 9999; // 层级太低 盖不住底部文字
  }
  .ant-calendar-picker-container .date-footer-box{
    display: flex;  // 底部日期与按钮位置
    justify-content: space-between;
  }
</style>