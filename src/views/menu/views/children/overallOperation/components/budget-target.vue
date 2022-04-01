<template>
  <div class="section-3">
    <div class="title">预算目标完成率<span class="dataFrom">数据来源: 计划财务部</span></div>
    <div class="content-main">
      <div class="tab-right">
        <!-- 母公司日期选择 -->
        <div class="date-line" v-if="current==0">
          <span class="date">数据日期：<span>{{new_time_m}}</span></span>
          <month-picker 
            :histroyDate="histroyDate_m"
            :timeSel="timeSelect_m"
            @getTime="confrim_m" 
          ></month-picker>
        </div>
        <!-- 集团日期选择 -->
        <div class="date-line" v-else>
          <span class="date">数据日期：<span>{{new_time_j}}</span></span>
          <month-picker 
            :histroyDate="histroyDate_j"
            :timeSel="timeSelect_j"
            @getTime="confrim_j" 
          ></month-picker>
        </div>

        <tab-toggle
          :change="tabChange"
          :tab="['母公司预算目标完成率(月)', '集团预算目标完成率(季度)']"
        ></tab-toggle>
      </div>
      <div class="rate-box">
        <!-- <div class="rate-line">
          <div class="left">
            <echart-common :options="options1"></echart-common>
          </div>
          <div class="right">
            <p class="name">营业收入(万元)</p>
            <p class="text">累计完成 / 年度目标</p>
            <p class="value">
              <span>{{ $toT(income.completion) }}</span>
              <span>/{{ $toT(income.annual_target) }}</span>
            </p>
          </div>
        </div> -->
        <div class="rate-line">
          <div class="left">
            <echart-common :options="options2"></echart-common>
          </div>
          <div class="right">
            <p class="name">利润总额(万元)</p>
            <p class="text">累计完成 / 年度目标</p>
            <p class="value">
              <span>{{ profit.completion&&$toT(profit.completion) }}</span>
              <span>/{{ profit.annual_target&&$toT(profit.annual_target) }}</span>
            </p>
          </div>
        </div>
        <div class="rate-line">
          <div class="left">
            <echart-common :options="options3"></echart-common>
          </div>
          <div class="right">
            <p class="name">净利润（万元）</p>
            <p class="text">累计完成 / 年度目标</p>
            <p class="value">
              <span>{{net_profit.completion&&$toT(net_profit.completion) }}</span>
              <span>/{{ net_profit.annual_target&&$toT(net_profit.annual_target) }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as llgtfoo from "../api.js";
import moment from "moment";
export default {
  data(){
    return{
      current: 0,
      timeSelect_m: "",
      timeSelect_j: "",
      isOpen_m: false,
      isOpen_j: false,
      income: {},
      net_profit: {},
      profit: {},
      options1: {
        series: [
          {
            type: "gauge",
            radius: "60%",
            axisLine: {
              show: true,
              // 两端是否设置为圆角；在5.0之后的版本有效
              roundCap: false,
              lineStyle: {
                width: 20,
                color: [
                  [
                    0,
                    {
                      x: 0,
                      y: 0,
                      x1: 1,
                      y1: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#FFD99F",
                        },
                        {
                          offset: 1,
                          color: "#FFBE4C",
                        },
                      ],
                    },
                  ],
                  [1, "#E6EBF8"],
                ],
              },
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: "#E2E2E2",
              },
            },
            splitLine: {
              distance: -35,
              length: 14,
              lineStyle: {
                width: 2,
                color: "#E2E2E2",
              },
            },
            axisLabel: {
              distance: -15,
              color: "#CFCFCF",
              fontSize: 13,
            },
            itemStyle: {
              normal: {
                color: "#FF7373", //指针颜色
              },
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              fontSize: 20,
              color: "#FFC867",
              offsetCenter: [0, "80%"],
              formatter: "{value}%",
            },
            data: [
              {
                value: 0,
              },
            ],
          },
        ],
      },
      options2: {
        series: [
          {
            type: "gauge",
            radius: "60%",
            axisLine: {
              show: true,
              // 两端是否设置为圆角；在5.0之后的版本有效
              roundCap: false,
              lineStyle: {
                width: 20,
                color: [
                  [
                    0,
                    {
                      x: 0,
                      y: 0,
                      x1: 1,
                      y1: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#7796FF",
                        },
                        {
                          offset: 1,
                          color: "#1D3FFF",
                        },
                      ],
                    },
                  ],
                  [1, "#E6EBF8"],
                ],
              },
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: "#E2E2E2",
              },
            },
            splitLine: {
              distance: -35,
              length: 14,
              lineStyle: {
                width: 2,
                color: "#E2E2E2",
              },
            },
            axisLabel: {
              distance: -15,
              color: "#CFCFCF",
              fontSize: 13,
            },
            itemStyle: {
              normal: {
                color: "#FF7373", //指针颜色
              },
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              fontSize: 20,
              color: "#1D3FFF",
              offsetCenter: [0, "80%"],
              formatter: "{value}%",
            },
            data: [
              {
                value: 0,
              },
            ],
          },
        ],
      },
      options3: {
        series: [
          {
            type: "gauge",
            radius: "60%",
            axisLine: {
              show: true,
              // 两端是否设置为圆角；在5.0之后的版本有效
              roundCap: false,
              lineStyle: {
                width: 20,
                color: [
                  [
                   0,
                    {
                      x: 0,
                      y: 0,
                      x1: 1,
                      y1: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#43D7DC",
                        },
                        {
                          offset: 1,
                          color: "#10C2DC",
                        },
                      ],
                    },
                  ],
                  [1, "#E6EBF8"],
                ],
              },
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: "#E2E2E2",
              },
            },
            splitLine: {
              distance: -35,
              length: 14,
              lineStyle: {
                width: 2,
                color: "#E2E2E2",
              },
            },
            axisLabel: {
              distance: -15,
              color: "#CFCFCF",
              fontSize: 13,
            },
            itemStyle: {
              normal: {
                color: "#FF7373", //指针颜色
              },
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              fontSize: 20,
              color: "#10C2DC",
              offsetCenter: [0, "80%"],
              formatter: "{value}%",
            },
            data: [
              {
                value: 0,
              },
            ],
          },
        ],
      },
      histroyDate_m: [],
      histroyDate_j: [],
      new_time_m:'',//最新时间
      new_time_j:''//最新时间
    }
  },
   created(){
    this.getBudgetTarM('getBudgetTarM');
    this.getBudgetTarTime();
    this.getBudgetTarGTime();
  },
  methods:{
    tabChange(index){
      this.current = index;
      if(index === 0){
        this.getBudgetTarM('getBudgetTarM');
        // getBudgetTarTime()
      }else {
        this.getBudgetTarM('getBudgetTarG');
        // getBudgetTarGTime()
      }
    },
    //母公司预算目标完成率getBudgetTarM   
    //集团预算目标完成率getBudgetTarG
    getBudgetTarM(urlName){
      const params={}
      if(urlName=='getBudgetTarM'){
        params.time= this.timeSelect_m ? moment(this.timeSelect_m).format("YYYYMM") : ""
      }else{
        params.time=this.timeSelect_j ? moment(this.timeSelect_j).format("YYYYMM") : ""
      }
      llgtfoo[urlName](params)
        .then((res) => {
          if (res.ret_code === 0) {
            if(urlName=='getBudgetTarM'){
            this.new_time_m=res.data.new_time//最新时间
            }else{
            this.new_time_j=res.data.new_time//最新时间 
            }
            this.income = res.data.income;
            this.net_profit = res.data.net_profit;
            this.profit = res.data.profit;

            // this.options1.series[0].data[0].value = (res.data.income.rate * 100).toFixed(2);
            // this.options1.series[0].axisLine.lineStyle.color[0][0] =
            //   res.data.income.rate;
            this.options2.series[0].data[0].value = (res.data.profit.rate*100).toFixed(2);
            this.options2.series[0].axisLine.lineStyle.color[0][0] =
              res.data.profit.rate;
              // console.log(this.options2.series[0].data[0].value,'..val')
            this.options3.series[0].data[0].value = (res.data.net_profit.rate * 100).toFixed(2);
            this.options3.series[0].axisLine.lineStyle.color[0][0] =
              res.data.net_profit.rate;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取时间列表
    getBudgetTarTime(){
       llgtfoo
        .getBudgetTarTime()
        .then((res) => {
          if (res.ret_code === 0) {
            this.histroyDate_m = res.data;
            this.timeSelect_m = this.histroyDate_m.length > 0 && this.histroyDate_m[0];
          }
        })
    },
    //获取时间列表
    getBudgetTarGTime(){
      llgtfoo
        .getBudgetTarGTime()
        .then((res) => {
          if (res.ret_code === 0) {
            this.histroyDate_j = res.data;
            this.timeSelect_j = this.histroyDate_j.length > 0 && this.histroyDate_j[0];
          }
        })
    },
    //日期改变
    confrim_m(time){
      this.timeSelect_m=time
      if(this.current===0){
        this.getBudgetTarM('getBudgetTarM');
      }else {
        this.getBudgetTarM('getBudgetTarG');
      }
    },
    confrim_j(time){
      this.timeSelect_j=time
      if(this.current===0){
        this.getBudgetTarM('getBudgetTarM');
      }else {
        this.getBudgetTarM('getBudgetTarG');
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.section-3 {
  position: relative;
  margin-top: 20px;
  &::after{
    content: '';
    position: fixed;
    display: block;
  }
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
    height: 421px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px 10px;
    .tab-right {
      .date-line {
        display: flex;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #969696;
        position: absolute;
        // top: 12px;
        right: 20px;
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
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #363fc8;
            cursor: pointer;
          }
        }
      }
      display: flex;
      justify-content: center;
    }
    .rate-box {
      margin-top: 30px;
      width: 100%;
      height: 330px;
      display: flex;
      .rate-line {
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        margin-left: 66px;
        .left {
          // width: 300px;
          flex: 50%;
          height: 100%;
        }
        .right {
          padding-left: 10px;
          box-sizing: border-box;
          // flex: 1;
          flex: 50%;
          p {
            &.name {
              font-size: 20px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bolder;
              color: #2f2f2f;
            }
            &.text {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #969696;
            }
            &.value {
              font-size: 20px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 300;
              color: #2f2f2f;
              span {
                &:first-of-type {
                  font-weight: 500;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style>
.date-footer-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ant-calendar-month {
  width: 350px !important;
}
</style>
