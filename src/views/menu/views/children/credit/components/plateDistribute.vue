<template>
  <div class="section-1">
    <!-- 头部 -->
    <div class="main-head">
      <div class="title">股票质押业务<span class="dataFrom">数据来源: 证券金融部</span></div>
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
    <div class="content-main">
      <div class="chartsCon">
        <div class="left">
          <echart-common :options="pieOptions"></echart-common>
          <a-tooltip placement="bottom">
            <template #title>
              <span>股票质押规模在沪市主板和深圳主板的分布状况</span>
            </template>
            <a-icon type="question-circle" class="iconCir"></a-icon>
          </a-tooltip>
        </div>
        <div class="right">
          <echart-common :options="pieOptions1"></echart-common>
          <a-tooltip placement="bottom">
            <template #title>
              <span>
                统计所有股票质押客户的担保物价值与其股票质押债务之间的比例
              </span>
            </template>
            <a-icon type="question-circle" class="iconCir"></a-icon>
          </a-tooltip>
        </div>
        <div class="carousel">
          <div class="title">低于平仓线140%的客户
          <a-tooltip placement="bottom">
            <template #title>
              <span>
                统计所有股票质押客户的担保物价值与其股票质押债务之间的比例小于140%的客户
              </span>
            </template>
            <a-icon type="question-circle" class="iconCir"></a-icon>
          </a-tooltip>
          </div>
          <a-carousel arrows :dots="false">
          <!-- 左箭头 -->
            <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left:10px;z-index:1">
              <img src="@/assets/imgs/creditImg/left.png" alt />
            </div>
          <!-- 右箭头 -->
            <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right:10px">
              <img src="@/assets/imgs/creditImg/right.png" alt />
            </div>
          <!-- 轮播内容 -->
          <div class="itemCon" v-for="(item,key) in carouselList" :key="key">
            <div class="items" v-for="(item1,i) in item" :key="i">
              <div class="itemL">
                <div class="nameCon">
                  <span>{{item1.branch_name}}</span>
                  <span>
                    <img class="imgCon" src="@/assets/imgs/creditImg/name.png" alt />
                    {{item1.client_name}}
                  </span>
                </div>
                <div class="dgeCon">
                  <span>
                    <img class="imgCon" src="@/assets/imgs/creditImg/pledge.png" alt />
                    质押标的:{{item1.pledge}}
                  </span>
                  <span>
                    <img class="imgCon" src="@/assets/imgs/creditImg/rate.png" alt />
                    履约保障比:{{(item1.grantee*100).toFixed(2)+'%'}}
                  </span>
                </div>
                <div class="valCon">
                  <span>
                    <img class="imgCon" src="@/assets/imgs/creditImg/money.png" alt />
                    金额(万元): {{item1.value}}
                  </span>
                  <span class="tags">违约</span>
                </div>
              </div>
            </div>
          </div>
        </a-carousel>
        </div>
      </div>
      <!-- <div class="line"></div> -->
      <!-- 轮播图 -->
      <!-- <div class="carousel">
        <div class="title">低于平仓线140%的客户</div>
        <a-carousel arrows :dots="false">
            <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left:10px;z-index:1">
              <img src="@/assets/imgs/creditImg/left.png" alt />
            </div>
            <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right:10px">
              <img src="@/assets/imgs/creditImg/right.png" alt />
            </div>
          <div class="itemCon" v-for="(item,key) in carouselList" :key="key">
            <div class="items" v-for="(item1,i) in item" :key="i">
              <div class="itemL">
                <div class="nameCon">
                  <span>{{item1.branch_name}}</span>
                  <span>
                    <img class="imgCon" src="@/assets/imgs/creditImg/name.png" alt />
                    {{item1.client_name}}
                  </span>
                </div>
                <div class="dgeCon">
                  <span>
                    <img class="imgCon" src="@/assets/imgs/creditImg/pledge.png" alt />
                    质押标的:{{item1.pledge}}
                  </span>
                  <span>
                    <img class="imgCon" src="@/assets/imgs/creditImg/rate.png" alt />
                    履约保障比:{{(item1.grantee*100).toFixed(2)+'%'}}
                  </span>
                </div>
                <div class="valCon">
                  <span>
                    <img class="imgCon" src="@/assets/imgs/creditImg/money.png" alt />
                    金额(万元): {{item1.value}}
                  </span>
                  <span class="tags">违约</span>
                </div>
              </div>
            </div>
          </div>
        </a-carousel>
      </div> -->
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import * as api from "../api.js";
import datePicker from '@/components/datePicker/index.vue';
import moment from 'moment'

export default {
  components:{
    datePicker
  },
  data(){
    return{
      new_date: "",
      timeSelect: "",
      isOpen: false,
      histroyDate: [],
      pieOptions: {
        title: {
          text: "板块分布",
          x: "center"
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
            return `<div style='color:#fff' class='tooltips'>
                  <p class='tooltip-title'>${
                    this.pieList[params.dataIndex].name
                  }</p>
                   <p class='tooltip-line'>剩余本金(万元):${
                     this.$toT(params.value)
                   }</p>
                    <p class='tooltip-line'>所占比例:${
                      params.percent+'%'
                      }</p>
             </div>`;
          }
        },
        legend: {
          right: "1.5%",
          y: "50%",
          orient: "vertical",
           selectedMode:false,

        },
        grid: {
          top: "40%",
          left: "3%",
          right: "4%",
          bottom: "5%",
          containLabel: true
        },
        series: [
          {
            type: "pie",
            radius: ["38%", "70%"],
            center: ["38%", "60%"],
            avoidLabelOverlap: false,
            // hoverAnimation: false,
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
      pieTotal: 0,
      pieList: [],
      pieOptions1: {
        title: {
          text: "股票质押履约保证比",
          x: "center"
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
            return `<div style='color:#fff' class='tooltips'>
                 <p class='tooltip-title'>${
                   this.pieList1[params.dataIndex].name
                 }</p>
                   <p class='tooltip-line'>剩余本金(万元):${
                     this.$toT(params.value)
                   }</p>
                      <p class='tooltip-line'>所占比例:${
                        params.percent+'%'
                      }</p>
             </div>`;
          }
        },
        legend: {
          right: "1.5%",
          y: "50%",
          orient: "vertical",
          data: ["140%以下", "140%至200%", "200%至300%",'300%以上'],
          selectedMode:false,
        },
        grid: {
          top: "40%",
          left: "3%",
          right: "4%",
          bottom: "5%",
          containLabel: true
        },
        series: [
          {
            type: "pie",
            radius: ["38%", "70%"],
            center: ["38%", "60%"],
            avoidLabelOverlap: false,
            // hoverAnimation: false,
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
      pieList1: [],
      pieTotal1: 0,
      // 平仓操作情况
      carouselList: []
    }
  },
  created(){
    this.getPlateDistributeData(); // 股票质押业务：板块分布
    this.getPledgeShareData(); // 股票质押履约保证比
    this.getpledgeShareHistoryTime(); // 获取股票质押业务历史时间
    this.getLowClosePositionDetail(); // 低于平成线140%的客户
  },
  methods:{
    moment,
    // 日期改变
    confrim(time){
      this.timeSelect=time
      // 日期变化重新获取数据
      this.getPlateDistributeData(); // 股票质押业务：板块分布
      this.getPledgeShareData(); // 股票质押履约保证比
      this.getLowClosePositionDetail(); // 低于平成线140%的客户
    },
    // 股票质押业务：板块分布
    getPlateDistributeData(){
      this.pieList = [];
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ""
      };
      api.getPlateDistributeData(params).then(res => {
        if (res.ret_code == 0) {
          this.new_date = res.data.date;
          res.data.data.forEach(el => {
            this.pieList.push({
              value: el.value,
              name: el.classify
            });
          });
          this.pieOptions.series[0].data = this.pieList;
          this.pieTotal = this.pieList.reduce(function(a, b) {
            return a.value + b.value;
          });
        }
      });
    },
    // 股票质押履约保证比
    getPledgeShareData(){
      this.pieList1 = [];
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ""
      };
      api.getPledgeShareData(params).then(res => {
        let arr=["140%以下", "140%至200%", "200%至300%",'300%以上']
        if (res.ret_code == 0) {
          arr.forEach((item,i)=>{
            res.data.forEach(el => {
              if(item==el.classify){
                this.pieList1.push({
                name: el.classify,
                value: el.value
              });
              }
            });
          })
          this.pieOptions1.series[0].data = this.pieList1;
          this.pieTotal1 = this.pieList1.reduce(function(a, b) {
            return a.value + b.value;
          });
        }
      });
    },
    // 获取股票质押业务历史时间
    getpledgeShareHistoryTime(){
      api
        .getpledgeShareHistoryTime()
        .then(res => {
          if (res.ret_code == 0) {
            this.histroyDate = res.data;
            this.timeSelect = this.histroyDate.length > 0 && this.histroyDate[0];
          }
        })
    },
    // 低于平成线140%的客户
    getLowClosePositionDetail(){
      this.carouselList = [];
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ""
      };
      api.getLowClosePositionDetail(params).then(res => {
        if (res.ret_code == 0) {
          let list = res.data;
          list.forEach(el => {
            el.value = this.$toT(el.value);
          });
          let divItem = [];
          let len = list.length / 2;
          for (let i = 0; i < len; i++) {
            let itemList = [];
            for (let j = i * 2; j < i * 2 + 2; j++) {
              if (list[j]) {
                itemList = [...itemList, list[j]];
              } else {
                itemList = [...itemList];
              }
            }
            if (itemList.length > 0) {
              divItem = [itemList,...divItem];
            }
          }
          this.carouselList = divItem;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.section-1 {
  margin-bottom: 20px;
  width: 100%;
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
        font-family: PingFangSC-Regular, PingFang SC;
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
  .content-main {
    height: 415px;
    padding: 20px;
    margin-top: 15px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    .chartsCon {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100%;
      .left {
        flex: 1;
        height: 100%;
        .leftChart {
          width: 50%;
          height: 100%;
          margin: 0 auto;
        }
        .iconCir{
          left: 50%;
          transform: translate(270%);
        }
      }
      .right {
        height: 100%;
        flex: 1;
        .iconCir{
          left: 50%;
          transform: translate(550%);
        }
      }
      >div{
        position: relative;
        border-right: 1px solid #e3e3e3;
        &:last-child{
          border-right: none;
        }
        .iconCir{
          position: absolute;
          top: 5px;
          font-size: 16px;
        }
      }
      .carousel{
        flex: none;
        width: 500px;
        height: 100%;
        .iconCir{
          margin-left: 2px;
        }
      }
    }
    .line {
      height: 1px;
      background: #ccc;
      margin: 20px 0;
    }
    /deep/ .carousel {
      .title {
        font-weight: 600;
        font-size: 18px;
        color: #2f2f2f;
        text-align: center;
        margin-bottom: 30px;
      }
      .slick-list {
        .itemCon {
          // width: 100%;
          // margin: 0 52px;
            // display: flex !important;
            // justify-content: space-between;
          .items {
            display: inline-block;
            // flex: 1;
            width: 100%;
            // max-width: 503px;
            margin:0 20px 0 5px;
            .itemL {
              border: 1px solid #ccc;
              padding: 20px;
              margin-bottom: 20px;

              .nameCon,
              .dgeCon,
              .valCon {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                .imgCon {
                  display: inline-block;
                  // vertical-align: text-bottom;
                  margin-right: 5px;
                  margin-bottom: 3px;
                }
              }
              .valCon {
                height: 24px;
                .tags {
                  height: 23px;
                  line-height: 20px;
                  padding: 0px 10px;
                  color: #f28291;
                  background-color: #fdf0f1;
                  border: 1px solid #f6a2a1;
                  border-radius: 15px;
                }
              }
            }
          }
          // .items:nth-child(3) {
          //   margin-right: 0;
          // }
        }
      }
      .ant-carousel {
        .slick-slider {
          .custom-slick-arrow {
            text-align: center;
            // background-color: pink;
            // overflow: hidden;
          }
          .slick-list {
            width: 100%;
            margin: 0 auto;
          }
        }
        .slick-slide{
          >div{
            padding: 0 45px;
          }
        }
      }
    }
  }
}
</style>