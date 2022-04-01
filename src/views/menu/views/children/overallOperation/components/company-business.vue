<template>
  <div class="section-4">
    <div class="title">公司营业收入与行业对比<span class="dataFrom">数据来源: 协会系统</span></div>
    <div class="content-main">
      <div class="tab-right">
        <div class="date-line">
          <span class="date">数据日期：<span>{{ new_time }}</span></span>
          <month-picker 
            :histroyDate="histroyDate"
            :timeSel="timeSelect"
            @getTime="confrim" 
          ></month-picker>
        </div>
      </div>
      <div class="main-box">
        <div class="table-list">
          <ul
            v-if="
              companyList.industry_lsit && companyList.industry_lsit.length > 0
            "
          >
            <li class="title">
              <span>收入结构(万元)</span>
              <span>本公司收入</span>
              <span>行业均值</span>
              <span>行业最高值</span>
              <span>排名</span>
            </li>
            <li
              class="line"
              v-for="(item, index) in companyList.industry_lsit"
              :key="index"
            >
              <div class="list">
                <div class="n1">
                  {{ item.name }}
                  <img
                    v-if="item.children && item.children.length > 0"
                    :class="{ active: childrenShow }"
                    src="@/assets/imgs/overallOperation/xiala.png"
                    alt=""
                    @click="childrenShow = !childrenShow"
                  />
                </div>
                <div class="n2">
                  <span>{{ $toT(item.income) }}</span>
                  <div class="progress-bg">
                    <div
                      class="progress-value"
                      :style="{
                        width: `${
                          (Math.abs(Number(item.income)) * 100) /
                            companyList.income_max >
                          1
                            ? (Math.abs(Number(item.income)) * 100) /
                              companyList.income_max
                            : 1
                        }%`,
                      }"
                      :class="{
                        value1: String(item.income).indexOf('-')<0,
                        value2: String(item.income).indexOf('-')>=0,
                      }"
                    ></div>
                  </div>
                </div>
                <div class="n3">
                  <span>{{ $toT(item.income_avg) }}</span>
                  <div class="progress-bg">
                    <div
                      class="progress-value"
                      :style="{
                        width: `${
                          (Math.abs(Number(item.income_avg)) * 100) /
                            companyList.income_avg_max >
                          1
                            ? (Math.abs(Number(item.income_avg)) * 100) /
                              companyList.income_avg_max
                            : 1
                        }%`,
                      }"
                      :class="{
                        value1: String(item.income_avg).indexOf('-')<0,
                        value2: String(item.income_avg).indexOf('-')>=0,
                      }"
                    ></div>
                  </div>
                </div>
                <div class="n4">
                  <span>{{ $toT(item.income_max) }}</span>
                  <div class="progress-bg">
                    <div
                      class="progress-value"
                      :style="{
                        width: `${
                          (Math.abs(Number(item.income_max)) * 100) /
                            companyList.income_max_max >
                          1
                            ? (Math.abs(Number(item.income_max)) * 100) /
                              companyList.income_max_max
                            : 1
                        }%`,
                      }"
                      :class="{
                        value1: String(item.income_max).indexOf('-')<0,
                        value2: String(item.income_max).indexOf('-')>=0,
                      }"
                    ></div>
                  </div>
                </div>
                <div class="n5">
                  <span>{{ item.income_ranking }}</span>
                </div>
              </div>
              <transition name="sub-menu">
                <div
                  class="list-children"
                  v-if="
                    item.children && item.children.length > 0 && childrenShow
                  "
                >
                  <div class="list" v-for="(it, i) in item.children" :key="i">
                    <div class="n1">{{ it.name }}</div>
                    <div class="n2">
                      <span>{{ $toT(it.income) }}</span>
                      <div class="progress-bg">
                        <div
                          class="progress-value"
                          :style="{
                            width: `${
                              (Math.abs(Number(it.income)) * 100) /
                                companyList.income_max >
                              1
                                ? (Math.abs(Number(it.income)) * 100) /
                                  companyList.income_max
                                : 1
                            }%`,
                          }"
                          :class="{
                            value1: String(it.income).indexOf('-')<0,
                            value2: String(it.income).indexOf('-')>=0,
                          }"
                        ></div>
                      </div>
                    </div>
                    <div class="n3">
                      <span>{{ $toT(it.income_avg) }}</span>
                      <div class="progress-bg">
                        <div
                          class="progress-value"
                          :style="{
                            width: `${
                              (Math.abs(Number(it.income_avg)) * 100) /
                                companyList.income_avg_max >
                              1
                                ? (Math.abs(Number(it.income_avg)) * 100) /
                                  companyList.income_avg_max
                                : 1
                            }%`,
                          }"
                          :class="{
                            value1: String(it.income_avg).indexOf('-')<0,
                            value2: String(it.income_avg).indexOf('-')>=0,
                          }"
                        ></div>
                      </div>
                    </div>
                    <div class="n4">
                      <span>{{ $toT(it.income_max) }}</span>
                      <div class="progress-bg">
                        <div
                          class="progress-value"
                          :style="{
                            width: `${
                              (Math.abs(Number(it.income_max)) * 100) /
                                companyList.income_max_max >
                              1
                                ? (Math.abs(Number(it.income_max)) * 100) /
                                  companyList.income_max_max
                                : 1
                            }%`,
                          }"
                          :class="{
                            value1: String(it.income_max).indexOf('-')<0,
                            value2: String(it.income_max).indexOf('-')>=0,
                          }"
                        ></div>
                      </div>
                    </div>
                    <div class="n5">
                      <span>{{ it.income_ranking }}</span>
                      <!-- <span>/156</span> -->
                    </div>
                  </div>
                </div>
              </transition>
            </li>
          </ul>
        </div>
        <div class="trend">
          <div class="top">
            <span>历史走势</span>
            <div class="screening-items">
              <a-select
                v-model="value1"
                style="width: 180px;margin-right:20px"
                @change="selectChange"
                :getPopupContainer="triggerNode=>triggerNode.parentNode"
              >
                <a-select-option
                  :value="item.value"
                  v-for="(item, index) in screeningList1"
                  :key="index"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
              <div style="width: 140px;margin-right:20px">
              <a-select
                v-if="value1 === '00'"
                v-model="value2"
                style="width: 140px;margin-right:20px"
                @change="selectChange"
                :getPopupContainer="triggerNode=>triggerNode.parentNode"
              >
                <a-select-option
                  :value="item.value"
                  v-for="(item, index) in screeningList2"
                  :key="index"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select></div>
              <img
                @click="monthModel = true"
                src="@/assets/imgs/overallOperation/biaodan.png"
                alt=""
              />
            </div>
          </div>
          <div class="trend-line">
            <echart-common :options="options"></echart-common>
          </div>
        </div>
      </div>
    </div>
    <model-page :modelValue="monthModel" :title="modelTitle" @changeModel="changeMonthModelModel" >
      <sample-table-x
        :columns="monthColumns"
        :data="monthData"
      ></sample-table-x>
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
      new_time: "", //最新时间
      histroyDate: [],
      childrenShow: false,
      timeSelect: "",
      isOpen: false,
      modelTitle: "手续费及佣金收入（全部）",
      count: 0,
      companyList: [], //列表
      value1: "00",
      value2: "01",
      screeningList1: [
        {
          name: "手续费及佣金收入",
          value: "00",
        },
        {
          name: "利息净收入",
          value: "06",
        },
        {
          name: "投资收益",
          value: "07",
        },
        {
          name: "公允价值变动收益",
          value: "08",
        },
      ],
      screeningList2: [
        {
          name: "全部",
          value: "01",
        },
        {
          name: "经纪业务",
          value: "02",
        },
        {
          name: "投资银行业务",
          value: "03",
        },
        {
          name: "资产管理业务",
          value: "04",
        },
        {
          name: "投资咨询业务",
          value: "05",
        },
      ],
      options: {
        backgroundColor: "#F8F9FA",
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
            return `<div style='color:#fff'>
               <p class='tooltip-title'>${
                 this.histroyTrend[params[0].dataIndex].time_str
               }</p>
               <p class='tooltip-line'>本公司（万元）：${this.$toT(
                 this.histroyTrend[params[0].dataIndex].income
               )}</p>
               <p class='tooltip-line'>行业均值（万元）：${this.$toT(
                 this.histroyTrend[params[0].dataIndex].income_avg
               )}</p>
               <p class='tooltip-line'>行业最高值（万元）：${this.$toT(
                 this.histroyTrend[params[0].dataIndex].income_max
               )}</p>
               <p class='tooltip-line'>排名：${
                 this.histroyTrend[params[0].dataIndex].income_ranking
               }</p>
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
        legend: {
          left: "100",
          icon: "rect",
          top: "20",
          height: "10",
          selectedMode: false,
          data: ["本公司（万元）", "行业均值（万元）", "行业最高值（万元）"],
          formatter: function(parmas) {
            return parmas.replace("（万元）", "");
          },
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
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(243,244,245,1)",
              },
            },
          },
          {
            type: "value",
            // name: '总资产',
            // interval: 300,
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
            yAxisIndex: 1,
            name: "本公司（万元）",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: "#8CF5DC" },
                { offset: 0, color: "#05BEDC" },
              ]),
              barBorderRadius: 15,
            },
            type: "bar",
            barWidth: "15%",
            data: [],
          },
          {
            yAxisIndex: 1,
            name: "行业均值（万元）",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: "#DBB2FF" },
                { offset: 0, color: "#DC34E5"},
              ]),
              barBorderRadius: 15,
            },
            type: "bar",
            barWidth: "15%",
            data: [],
          },
          {
            yAxisIndex: 1,
            name: "行业最高值（万元）",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: "#FCAEC4" },
                { offset: 0, color: "#F87692" },
              ]),
              barBorderRadius: 15,
            },
            type: "bar",
            barWidth: "15%",
            data: [],
          },
        ],
      },
      monthModel: false,
      monthColumns: [
        "指标",
        "本公司（万元）",
        "行业均值（万元） ",
        "行业最高值（万元 ）",
        "排名",
      ],
      monthData: [], //表格
      histroyTrend: [],
    }
  },
  created(){
    this.getComInIndustryTime();
    this.getComInIndustry();
    this.getIndicators();
  },
  watch:{
    value1(newVal){
      if (newVal === "00") {
          this.value2 = "01";
          this.getIndicators();
        }
    }
  },
  methods:{
    moment,
    //获取时间列表
    getComInIndustryTime(){
      llgtfoo
        .getComInIndustryTime()
        .then((res) => {
          if (res.ret_code === 0) {
            this.histroyDate = res.data;
            this.timeSelect = this.histroyDate.length > 0 && this.histroyDate[0];
          }
        })
    },
    //公司营业收入与行业对比
    getComInIndustry(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getComInIndustry(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.companyList = res.data;
            this.new_time = res.data.new_time;
          }
        })
    },
    //历史趋势
    getIndicators(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
        type: this.value1 === "00" ? this.value2 : this.value1,
      };
      llgtfoo
        .getIndicators(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.options.xAxis[0].data = res.data.map((item) => item.time_str);
            this.options.series[0].data = res.data.map((item) => item.income);
            this.options.series[1].data = res.data.map(
              (item) => item.income_avg
            );
            this.options.series[2].data = res.data.map(
              (item) => item.income_max
            );
            this.histroyTrend = res.data;
            this.monthData = [];
            this.monthData.push(res.data.map((item) => item.time_str));
            this.monthData.push(res.data.map((item) => this.$toT(item.income)));
            this.monthData.push(res.data.map((item) => this.$toT(item.income_avg)));
            this.monthData.push(res.data.map((item) => this.$toT(item.income_max)));
            this.monthData.push(res.data.map((item) => item.income_ranking));
            // console.log(this.monthData,'...this.monthData')
          }
        })
    },
    //选择框改变
    selectChange(value){
      if (value === "01" || value === "00") {
        this.modelTitle = "手续费及佣金收入（全部）";
      } else {
        const obj1 = this.screeningList1.find((ele) => ele.value === value);
        const obj2 = this.screeningList2.find((ele) => ele.value === value);
         if(obj2 && parseInt(obj2.value) < 6){
            this.modelTitle = obj1 ? obj1.name : obj2 ? `手续费及佣金收入（${obj2.name}）` : ""; 
         }else {
           this.modelTitle = obj1 ? obj1.name : obj2 ? obj2.name : "";
         }
      }
      if(value !== "00"){
       this.getIndicators();
      }
    },
    //日期改变
    confrim(time){
      this.timeSelect=time
      this.getComInIndustry();
      this.getIndicators();
    },
    changeMonthModelModel(val){
      this.monthModel=val
    }
  },
};
</script>

<style lang="scss" scoped>
.sub-menu-enter-active,
.sub-menu-leave-active {
  transition: all 0.5s ease;
  max-height: 270px; /* 这里将最大高度设置为折叠元素不可能超越的高度 比如1000px */
  opacity: 1;
}
.sub-menu-to,
.sub-menu-leave-to {
  max-height: 270px;
  opacity: 1;
}
.sub-menu-enter-from,
.sub-menu-leave-to {
  opacity: 0;
  max-height: 0px;
}
.section-4 {
  margin-top: 20px;
  position: relative;
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
    // height: 1030px;
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
        top: 12px;
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
      justify-content: flex-end;
    }
    .main-box {
      .table-list {
        width: 100%;
        border-bottom: 1px solid #e2e2e2;
        margin-top: 10px;
        ul {
          li {
            &.title {
              display: flex;
              align-items: center;
              font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #2f2f2f;
              margin-bottom: 20px;
              span {
                flex: 3;
                padding-left: 20px;
                box-sizing: border-box;
                &:last-of-type {
                  flex: 1;
                }
              }
            }
            &.line {
              .list {
                display: flex;
                align-items: center;
                width: 100%;
                height: 48px;
                background: url("~@/assets/imgs/overallOperation/com-bg.png")
                  no-repeat;
                background-size: 100% 100%;
                margin-bottom: 20px;
                > div {
                  padding-left: 27px;
                  box-sizing: border-box;
                  flex: 3;
                  &:last-of-type {
                    flex: 1;
                  }
                  &.n1 {
                    font-size: 16px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #2f2f2f;
                    > img {
                      margin-left: 10px;
                      cursor: pointer;
                      transform: rotate(180deg);
                      transition: transform 0.5s linear;
                      &.active {
                        transform: rotate(0deg);
                        transition: transform 0.5s linear;
                      }
                    }
                  }
                  &.n3,
                  &.n2,
                  &.n4 {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: bold;
                    color: #2f2f2f;
                    .progress-value {
                      position: absolute;
                      top: 0;
                      left: 0;
                      border-radius: 10px;
                      height: 16px;
                      transition:all 2s;
                      &.value1 {
                        background: linear-gradient(
                          45deg,
                          #193bff 0%,
                          #7c9bff 100%
                        );
                      }
                      &.value2 {
                        background: linear-gradient(
                          45deg,
                          #ff8343 0%,
                          #ffcdb2 100%
                        );
                      }
                    }
                    .progress-bg {
                      position: relative;
                      margin-left: 20px;
                      height: 16px;
                      width: 100%;
                      border-radius: 10px;
                    }
                    > span {
                      display: inline-block;
                      height: 100%;
                      width: 200px;
                    }
                  }
                  &.n5 {
                    span {
                      &:first-of-type {
                        font-size: 16px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: bold;
                        color: #2f2f2f;
                      }
                      &:last-of-type {
                        font-size: 16px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 400;
                        color: #2f2f2f;
                      }
                    }
                  }
                }
              }
            }
            .list-children {
              overflow: hidden;
              .list {
                background: url("~@/assets/imgs/overallOperation/com-child.png")
                  no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
      .trend {
        width: 100%;
        // max-width: 1670px;
        height: 428px;
        padding: 20px 10px;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          > span {
            font-size: 16px;
            // font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bolder;
            color: #2f2f2f;
          }
          .screening-items {
            display: flex;
            align-items: center;
          }
        }
        .trend-line {
          margin-top: 10px;
          width: 100%;
          height: 370px;
        }
      }
    }
    @keyframes gressAnimate {
      0%{
        width: 0;
      }
      100%{
        width: 100%;
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
