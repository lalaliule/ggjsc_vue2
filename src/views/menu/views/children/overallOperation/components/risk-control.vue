<template>
  <div class="section-5">
    <div class="title">风险控制指标监管<span class="dataFrom">数据来源: 风险管理部</span></div>
    <div class="content-main">
      <div class="left">
        <img
          @click="riskModelOne=true"
          src="@/assets/imgs/overallOperation/biaodan.png"
          alt=""
        >
        <echart-common :options="options"></echart-common>
      </div>
      <div class="right">
        <div class="title">
        <div class="date-line">
          <span class="date">数据日期：<span>{{new_time}}</span></span>
          <month-picker 
            :histroyDate="histroyDate"
            :timeSel="timeSelect"
            @getTime="confrim" 
          ></month-picker>
        </div>
          <img
            @click="riskModelTwo=true"
            src="@/assets/imgs/overallOperation/biaodan.png"
            alt=""
          >
        </div>
        <div class="header">
          <ul>
            <li>
              <span class="icon"></span>
              <span>期初</span>
            </li>
            <li>
              <span class="icon"></span>
              <span>期末</span>
            </li>
          </ul>
        </div>
        <div class="regulatory">
          <div class="regulatory-bg">
            <div class="bg-1">
              <span>监管标准</span>
            </div>
            <div class="bg-2">
              <span>预警标准</span>
            </div>
            <div class="bg-3">
              <span>安全区域</span>
            </div>
          </div>
          <ul class="list-line">
            <li
              v-for="(item,index) in riskList"
              :key="index"
              @mouseenter="e=>tipShow(e,item,index)"
              @mouseleave="showTip = false"
            >
              <div class="block">
                <div class="begin">
                  <div class="icon"></div>
                  <div
                    class="line"
                    :style="beginClass(item)"
                  ></div>
                </div>
                <div class="end">
                  <div class="icon"></div>
                  <div
                    class="line"
                    :style="endClass(item)"
                  ></div>
                </div>
              </div>
              <div class="text">{{item.target_name}}</div>
            </li>
          </ul>
          <div
            class="tip"
            v-if="showTip"
            :style="tipStyle"
          >
            <span class="tooltip-title">{{tipData.target_name}}</span>
            <span class="tooltip-line">
              <!-- 期初：{{tipData.target_begin*100}}% -->
              期初：{{tipData.target_begin}}%
            </span>
            <span class='tooltip-line'>
              <!-- 期末：{{tipData.target_end*100}}% -->
              期末：{{tipData.target_end}}%
            </span>
            <span class="tooltip-line">
              预警标准：{{tipData.warn_standard}}
            </span>
            <span class="tooltip-line lastP">
              监管标准：{{tipData.keep_standard}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <model-page
      :modelValue="riskModelOne"
      @changeModel="changeModelOne"
      title="风险控制指标监管1"
    >
      <sample-table-y
        :columns="riskOneColumns"
        :data="listLeft"
      ></sample-table-y>
    </model-page>
    <model-page
      :modelValue="riskModelTwo"
      @changeModel="changeModelTwo"
      title="风险控制指标监管2"
    >
      <sample-table-y
        :columns="riskTwoColumns"
        :data="riskList"
      ></sample-table-y>
    </model-page>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import * as llgtfoo from "../api.js";
import moment from "moment";
export default {
  data(){
    return{
      count: 0,
      timeSelect: "",
      histroyDate: [],
      new_time:'',//最新时间
      isOpen: false,
      listLeft: [],
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
          },
          backgroundColor: "rgba(153,153,153,0.7)",
          borderColor: "transparent",
          textStyle: {
            color: "#fff",
          },
          extraCssText:'border-radius:10px!important',
          padding:0,
          formatter: (params) => {
            // console.log(params,'....pp')
            return `<div style='color:#fff'>
               <p class='tooltip-title'>${
                //  state.listLeft[params[0].dataIndex].target_name
                 params[0].axisValueLabel
               }</p>
               <p class='tooltip-line'>期初：${
                //  state.listLeft[params[0].dataIndex].begin
                this.$toT(params[0].value)
               }</p>
               <p class='tooltip-line'>期末：${
                //  state.listLeft[params[0].dataIndex].end
                this.$toT(params[1].value)
               }</p>
             </div>`;
          },
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '5%',
          top: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          type: 'category',
          data: [],
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#E2E2E2',
            },
          },
          axisLabel: {
            formatter: function (params) {
              return params.substring(0, params.indexOf('（万元）'))
            },
            textStyle: {
              color: '#3C3C3C', //坐标值得具体的颜色
              'fontWeight': 'bold',
              fontSize: '16px',
            },
          },
        },
        series: [
          {
            name: '期初',
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#7C9BFF' },
                  { offset: 0, color: '#193BFF' },
                ],
              ),
              //   barBorderRadius: 15,
            },
            data: [],
            barWidth: '20%',
          },
          {
            name: '期末',
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#DBB2FF' },
                  { offset: 0, color: '#DC34E5' },
                ],
              ),
              //   barBorderRadius: 15,
            },
            barWidth: '20%',
            data: [],
          },
        ],
      },
      riskList:[],
      showTip: false,
      tipData: {},
      tipStyle: {},
      riskModelOne: false,
      riskModelTwo: false,
      riskOneColumns: [
        {
          name: '指标',
          key: 'target_name',
        },
        {
          name: '期初',
          key: 'begin',
        },
        {
          key: 'end',
          name: '期末',
        },
      ],
      riskTwoColumns: [
        { name: '指标', key: 'target_name' },
        { name: '期初', key: 'target_begin_rate' },
        { name: '期末', key: 'target_end_rate' },
        { name: '预警标准', key: 'warn_standard' },
        { name: '监督标准', key: 'keep_standard' },
      ],
    }
  },
  created(){
    this.getCourtNotice()
    this.getCourtNoticeTime()
  },
  methods:{
    moment,
    changeModelOne(val){
      this.riskModelOne=val
    },
    changeModelTwo(val){
      this.riskModelTwo=val
    },
    //获取时间列表
    getCourtNoticeTime(){
      llgtfoo
        .getCourtNoticeTime()
        .then((res) => {
          if (res.ret_code === 0) {
            this.histroyDate = res.data;
            this.timeSelect = this.histroyDate.length > 0 && this.histroyDate[0];
          }
        })
    },
    //获取风险控制指标
    getCourtNotice(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo.getCourtNotice(params).then(res=>{
        if(res.ret_code === 0){
        //  this.new_time = res.data.new_time.substring(0,4)+'年'+res.data.new_time.substring(4)+'月'
         this.new_time = res.data.new_time
         this.listLeft = res.data.risk_manage_table1
         this.listLeft.forEach(el=>{
           el.begin=this.$toT(el.target_begin)
           el.end=this.$toT(el.target_end)
         })

         res.data.risk_manage_table2.forEach(res=>{
            //  res.target_begin_rate = res.target_begin *100 + '%'
            //  res.target_end_rate = res.target_end *100 + '%'
            res.target_begin_rate = res.target_begin + '%'
             res.target_end_rate = res.target_end + '%'
         })

         this.riskList = res.data.risk_manage_table2
         this.options.yAxis.data = res.data.risk_manage_table1.map(item => item.target_name).reverse()
         this.options.series[0].data = res.data.risk_manage_table1.map(item => item.target_begin).reverse()
         this.options.series[1].data = res.data.risk_manage_table1.map(item => item.target_end).reverse()
        }
      })
    },
    beginClass(item){
      return {
        height: item.target_begin_flag === 0 ?
          item.target_begin > item.target_end ?
            '90px' :
            '80px' : item.target_begin_flag === 1 ?
            item.target_begin > item.target_end ? '150px' :
              '40px' : item.target_begin_flag === 2 ?
              item.target_begin > item.target_end ?
                '220px' :
                '210px' : '',
      }
    },
    endClass(item){
      return {
        height: item.target_end_flag === 0 ?
          item.target_end > item.target_begin ?
            '90px' :
            '80px' : item.target_end_flag === 1 ?
            item.target_end > item.target_begin ?
              '150px' :
              '40px' : item.target_end_flag === 2 ?
              item.target_end > item.target_begin ?
                '220px' :
                '210px' : '',
      }
    },
    //显示提示窗
    tipShow (e, item, index){
      this.showTip = true
      const { width } = e.target.getBoundingClientRect()
      this.tipData = item
      if (index < 5) {
        this.tipStyle = {
          left: `${(index + 1) * width - 20}px`,
        }
      } else {
        this.tipStyle = {
          right: `${(this.riskList.length - index) * width - 20}px`,
        }
      }
    },
    //日期改变
    confrim(time){
      this.timeSelect=time
      this.getCourtNotice()
    },
  },
}
</script>

<style lang="scss" scoped>
.section-5 {
  position: relative;
  margin-top: 20px;
  // margin-bottom: 20px;
  .title {
    font-size: 18px;
    // font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bolder;
    color: #2f2f2f;
    margin-left: 10px;
  }
  .content-main {
    width: 100%;
    margin-top: 15px;
    box-sizing: border-box;
    height: 421px;
    display: flex;
    .left {
      width: 600px;
      height: 100%;
      background: #fff;
      margin-right: 10px;
      border-radius: 10px;
      position: relative;
      > img {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        z-index: 9;
      }
    }
    .right {
      flex: 1;
      height: 100%;
      background: #fff;
      margin-right: 10px;
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
      position: relative;
      .regulatory {
        width: 100%;
        height: 350px;
        margin-top: 15px;
        position: relative;
        .tip {
          position: absolute;
          // background: rgba(31, 31, 31, 0.4);
          // padding: 5px 10px;
          // border: 1px solid #ddd;
          top: 30%;
          transform: translateY(-50%);
          z-index: 999;
          >span{
            display: block;
          }
          span.tooltip-line {
            margin: 0;
            // line-height: 30px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #fff;
            // background: rgba(153,153,153,0.4);
            background: rgba(160,159,159,.8);
          }
          span.lastP{
          border-radius: 0 0 10px 10px;
          }
          span.tooltip-title{
            background: rgba(114, 111, 111, 0.9);
          }
        }
        .regulatory-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 0;
          //   height: 100%;
          > div {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          span {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            letter-spacing: 70px;
          }
          .bg-1 {
            height: 75px;
            background: #ffa497;
            span {
              color: #e47160;
            }
          }
          .bg-2 {
            height: 59px;
            background: #ffdaac;
            span {
              color: #e5ba84;
            }
          }
          .bg-3 {
            height: 121px;
            background: #e3fcee;
            span {
              color: #b6d9c5;
            }
          }
        }
        .list-line {
          z-index: 10;
          display: flex;
          align-items: center;
          position: absolute;
          top: 0px;
          bottom: 0;
          left: 0;
          right: 0;
          cursor: pointer;
          margin: 0;
          :hover {
            background: rgba(31, 31, 31, 0.1);
          }
          li {
            flex: 1;
            margin: 0;
            // height: 100%;
            .block {
              height: 255px;
              width: 100%;
              display: flex;
              align-items: flex-end;
              justify-content: center;
              .begin {
                display: flex;
                flex-direction: column;
                align-items: center;
                .icon {
                  display: inline-block;
                  width: 18px;
                  height: 18px;
                  border-radius: 50%;
                  position: relative;
                  background: #193bff;
                  &::before {
                    content: "";
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: #fff;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  }
                }
                .line {
                  width: 2px;
                  background: #193bff;
                }
              }
              .end {
                margin-left: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .icon {
                  display: inline-block;
                  width: 18px;
                  height: 18px;
                  border-radius: 50%;
                  position: relative;
                  background: #dc34e5;
                  &::before {
                    content: "";
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: #fff;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  }
                }
                .line {
                  width: 2px;
                  background: #dc34e5;
                }
              }
            }
            .text {
              height: 95px;
              width: 100%;
              box-sizing: border-box;
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: bolder;
              color: #3c3c3c;
              padding: 5px 10px;
              letter-spacing: 1px;
              text-align: center;
            }
          }
        }
      }
      .header {
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        ul {
          display: flex;
          align-items: center;
          li {
            display: flex;
            align-items: center;
            margin-right: 10px;
            .icon {
              display: inline-block;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              margin-right: 10px;
              position: relative;
              &::before {
                content: "";
                position: absolute;
                width: 8px;
                height: 8px;
                background: #fff;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
            &:first-of-type {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #3653ff;
              span {
                &.icon {
                  background: #3653ff;
                }
              }
            }
            &:last-of-type {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #dc34e5;
              span {
                &.icon {
                  background: #dc34e5;
                }
              }
            }
          }
        }
      }
      .title {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #969696;
       .date-line {
         display: flex;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #969696;
         position: absolute;
         right: 0;
         top: -35px;
        .date {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #969696;
          margin-right: 5px;
          >span{
            color: #333;
            font-weight: 600;
          }
        }
        span {
          &.goSelect {
            margin-left: 10px;
            margin-right: 10px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #363fc8;
            cursor: pointer;
          }
        }
      }
        > span {
          margin-right: 10px;
        }
        > img {
          cursor: pointer;
        }
      }
    }
  }
}
</style>