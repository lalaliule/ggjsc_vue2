<template>
  <div class="section-2">
    <div class="title">收入结构<span class="dataFrom">数据来源: 计划财务部</span></div>
    <div class="content-main">
      <div class="date-title">
        <span class="date">数据日期：<span>{{ new_time }}</span></span>
        <month-picker 
            :histroyDate="histroyDate"
            :timeSel="timeSelect"
            @getTime="confrim" 
          ></month-picker>
      </div>
      <div class="income-pie">
        <echart-common :options="pieOptions"></echart-common>
      </div>
      <div class="income-list">
        <ul class="header">
          <li>收入指标</li>
          <li>本年累计（万元）</li>
          <li>去年同期（万元）</li>
        </ul>
        <ul class="list">
          <li v-for="(item, index) in pieListN" :key="index">
            <div class="line">
              <span>{{ item.name }}</span>
              <span>{{ $toT(item.value) }}</span>
              <span>{{ $toT(item.oldyaer) }}</span>
            </div>
            <ul class="children" v-if="item.children.length > 0">
              <li v-for="(em, i) in item.children" :key="i">
                <span>{{ em.name }}</span>
                <span>{{ $toT(em.value) }}</span>
                <span>{{ $toT(em.oldyaer) }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import * as llgtfoo from "../api.js";
export default {
  data(){
    return{
      count: 0,
      histroyDate: [],
      riskModelTwo: false,
      timeSelect: "",
      isOpen: false,
      pieOptions: {
        // color: ['#678DF7', '#FD9C34', '#A7ECFF',
        //   '#0D8591', '#8421B0', '#F23A39   ', '#B34BF   C', '#A7C7   36', '#FFAA77',
        //   'cyan', '#DA10FE', '#16A65F',
        //   '#F05A59', '#544BFC', 'red'],
        legend: {
          bottom: "20",
          left: "15",
          itemGap: 15,
          show: false,
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(153,153,153,0.7)",
          borderColor: "transparent",
          textStyle: {
            color: "#fff",
          },
          extraCssText:'border-radius:10px!important',
          padding:0,
          formatter: (params) => {
            return `<div>
            <p class='tooltip-title'>${params.data.name}(万元)</p>
            <p class='tooltip-line'>本年累计：${this.$toT(
              params.data.value
            )}</p>
            <p class='tooltip-line'>去年同期：${this.$toT(
              params.data.oldyaer
            )}</p>
            </div>`;
          },
        },
        series: [
          {
            type: "pie",
            radius: [30, 99],
            center: ["50%", "50%"],
            label: {
              position: "inner",
              fontSize: 10,
              color: "#fff",
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
          {
            type: "pie",
            radius: [100, 180],
            center: ["50%", "50%"],
            label: {
              position: "inner",
              fontSize: 10,
              color: "#fff",
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      },
      pieListN: [
        {
          name: "手续费及佣金收入",
          value: "0",
          oldyaer: "0",
          itemStyle: {
            color: "#3653FF",
          },
          children: [
            {
              name: "管理员收入",
              value: "0",
              oldyaer: "0",
              itemStyle: {
                color: "#3653FF",
              },
            },
            {
              name: "业绩报酬收入",
              value: "0",
              oldyaer: "0",
              itemStyle: {
                color: "#3653FF",
              },
            },
            {
              name: "席位租金",
              value: "0",
              oldyaer: "0",
              itemStyle: {
                color: "#3653FF",
              },
            },
            {
              name: "其他",
              value: "0",
              oldyaer: "0",
              itemStyle: {
                color: "#3653FF",
              },
            },
          ],
        },
        {
          name: "投资收益",
          value: "0",
          oldyaer: "0",
          itemStyle: {
            color: "#08C4CF",
          },
          children: [
            {
              name: "分红收入",
              value: "0",
              oldyaer: "0",
              itemStyle: {
                color: "#08C4CF",
              },
            },
            {
              name: "差价收入",
              value: "0",
              oldyaer: "0",
              itemStyle: {
                color: "#08C4CF",
              },
            },
          ],
        },
        {
          name: "公允价值变动损益",
          value: "0",
          oldyaer: "0",
          itemStyle: {
            color: "#FF8356",
          },
          children: [
            {
              name: "公允价值变动损益",
              value: "0",
              oldyaer: "0",
              itemStyle: {
                color: "#FF8356",
              },
            },
          ],
        },
        {
          name: "合计",
          value: "0",
          oldyaer: "0",
          itemStyle: {
            color: "#FF8356",
          },
          children: [],
        },
      ],
      pieList: [],
      new_time: "",
    }
  },
  created(){
    this.getIncomeStructureTime();
    this.getIncomeStructure();
  },
  methods:{
    moment,
    // 收入结构
    getIncomeStructure(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getIncomeStructure(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.pieListN=[
              {
                name: "手续费及佣金收入",
                value: "0",
                oldyaer: "0",
                itemStyle: {
                  color: "#3653FF",
                },
                children: [
                  {
                    name: "管理员收入",
                    value: "0",
                    oldyaer: "0",
                    itemStyle: {
                      color: "#3653FF",
                    },
                  },
                  {
                    name: "业绩报酬收入",
                    value: "0",
                    oldyaer: "0",
                    itemStyle: {
                      color: "#3653FF",
                    },
                  },
                  {
                    name: "席位租金",
                    value: "0",
                    oldyaer: "0",
                    itemStyle: {
                      color: "#3653FF",
                    },
                  },
                  {
                    name: "其他",
                    value: "0",
                    oldyaer: "0",
                    itemStyle: {
                      color: "#3653FF",
                    },
                  },
                ],
              },
              {
                name: "投资收益",
                value: "0",
                oldyaer: "0",
                itemStyle: {
                  color: "#08C4CF",
                },
                children: [
                  {
                    name: "分红收入",
                    value: "0",
                    oldyaer: "0",
                    itemStyle: {
                      color: "#08C4CF",
                    },
                  },
                  {
                    name: "差价收入",
                    value: "0",
                    oldyaer: "0",
                    itemStyle: {
                      color: "#08C4CF",
                    },
                  },
                ],
              },
              {
                name: "公允价值变动损益",
                value: "0",
                oldyaer: "0",
                itemStyle: {
                  color: "#FF8356",
                },
                children: [
                  {
                    name: "公允价值变动损益",
                    value: "0",
                    oldyaer: "0",
                    itemStyle: {
                      color: "#FF8356",
                    },
                  },
                ],
              },
              {
                name: "合计",
                value: "0",
                oldyaer: "0",
                itemStyle: {
                  color: "#FF8356",
                },
                children: [],
              },
            ]
            this.pieList=[],
            // this.new_time = res.data.new_time;
            this.new_time =
              res.data.new_time
            // this.pieListN = res.data;
            res.data.list.forEach((ele) => {
              this.pieListN.forEach((item) => {
                if (ele.target_name === item.name) {
                  item.name = ele.target_name;
                  item.value = ele.income_year;
                  item.oldyaer = ele.income_last_year;
                }
                if (item.children && item.children.length > 0) {
                  item.children.forEach((ty) => {
                    if (ele.target_name === ty.name) {
                      ty.name = ele.target_name;
                      ty.value = ele.income_year;
                      ty.oldyaer = ele.income_last_year;
                    }
                  });
                }
              });
            });

            this.pieList = [...this.pieListN];

            const index = this.pieList.findIndex(
              (item) => item.name === "合计"
            );

            this.pieList.splice(index, 1);

            // console.log(this.pieList, index, "// 收入结构");
            this.pieOptions.series[1].data=[]
            this.pieList.forEach((item) => {
              this.pieOptions.series[1].data.push(...item.children);
            });

            this.pieOptions.series[0].data = this.pieList;
          }
        })
    },
    //获取时间列表
    getIncomeStructureTime(){
      llgtfoo
        .getIncomeStructureTime()
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
      this.getIncomeStructure();
    }
  },
};
</script>

<style lang="scss" scoped>
.section-2 {
  margin-bottom: 20px;
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
    height: 604px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px 10px;
    display: flex;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .income-pie {
      width: 550px;
      height: 100%;
    }
    .income-list {
      //   height: 460px;
      width: 980px;
      margin-right: 30px;
      border: 1px solid #eff0f5;
      ul {
        margin: 0;
      }
      > .list {
        width: 100%;
        li {
          .line {
            display: flex;
            align-items: center;
            height: 40px;
            background: #f5f6ff;
            span {
              flex: 1;
              text-align: center;
              font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bolder;
              color: #2f2f2f;
            }
          }
          .children {
            li {
              display: flex;
              align-items: center;
              border-bottom: 1px solid #eff0f5;
              background: #fff;
              height: 40px;
              span {
                box-sizing: border-box;
                text-align: center;
                display: inline-block;
                &:first-of-type {
                  text-align: center;
                  // padding-left: 150px;
                }
                width: 33.3%;
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #2f2f2f;
              }
            }
          }
        }
      }
      .header {
        display: flex;
        li {
          background: #f4f4f4;
          flex: 1;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #929292;
        }
      }
    }
    .date-title {
      position: absolute;
      z-index: 99999;
      top: -30px;
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
</style>
