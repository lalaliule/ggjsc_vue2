<template>
  <div class="section-2">
    <div class="title">薪酬情况<span class="dataFrom">数据来源: 人力资源部</span></div>
    <div class="date-line">
      <span class="date">数据日期：<span>{{ new_time }}</span></span>
      <month-picker 
            :histroyDate="histroyDate"
            :timeSel="timeSelect"
            @getTime="confrim" 
          ></month-picker>
    </div>
    <div class="content-main">
      <ul class="card">
        <li>
          <img src="@/assets/imgs/humanSituation/pay-1.png" alt="" />
          <div class="data">
            <p>
              <span>{{ payList.month_change_pay&&$toT(payList.month_change_pay) }}万元</span>
              <span
                :class="{
                  n1: payList.month_change_pay_mo_m > 0,
                  n2: payList.month_change_pay_mo_m < 0,
                }"
                >({{ payList.month_change_pay_mo_m > 0 ? "+" : ""
                }}{{ (payList.month_change_pay_mo_m * 100).toFixed(2) }}%)</span
              >
            </p>
            <p>本月发生(环比)</p>
          </div>
        </li>
        <li>
          <img src="@/assets/imgs/humanSituation/pay-2.png" alt="" />
          <div class="data">
            <p>
              <span>{{ payList.year_change_pay&&$toT(payList.year_change_pay) }}万元</span>
              <span
                :class="{
                  n2: payList.year_change_pay_yo_y < 0,
                  n1: payList.year_change_pay_yo_y > 0,
                }"
                >({{ payList.year_change_pay_yo_y > 0 ? "+" : ""
                }}{{ (payList.year_change_pay_yo_y * 100).toFixed(2) }}%)</span
              >
            </p>
            <p>全年累计(同比)</p>
          </div>
        </li>
      </ul>
      <div class="trend">
        <div class="title">
          <p>母公司本月发生薪酬机构分布和走势</p>
          <img
            @click="parentModel = true"
            src="@/assets/imgs/overallOperation/biaodan.png"
            alt=""
          />
        </div>
        <div class="card-line">
          <div class="left">
            <echart-common
              :options="parentsOptions"
              :hasClick="true"
              @handleChange="parentChange"
            ></echart-common>
          </div>
          <div class="right">
            <echart-common :options="parentOptions"></echart-common>
          </div>
        </div>
        <div class="title">
          <p>子公司本月发生薪酬机构分布和走势</p>
          <img
            @click="childModel = true"
            src="@/assets/imgs/overallOperation/biaodan.png"
            alt=""
          />
        </div>
        <div class="card-line">
          <div class="left">
            <echart-common
              :options="childOptions"
              :hasClick="true"
              @handleChange="childChange"
            ></echart-common>
          </div>
          <div class="right">
            <echart-common :options="haOptions"></echart-common>
          </div>
        </div>
      </div>
    </div>
    <model-page
      :modelValue="parentModel" @changeModel="changeParentModel" 
      :title="`母公司${new_time}发生薪酬机构分布和走势`"
    >
      <sample-table-y
        :columns="parentColumns"
        :data="parentData"
      ></sample-table-y>
    </model-page>
    <model-page
      :modelValue="childModel" @changeModel="changeChildModel" 
      :title="`子公司${new_time}发生薪酬机构分布和走势`"
    >
      <sample-table-y
        :columns="childColumns"
        :data="childData"
      ></sample-table-y>
    </model-page>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from "moment";
import * as llgtfoo from "../api.js";
export default {
  data(){
    return {
      count: 0,
      isOpen: false,
      timeSelect: "",
      histroyDate: [],
      new_time: "", //最新时间
      payList: {},
      parentOptions: {
        // 'backgroundColor': '#F8F9FA',
        title: {
          text: "母公司薪酬当年累计(万元)",
          x: "20",
          y: "20",
        },
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
          extraCssText: "border-radius:10px!important",
          padding: 0,
          formatter: (params) => {
            // console.log(params,'...vp')
            return `<div style='color:#fff' class='tooltips'>
               <p class='tooltip-title'>${
                 this.list[params[0].dataIndex].name
               }</p>
               <p class='tooltip-line'>当年累计(万元)：${
                 this.$toT(this.list[params[0].dataIndex].year_change_pay)
               }</p>
               <p class='tooltip-line'>同比：${
                 this.list[params[0].dataIndex].year_change_pay_yo_y > 0
                   ? "+"
                   : ""
               }
               ${(
                 this.list[params[0].dataIndex].year_change_pay_yo_y * 100
               ).toFixed(2)}% </p>
             </div>`;
          },
        },
        grid: {
          top: "15%",
          left: "3%",
          right: "2%",
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
              textStyle: {
                color: "#929292", //坐标值得具体的颜色
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // name: '总资产',
            // interval: 300,
            splitNumber:10,
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
            name: "总资产（万元）",
            type: "line",
            showSymbol: false,
            lineStyle: {
              color: "#363FC8",
            },
            data: [],
            areaStyle: {
              opacity: 0.5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: "#D1D8FB",
                },
                {
                  offset: 0,
                  color: "#8F9FFF",
                },
              ]),
            },
          },
        ],
      },
      haOptions: {
        // 'backgroundColor': '#F8F9FA',
        title: {
          text: "子公司薪酬当年累计(万元)",
          x: "20",
          y: "20",
        },
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
          extraCssText: "border-radius:10px!important",
          padding: 0,
          formatter: (params) => {
            // console.log(params,'...params')
            return `<div style='color:#fff' class='tooltips'>
               <p class='tooltip-title'>${
                 this.hList[params[0].dataIndex].name
               }</p>
              <p class='tooltip-line'>当年累计(万元)：${
                this.$toT(this.hList[params[0].dataIndex].year_change_pay)
              }</p>
               <p class='tooltip-line'>同比：
               ${
                 this.hList[params[0].dataIndex].year_change_pay_yo_y > 0
                   ? "+"
                   : ""
               }
               ${(
                 this.hList[params[0].dataIndex].year_change_pay_yo_y * 100
               ).toFixed(2)}%</p>
             </div>`;
          },
        },
        grid: {
          top: "15%",
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
              textStyle: {
                color: "#929292", //坐标值得具体的颜色
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // name: '总资产',
            // interval: 300,
            splitNumber:10,
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
            name: "总资产（万元）",
            type: "line",
            showSymbol: false,
            // animation:false,
            // animationDelay:function(idx){
            //   return idx*50
            // },
            lineStyle: {
              color: "#363FC8",
            },
            data: [],
            areaStyle: {
              opacity: 0.5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: "#D1D8FB",
                },
                {
                  offset: 0,
                  color: "#8F9FFF",
                },
              ]),
            },
          },
        ],
      },
      list: [],
      hList: [],
      childOptions: {
        color: ["#678DF7", "#B34BFC", "#F05A59", "#FD9C34", "#544BFC"],
        legend: {
          bottom: "10",
          selectedMode:false,
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(153,153,153,0.7)",
          borderColor: "transparent",
          textStyle: {
            color: "#fff",
          },
          extraCssText: "border-radius:10px!important",
          padding: 0,
          formatter: (params) => {
            // console.log(params,'...pp1')
            return `<div class='tooltips'>
            <p class='tooltip-title'>${params.data.name}</p>
            <p class='tooltip-line'>本月发生(万元)：${this.$toT(params.data.value)}</p>
            <p class='tooltip-line'>环比：${params.data.month_change_pay_mo_m}</p>
            </div>`;
          },
        },
        series: [
          {
            type: "pie",
            radius: [50, 180],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              // borderRadius: 8,
            },
            data: [],
          },
        ],
      },
      childList: [],
      parentsOptions: {
        color: [
          "#80a4f9",
          "#fc9d3a",
          "#219124",
          "#fb6168",
          "#cc6efd",
          "#F23A39",
          "#B34BFC",
          "#A7C736",
          "#FFAA77",
          "cyan",
          "#DA10FE",
          "#16A65F",
          "#F05A59",
          "#544BFC",
          "red",
        ],
        legend: {
          bottom: "20",
          left: "15",
          itemGap: 15,
          selectedMode:false,
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(153,153,153,0.7)",
          borderColor: "transparent",
          textStyle: {
            color: "#fff",
          },
          extraCssText: "border-radius:10px!important",
          padding: 0,
          formatter: (params) => {
            // console.log(params,'..pppaa')
            return `<div class='tooltips'>
            <p class='tooltip-title'>${params.data.name}</p>
            <p class='tooltip-line'>本月发生(万元)：${this.$toT(params.data.value)}</p>
            <p class='tooltip-line'>环比：${params.data.month_change_pay_mo_m}</p>
            </div>`;
          },
        },
        series: [
          {
            type: "pie",
            radius: [0, 89],
            selectedMode: "single",
            selectedOffset: 5,
            label: {
              position: "inner",
              fontSize: 14,
              color: "#fff",
            },
            labelLine: {
              show: false,
            },
            data: [],
            itemStyle:{
              normal:{
                color:function(params){
                  let colorList=['#5c89ff','#fb9d3c']
                  return colorList[params.dataIndex]
                }
              }
            }// 内圈的颜色
          },
          {
            type: "pie",
            radius: [90, 130],
            center: ["50%", "50%"],
            selectedMode: "single",
            selectedOffset: 5,
            // roseType: 'area',
            emphasis: { focus: "none" },
            scaleSize: 20,
            scale: true,
            itemStyle: {
              // borderRadius: 8,
            },
            data: [],
            itemStyle:{
              normal:{
                color:function(params){
                  let colorList=['#49a84b','#fa6665','#feb149','#c96bfd','#8076fe','#ff905f','#9c31c2','#b9d34a','#fec972','#755ef6','#52d9a4','#86aafa','#7ed9f9']
                  return colorList[params.dataIndex]
                }
              }
            } // 外圈的颜色
          },
        ],
      },
      parentsList: [],
      parentsListN: [],
      parentModel: false,
      parentColumns: [
        {
          name: "机构名称",
          key: "name",
        },
        {
          name: "本月发生（万元)",
          key: "month_change_pay",
        },
        {
          name: "环比",
          key: "month_change_pay_mo_m",
        },
        {
          name: "全年累计（万元）",
          key: "year_change_pay",
        },
        {
          name: "同比",
          key: "year_change_pay_yo_y",
        },
      ],
      parentData: [],
      childModel: false,
      childColumns: [
        {
          name: "机构名称",
          key: "name",
        },
        {
          name: "本月发生（万元)",
          key: "month_change_pay",
        },
        {
          name: "环比",
          key: "month_change_pay_mo_m",
        },
        {
          name: "全年累计（万元）",
          key: "year_change_pay",
        },
        {
          name: "同比",
          key: "year_change_pay_yo_y",
        },
      ],
      childData: [],
      pType:'',
      cType:''
    }
  },
  created(){
    this.getPayDetail();
    this.getPayDetailTime();
    this.getPayDetailMa();
    this.getPayDetailChild();
    this.getPayDetailMaLink();
    this.getPayDetailChildLink();
  },
  methods:{
    moment,
    // 母公司趋势
    getPayDetailMaLink(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
        type:this.pType
      };
      // console.log(params.type,'...type')
      this.parentOptions.xAxis[0].data=[]
      this.parentOptions.series[0].data=[]
      llgtfoo
        .getPayDetailMaLink(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.list = res.data;
            this.parentOptions.xAxis[0].data = res.data.map(
              (item) => item.name
            );
            this.parentOptions.series[0].data = res.data.map(
              (item) => item.year_change_pay
            );
          }
        })
    },
    // 子公司趋势
    getPayDetailChildLink(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
        type:this.cType
      };
      // console.log(params.type,'...type')
      this.haOptions.xAxis[0].data = []
      this.haOptions.series[0].data=[]
      llgtfoo
        .getPayDetailChildLink(params)
        .then((res) => {
          // console.log(res, "子公司趋势");
          if (res.ret_code === 0) {
            this.hList = res.data;
            this.haOptions.xAxis[0].data = res.data.map((item) => item.name);
            this.haOptions.series[0].data = res.data.map(
              (item) => item.year_change_pay
            );
          }
        })
    },
    // 薪酬情况
    getPayDetail(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getPayDetail(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.new_time = res.data.time;
            this.payList = res.data;
          }
        })
    },
    // 子公司饼图分布
    getPayDetailChild(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getPayDetailChild(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.childList = res.data.filter((item) => {
              item.value = item.month_change_pay;
              item.month_change_pay_mo_m =`${item.month_change_pay_mo_m > 0 ? '+' : ''}${(item.month_change_pay_mo_m * 100).toFixed(2)}%`
                // item.month_change_pay_mo_m > 0
                //   ? "+"
                //   : "" + (item.month_change_pay_mo_m * 100).toFixed(2) + "%";
              item.year_change_pay_yo_y =`${ item.year_change_pay_yo_y > 0?'+':''}${ (item.year_change_pay_yo_y * 100).toFixed(2)}%`
                // item.year_change_pay_yo_y > 0
                //   ? "+"
                //   : "" + (item.year_change_pay_yo_y * 100).toFixed(2) + "%";
              return item.name !== "子公司合计";
            });
            this.childOptions.series[0].data = this.childList;
            this.childData = res.data;
            // console.log(this.childData,'...this.childData')
            this.childData.forEach(el=>{
              el.month_change_pay=this.$toT(el.month_change_pay)
              el.year_change_pay=this.$toT(el.year_change_pay)
            })
          }
        })
    },
    // 母公司饼图分布
    getPayDetailMa(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getPayDetailMa(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.parentsListN = res.data.filter((item) => {
              item.value = item.month_change_pay;
              return item.name === "公司总部" || item.name === "分支机构";
            });
            this.parentsOptions.series[0].data = this.parentsListN;
            this.parentsList = res.data.filter((item) => {
              item.value = item.month_change_pay;
              item.month_change_pay_mo_m = `${item.month_change_pay_mo_m>0?'+':''}${(item.month_change_pay_mo_m * 100).toFixed(2)}%`
                // (item.month_change_pay_mo_m * 100).toFixed(2) + "%";
              item.year_change_pay_yo_y =`${item.year_change_pay_yo_y>0?'+':''}${(item.year_change_pay_yo_y * 100).toFixed(2)}%`
                // (item.year_change_pay_yo_y * 100).toFixed(2) + "%";
              return (
                item.name !== "公司总部" &&
                item.name !== "分支机构" &&
                item.name !== "母公司合计"
              );
            });
            this.parentsOptions.series[1].data = this.parentsList;
            this.parentData = res.data;
            this.parentData.forEach(el=>{
              el.month_change_pay=this.$toT(el.month_change_pay)
              el.year_change_pay=this.$toT(el.year_change_pay)
            })
          }
        })
    },
    //获取时间列表
    getPayDetailTime(){
      llgtfoo
        .getPayDetailTime()
        .then((res) => {
          if (res.ret_code === 0) {
            this.histroyDate = res.data;
            this.timeSelect = this.histroyDate.length > 0 && this.histroyDate[0];
          }
        })
    },
    //母公司点击回调
    parentChange({ data }){
      this.pType=data.type
      this.getPayDetailMaLink();
      this.parentOptions.title.text = data.name +'薪酬当年累计（万元）';

    },
    //子公司点击回调
    childChange({ data }){
      this.cType=data.type
      this.getPayDetailChildLink();
      this.haOptions.title.text = data.name +'薪酬当年累计（万元）';
    },
    //日期改变
    confrim(time){
      this.timeSelect=time
      this.getPayDetail();
      this.getPayDetailMa();
      this.getPayDetailChild();
      this.getPayDetailMaLink();
      this.getPayDetailChildLink();
    },
    changeParentModel(val){
      this.parentModel=val
    },
    changeChildModel(val){
      this.childModel=val
    }
  }
};
</script>

<style lang="scss" scoped>
.section-2 {
  margin-top: 20px;
  position: relative;
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
  .date-line {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #969696;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
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
  .content-main {
    width: 100%;
    margin-top: 15px;
    border-radius: 10px;
    box-sizing: border-box;
    // padding: 20px;
    .trend {
      background: #fff;
      //   height: 1196px;
      border-radius: 10px;
      padding: 5px 10px;
      padding-bottom: 30px;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        margin-top: 20px;
        > p {
          margin: 0;
          font-size: 18px;
          // font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bolder;
          color: #2f2f2f;
        }
        > img {
          cursor: pointer;
        }
      }
      .card-line {
        // max-width: 1663px;
        // max-width: calc(100vw - 256px);
        height: 500px;
        display: flex;
        > div {
          border-radius: 10px;
          border: 1px solid #e2e2e2;
        }
        .left {
          flex: none;
          width: 770px;
        }
        .right {
          margin-left: 20px;
          flex: 1;
        }
      }
    }
    .card {
      display: flex;
      align-items: center;
      > li {
        background: #ffffff;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        flex: 1;
        &:first-of-type {
          margin-right: 20px;
        }
        > img {
          margin-right: 50px;
        }
        .data {
          p {
            margin: 0;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #6d6d6d;
            line-height: 30px;
            text-align: center;
            span {
              &.n1 {
                color: #ff1054;
              }
              &.n2 {
                color: #16a65f;
              }
            }
            span {
              &:first-of-type {
                font-size: 24px;
                font-family: DIN-Medium, DIN;
                font-weight: bolder;
                color: #2f2f2f;
              }
              &:last-of-type {
                font-size: 24px;
                font-family: DIN-Medium, DIN;
                font-weight: 500;
                margin-left: 10px;
              }
            }
          }
        }
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
