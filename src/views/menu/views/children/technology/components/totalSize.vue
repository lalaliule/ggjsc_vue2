<template>
  <div class="section-1">
    <div class="title">资管总规模<span class="dataFrom">数据来源: 资产管理部</span></div>
    <div class="content-main">
      <div class="left">
        <div class="chartCon">
          <echart-common :options="pieOptions"></echart-common>
        </div>
        <div class="lengend">
            <div class="rightList">
              <p>{{pieList[0].name }}</p>
              <p>{{$formatVal(barData.active_invest_scale) }}</p>
            </div>
            <div class="rightList">
              <p>{{pieList[1].name }}</p>
              <p>{{ $toT(pieList[1].value) }}</p>
            </div>
        </div>
                    <ul class="lengedUL">
              <li>
                <div>
                  <p>公募化大集合产品(万元)</p>
                  <p>{{$formatVal(barData.large_set)}}</p>
                </div>
              </li>
              <li>
                <div>
                  <p>小集合产品(万元)</p>
                <p>{{$formatVal(barData.small_set)}}</p>
                </div>
              </li>
              <li>
                <div>
                  <p>单一产品(万元)</p>
                  <p>{{$formatVal(barData.single_set)}}</p>
                </div>
              </li>
            </ul>
      </div>
      <div class="right">
        <div class="title">
          <span class="date">数据日期：<span>{{new_date}}</span></span>
          <month-picker 
            :histroyDate="histroyDate"
            :timeSel="timeSelect"
            @getTime="confrim" 
          ></month-picker>
          <img @click="riskModelTwo = true" src="@/assets/imgs/overallOperation/biaodan.png" alt />
        </div>
        <echart-common :options="barOptions"></echart-common>
      </div>
    </div>
    <model-page :modelValue="riskModelTwo" title="资管总规模（万元）" @changeModel="changeRiskModelTwoModel" >
      <sample-table-x :columns="columns" :data="data"></sample-table-x>
    </model-page>
  </div>
</template>

<script>
import moment from "moment";
import * as llgtfoo from "../api.js";
import * as echarts from 'echarts'
export default {
  data(){
    return{
      count: 0,
      riskModelTwo: false,
      histroyDate: [],
      timeSelect: "",
      isOpen: false,
      barOptions: {
        // 'backgroundColor': '#F8F9FA',
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "rgba(153,153,153,0.7)",
          borderColor: "transparent",
          textStyle: {
            color: "#fff"
          },
          extraCssText: "border-radius:10px!important",
          padding: 0,
          formatter: params => {
            return `<div style='color:#fff'>
               <p class='tooltip-title'>${
                 this.barList[params[0].dataIndex].time
               }</p>
               <p class='tooltip-line'>主动投资规模（万元）：${this.$formatVal(
                 this.barList[params[0].dataIndex].active_invest_scale
               )}</p>
               <p class='tooltip-line'>通道规模（万元）：${this.$toT(
                 this.barList[params[0].dataIndex].channel_scale
               )}</p>
               <p class='tooltip-line'>总规模（万元）：${this.$toT(
                 this.barList[params[0].dataIndex].overall_scope
               )}</p>
             </div>`;
          }
        },
        legend: {
          left: "center",
          icon: "rect",
          top: "2",
          itemHeight: 8,
          align:'left',
          // selectedMode: false,
           data:["主动投资规模(万元)","通道规模(万元)"] 
          // ]
        },
        grid: {
          top: "18%",
          left: "1%",
          right: "1%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            interval:0,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#E2E2E2"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#929292" //坐标值得具体的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            // name: '总资产',
            // interval: 300,
            // inverse:true,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(243,244,245,1)"
              }
            }
          }
        ],
        series: [
          {
            name: "通道规模(万元)",
            itemStyle: {
              color: "#ff8356",
              barBorderRadius:  [0, 0, 15, 15]
            },
            type: "bar",
            stack: "one",
            barWidth: "20%",
            data: []
          },
          {
            name: "主动投资规模(万元)",
            itemStyle: {
              color: "#3653ff",
              barBorderRadius:[15, 15, 0, 0]
            },
            type: "bar",
            barWidth: "20%",
            stack: "one",
            data: []
          },
          
        ]
      },
      barData:{},
      barList: [],
      pieList: [
        { value: 0, name: "主动投资规模（万元）" },
        { value: 0, name: "通道规模（万元）" },
      ],
      pieOptions: {
        color: ["#3653ff","#ff8356"],
        title: {
          text: "",
          subtext: "资管总规模（万元）",
          left: "center",
          top: "35%",
          subtextStyle: {
            fontSize: "16px"
          }
        },
        tooltip: {
          trigger: "item",
          show: false
        },
        legend: {
          show: false
        },
        series: [
          {
            type: "pie",
            radius: ["60%", "68%"],
            center: ["50%", "40%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            emphasis: {
              show: false
            },
            data: []
          }
        ]
      },
      columns: [
        "分类规模",
        "通道规模（万元）",
        "主动投资规模（万元）",
        "总规模（万元）"
      ],
      new_date: "",
      data: []
    }
  },
  created(){
    this.getOverallScopeTime();
    this.getOverallScopeNewMon();
    this.getOverallScopeSpanMon();
  },
  methods:{
    moment,
    // 资产总规模左边
    getOverallScopeNewMon(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : ""
      };
      llgtfoo
        .getOverallScopeNewMon(params)
        .then(res => {
          if (res.ret_code == 0) {
            this.new_date = res.data.time;
            this.barData=res.data
            let newData=JSON.parse(JSON.stringify(this.barData))
              // 在2021年11月之后柱形图不显示主动投资规模,之前不显示三个小模块
              let dateStr=newData.time.toLocaleString().replace(/年|月/g,'-')
              let arrVal=dateStr.split('-')
              arrVal[1]=arrVal[1]<10?'0'+arrVal[1]:arrVal[1]
              let result=arrVal[0]+arrVal[1]
              if(result<202111){
                newData.single_set=0
                newData.small_set=0
                newData.large_set=0
              }
            this.pieList = [
              {
                value: res.data.active_invest_scale,
                name: "主动投资规模（万元）"
              },
              { value: res.data.channel_scale, name: "通道规模（万元）" },
            ];
            this.pieOptions.title.text = this.$toT(res.data.overall_scope);
            this.pieOptions.series[0].data = this.pieList;
          }
        })
    },
    // 资产总规模柱状
    getOverallScopeSpanMon(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : ""
      };
      llgtfoo
        .getOverallScopeSpanMon(params)
        .then(res => {
          if (res.ret_code === 0) {
            this.barList = res.data;
            res.data.forEach(element => {
              element.time = element.time;
            });
            this.barOptions.xAxis[0].data = this.barList.map(
              item => item.time
            );
            this.barOptions.series[0].data = this.barList.map(
              item => item.channel_scale
            );
            this.barOptions.series[1].data = this.barList.map(item => item.active_invest_scale);   

            this.data.push(this.barList.map(item => item.time));
            this.data.push(this.barList.map(item => this.$toT(item.channel_scale)));
            this.data.push(
              this.barList.map(item => this.$toT(item.active_invest_scale))
            );
            this.data.push(this.barList.map(item => this.$toT(item.overall_scope)));
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取时间列表
    getOverallScopeTime(){
      llgtfoo
        .getOverallScopeTime()
        .then(res => {
          if (res.ret_code === 0) {
            this.histroyDate = res.data;
            this.timeSelect =
              this.histroyDate.length > 0 && this.histroyDate[0];
          }
        })
    },
    //日期改变
    confrim(time){
      this.timeSelect=time
      this.getOverallScopeNewMon();
      this.getOverallScopeSpanMon();
    },
    changeRiskModelTwoModel(val){
      this.riskModelTwo=val
    }
  },
};
</script>

<style lang="scss" scoped>
.section-1 {
  margin-bottom: 20px;
  &::after{
    content: '';
    position: fixed;
    display: block;
  }
  .title {
    font-size: 18px;
    font-weight: bolder;
    color: #2f2f2f;
    margin-left: 10px;
  }
  .content-main {
    width: 100%;
    margin-top: 15px;
    height: 320px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    .left {
      height: 100%;
      flex: 35%;
      min-width: 500px;
      position: relative;
      display: flex;
      .chartCon{
        flex: none;
        width: 310px;
        height: 100%;
      }
      .lengend {
        flex: 1;
        margin-top: 80px;
        >.rightList {
          &:first-of-type {
            p {
              &:first-of-type {
                &:before {
                  content: "";
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  position: absolute;
                  left: -25px;
                  top: 7px;
                  background: #3653ff;
                }
              }
            }
          }
          &:last-of-type {
            p {
              &:first-of-type {
                &:before {
                  content: "";
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  position: absolute;
                  left: -25px;
                  top: 7px;
                  background: #ff8356;
                }
              }
            }
          }
        }
        p {
          margin: 0;
          position: relative;
          &:first-of-type {
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bolder;
            color: #2f2f2f;
          }
          &:last-of-type {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: #2f2f2f;
          }
        }
      }
      .lengedUL{
        position: absolute;
        bottom: -8px;
        left: 0;
          display: flex;
          width: 100%;
          margin-left: 30px;
          li{
            position: relative;
            padding-left: 15px;
            height: 45px;
            margin-right: 20px;
            >div{
              p{
                font-size: 14px !important;
                font-weight: 400 !important;
                color:#2f2f2f;
                margin-bottom: 3px;
                &:nth-child(2){
                  font-size: 16px !important;
                  font-weight: 600 !important;
                  line-height:14px;
                  text-align: center;
                }
              }
            }

            &::before{
              content: "";
              position: absolute;
              top: 5px;
              left: -6px;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background-color: #82adff;
            }
            &:nth-child(2){
              &::before{
                background-color: #837fec;
              }
            }
            &:nth-child(3){
              &::before{
                background-color: #cdccf7;
              }
            }
          }
        }
    }
    .right {
      flex: 65%;
      height: 100%;
      position: relative;
      .title {
        position: absolute;
        z-index: 9;
        top: -40px;
        right: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #969696;
        > span {
          margin-right: 10px;
        }
        > img {
          cursor: pointer;
          position: absolute;
          top: 40px;
          right:10px;
        }
        .date {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #969696;
          >span{
            color: #333;
            font-weight: 600;
          }
        }
        span {
          &.goSelect {
            margin-left: 0px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #363fc8;
            cursor: pointer;
          }
        }
      }
    }
  }
}
::v-deep .textAd{
  text-indent: 1em;
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
