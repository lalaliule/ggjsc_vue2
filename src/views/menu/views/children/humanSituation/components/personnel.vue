<template>
  <div class="section-1">
    <div class="title">人员情况<span class="dataFrom">数据来源: 人力资源部</span></div>
    <div class="content-main">
      <div class="date-header">
        <span class="date">数据日期：<span>{{ new_date }}</span></span>
        <month-picker 
            :histroyDate="histroyDate"
            :timeSel="timeSelect"
            @getTime="confrim" 
          ></month-picker>
      </div>
      <div class="left">
          <div class="titleCon">
              <span>母公司</span>
              <img
                @click="quarterModel = true"
                src="@/assets/imgs/overallOperation/biaodan.png" alt="">
          </div>
          <div class="mainCon">
              <div class="top">
                  <div class="leftImg">
                      <div>
                          <p>{{$toT(leftObj.company_num)}} <span>人</span></p>
                          <p>公司总部</p>
                      </div>
                  </div>
                  <div class="rightChart">
                       <echart-common :options="quarterOptions"></echart-common>
                  </div>
              </div>
              <div class="bott">
                  <div class="leftImg">
                      <div>
                          <p>{{$toT(leftObj.branch_num)}}<span>人</span></p>
                          <p>分支机构</p>
                      </div>
                  </div>
                  <div class="rightChart">
                      <div :style="'flex:'+flexVal+'%'">
                          <div class="line1">
                              <img src="@/assets/imgs/humanSituation/hum-1.png" alt="">
                              <span>{{lastTwoData[0]&&lastTwoData[0].oc_date}}</span>
                          </div>
                          <div class="line2"></div>
                          <div class="line3">
                              <span>月末数据(人)</span>
                              <span>同比</span>
                          </div>
                          <div class="line4">
                              <span>{{lastTwoData[0]&&$toT(lastTwoData[0].staff_num)}}</span>
                              <span>{{lastTwoData[0]&&lastTwoData[0].staff_yearonyear>0?'+':''}}{{lastTwoData[0]&&lastTwoData[0].staff_yearonyears}}</span>
                          </div>
                      </div>
                      <div class="rightH" :style="'flex:'+(100-flexVal)+'%'">
                          <div class="line1">
                              <img src="@/assets/imgs/humanSituation/hum-2.png" alt="">
                              <span>{{lastTwoData[1]&&lastTwoData[1].oc_date}}</span>
                          </div>
                          <div class="line2"></div>
                          <div class="line3">
                              <span>月末数据(人)</span>
                              <span>同比</span>
                          </div>
                          <div class="line4">
                              <span>{{lastTwoData[1]&&$toT(lastTwoData[1].staff_num)}}</span>
                              <span>{{lastTwoData[1]&&lastTwoData[1].staff_yearonyear>0?'+':''}}{{lastTwoData[1]&&lastTwoData[1].staff_yearonyears}}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>
      <div class="right">
          <div class="titleCon">
              <span>子公司</span>
              <img 
              @click="zModel = true"
              src="@/assets/imgs/overallOperation/biaodan.png" alt="">
          </div>
          <div class="chartCon">
                <echart-common :options="zOptions"></echart-common>
          </div>
      </div>

    </div>
    <model-page :modelValue="quarterModel" @changeModel="changeModel"  title="母公司人员情况">
      <sample-table-y :columns="columns" :data="quarterMonth"></sample-table-y>
    </model-page>
    <model-page :modelValue="zModel" @changeModel="changeZModel"  title="子公司人员情况">
      <sample-table-y :columns="columns" :data="zOptionsData"></sample-table-y>
    </model-page>

  </div>
</template>

<script>
import moment from "moment";
import * as echarts from "echarts";
import * as llgtfoo from "../api.js";
export default {
  data(){
    return{
      timeSelect: "",
      isOpen: false,
      current:0,
      new_date: "", //最新时间
      quarterModel: false,
      histroyDate: [],
      // 母公司
      quarterMonth: [],
      quarterMonthList:[],
      quarterOptions: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "rgba(153,153,153,0.7)",
          borderColor: "transparent",
          textStyle: {
            color: "#fff",
          },
          extraCssText:'border-radius:10px!important',
          padding:0,
          formatter: (params) => {
            return `<div class='tooltips'>
               <p class='tooltip-title'>${this.quarterMonthList[params[0].dataIndex].oc_date}</p>
               <p class='tooltip-line'><span>月度人数：</span> ${
                 this.$toT(this.quarterMonthList[params[0].dataIndex].staff_num)
               }</p>
               <p class='tooltip-line'><span>同比：</span>
               ${this.quarterMonthList[params[0].dataIndex].staff_yearonyear>0?'+':''}
               ${(
                 this.quarterMonthList[params[0].dataIndex].staff_yearonyear * 100
               ).toFixed(2)}%</p>
            </div>`;
          },
        },
        grid: {
          top: "18%",
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: "#E2E2E2",
              },
            },
            axisLabel: {
              interval:0,
              textStyle: {
                color: "#929292", //坐标值得具体的颜色
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(243,244,245,1)",
              },
            },
          },
        ],
        series: [
          {
            name: "",
            itemStyle: {
                normal: {
                    color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                    offset: 1,
                                    color: "#7e9dff", // 0% 处的颜色
                                    },
                                    {
                                    offset: 0,
                                    color: "#294aff", // 100% 处的颜色
                                    },
                                ],
                                globalCoord: false, // 缺省为 false
                    }, //渐变颜色
                },
            },
            symbol: "path://M150 50 L130 130 L170 130  Z",
            barWidth: "40%",
            type: "pictorialBar",
            data: [],
            label:{
                show:true,
                position:'top',
                distance:10,
                backgroundColor:{
                        image:require('@/assets/imgs/humanSituation/symbol-1.png')
                },
                padding:[5,5,7,5]
            }
          },
        ],
      },
      columns: [
        {
          name: "机构名称",
          key: "name",
        },
        // {
        //   name: "本月新增",
        //   key: "staff_add",
        // },
        // {
        //   name: "本月减少",
        //   key: "staff_reduce",
        // },
        {
          name: "月末数据",
          key: "staff_num",
        },
        {
          name: "同比",
          key: "staff_yearonyears",
        },
      ],
      dataString:{
        staff_yearonyear:0,staff_num:0
      },
      lastTwoData:[],
      flexVal:0,
      // 子公司
      zModel:false,
      zOptions:{
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "rgba(153,153,153,0.7)",
          borderColor: "transparent",
          textStyle: {
            color: "#fff",
          },
          extraCssText:'border-radius:10px!important',
          padding:0,
          formatter: (params) => {
            return `<div class='tooltips'>
               <p class='tooltip-title'>${params[0].axisValue}</p>
               <p class='tooltip-line'><span>本月人数：</span> ${
                 this.$toT(this.zOptionsDataList[params[0].dataIndex].staff_num)
               }</p>
               <p class='tooltip-line'><span>上月人数：</span> ${
                 this.$toT(params[0].value)
               }</p>
               <p class='tooltip-line'><span>同比：</span>
               ${this.zOptionsDataList[params[0].dataIndex].staff_yearonyear>0?'+':''}
               ${(
                 this.zOptionsDataList[params[0].dataIndex].staff_yearonyear * 100
               ).toFixed(2)}%</p>
            </div>`;
          },
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "3%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: "#E2E2E2",
              },
            },
            axisLabel: {
              interval:0,
              textStyle: {
                color: "#929292", //坐标值得具体的颜色
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(243,244,245,1)",
              },
            },
          },
        ],
        series: [
          {
            name: "上月",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: "#7C9BFF" },
                    { offset: 0, color: "#193BFF" },
            ]),
              barBorderRadius: 15,
            },
            type: "bar",
            barWidth: "20%",
            data: [],
          },
          {
            name: "本月",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: "#FFB388" },
                    { offset: 0, color: "#FD7C50" },
                  ]),
              barBorderRadius: 15,
            },
            type: "bar",
            barWidth: "20%",
            data: [],
          },
        ],
        legend: {
            left:'center',
            top: "0",
            align:'right',
            // icon: "rect",
            selectedMode: false,
            itemWidth: 20,
            itemHeight: 8,
        },
      },
      zDataString:{
          staff_yearonyear:0,staff_num:0
      },
      zOptionsData:[],
      zOptionsDataList:[],
      // 左侧人员数据
      leftObj:{}
    }
  },
  created(){
    this.getHistoryResourcesTime();
    this.getHuresourcesDetail();
    this.getMumHuresourcesDetail();
    this.getChildHuresourcesDetail()
  },
  methods:{
    //人员情况母公司
    getMumHuresourcesDetail(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getMumHuresourcesDetail(params)
        .then((res) => {
          if (res.ret_code === 0) {
            let newList=res.data.dataList.filter(el=>{
              return el.oc_date!='公司总部'&&el.oc_date!='分支机构'&&el.oc_date!='母公司合计'
            }) // 筛选出非统计数据
            let noEl=newList.slice(0,11);// 公司总部
            this.lastTwoData=newList.slice(11,13) // 分支机构
            let total=Number(this.lastTwoData[0].staff_num)+Number(this.lastTwoData[1].staff_num)
            this.flexVal=Math.ceil((this.lastTwoData[0].staff_num)/total*100)

            this.dataString = res.data.num_tb
            res.data.dataList.forEach((element) => {
              element.name=element.oc_date
              element.staff_yearonyears =
                (element.staff_yearonyear * 100).toFixed(2) + "%";
            });
            this.quarterOptions.xAxis[0].data = noEl.map(
              (item) => item.oc_date
            );
            this.quarterOptions.series[0].data = noEl.map(
              (item) => item.staff_num
            );
            this.quarterMonthList=noEl
            this.quarterMonth = res.data.dataList
            this.quarterMonth.forEach(el=>{
              el.staff_num=this.$toT(el.staff_num)
              el.staff_add=this.$toT(el.staff_add)
              el.staff_reduce=this.$toT(el.staff_reduce)
            })
          }
        })
    },
    //人员情况子公司
    getChildHuresourcesDetail(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getChildHuresourcesDetail(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.zOptionsData = res.data.dataList;
            this.zDataString = res.data.num_tb
            res.data.dataList.forEach((element) => {
              element.name=element.oc_date
              element.staff_yearonyears =
                (element.staff_yearonyear * 100).toFixed(2) + "%";
            });
            let newData=res.data.dataList.filter(el=>{
              return el.oc_date!='子公司合计'
            })
            this.zOptions.xAxis[0].data = newData.map(
              (item) => item.oc_date
            );
            this.zOptions.series[0].data = res.data.lastDataList.map(
              (item) => item.staff_num
            );
            this.zOptions.series[1].data = newData.map(
              (item) => item.staff_num
            );
            this.zOptionsDataList=newData
            this.zOptionsData.forEach(el=>{
              el.staff_num=this.$toT(el.staff_num)
              el.staff_add=this.$toT(el.staff_add)
              el.staff_reduce=this.$toT(el.staff_reduce)
            })
          }
        })
    },
    // 展示人员情况
    getHuresourcesDetail(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getHuresourcesDetail(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.new_date =res.data.time
            this.leftObj=res.data
          }
        })
    },
    //获取时间列表
    getHistoryResourcesTime(){
      llgtfoo
        .getHistoryResourcesTime()
        .then((res) => {
          if (res.ret_code === 0) {
            this.histroyDate = res.data;
            this.timeSelect = this.histroyDate.length > 0 && this.histroyDate[0];
          }
        })
    },
    //日期改变
    confrim(time){
      this.timeSelect=time
      this.getMumHuresourcesDetail();
      this.getChildHuresourcesDetail();
      this.getHuresourcesDetail();
    },
    //切换
    tabChange(index){
      this.current=index
      if (index === 0) {
        this.getMumHuresourcesDetail();
      } else {
        this.getChildHuresourcesDetail();
      }
    },
    changeModel(val){
      this.quarterModel=val
    },
    changeZModel(val){
      this.zModel=val
    }
  },

}
</script>

<style scoped lang="scss">
.section-1 {
  .title {
    font-size: 18px;
    // font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bolder;
    color: #2f2f2f;
    margin-left: 10px;
  }
  .content-main {
    display: flex;
    width: 100%;
    margin-top: 15px;
    height: 583px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    .date-header {
      display: flex;
      position: absolute;
      right: 20px;
      top: -33px;
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
    .left,.right{
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #e2e2e2;
        .titleCon{
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            >span{
                font-size: 16px;
                color: #2f2f2f;
                font-weight: 500;
            }
            >img{
                width: 67px;
                height: 18px;
            }
        }
    }
    .left{
        flex: 1;
        margin-right: 10px;
        .mainCon{
            display: inline-block;
            width: 100%;
            .top,.bott{
                display: flex;
                height: 220px;
                margin-bottom: 20px;
                .leftImg{
                    position: relative;
                    width: 130px;
                    height: 100%;
                    margin-right: 10px;
                    border-radius: 10px;
                    >div{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-80%);
                        width: 100%;
                        >p{
                            color: #fff;
                            font-size: 16px;
                            text-align: center;
                            margin-bottom: 0px;
                            &:nth-child(1){
                                font-size: 26px;
                                font-weight: 500;
                                >span{
                                  font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }
            .top{
               .leftImg{
                    background: url(~@/assets/imgs/humanSituation/com-1.png) no-repeat center center;
               } 
            }
            .bott{
                .leftImg{
                    background: url(~@/assets/imgs/humanSituation/com-2.png) no-repeat center center;
               } 
               .rightChart{
                   display: flex;
                   padding-left: 25px;

                   >div{
                       flex: 1;
                       margin-right: 30px;
                       .line1{
                           img{
                               vertical-align: middle;
                               margin-right: 8px;
                           }
                           span{
                               color: #363636;
                               font-size: 16px;
                               font-weight: 500;
                           }
                       }
                       .line2{
                           width: 100%;
                           height: 30px;
                           margin: 20px 0;
                           background: linear-gradient(to right,#ad6eff,#c192ff);
                           border-radius: 15px 0 0 15px;
                       }
                       .line3{
                           display: flex;
                           justify-content: space-between;
                           font-size: 14px;
                           color: #363636;
                       }
                       .line4{
                           display: flex;
                           justify-content: space-between;
                           font-size: 26px;
                           color: #ad6eff;
                           font-weight: 600;
                           margin-top: 20px;
                       }
                   }
                   .rightH{
                       .line2{
                           border-radius: 0px 15px 15px 0px;
                           background:linear-gradient(to right,#193bff,#7c9bff);
                       }
                       .line4{
                           color: #193bff;
                       }
                   }
               }
            }
            .rightChart{
                width: 100%;
            }
        }
    }
    .right{
        flex: none;
        width: 500px;
        .chartCon{
            width: 100%;
            height: 100%;
        }
    }
  }
  /deep/.tooltips {
    p {
      margin: 0;
      line-height: 30px;
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
