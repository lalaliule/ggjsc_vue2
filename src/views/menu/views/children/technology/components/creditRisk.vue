<template>
  <div class="section-3">
    <div class="title">信用风险<span class="dataFrom">数据来源: 资产管理部</span></div>
    <div class="content-main">
      <div class="date-title">
        <span class="date">数据日期：<span>{{ new_time }}</span></span>
        <month-picker 
            :histroyDate="histroyDate"
            :timeSel="timeSelect"
            @getTime="confrim" 
          ></month-picker>
      </div>
      <div class="section">
        <div class="header">违约债券总体情况</div>
        <div class="line-main">
          <div class="left">
            <div class="card-top">
              <ul>
                <li>
                  <p>{{ MonCorporateNum.xtpj_corporate&&$toT(MonCorporateNum.xtpj_corporate) }}</p>
                  <p>本月新增违约债券</p>
                </li>
                <li>
                  <p>{{ MonCorporateNum.corporate_add&&$toT(MonCorporateNum.corporate_add) }}</p>
                  <p>本月下调评级债券</p>
                </li>
              </ul>
            </div>
            <div class="card-bottom">
              <ul>
                <li v-for="(item, index) in breakList" :key="index">
                  <div class="left">
                    <p class="line1">
                      <span class="leftVal">
                        <img :src="imageList[index].icon" alt="" />
                        <span>
                          {{ imageList[index].name }}
                          <a-tooltip placement="rightTop" v-if="index === 1">
                            <template #title>
                              <span>仅显示下调至AA以下债券数量</span>
                            </template>
                            <!-- <QuestionCircleOutlined /> -->
                            <a-icon type="question-circle"></a-icon>
                          </a-tooltip>
                        </span>
                      </span>
                      <span :class="['value-yi',index==0?'yellowCo':'purCo']">{{ item.total_num&&$toT(item.total_num) }}万元</span>
                    </p>
                    <p class="line2">
                      债券数量：<span
                        >{{ $toT(item.corporate_num) }}只
                        <img
                          src="@/assets/imgs/technology/exp.png"
                          alt=""
                          @click="
                            item.corporate_num==0?'':showModel(imageList[index].name, item.corporate_num)
                          "
                      /></span>

                      涉及主体：<span :class="{ active: index === 2 }"
                        >{{ $toT(item.sjzt_corporate) }}家
                        <img
                          v-if="index === 2"
                          src="@/assets/imgs/technology/ic.png"
                          alt=""
                      /></span>
                      <i class="sunCo">合计面值</i>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="center">
            <div class="header">
              高风险债券持仓成本
              <a-tooltip placement="bottom">
                <template #title>
                  <span
                    >包含已违约债券以及主体发生违约或债券评级下调的债券</span
                  >
                </template>
                <!-- <QuestionCircleOutlined /> -->
                <a-icon type="question-circle"></a-icon>
              </a-tooltip>
            </div>
            <div class="pie">
              <echart-common :options="pieOptions1"></echart-common>
              <div class="data-card">
                <p>合计面值(万元)</p>
                <p>{{ rightList.total_count_value&&$toT(rightList.total_count_value) }}</p>
              </div>
            </div>
            <!-- <div class="pie">
              <echart-common :options="pieOptions2"></echart-common>
              <div class="data-card">
                <p>单一产品</p>
                <p>100.90亿元</p>
              </div>
            </div> -->
          </div>
          <div class="right">
            <div class="header">违约债券处理情况</div>
            <ul>
              <li v-for="(item, index) in highRisk" :key="index">
                <p>
                  <span style="font-weight:bolder">{{ item.name }}</span>
                  <!-- <span>违约原值: {{ $toT(item.original) }}</span> -->
                </p>
                <p class="flexCo">
                  <span>债券数量：{{ item.number }} 只</span>
                  <span>合计面值: {{ item.total }} 万元</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="line-divider"></div>
      <div class="section">
        <div class="header">违约高风险债券分析</div>
          <div v-if="riskText.length<=0">暂无数据</div>
        <div v-else>
           <ul class="list-header">
          <li>
            <span>债券名称</span>
            <span>跟踪情况及应对措施</span>
            <!-- <span>处置措施</span> -->
          </li>
        </ul>
        <ul class="text-list">
          <li v-for="(item, index) in riskText" :key="index">
            <div>{{ item.bond_name }}</div>
            <div>{{ item.follow_up }}</div>
            <!-- <div>{{ item.handle }}</div> -->
          </li>
        </ul>
        </div>
       
      </div>
      <div class="section" style="margin-top:20px">
        <div class="header">负面债券舆情</div>
        <div v-if="!llgList">暂无数据</div>
        <div v-else class="text-content">
          <div class="title">
            <p>
              <img src="@/assets/imgs/technology/1.png" alt="" />
              <span>产品名称：</span>
              <span>{{llgList.pro_name}}</span>
            </p>
            <p>
              <img src="@/assets/imgs/technology/2.png" alt="" />
              <span>发行人：</span>
              <span>{{llgList.is_suer}}</span>
            </p>
          </div>
          <p class="text text1">{{llgList.details}}</p>
        </div>
      </div>
    </div>
    <model-page :modelValue="childModel" :title="modelTitle" @changeModel="changeChildModel">
      <sample-table-y
        :columns="childColumns"
        :data="childData"
      ></sample-table-y>
    </model-page>
  </div>
</template>

<script>
import moment from "moment"
import * as llgtfoo from "../api.js"
import * as echarts from 'echarts'

export default {
  data(){
    return{
      count: 0,
      modelTitle: "",
      new_time: "",
      childModel: false,
      riskModelTwo: false,
      histroyDate: [],
      timeSelect: "",
      isOpen: false,
      highRisk: [],
      llgList:{},
      MonCorporateNum: {},
      imageList: [
        {
          name: "存量违约债券",
          icon: require("@/assets/imgs/technology/icon-1.png"),
        },
        // {
        //   name: '主体违约但未到期债券',
        //   icon: require('@/assets/imgs/technology/icon-2.png'),
        // },
        {
          name: "评级下调债券",
          icon: require("@/assets/imgs/technology/icon-3.png"),
        },
      ],
      breakList: [
        {
          value: "111.22",
          num: "11",
          home: "111",
        },
        // {
        //   value: '111.22',
        //   num: '11',
        //   home: '111',
        // },
        {
          value: "111.22",
          num: "11",
          home: "111",
        },
      ],
      pieOptions1: {
        color: ["#3653FF", "#08C4CF"],
        tooltip: {
          trigger: "item",
          show:true,
          backgroundColor: "rgba(153,153,153,0.7)",
          borderColor: "transparent",
          textStyle: {
            color: "#fff",
          },
          extraCssText: "border-radius:10px!important",
          padding: 0,
          formatter: (params) => {
            return `<div style='color:#fff' class='tooltips'>
               <p class='tooltip-title'>${params.data.name}面值(万元)</p>
               <p class='tooltip-line'>${this.$toT(
               params.data.value
                )}</p>
             </div>`;
          },
        },
        legend: {
          right: "10%",
          top: "0%",
          orient: "vertical",
          textStyle: {
            color: "#929292",
          },
          selectedMode:false,

        },
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["30%", "50%"],
            data: [],
            label: {
              position: "inner",
              color: "#fff",
              formatter: "{d}%",
            },
            labelLine: {
              show: false,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      rightList: {},
      pieList: [],
      pieOptions2: {
        color: ["#3653FF", "#08C4CF"],
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          right: "10%",
          top: "0%",
          textStyle: {
            color: "#929292",
          },
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            center: ["35%", "50%"],
            data: [
              { value: 1048, name: "主体违约或债券评级下调" },
              { value: 735, name: "已违约债券" },
            ],
            label: {
              formatter: "{d}%",
              position: "inner",
              color: "#fff",
            },
            labelLine: {
              show: false,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      riskText: [],
      childColumns:[],
      childColumns1: [
        {
          name: "债券名称",
          key: "bond_name",
        },
        {
          name: "违约日期",
          key: "default_date",
        },
        {
          name: "主体",
          key: "subject",
        },
        {
          name: "面值（万元）",
          key: "value",
        },
      ],
      childColumns2:[
        {
          name:'债券名称',
          key:'bond_name'
        },
        {
          name:'下调日期',
          key:'adjust_date'
        },
        {
          name:'下调前评级',
          key:'grade_before'
        },
        {
          name:'下调后评级',
          key:'grade_after'
        },
        {
          name:'面值（万元）',
          key:'value'
        },
        {
          name:'下调原因',
          key:'reason'
        },
      ],
      childData: [],
    }
  },
  created(){
    this.getCreditRiskHistory()
    this.getBreakAllDetail()
    this.getHighRiskCBData()
    this.getHighRiskWYZQData()
    this.getPassiveBondsData()
  },
  methods:{
    moment,
    //显示弹窗
    showModel(title,type) {
      this.childModel = true;
      this.modelTitle = title;
      if (title === "存量违约债券") {
       this.getNewBreakAllTable(type)
      } else if (title === "评级下调债券") {
       this.getXTZQTable(type)
      }
    },
    getPassiveBondsData(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getPassiveBondsData(params)
        .then((res) => {
          if (res.ret_code === 0) {
              // this.riskText=res.data
              this.llgList = res.data.length >0 && res.data[0]
          }
        })
    },
    //列表
    getHighRiskWYZQData(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getHighRiskWYZQData(params)
        .then((res) => {
          if (res.ret_code === 0) {
              this.riskText=res.data
          }
        })
    },
    getNewBreakAllTable(type){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
        type,
      };
      llgtfoo
        .getNewBreakAllTable(params)
        .then((res) => {
          if (res.ret_code === 0) {
            if (res.ret_code === 0) {
               this.childColumns=this.childColumns1
               this.childData = res.data
               this.childData.forEach(el=>{
                 el.value=this.$toT(el.value)
               })
            }
          }
        })
    },
    getXTZQTable (type){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
        type,
      };
      llgtfoo
        .getXTZQTable(params)
        .then((res) => {
          if (res.ret_code === 0) {
            if (res.ret_code === 0) {
               this.childColumns=this.childColumns2
               this.childData = res.data
               this.childData.forEach(el=>{
                 el.value=this.$toT(el.value)
               })
            }
          }
        })
    },
    // 违约债券总体情况
    getBreakAllDetail(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getBreakAllDetail(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.new_time = res.data.new_date.substring(
              0,
              res.data.new_date.indexOf("月") + 1
            );
            this.MonCorporateNum = res.data.MonCorporateNum;
            this.breakList = res.data.dataList;
          }
        })
    },
    // 高风险持仓成本与违约债券处理情况
    getHighRiskCBData(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getHighRiskCBData(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.rightList = res.data;
            this.pieList = [
              {
                name: "集合产品",
                value: res.data.all,
              },
              {
                name: "单一产品",
                value: res.data.one,
              },
            ];
            this.pieOptions1.series[0].data = this.pieList;
            this.highRisk = [
              {
                name: "本月已处置",
                number: this.$toT(res.data.mon_zqvalue),
                total: this.$toT(res.data.mon_count_value),
              },
              {
                name: "全年累计已处置",
                number: this.$toT(res.data.year_zqvalue),
                total: this.$toT(res.data.year_count_value),
              },
            ];
          }
        })
    },
    //获取时间列表
    getCreditRiskHistory(){
      llgtfoo
        .getCreditRiskHistory()
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
      this.getBreakAllDetail();
      this.getHighRiskCBData();

      this.getPassiveBondsData()
      this.getHighRiskWYZQData()
    },
    changeChildModel(val){
      this.childModel=val
    }
  },
};
</script>

<style lang="scss" scoped>
.section-3 {
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
    // height: 1560px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    .line-divider {
      width: 100%;
      height: 1px;
      background: #e2e2e2;
      opacity: 0.5;
      margin: 20px 0;
    }
    .section {
      width: 100%;
      .text-content {
        margin-top: 10px;
        background: #f8f9fa;
        border-radius: 12px;
        padding: 20px;
        > p {
          margin: 0;
        }
        p.text1 {
          margin-top: 10px;
          &::before {
            content: "";
            width: 20px;
            height: 20px;
            position: absolute;
            top: 2px;
            left: -3px;
            background: url("~@/assets/imgs/technology/3.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        > p.text {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2f2f2f;
          line-height: 28px;
          text-indent: 25px;
          position: relative;
        }
        .title {
          display: flex;
          align-items: center;
          margin-left: 0;
          p {
            display: flex;
            align-items: center;
            margin: 0;
            margin-right: 20px;
            > img {
              width: 16px;
              height: 16px;
              margin-right: 10px;
            }
            > span {
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #2f2f2f;
              &:last-of-type {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: bolder;
                color: #2f2f2f;
              }
            }
          }
        }
      }
      .header {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bolder;
        color: #2f2f2f;
      }
      .line-main {
        height: 360px;
        margin-top: 15px;
        display: flex;
        width: 100%;
        >div{
          flex: 1;
        }
        > .left {
          height: 100%;
          flex: 2;
          max-width: 682px;
          min-width: 585px;
          .card-bottom {
            ul {
              li {
                margin-top: 15px;
                background: #f8f9fa;
                border-radius: 10px;
                width: 100%;
                height: 115px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                > .left {
                  flex: 1;
                  display: flex;
                  // align-items: center;
                  flex-direction: column;
                  justify-content: center;
                  .line1 {
                    display: flex;
                    justify-content: space-between;
                    .leftVal{
                      > span {
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: bolder;
                        color: #313131;
                        margin-left: 20px;
                      }
                    }
                    .value-yi{
                      font-size: 24px;
                      font-family: PingFangSC-Medium, PingFang SC;
                      font-weight: 500;
                    }
                    .yellowCo{
                      color: #ff8356;
                    }
                    .purCo{
                      color: #ad6eff;
                    }
                    
                  }
                  .line2 {
                    position: relative;
                    white-space: nowrap;
                    font-size: 16px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #6c6c6c;
                    > span {
                      font-weight: bolder;
                      font-size: 16px;
                      font-family: PingFangSC-Medium, PingFang SC;
                      color: #313131;
                      display: flex;
                      align-items: center;
                      &:first-of-type {
                        margin-right: 10px;
                        color: #3653ff;
                      }
                      &.active {
                        color: #3653ff;
                      }
                      > img {
                        margin-left: 10px;
                        cursor: pointer;
                      }
                    }
                    .sunCo{
                      position: absolute;
                      right: 0;
                      font-style: normal;
                    }
                  }
                  p {
                    display: flex;
                    align-items: center;
                  }
                }
                
              }
            }
          }
          .card-top {
            > ul {
              display: flex;
              li {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                flex: 1;
                height: 96px;
                background: #ffc6b8;
                border-radius: 10px;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #5b1200;
                p {
                  margin: 0;
                  line-height: 35px;
                }
                &:last-of-type {
                  margin-left: 20px;
                  background: #c3f0d7;
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #013d1b;
                }
              }
            }
          }
        }
        .center {
          margin-left: 15px;
          height: 100%;
          flex: 1;
          max-width: 470px;
          min-width: 320px;
          border-radius: 10px;
          border: 1px solid rgba(226, 226, 226, 0.5);
          padding: 10px 5px 10px 5px;
          display: flex;
          flex-direction: column;
          .pie {
            width: 100%;
            height: 100%;
            position: relative;
            .data-card {
              position: absolute;
              top: 50%;
              right: 3%;
              transform: translateY(-50%);
              p {
                text-align: right;
                margin:0;
                &:first-of-type {
                  font-size: 18px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 500;
                  color: #2f2f2f;
                }
                &:last-of-type {
                  font-size: 18px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #2f2f2f;
                }
              }
            }
          }
        }
        > .right {
          flex: 2;
          height: 100%;
          // width: 459px;
          max-width: 460px;
          min-width: 350px;
          border-radius: 10px;
          border: 1px solid rgba(226, 226, 226, 0.5);
          padding: 10px;
          margin-left: 15px;
          > ul {
            li {
              margin-top: 20px;
              height: 125px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;
              background: #a0d5ff;
              border-radius: 10px;
              &:nth-of-type(2) {
                background: #c3f0d7;
              }
              p {
                display: flex;
                width: 100%;
                white-space: nowrap;
                span {
                  display: inline-block;
                  flex: 1;
                  font-size: 16px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #2f2f2f;
                  padding-left: 20px;
                }
              }
              .flexCo{
                display: flex;
                flex-wrap: wrap;
              }
            }
          }
        }
      }
      .list-header {
        margin: 0;
        margin-top: 20px;

        li {
          display: flex;
          align-items: center;
          height: 40px;
          background: #f4f4f4;
          border: 1px solid #ededed;
          span {
            text-align: center;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #6c6c6c;
            line-height: 40px;
            &:nth-of-type(1) {
              width: 300px;

              border-right: 1px solid #ededed;
            }
            &:nth-of-type(2) {
              border-right: 1px solid #ededed;
              flex: 4;
            }
            &:nth-of-type(3) {
              width: 300px;
            }
          }
        }
      }
      .text-list {
        margin: 0;
        li {
          display: flex;
          align-items: center;
          height: 100%;
          border: 1px solid #ededed;
          &:nth-of-type(even) {
            background: #f0f3f9;
          }
          > div {
            padding: 10px 30px;
            box-sizing: border-box;
            margin: 0;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #2f2f2f;
            &:nth-of-type(1) {
              width: 300px;
              text-align: center;
              height: 100%;
            }
            &:nth-of-type(2) {
              border-left: 1px solid #ededed;
              border-right: 1px solid #ededed;
              flex: 4;
            }
            &:nth-of-type(3) {
              width: 300px;
            }
          }
        }
      }
    }
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    .date-title {
      position: absolute;
      z-index: 999;
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
