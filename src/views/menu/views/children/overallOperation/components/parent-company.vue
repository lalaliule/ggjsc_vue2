<template>
  <div class="section-1">
    <div class="title">母公司资产情况<span class="dataFrom">数据来源: 计划财务部/协会系统</span></div>
    <div class="content-main">
      <div class="tab-right">
        <tab-toggle :change="tabChange" :tab="['季度', '月度']" :currentIndex="current"></tab-toggle>

        <div class="date-line" v-if="current == 0">
          <span class="date">数据日期：<span>{{ new_time_q }}</span> </span>
          <month-picker 
            :histroyDate="histroyDate_q"
            :timeSel="timeSelect_q"
            @getTime="change_q" 
          ></month-picker>
        </div>
        <div class="date-line" v-else>
          <span class="date">数据日期：<span>{{ new_time_m }}</span></span>
          <month-picker 
            :histroyDate="histroyDate_m"
            :timeSel="timeSelect_m"
            @getTime="change_m" 
          ></month-picker>
        </div>
      </div>
      <div class="card" v-if="current == 0">
        <ul>
          <li
            v-for="(item, index) in cardList"
            :key="index"
            :style="{
              'background-image': 'url(' + cardImages[index]['bg'] + ')',
            }"
            :class="{
              [`active${currentCardQuarter}`]:
                true && currentCardQuarter - 1 === index,
            }"
            @click="tabClickQuarter(index, item)"
          >
            <div class="line">
              <div class="name">
                <img :src="cardImages[index]['icon']" alt="" />
                {{ cardImages[index].name }}
              </div>
              <div class="name-value">{{ $toT(item.asset) }}</div>
            </div>
            <div class="line">
              <p>
                <span>排名</span>
                <span>{{ item.rank }}</span>
              </p>
            </div>
            <div class="line">
              <p>
                <span>市场份额</span>
                <span>{{ item.sharet_market }}</span>
              </p>
            </div>
          </li>
        </ul>
        <div class="line-chart" ref="quarterRef">
          <div class="model-show" @click="quarterModel = true">
            <img src="@/assets/imgs/overallOperation/biaodan.png" alt="" />
          </div>
          <echart-common :options="quarterOptions"></echart-common>
        </div>
      </div>
      <div class="card" v-else>
        <ul>
          <li
            v-for="(item, index) in cardListMonth"
            :key="index"
            :style="{
              'background-image': 'url(' + cardImages[index]['bg'] + ')',
            }"
            :class="{
              [`active${currentCardMonth}`]:
                true && currentCardMonth - 1 === index,
            }"
            @click="tabClickMonth(index, item.type)"
          >
            <div class="line">
              <div class="name">
                <img :src="cardImages[index]['icon']" alt="" />
                {{ cardImages[index].name }}
              </div>
              <div class="name-value">{{ $toT(item.asset) }}</div>
            </div>
            <div class="rate line">
              <p>
                <span>环比：</span>
                <span>{{ item.hb }}</span>
                <!-- v-if="item.hb.includes('-')" -->
                <img
                  v-if="item.hb.indexOf('-')>=0"
                  src="@/assets/imgs/overallOperation/down.png"
                  alt=""
                />
                <img
                  v-else
                  src="@/assets/imgs/overallOperation/ind.png"
                  alt=""
                />
              </p>
            </div>
          </li>
        </ul>
        <div class="line-chart">
          <div class="model-show" @click="monthModel = true">
            <img src="@/assets/imgs/overallOperation/biaodan.png" alt="" />
          </div>
          <echart-common :options="monthOptions"></echart-common>
        </div>
      </div>
    </div>

    <!-- 季度 -->
    <model-page :modelValue="quarterModel"
    @changeModel="changeQuarterModel" 
    :title="'母公司'+tableTitle+'情况'">
      <sample-table-x
        :columns="quarterColumns"
        :data="quarterData"
      ></sample-table-x>
    </model-page>
    <!-- 月度 -->
    <model-page :modelValue="monthModel" 
    @changeModel="changeMonthModel"
    :title="'母公司'+tableTitle2+'情况'">
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
    return {
      current: 1,
      quarterDate: "", //季度时间
      monthDate: "", //月度时间
      timeSelect_q: "",
      histroyDate_q: [],
      new_time_q: "", //最新时间

      timeSelect_m: "",
      histroyDate_m: [],
      new_time_m: "", //最新时间
      currentCardQuarter: 1,
      currentCardQuarterType: "01",
      currentCardQuarterName: "总资产（万元）",
      currentCardMonthName: "总资产（万元）",
      currentCardMonth: 1,
      currentCardMonthType: "01",
      cardImages: [
        {
          icon: require("@/assets/imgs/overallOperation/n-1.png"),
          bg: require("@/assets/imgs/overallOperation/1-1.png"),
          name: "总资产（万元）",
        },
        {
          icon: require("@/assets/imgs/overallOperation/n-2.png"),
          name: "净资产（万元）",
          bg: require("@/assets/imgs/overallOperation/1-2.png"),
        },
        {
          name: "营业收入（万元）",
          icon: require("@/assets/imgs/overallOperation/n-3.png"),
          bg: require("@/assets/imgs/overallOperation/1-3.png"),
        },
        {
          icon: require("@/assets/imgs/overallOperation/n-4.png"),
          name: "净利润（万元）",
          bg: require("@/assets/imgs/overallOperation/1-4.png"),
        },
      ],
      cardList: [], //季度
      cardListMonth: [], //月度
      quarterList: [],
      monthList: [],
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
                 this.quarterList[params[0].dataIndex].oc_date
               }</p>
               <p class='tooltip-line'>${
                 this.currentCardQuarterName
               }：${this.$toT(
              this.quarterList[params[0].dataIndex].value
            )}</p>
               <p class='tooltip-line'>排名：${
                 this.quarterList[params[0].dataIndex].rank
               }</p>
              
             </div>`;
          },
        },
        legend: {
          right: "140",
          top: "20",
          selectedMode: false,
          itemWidth: 40,
          data: [
            {
              name: "总资产（万元）",
              icon: "rect",
            },
            {
              name: "排名",
              icon: "roundRect",
              itemStyle: {
                borderWidth: 12,
                borderColor: "#F8F9FA",
              },
            },
          ],
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
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(243,244,245,1)",
              },
            },
          },
          {
            type: "value",
            inverse: true,
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "总资产（万元）",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: "#8F9FFF" },
                { offset: 0, color: "#363FC8" },
              ]),
            },
            type: "bar",
            barWidth: "20%",
            data: [],
          },
          {
            name: "排名",
            type: "line",
            yAxisIndex: 1,
            showSymbol: false,
            lineStyle: {
              color: "#363FC8",
            },
            data: [],
          },
        ],
      },
      monthOptions: {
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
                 this.monthList[params[0].dataIndex].oc_date
               }</p>
               <p class='tooltip-line'>${
                 this.currentCardMonthName
               }：${this.$toT(this.monthList[params[0].dataIndex].value)}</p>
               <p class='tooltip-line'>环比：${
                 this.monthList[params[0].dataIndex].rank
               }</p>
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
      quarterModel: false,
      monthModel: false,
      quarterColumns: ["日期", "总资产（万元）", "排名 ", "市场份额"],
      quarterData: [],
      monthColumns: ["日期", "总资产（万元）", "环比"],
      monthData: [],
      tableTitle:'总资产',
      tableTitle2:'总资产'
    }
  },
  created(){
    // 2021924改为优先展示月度
    // getEcManagedetailBySe();
    this.getEcManagedetail();
    this.getEcManagedetailByMon(this.currentCardMonthType);
    this.getMumHistorySeaList();
    this.getMumHistoryMonList()

  },
  methods:{
    moment,
    //获母公司资产详情（季度）
    getEcManagedetailBySe(){
      const params = {
        time: this.timeSelect_q
          ? moment(this.timeSelect_q).format("YYYYMM")
          : "",
      };
      llgtfoo
        .getEcManagedetailBySe(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.new_time_q = res.data.date;
            this.cardList = res.data.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //获取时间列表(季度)
    getMumHistorySeaList(){
      llgtfoo
        .getMumHistorySeaList()
        .then((res) => {
          if (res.ret_code === 0) {
            this.histroyDate_q = res.data;
            this.timeSelect_q =
              this.histroyDate_q.length > 0 && this.histroyDate_q[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获母公司资产详情（月度）
    getEcManagedetail(){
      const params = {
        time: this.timeSelect_m
          ? moment(this.timeSelect_m).format("YYYYMM")
          : "",
      };
      llgtfoo
        .getEcManagedetail(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.new_time_m = res.data.new_date.substring(
              0,
              res.data.new_date.indexOf("月") + 1
            );
            this.cardListMonth = res.data.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //获取时间列表(月度)
    getMumHistoryMonList(){
      llgtfoo
        .getMumHistoryMonList()
        .then((res) => {
          if (res.ret_code === 0) {
            this.histroyDate_m = res.data;
            this.timeSelect_m =
              this.histroyDate_m.length > 0 && this.histroyDate_m[0];
          }
        })
    },
    //获取季度折线图
    getSEDataOrderByRank(type){
      const params = {
        time: this.timeSelect_q
          ? moment(this.timeSelect_q).format("YYYYMM")
          : "",
        type,
      };
      llgtfoo
        .getSEDataOrderByRank(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.quarterList = res.data;
            this.quarterData = [];
            this.quarterData.push(res.data.map((item) => item.oc_date));
            this.quarterData.push(
              res.data.map((item) => this.$toT(item.value))
            );
            this.quarterData.push(res.data.map((item) => item.rank));
            this.quarterData.push(
              res.data.map((item) => (item.share_market * 100).toFixed(2) + "%")
            );
            this.quarterOptions.xAxis[0].data = res.data.map(
              (item) => item.oc_date
            );
            this.quarterOptions.series[0].data = res.data.map(
              (item) => item.value
            );

            this.quarterOptions.legend.data[0] = this.currentCardQuarterName;
            this.quarterOptions.series[0].name = this.currentCardQuarterName;
            this.quarterOptions.series[1].data = res.data.map((item) =>
              // (item.share_market * 100).toFixed(2)
              item.rank.substring(0, item.rank.indexOf("/"))
            );
          }
        })
        .catch((err) => console.error(err));
    },
    // 获取月度折线图
    getEcManagedetailByMon(type){
      const params = {
        time: this.timeSelect_m
          ? moment(this.timeSelect_m).format("YYYYMM")
          : "",
        type,
      };
      llgtfoo
        .getEcManagedetailByMon(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.monthList = res.data;
            this.monthData = [];
            this.monthData.push(res.data.map((item) => item.oc_date));
            this.monthData.push(
              res.data.map((item) => this.$toT(item.value))
            );
            this.monthData.push(res.data.map((item) => item.rank));
            this.monthOptions.xAxis[0].data = res.data.map(
              (item) => item.oc_date
            );
            this.monthOptions.xAxis[0].name = this.currentCardMonthName;
            this.monthOptions.series[0].data = res.data.map(
              (item) => item.value
            );
          }
        })
        .catch((err) => console.error(err));
    },
    //季度月度切换
    tabChange(index){
      this.current = index;
      if (index === 0) {
        this.getEcManagedetailBySe();
        this.getSEDataOrderByRank(this.currentCardQuarterType);
      } else {
        this.getEcManagedetail();
        this.getEcManagedetailByMon(this.currentCardMonthType);
      }
    },
    // 点击面板
    tabClickQuarter(index, item){
      this.currentCardQuarter = index + 1;
      this.currentCardQuarterType = item.type;
      this.getSEDataOrderByRank(item.type);
      this.currentCardQuarterName =
        this.cardImages[parseInt(item.type) - 1].name;
        switch(index){
          case 0:
            this.tableTitle='总资产'
            break;
            case 1:
               this.tableTitle='净资产'
              break;
              case 2:
                 this.tableTitle='营业收入'
                break;
                case 3:
                   this.tableTitle='净利润'
                  break;
        }
        this.quarterColumns[1]=this.tableTitle+'(万元)'
    },
    tabClickMonth(index, type){
      this.currentCardMonth = index + 1;
      this.getEcManagedetailByMon(type);
      this.currentCardMonthType = type;
      this.currentCardMonthName = this.cardImages[parseInt(type) - 1].name;
    switch(index){
          case 0:
            this.tableTitle2='总资产'
            break;
            case 1:
               this.tableTitle2='净资产'
              break;
              case 2:
                 this.tableTitle2='营业收入'
                break;
                case 3:
                   this.tableTitle2='净利润'
                  break;
        }
        this.monthColumns[1]=this.tableTitle2+'(万元)'
    },
    //日期改变
    change_q(time){
      this.timeSelect_q=time
      if (this.current === 0) {
        this.getEcManagedetailBySe();
        this.getSEDataOrderByRank(this.currentCardQuarterType);
      } else {
        this.getEcManagedetail();
        this.getEcManagedetailByMon(this.currentCardMonthType);
      }
    },
    change_m(time){
      this.timeSelect_m=time
      if (this.current === 0) {
        this.getEcManagedetailBySe();
        this.getSEDataOrderByRank(this.currentCardQuarterType);
      } else {
        this.getEcManagedetail();
        this.getEcManagedetailByMon(this.currentCardMonthType);
      }
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
.section-1 {
  .title {
    font-size: 18px;
    // font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bolder;
    color: #2f2f2f;
    margin-left: 10px;
  }
  .line-chart{
    width: 100%;
  }
  .content-main {
    // max-width: 1683px;
    margin-top: 15px;
    height: 720px;
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
      justify-content: space-between;
    }
    .card {
      width: 100%;
      margin-top: 10px;
      .line-chart {
        position: relative;
        width: 100%;
        height: 455px;
        .model-show {
          position: absolute;
          top: 20px;
          z-index: 9998;
          cursor: pointer;
          right: 50px;
        }
      }
      ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        li {
          flex: 25%;
          margin-right: 10px;
          max-width: 374px;
          height: 160px;
          cursor: pointer;
          border-radius: 25px;

          // background-image: url("../../../../../assets/imgs/overallOperation/1-1.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          box-sizing: border-box;
          padding: 15px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          &:last-child{
            margin-right: 0;
          }
          &.active1 {
            background-image: url(~@/assets/imgs/overallOperation/1-a.png)!important;
            box-shadow: 0px 8px 16px 0px rgba(255, 45, 45, 0.25);
          }
          &.active2 {
            background-image: url(~@/assets/imgs/overallOperation/2-a.png)!important;
            box-shadow: 0px 8px 16px 0px rgba(138,168,255,0.25);
          }
          &.active3 {
            background-image: url(~@/assets/imgs/overallOperation/3-a.png)!important;
            box-shadow: 0px 8px 16px 0px rgba(44, 211, 202, 0.25);
          }
          &.active4 {
            background-image: url(~@/assets/imgs/overallOperation/4-a.png)!important;
            box-shadow: 0px 8px 16px 0px rgba(181, 116, 245, 0.25);
          }
          &.active1,&.active2,&.active3,&.active4{
            .line{
              .name,.name-value{
                color: #fff;
              }
              p{
                span{
                  color: #fff;
                }
              }
              
            }
          }
          .rate {
            margin-bottom: 30px;
            > p {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              > img {
                margin-left: 10px;
              }
            }
          }
          .line {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name {
              font-weight: 500;
              display: flex;
              align-items: center;
              img {
                margin-right: 5px;
              }
            }
            .name-value {
              font-weight: 600;
            }
            .name,
            .name-value {
              font-size: 18px;
              font-family: PingFangSC-Medium, PingFang SC;
              color: #494949;
            }
            p {
              width: 100%;
              text-align: right;
              margin: 0;
              span {
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                color: #494949;
                &:first-of-type {
                  font-weight: 400;
                  // letter-spacing: 20px;
                }
                &:last-of-type {
                  margin-left: 10px;
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
