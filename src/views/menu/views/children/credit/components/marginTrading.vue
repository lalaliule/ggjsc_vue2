<template>
  <div class="section-1">
    <!-- 头部 -->
    <div class="main-head">
      <div class="title">融资融券业务<span class="dataFrom">数据来源: 证券金融部</span></div>
      <div class="right">
        <div class="title">
          <span class="date">数据日期: <span>{{new_date}}</span></span>
          <date-picker 
            :histroyDate="histroyDate"
            :timeSel="timeSelect"
            @getTime="confrim" 
          ></date-picker>
        </div>
      </div>
    </div>
    <!-- 融资融券业务 -->
    <div class="contain">
      <div class="content-main">
        <div class="left">
          <echart-common :options="parentOptions"></echart-common>
          <img class="leftImg" @click="leftTable = true" src="@/assets/imgs/overallOperation/biaodan.png" alt="">
        </div>
        <div class="right">
          <echart-common :options="proportionOptions"></echart-common>
          <a-tooltip placement="bottom">
            <template #title>
              <span>融资融券金额 = 收市融资负债金额+收市融券负债金额+收市费用负债+收市其他负债</span>
            </template>
            <a-icon type="question-circle" class="iconCir"></a-icon>
          </a-tooltip>
        </div>
      </div>
      <!-- 融资期限分布 -->
      <div class="content-f">
        <div class="left">
          <echart-common :options="detailOptions"></echart-common>
          <a-tooltip placement="bottom">
            <template #title>
              <span>
                融资期限 = 最终到期日 - 开仓时间 <br/>
                融资规模 = 合约金额  + 交易手续费
              </span>
            </template>
            <a-icon type="question-circle" class="iconCir"></a-icon>
          </a-tooltip>
        </div>
        <div class="right">
          <div class="title">利息收入</div>
          <div class="income">
            <div class="income1">
              <p>实际利息收入(万元)
                <a-tooltip placement="bottom">
                  <template #title>
                    <span>实际利息收入 = -（发生利息 + 发生罚息）</span>
                  </template>
                  <a-icon type="question-circle" class="icon2"></a-icon>
                </a-tooltip>
                {{incomeValue.actual}}</p>
              <a-progress :percent="Number(incomeValue1)" :show-info="false" :strokeWidth="20" strokeColor="#4061ff">
              </a-progress>
            </div>
            <div class="income2">
              <p>应收未收利息(万元)
                <a-tooltip placement="bottom">
                  <template #title>
                    <span>应收未收利息收入 = 总未还利息</span>
                  </template>
                  <a-icon type="question-circle" class="icon2"></a-icon>
                </a-tooltip>
                {{incomeValue.uncollect}}</p>
              <a-progress :percent="Number(incomeValue2)" :show-info="false" :strokeWidth="20" strokeColor="#ff7031">
              </a-progress>
            </div>
          </div>
          <div class="tableCon">
            <a-table
              :columns="columns"
              :data-source="listValue"
              bordered
              :pagination="false"
              :rowKey="(record,index)=>{return index}"
            >
             <span slot="value" slot-scope="value">{{$toT(value.toFixed(2))}}</span>
             <span slot="tags" slot-scope="tags">
               <div class="tagsCon">
                  <span>{{((tags.value/totalVlaue)*100).toFixed(2)+'%'}}</span>
                  <a-progress
                    :percent="Number(((tags.value/totalVlaue)*100).toFixed(2))"
                    :strokeWidth="15"
                    :show-info="false"
                  >
                  </a-progress>
                </div>
             </span>
            </a-table>
          </div>
        </div>
      </div>
      <!-- <div class="line"></div> -->
      <!-- 平仓情况 -->
      <div class="content-s">
        <div class="left">
          <p class="title">平仓情况</p>
          <div class="left-t">
            <div class="valueCon">
              <div class="imgCon">
                <!-- <span
                  class="percent"
                >{{(dataInfo.mqhkclose_position_value/dataTotal*100).toFixed(2)+'%'}}</span> -->
                <!-- <img src="@/assets/imgs/value1.png" alt /> -->
                <div id="chart1" ref="chart1" style="width:155px;height:155px"></div>
              </div>
              <p class="font26">{{dataInfo.mqhkclose_position_value}}</p>
              <p class="font16">卖券还款平仓(万元)
                <a-tooltip placement="bottom">
                  <template #title>
                    <span>卖券还款平仓金额 = 卖券成交金额</span>
                  </template>
                  <a-icon type="question-circle" class="icon2"></a-icon>
                </a-tooltip>
              </p>
              <div class="addValue">
                <span>合计融资融券平仓(万元)
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>融资融券平仓金额 = 现金平仓金额 + 卖券还款平仓金额</span>
                    </template>
                    <a-icon type="question-circle" class="icon2"></a-icon>
                  </a-tooltip>
                </span>
                <span>{{dataInfo.count_close_position_value}}</span>
              </div>
            </div>
            <div class="valueCon">
              <div class="imgCon">
                <!-- <span
                  class="percent"
                >{{(dataInfo.cash_close_position_value/dataTotal*100).toFixed(2)+'%'}}</span> -->
                <!-- <img src="@/assets/imgs/value2.png" alt /> -->
                <div id="chart2" ref="chart2" style="width:155px;height:155px"></div>
              </div>
              <p class="font26">{{dataInfo.cash_close_position_value}}</p>
              <p class="font16">现金平仓(万元)
                <a-tooltip placement="bottom">
                  <template #title>
                    <span>现金平仓金额 = -（发生金额 + 发生利息 + 发生费用 + 发生罚息 ）</span>
                  </template>
                  <a-icon type="question-circle" class="icon2"></a-icon>
                </a-tooltip>
              </p>
              <div class="addValue addValue2">
                <span>平仓亏损(万元)
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>平仓后剩余合约负债总额</span>
                    </template>
                    <a-icon type="question-circle" class="icon2"></a-icon>
                  </a-tooltip>
                </span>
                <span>{{dataInfo.loss_close_position_value}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <a-table
            :columns="columnsR"
            :data-source="listValueR"
            :pagination="false"
            :rowKey="(record,index)=>{return index}"
            bordered
          >
          <span slot="branchName" slot-scope="text,record">
            <span>{{text}}</span>
            <!-- defaultVisible="true" -->
            <a-tooltip placement="bottomLeft" 
            
            overlayClassName="tooltipClass">
              <template slot="title">
                <p class="tooltip-title">{{text}}</p>
                <p class="tooltip-item">平仓亏损金额(万元) {{record.close_postion_value}}</p>
              </template>
              <!-- <a-icon type="question-circle" theme="filled" v-if="record.close_postion_value>0"></a-icon> -->
              <img class="timg" src="@/assets/imgs/technology/3.png" alt="" v-if="record.close_postion_value>0">
            </a-tooltip>
          </span>
            
          </a-table>
        </div>
      </div>
    </div>
    <!-- 两融余额近13月走势列表 -->
        <model-page :modelValue="leftTable" title="两融余额近13个月走势(万元)" @changeModel="changeModel">
      <sample-table-x
        :columns="tableColumns"
        :data="tableData"
      ></sample-table-x>
    </model-page>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from "moment";
import * as api from "../api.js";
import * as liquidfill from "@/utils/echarts-liquidfill.js";
import datePicker from '@/components/datePicker/index.vue'

export default {
  components:{
    datePicker
  },
  data(){
    return{
      new_date: '',
      timeSelect: "",
      isOpen: false,
      histroyDate: [],
      parentOptions: {
        // 'backgroundColor': '#F8F9FA',
        title: {
          text: "两融余额近13个月走势",
          x: "20",
          y: "20"
        },
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
            return `<div style='color:#fff' class='tooltips'>
               <p class='tooltip-title'>${
                 this.list[params[0].dataIndex].time_str
               }</p>
               <p class='tooltip-line'>两融余额(万元):${
                 this.list[params[0].dataIndex].value
               }
               </p>
             </div>`;
          }
        },
        grid: {
          top: "15%",
          left: "3%",
          right: "2%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
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
            data: ["0%", "10%"],
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
            name: "",
            type: "line",
            showSymbol: false,
            lineStyle: {
              color: "#363FC8"
            },
            data: [],
            areaStyle: {
              opacity: 0.5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: "#D1D8FB"
                },
                {
                  offset: 0,
                  color: "#8F9FFF"
                }
              ])
            }
          }
        ]
      },
      proportionOptions: {
        title: {
          text: "融资融券维保比例分布(万元)"
          //   x: "20",
          //   y: "20"
        },
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
            return `<div style='color:#fff' class='tooltips'>
                            <p class='tooltip-title'>${
                 this.list1[params[0].dataIndex].proportion_name  
               }</p>

               <p class='tooltip-line'>两融余额(万元):${
                 this.list1[params[0].dataIndex].proportion_value
               }
               </p>
             </div>`;
          }
        },
        xAxis: [
          {
            type: "category",
            data: [],
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
            min: 0,
            max: 100,
            showMInLabel: true,
            splitNumber: 10,
            axisLabel: {
              show: true,
              formatter: "{value}%"
            }
          }
        ],
        series: [
          {
            // name: "总资产（万元）",
            type: "bar",
            showSymbol: false,
            lineStyle: {
              color: "#363FC8"
            },
            data: [],
            showBackground: true,
            areaStyle: {
              opacity: 0.5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: "#D1D8FB"
                },
                {
                  offset: 0,
                  color: "#8F9FFF"
                }
              ])
            },
            barWidth: 40, // 设置柱形宽度
            label: {
              // 设置顶部数据显示
              normal: {
                show: true,
                position: "top",
                formatter: function(parmas) {
                  return parmas.value.toFixed(2) + "%";
                },
                textStyle: {
                  color: "#000",
                  fontSize: 12
                }
              }
            }
          }
        ],
        grid: {
          top: "15%",
          left: "3%",
          right: "2%",
          bottom: "3%",
          containLabel: true
        },
      },
      list: [],
      list1: [],
      barList: [],
      detailOptions: {
        title: {
          text: "融资规模期限分布"
        },
        legend: { left: "0", y: "center", orient: "vertical",          
        // data: ["一个月以内（含一个月）", "一个月至三个月内（含三个月）", "三个月至六个月（含六个月）",'六个月至一年（含一年）','一年以上'],
        selectedMode:false,
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(153,153,153,0.7)",
          borderColor: "transparent",
          textStyle: {
            color: "#fff"
          },
          extraCssText: "border-radius:10px!important",
          padding: 0,
          formatter: params => {
            // console.log(params,'...ppp')
            return `<div style='color:#fff' class='tooltips'>
               <p class='tooltip-title'>
               ${this.barList[params.dataIndex].name}
               </p>
               <p class='tooltip-line'>
               账面余额(万元):${this.$toT(params.value)}
               </p>
                <p class='tooltip-line'>
                所占比例:${params.percent+'%'
                  }
                   </p>
             </div>`;
          }
        },
        series: [
          {
            type: "pie",
            radius: [50, 150],
            center: ["60%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: [],
          }
        ]
      },
      listValue: [],
      totalVlaue: 0,
      incomeValue: {},
      incomeValue1: 0,
      incomeValue2: 0,
      columns: [
        {
          title: "期限",
          key: "classify",
          dataIndex: "classify",
          align: "center"
        },
        {
          title: "应收未收利息(万元)",
          dataIndex: "value",
          key: "value",
          align: "center",
          scopedSlots:{customRender:'value'}
        },
        {
          title: "占比",
          align: "center",
          key: "action",
          scopedSlots:{customRender:'tags'},
          width:260
        }
      ],
      columnsR: [
        {
          title: "分支机构TOP10",
          dataIndex: "branch_name",
          align: "center",
          key: "branchName",
          slots: {
            customRender: "branchName"
          },
          scopedSlots:{customRender:'branchName'}
        },
        {
          title: "平仓金额(万元)",
          dataIndex: "value",
          key: "value",
          align: "center"
        }
      ],
      listValueR: [],
      //   平仓情况
      dataInfo: {},
      dataTotal: "",
      leftTable:false,
      tableData:[],
      tableColumns:['资产名称','两融余额']
    }
  },
  created(){
    this.getMarginTradingTime(); // 获取时间
    this.getMarginTrading(); //  融资融券业务 两融余额走势
    this.getMaintenance(); // 融资融券维保比例
    this.getFinanceScaleFbDetail(); // 融资规模期限分布数据
    this.getInterestIncome(); // 利息收入
    this.getClosePositionDetail(); // 平仓情况
    this.getClosePositionTable(); // 分支机构top10
    this.getUncollectInterest()
  },
  activated(){
    let myEvent=new Event('resize')
    window.dispatchEvent(myEvent)
  },
  methods:{
    moment,
    //获取时间列表
    getMarginTradingTime(){
      api
        .getMarginTradingTime()
        .then(res => {
          if (res.ret_code === 0) {
            this.histroyDate = res.data;
            this.timeSelect = this.histroyDate.length > 0 && this.histroyDate[0];
          }
        })
    },
    // 时间变化
    confrim(time){
      this.timeSelect=time
      // 日期变化重新获取数据
      this.getMarginTrading(); //  融资融券业务 两融余额走势
      this.getMaintenance(); // 融资融券维保比例
      this.getFinanceScaleFbDetail(); // 融资规模期限分布数据
      this.getInterestIncome(); // 利息收入
      this.getClosePositionDetail(); // 平仓情况
      this.getClosePositionTable(); // 分支机构top10
      this.getUncollectInterest()
    },
    // 获取数据  融资融券业务 两融余额走势
    getMarginTrading(){
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ''
      };
      api
        .getMarginTrading(params)
        .then(res => {
          if (res.ret_code === 0) {
            res.data.forEach(el => {
              el.value = this.$toT(el.margin_trading_scale);
            });
            this.list = res.data;
            this.parentOptions.xAxis[0].data = res.data.map(
              item => item.time_str
            );
            this.parentOptions.series[0].data = res.data.map(
              item => item.margin_trading_scale
            );
            this.tableData=[]            
            this.tableData.push(res.data.map((item) => item.time_str));
            this.tableData.push(res.data.map((item) => this.$toT(item.margin_trading_scale)));

          }
        })
    },
    // 融资融券维保比例
    getMaintenance(){
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ''
      };
      api
        .getMaintenance(params)
        .then(res => {
          if (res.ret_code === 0) {
            res.data.forEach(el => {
              el.proportion_value = this.$toT(el.proportion_value);
            });
            this.list1 = res.data;
            this.proportionOptions.xAxis[0].data = res.data.map(
              item => item.proportion_name
            );
            this.proportionOptions.series[0].data = res.data.map(
              item => item.proportion_percentage * 100
            );
          }
        })
    },
    // 融资规模期限分布数据
    getFinanceScaleFbDetail(){
      this.barList = [];
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ''
      };
      api.getFinanceScaleFbDetail(params).then(res => {
        let arr=["一个月以内（含一个月）", "一个月至三个月内（含三个月）", "三个月至六个月（含六个月）",'六个月至一年（含一年）','一年以上']
        if (res.ret_code == 0) {
          arr.forEach((item,i)=>{
            res.data.forEach(el => {
              if(el.classify==item){
                  this.barList.push({
                  value: el.value,
                  name: el.classify
                  });
              }
            });
          })
          this.detailOptions.series[0].data = this.barList;
        }
      });
    },
    // 利息收入
    getInterestIncome(){
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ''
      };
      api.getInterestIncome(params).then(res => {
        if (res.ret_code === 0) {
          this.incomeValue = res.data;
          // 千分位
          this.incomeValue.actual = this.$toT(res.data.actual_income);
          this.incomeValue.uncollect = this.$toT(res.data.uncollect_income);

          this.new_date = res.data.time;
          let data1 = res.data.actual_income;
          let data2 = res.data.uncollect_income;
          this.incomeValue1 = (data1 / (data1 + data2)) * 100;
          this.incomeValue2 = (data2 / (data1 + data2)) * 100;
        }
      });
    },
    // 应收未收利息
    getUncollectInterest(){
      this.listValue = []
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ''
      };
      api.getUncollectInterest(params).then(res=>{
        let arr=["一个月以内（含一个月）", "一个月至三个月内（含三个月）", "三个月至六个月（含六个月）",'六个月至一年（含一年）','一年以上']
        if(res.ret_code==0){
          arr.forEach((item,i)=>{
           
              res.data.forEach(el=>{
                 if(el.classify==item){
                this.listValue.push({
                  value:el.value,
                  classify:el.classify
                })
                }
              })
            
          })
          let value = res.data.map(item => item.value);
          this.totalVlaue = value.reduce(function(a, b) {
            return a + b;
          }, 0);
        }
      })
    },
    // 平仓情况
    // 水球图配置1
    getOpt1(obj){
      let optionsfill={}
      optionsfill.series= [
          {
            type: "liquidFill",
            waveAnimation: true,
            animation: true, // 动画效果
            radius: "90%",
            amplitude: 10,
            // phase: 10,
            data: obj.data,
            direction: "left",
            outline: {
              show: false,
              borderDistance: 0,
              itemStyle: {
                borderColor: "#695efb",
                borderWidth: 1
              }
            },
            backgroundStyle: {
              color: "#cdc7fe",
              borderWidth: 2,
              borderColor: "#695efb"
            },
            color: ["#8479fb"],
            label: {
              formatter: params => {
                // console.log(params,'....params')
                return `${(params.value*100).toFixed(2)}%`;
              },
              textStyle: {
                color: "#fff",
                insideColor: "#fff",
                fontSize: 26
              }
            }
          }
        ]
      let chart = echarts.init(document.getElementById("chart1"));
      chart.setOption(optionsfill,true);
    },
    // 水球图配置2
    getOpt2(obj){
      let optionsfill2={}
      optionsfill2.series= [
          {
            type: "liquidFill",
            waveAnimation: true,
            animation: true, // 动画效果
            radius: "90%",
            amplitude: 10,
            // phase: 10,
            data: obj.data,
            direction: "left",
            outline: {
              show: false,
              borderDistance: 0,
              itemStyle: {
                borderColor: "#695efb",
                borderWidth: 1
              }
            },
            backgroundStyle: {
              color: "#f8c1ca",
              borderWidth: 2,
              borderColor: "#f694a1"
            },
            color: ["#f9a1af", "#f37283"],
            label: {
              normal: {
                 formatter: params => {
                  //  console.log(params,'...水球图2')
                return `${(params.value*100).toFixed(2)}%`;
              },
                textStyle: {
                  color: "#fff",
                  insideColor: "#fff",
                  fontSize: 26
                }
              }
            }
          }
        ]
      let chart2 = echarts.init(document.getElementById("chart2"));
      chart2.setOption(optionsfill2,true);
    },
    getClosePositionDetail(){
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ''
      };
      api.getClosePositionDetail(params).then(res => {
        if (res.ret_code == 0) {
          this.dataTotal =
            (res.data.mqhkclose_position_value * 1) +
            (res.data.cash_close_position_value * 1);
          // console.log(typeof(this.dataTotal),'...this.dataTotal  typeof')
          // 水球图赋值
          let value1=(Number(res.data.mqhkclose_position_value)/this.dataTotal)*1
          // console.log(value1,typeof(value1),'..value1',res.data.mqhkclose_position_value,typeof(res.data.mqhkclose_position_value),'...rea.data of')
          let obj={
              value:value1,
              data:[value1]
              }
          this.getOpt1(obj)
          let value2=(Number(res.data.cash_close_position_value)/this.dataTotal)*1
          // console.log(value2,typeof(value2),'..value2',res.data.cash_close_position_value,typeof(res.data.cash_close_position_value),'...res.data of')
          let obj2={
            value:value2,
            data:[value2]
          }
        this.getOpt2(obj2)
          // console.log(obj,obj2,'...水球传参')

          this.dataInfo = res.data;
          for (let key in this.dataInfo) {
            // this.dataInfo[key]+=this.dataInfo[key]*1+1000
            this.dataInfo[key] = this.$toT(this.dataInfo[key]);
            // console.log(Number(this.dataInfo[key]),'....123')
          }
        }
      });
    },
    // 分支机构top10
    getClosePositionTable(){
      this.listValueR=[]
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ''
      };
      api.getClosePositionTable(params).then(res => {
        if (res.ret_code === 0) {
          res.data.forEach(el => {
            el.value = this.$toT(el.value);
            el.close_postion_value = this.$toT(el.close_postion_value);
          });
          this.listValueR = res.data;
          // console.log(this.listValueR,'...res')
        }
      });
    },
    changeModel(val){
      this.leftTable=val
    }
  }
};
</script>

<style lang="scss" scoped>
.section-1 {
  margin-bottom: 20px;
  .main-head {
    display: flex;
    .title {
      font-size: 18px;
      // font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bolder;
      color: #2f2f2f;
      margin-left: 10px;
    }
    .right {
      flex: 1;
      height: 100%;
      position: relative;
      .title {
        position: absolute;
        z-index: 9999;
        top: 0px;
        right: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 14px;
        font-family: PingFangSC-Regular, sans-serif;
        font-weight: 400;
        color: #969696;
        > span {
          margin-right: 10px;
        }
        > img {
          cursor: pointer;
        }
        .date {
          font-size: 14px;
          font-family: PingFangSC-Regular, sans-serif;
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
            font-family: PingFangSC-Regular, sans-serif;
            font-weight: 500;
            color: #363fc8;
            cursor: pointer;
          }
        }
      }
    }
  }
  .contain {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e2e2e2;
  }

  ::v-deep .content-main{
    height: 500px;
    display: flex;
    // > div {
    //   border-radius: 10px;
    //   border: 1px solid #e2e2e2;
    // }
    .left {
      flex: 60%;
      height: 100%;
      position: relative;
      .leftImg{
        position: absolute;
        right: 20px;
        top: 20px;
      }
    }
    .right {
      position: relative;
      margin-left: 20px;
      flex: 40%;
      height: 100%;
      padding-top: 20px;
      .iconCir{
        position: absolute;
        top: 27px;
        left: 235px;
      }
    }
  }
  ::v-deep .content-f {
    height: 500px;
    display: flex;
    padding: 20px;
    margin-top: 40px;
    // border-radius: 10px;
    // border: 1px solid #e2e2e2;
    // > div {
    //   border-radius: 10px;
    //   border: 1px solid #e2e2e2;
    //   padding: 20px;
    // }
    .left {
      position: relative;
      flex: 1;
      padding-top: 2px;
      .iconCir{
        position: absolute;
        top: 10px;
        left: 151px;
      }
    }
    .right {
      flex: 1;
      margin-left: 20px;
      .title {
        font-size: 18px;
        font-weight: 600;
        color: #2f2f2f;
        margin-bottom: 8px;
      }
      .income {
        display: flex;
        border-radius: 8px;
        background: #e2e2e2;
        padding: 20px;
        > div {
          flex: 1;
        }
        .income2 {
          margin-left: 20px;
        }
      }
      .tableCon {
        margin-top: 20px;
        .ant-table-thead > tr > th,
        .ant-table-tbody > tr > td {
          padding: 12px 16px !important;
        }
        .tagsCon {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            flex: none;
            display: inline-block;
            width: 50px;
            margin-right: 8px;
          }
          .ant-progress-line {
            height: 23px;
            // margin-left: 8px;
          }
        }
      }
    }
  }
  ::v-deep .content-s {
    // height: 500px;
    display: flex;
    padding: 20px;

    // div {
    //   border-radius: 10px;
    //   border: 1px solid #e2e2e2;
    // }
    .left {
      flex: 1;
      .title {
        font-size: 18px;
        font-weight: 600;
        color: #2f2f2f;
        margin-bottom: 25px;
      }
      .left-t {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .valueCon {
          flex: 1;
          text-align: center;
          .imgCon {
            position: relative;
            width: 155px;
            // height: 125px;
            margin: 25px auto;
            img {
              width: 100%;
            }
            .percent {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
              font-size: 20px;
            }
            #chart1,
            #chart2 {
              width: 155px;
              margin: 20px auto;
              height: 155px;
            }
          }
          p {
            margin-bottom: 0;
          }
          .font26 {
            font-size: 26px;
            font-weight: 700;
            font-family: PingFangSC-Medium, PingFang SC;
          }
          .font16 {
            font-size: 16px;
          }
          .addValue {
            display: flex;
            justify-content: space-between;
            position: relative;
            margin: 20px;
            padding: 6px 20px 6px 26px;
            background: #a0d5ff;
            border-radius: 20px;
            font-size: 16px;
            &::before {
              display: inline-block;
              position: absolute;
              left: 10px;
              top: 50%;
              transform: translateY(-50%);
              content: "";
              width: 8px;
              height: 8px;
              background: #1196ff;
              border-radius: 50%;
            }
          }
          .addValue2 {
            background: #c3f0d7;
            &::before {
              background: #28cb71;
            }
          }
        }
      }
    }

    .right {
      flex: 1;
      margin-left: 20px;
      .ant-table-column-title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
      }
      .ant-table-thead > tr > th,
      .ant-table-tbody > tr > td {
        padding: 6px 16px !important;
      }
      .ant-table-row{
        .timg{
          width: 12px;
          vertical-align: baseline;
          margin-left: 3px;
        }
      }
      .tableImg {
        width: 12px;
        margin-left: 5px;
        vertical-align: baseline;
      }
      .anticon-question-circle{
         margin-left: 5px;
      }
    }
  }
}
</style>
<style lang="scss">
.ant-calendar-input-wrap{
  display: none;
}
.tooltipClass{
  .ant-tooltip-inner{
    padding: 0;
    background-color: #fff;
    .tooltip-title{
      // background: rgba(0, 0, 0,0.3);
      background-color: rgba(114, 111, 111, 0.9);
      border-radius: 6px 6px 0px 0px;
      color:#fff;
      margin:0;
      padding:0 10px;
      line-height: 30px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }
    .tooltip-item{
      padding: 0 10px 0;
      margin: 0;
      // background: rgba(255,255,255,.4);
      background-color: rgba(160,159,159,.8);
      padding-bottom: 2px;
      border-radius: 0px 0px 6px 6px;
    }
  }
}
</style>