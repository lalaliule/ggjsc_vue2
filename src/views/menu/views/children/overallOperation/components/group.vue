<template>
  <div class="section-2">
    <div class="title">集团资产情况<span class="dataFrom">数据来源: 计划财务部</span></div>
    <div class="content-main">
      <div class="tab-right">
        <tab-toggle :change="tabChange" :tab="['年度', '季度']" :currentIndex="current"></tab-toggle>
      </div>
      <div class="section" v-if="current === 0">
        <div class="left">
          <div class="date-line">
            <span class="date">数据日期：<span>{{ leftYearDate }}</span></span>
            <span class="goSelect" @click="isOpen_y = true">查看历史</span>
            <div class="date-year" v-if="isOpen_y">
              <div class="date-year-main">
                <div class="header-date">
                  <a-button
                    type="text"
                    @click="prev"
                    :disabled="prevDisable || histroyDateList.length < 12"
                  >
                    <a-icon type="left"></a-icon>
                  </a-button>
                  <span>{{ timeSelect_y }}</span>
                  <a-button type="text" @click="next" :disabled="nextDisable">
                    <a-icon type="right"></a-icon>
                  </a-button>
                </div>
                <ul class="date-content">
                  <li
                    v-for="(item, index) in histroyDate_year"
                    :key="item"
                    @click="selectedYear(item, index)"
                  >
                    <span :class="{ active: timeSelect_y === item }">{{
                      item
                    }}</span>
                  </li>
                </ul>
              </div>
              <div class="date-footer-box">
                <span style="color:#000">{{ timeSelect_y }}</span>
                <div class="button-box">
                  <a-button
                    type="primary"
                    shape="round"
                    ghost
                    @click="currtentMonth_y"
                  >
                    最新
                  </a-button>
                  <a-button type="primary" shape="round" @click="confrim_y">
                    确定
                  </a-button>
                </div>
              </div>
            </div>

          </div>
          <ul>
            <li class="title">
              <span>指标</span>
              <span>数值({{ leftYearDate }})</span>
              <!-- 2021831更改不显示排名 -->
              <!-- <span>排名</span> -->
            </li>
            <li class="line" v-for="(item, index) in leftList" :key="index">
              <span>{{ tab[index] }}</span>
              <span>{{ $toT(item.value) }}</span>
              <!-- <span>{{ item.rank }}</span> -->
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="tab-line">
            <ul>
              <li
                :class="{ active: currentTab === index }"
                v-for="(item, index) in tab"
                :key="index"
                @click="listChange(index, item)"
              >
                {{ item }}
              </li>
              <img
                @click="quarterModel = true"
                src="@/assets/imgs/overallOperation/biaodan.png"
                alt=""
              />
            </ul>
          </div>
          <div class="assets">
            <echart-common :options="yearOptions"></echart-common>
          </div>
        </div>
      </div>
      <div class="section" v-show="current != 0">
        <div class="left">
          <div class="date-line">
            <span class="date">数据日期：<span>{{ leftQuarterDate }}</span></span>
            <month-picker 
            :histroyDate="histroyDate_q"
            :timeSel="timeSelect_q"
            @getTime="confrim_q" 
          ></month-picker>
          </div>
          <ul>
            <li class="title">
              <span>指标</span>
              <span>数值({{ leftQuarterDate }})</span>
            </li>
            <li class="line" v-for="(item, index) in leftListQ" :key="index">
              <span>{{ tab[index] }}</span>
              <span>{{ $toT(item.value) }}</span>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="tab-line">
            <ul>
              <li
                :class="{ active: currentTab === index }"
                v-for="(item, index) in tab"
                :key="index"
                @click="listChange(index, item)"
              >
                {{ item }}
              </li>
              <img
                @click="monthModel = true"
                src="@/assets/imgs/overallOperation/biaodan.png"
                alt=""
              />
            </ul>
          </div>
          <div class="assets">
            <echart-common :options="quarterOptions"></echart-common>
          </div>
        </div>
      </div>
    </div>
    <!-- 年度 -->
    <model-page :modelValue="quarterModel" 
      @changeModel="changeQuarterModel" 
      :title="'集团'+quarterName+'情况'">
      <sample-table-x
        :columns="quarterColumns"
        :data="quarterData"
      ></sample-table-x>
    </model-page>
    <!-- 季度 -->
    <model-page :modelValue="monthModel" 
      @changeModel="changeMonthModel"
      :title="'集团'+quarterName2+'情况'">
      <sample-table-x
        :columns="monthColumns"
        :data="monthData"
      ></sample-table-x>
    </model-page>
  </div>
</template>

<script>
import * as echarts from "echarts";
import * as llgtfoo from "../api.js";
import moment from "moment";
export default {
  data(){
    return{
      currentYear: 0,
      timeSelect_q: null,
      histroyDate_q: [],
      new_time_q: "", //最新时间
      isOpen_q: false,
      histroyDate_year: [],
      timeSelect_y: "",
      histroyDate_y: [],
      new_time_y: "", //最新时间
      isOpen_y: false,
      histroyDateList: [],
      current: 1,
      currentTab: 0,
      currentTabName: "总资产（万元）",
      tab: [
        "总资产（万元）",
        "净资产（万元）",
        "营业收入（万元）",
        "净利润（万元）",
      ],
      leftList: [],
      leftListQ: [],
      leftYearDate: "",
      leftQuarterDate: "",
      yearList: [],
      quarterList: [],
      yearOptions: {
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
            // console.log(params,'..pp')
            return `<div style='color:#fff'>
               <p class='tooltip-title'>${
                // state.yearList[params[0].dataIndex].oc_date
                params[0].axisValue
               }</p>
               <p class='tooltip-line'>${this.currentTabName}：${this.$toT(
              // state.yearList[params[0].dataIndex].value
              params[0].value
            )}</p>
               <p class='tooltip-line'>同比：${
                //  state.yearList[params[0].dataIndex].hb
                params[1].value
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
            // name: '排名',
            // interval: 5,
            inverse: true,
            min: 1,
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "总资产（万元）",
            type: "pictorialBar",
            label: {
              normal: {
                show: false,
              },
            },
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
                      color: "#bf90ef", // 0% 处的颜色
                    },
                    {
                      offset: 0,
                      color: "#a969ec", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                }, //渐变颜色
              },
            },
            symbol: "path://M150 50 L130 130 L170 130  Z",
            barWidth: "40%",
            data: [],
          },
          {
            // name: "排名",
            name: "同比",
            type: "line",
            yAxisIndex: 1,
            showSymbol: false,
            symbolSize: 20,
            symbol: `image://${require("@/assets/imgs/overallOperation/symbal.png")}`,
            lineStyle: {
              color: "#FD7C50",
            },
            data: [],
          },
        ],
      },
      quarterOptions: {
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
                this.quarterList&&this.quarterList[params[0].dataIndex].oc_date
               }</p>
               <p class='tooltip-line'>${this.currentTabName}：${this.$toT(
              this.quarterList[params[0].dataIndex].value
            )}</p>
               <p class='tooltip-line'>环比：${
                 this.quarterList[params[0].dataIndex].hb
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
        ],
        series: [
          {
            name: "总资产（万元）",
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
          // {
          //   lineStyle: {
          //     color: "red",
          //   },
          //   type: "line",
          //   data: [],
          // },
        ],
      },
      quarterModel: false,
      monthModel: false,
      // quarterColumns: ["指标", "总资产（万元）", "排名"], // 2021831修改年度时为同比
      quarterColumns: ["指标", "总资产（万元）", "同比"],
      quarterData: [], //表格
      monthColumns: ["日期", "总资产（万元）", "环比"],
      monthData: [],
      currentIndex: 0,
      totalIndex: 0,
      prevDisable: false,
      nextDisable: true,
      quarterName:'总资产',
      quarterName2:'总资产',
    }
  },
  mounted(){
    // 2021924改为优先显示季度
    this.getSeaTotalValue()
    this.getSeaFiveValue('01')
    // getYearjtValue();
    // getYearjtValueList("01");
    this.getCompanyHistorySeaList();
    this.getCompanyHistoryYearList();
    window.addEventListener("click", this.closeDateTip);
  },
  beforeDestroy(){
    window.removeEventListener("click", this.closeDateTip);
  },
  methods:{
    moment,
    prev(){
      this.currentIndex = this.currentIndex + 1;
      this.nextDisable = false;
      this.histroyDate_year = [
        ...this.histroyDateList.slice(
          this.currentIndex * 12,
          (this.currentIndex + 1) * 12
        ),
      ].reverse();
      if (this.currentIndex + 1 === this.totalIndex) {
        this.prevDisable = true;
        this.nextDisable = false;
      }
    },
    next(){
      this.prevDisable = false;
      this.currentIndex = this.currentIndex - 1;
      this.histroyDate_year = [
        ...this.histroyDateList.slice(
          this.currentIndex * 12,
          (this.currentIndex + 1) * 12
        ),
      ].reverse();
      if (this.currentIndex === 0) {
        this.prevDisable = false;
        this.nextDisable = true;
      }
    },
    selectedYear(date, index){
      this.currentYear = index;
      this.timeSelect_y = date;
    },
    closeDateTip(e){
      const year = document.querySelector(".date-year");
      const cal = document.querySelector(".ant-calendar-picker-container");
      const root = document.querySelector(".goSelect");

      let seM=e.target.className!='ant-calendar-month-panel-year-select-content'
      let seY=e.target.className!='ant-calendar-year-panel-year'

      let seYZ=e.target.className!='ant-calendar-year-panel-decade-select-content'
      let seYZS=e.target.className!='ant-calendar-decade-panel-decade'
      // console.log(e.target.className,'..e.target.className')
      if (cal && e.target.className !== root.className) {
        if (!cal.contains(e.target)&&seM&&seY&&seYZ&&seYZS) {
          this.isOpen_q = false;
          this.isOpen_y = false;
        }
      }
      if (year && e.target.className !== root.className) {
        if (!year.contains(e.target)) {
          this.isOpen_q = false;
          this.isOpen_y = false;
        }
      }
    },
    //集团资产情况年度（左侧）
    getYearjtValue(){
      const params = {
        time: this.timeSelect_y,
      };
      llgtfoo
        .getYearjtValue(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.leftList = res.data.data;
            this.leftYearDate = res.data.date.substring(0, 5);
          }
        })
    },
    //集团资产情况年度（右侧）
    getYearjtValueList(type){
      const params = {
        time: this.timeSelect_y,
        type,
      };
      llgtfoo
        .getYearjtValueList(params)
        .then((res) => {
          res.data.data=res.data.data?res.data.data:[] // 判断是否有值
          if (res.ret_code === 0) {
            this.yearList = [];
            this.quarterData = [];
            this.quarterData.push(res.data.data.map((item) => item.oc_date));
            this.quarterData.push(
            res.data.data.map((item) => this.$toT(item.value))
            );
            // this.quarterData.push(res.data.data.map((item) => item.rank));
            this.quarterData.push(res.data.data.map((item) => item.hb));
            this.yearList = res.data.data;

            this.yearOptions.xAxis[0].data = res.data.data.map(
              (item) => item.oc_date
            );
            this.yearOptions.series[0].data = res.data.data.map(
              (item) => item.value
            );
            this.yearOptions.series[1].data = res.data.data.map((item) =>
              // item.rank.substring(0, item.rank.indexOf("/"))
              item.hb
            );
          }
        })
    },
    //集团资产情况季度（左侧）
    getSeaTotalValue(){
      const params = {
        time: this.timeSelect_q
          ? moment(this.timeSelect_q).format("YYYYMM")
          : "",
      };
      llgtfoo
        .getSeaTotalValue(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.leftListQ = res.data.data;
            this.leftQuarterDate = res.data.date;
          }
        })
    },
    //获取时间列表 (季度)
    getCompanyHistorySeaList(){
      llgtfoo
        .getCompanyHistorySeaList()
        .then((res) => {
          if (res.ret_code === 0) {
            this.histroyDate_q = res.data;
            this.timeSelect_q =
              this.histroyDate_q.length > 0 && this.histroyDate_q[0];
          }
        })
    },
    //获取时间列表 (年度)
    getCompanyHistoryYearList(){
      llgtfoo
        .getCompanyHistoryYearList()
        .then((res) => {
          if (res.ret_code === 0) {
            this.histroyDateList = res.data;
            this.totalIndex = Math.ceil(this.histroyDateList.length / 12);
            // console.log(this.totalIndex)
            this.histroyDate_year = [
              ...this.histroyDateList.slice(
                this.currentIndex * 12,
                (this.currentIndex + 1) * 12
              ),
            ].reverse();
            // this.histroyDate_year = [...this.histroyDateList.slice(this.currentIndex,12)].reverse();
            this.histroyDate_y = res.data;
            this.timeSelect_y =
              this.histroyDate_y.length > 0 && this.histroyDate_y[0];
          }
        })
    },
    //集团资产情况季度（右侧）
    getSeaFiveValue(type){
      const params = {
        time: this.timeSelect_q
          ? moment(this.timeSelect_q).format("YYYYMM")
          : "",
        type,
      };
      llgtfoo
        .getSeaFiveValue(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.quarterList = [];
            this.monthData = [];
            this.quarterList = res.data.data;
            this.monthData.push(res.data.data.map((item) => item.oc_date));
            this.monthData.push(
              res.data.data.map((item) => this.$toT(item.value))
            );
            this.monthData.push(res.data.data.map((item) => item.hb));

            this.quarterOptions.xAxis[0].data = res.data.data.map(
              (item) => item.oc_date
            );
            this.quarterOptions.series[0].data = res.data.data.map(
              (item) => item.value
            );
            this.quarterOptions.series[1].data = res.data.data.map(
              (item) => item.value
            );
          }
        })
        .catch((err) => console.error(err));
    },
    tabChange(index){
      // 切换 年度 季度
      this.current = index;
      this.currentTab = 0;
      this.currentTabName = "总资产(万元)";
      if (index === 0) {
        this.getYearjtValue();
        this.getYearjtValueList("01");
        this.quarterColumns[1] = this.currentTabName;
      } else {
        this.getSeaTotalValue();
        this.getSeaFiveValue("01");
        this.monthColumns[1] = this.currentTabName;
      }
    },
    listChange(index, name){
      this.currentTab = index;
      this.currentTabName = name;
      if (this.current === 0) {
        this.getYearjtValueList(`0${index + 1}`);
        this.quarterColumns[1] = name;
         this.quarterName=name.split('（')[0]
      } else {
        this.getSeaFiveValue(`0${index + 1}`);
        this.monthColumns[1] = name;
        this.quarterName2=name.split('（')[0]
      }
    },
    //日期改变
    confrim_q(time){
      this.timeSelect_q=time

      this.getSeaTotalValue();
      this.getSeaFiveValue(`0${this.currentTab+1}`);
    },
    //清空
    // clear_q(){
    //   this.timeSelect_q = "";
    //   this.isOpen_q = false;
    //   this.getSeaTotalValue();
    //   this.getSeaFiveValue("01");
    // },
    // //最新时间
    // currtentMonth_q () {
    //   this.timeSelect_q =
    //   this.histroyDate_q.length > 0 && this.histroyDate_q[0];
    // },
    // //可选时间
    // disabledDate_q(current){
    //   return !(
    //     current &&
    //     this.histroyDate_q.includes(moment(current).format("YYYY-MM"))
    //   );
    // },
    //日期改变
    change_y(date, dateString){
      this.timeSelect_y = moment(date).format("YYYY");
    },
    //确定
    confrim_y(){
      if (this.timeSelect_y === "") {
        message.warning("请先选择日期！");
        return;
      }
      // console.log(this.current,this.currentTab,this.currentTabName,'...')
      this.isOpen_y = false;
      this.getYearjtValue();
      this.getYearjtValueList(`0${this.currentTab+1}`);
    },
    //清空
    clear_y(){
      this.timeSelect_y = "";
      this.isOpen_y = false;
      getYearjtValue();
      getYearjtValueList("01");
    },
    //最新时间
    currtentMonth_y(){
      this.timeSelect_y =
        this.histroyDate_y.length > 0 && this.histroyDate_y[0];
      this.currentIndex = 0;
      this.histroyDate_year = [
        ...this.histroyDateList.slice(
          this.currentIndex * 12,
          (this.currentIndex + 1) * 12
        ),
      ].reverse();
    },
    //可选时间
    disabledDate_y(current){
      // console.log(current,'----------',state.histroyDate_y)
      // console.log( current && state.histroyDate_y.includes(moment(current).format("YYYY")))
      return true;
    },
    changeQuarterModel(val){
      this.quarterModel=val
    },
    changeMonthModel(val){
      this.monthModel=val
    }
  },
};
</script>

<style lang="scss" scoped>
.section-2 {
  position: relative;
  margin-top: 20px;
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
    .tab-right {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      // right: 10px;
      left: 10px;
      top: 60px;
    }
    .section {
      height: 432px;
      display: flex;
      .date-year {
        .date-year-main {
          height: calc(100% - 40px);
          border-bottom: 1px solid #f0f0f0;
          margin-bottom: 5px;
          > .date-content {
            display: flex;
            flex-direction: row;
            width: 100%;
            margin: 0;
            flex-wrap: wrap;
            > li {
              width: 33.3%;
              height: 65px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #000;
              cursor: pointer;
              span {
                &.active {
                  background: #1890ff;
                  color: #fff;
                  padding: 2px 10px;
                  border-radius: 4px;
                }
              }
            }
          }
          .header-date {
            height: 40px;
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
          }
        }
        .date-footer-box{
          display: flex;
          justify-content: space-between;
        }
        .button-box {
          button {
            margin-left: 5px;
          }
        }
        padding: 0 10px;
        position: absolute;
        width: 350px;
        height: 350px;
        font-size: 14px;
        top: 95px;
        left: 135px;
        line-height: 1.5715;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #fff;
        border-radius: 4px;
        outline: none;
        box-shadow: 0 2px 8px rgba(24, 144, 255, 0.5);
      }
    }

    .left {
      flex: none;
      padding: 20px 10px;
      border-radius: 10px 0 0 10px;
      background: #fff;
      height: 100%;
      width: 600px;
      // margin-right: 10px;
      box-sizing: border-box;
      > ul {
        height: calc(100% - 60px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 60px;
        li {
          display: flex;
          align-content: center;
          span {
            flex: 1;
            text-align: center;
          }
          &.line {
            font-size: 16px;
            // font-family: PingFangSC-Medium, PingFang SC;
            color: #2f2f2f;
            height: 53px;
            background: url("~@/assets/imgs/overallOperation/list-bg.png")
              no-repeat;
            background-size: 100% 100%;
            line-height: 53px;
            span {
              &:first-of-type {
                font-weight: 400;
              }
              &:nth-of-type(2) {
                font-weight: bold;
              }
            }
          }
          &.title {
            font-size: 14px;
            // font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #929292;
          }
        }
      }
    }
    .right {
      padding: 10px;
      border-radius: 0 10px 10px 0;
      background: #fff;
      height: 100%;
      flex: 1;
      // max-width: 1083px;
      .tab-line {
        margin-top: 15px;
        margin-top: 60px;
        ul {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          cursor: pointer;
          > img {
            margin: 0 20px;
            // width: 24px;
            // height: 24px;
          }
          li {
            padding: 5px 10px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #979797;
            margin-left: 10px;
            &.active {
              font-size: 16px;
              // font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #3653ff;
              background: url("~@/assets/imgs/overallOperation/tab-bg.png")
                no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .assets {
        width: 100%;
        height: 300px;
      }
    }
  }
  .date-line {
    display: flex;
    font-size: 14px;
    // font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #969696;
    height: 50px;
    position: absolute;
    right: 10px;
    .date {
      font-size: 14px;
      // font-family: PingFangSC-Regular, PingFang SC;
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
        // font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #363fc8;
        cursor: pointer;
      }
    }
  }
}
</style>
<style>
.ant-calendar {
  width: 350px !important;
}
.ant-calendar-input-wrap {
  display: none !important;
}
</style>
