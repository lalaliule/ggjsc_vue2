<template>
  <div class="section-5">
    <div class="title">合规性风险</div>
    <div class="content-main">
      <div class="date-title">
        <span class="date">数据日期：<span>{{ new_date }}</span></span>
        <month-picker 
            :histroyDate="histroyDate"
            :timeSel="timeSelect"
            @getTime="confrim" 
          ></month-picker>
      </div>
      <div class="compliance-top">
        <div class="header">
          <p style='margin-left:0px'>日常工作</p>
        </div>
        <div class="header head_p">
          <p>工作内容</p>
          <p>工作数量</p>
          <p>情况说明</p>
        </div>
        <ul class="list">
          <li v-for="(item, index) in complianceList" :key="index">
            <div>{{ item.content }}</div>
            <div>{{ item.quantity }}</div>
            <div>
              {{ item.description }}
              <a-tooltip
                placement="topRight"
                :align="{ offset: [10, 0] }"
              >
                <template #title>
                  <span>{{ item.description }}</span>
                </template>
                <img src="@/assets/imgs/technology/exp.png" alt="" />
              </a-tooltip>
            </div>
          </li>
        </ul>
      </div>
      <div class="line-divider"></div>
      <div class="compliance-bottom">
        <div class="title">重点工作</div>
        <ul class="list">
          <li v-for='(item,index) in importantWork' :key='index'>
            <p>
              {{item.content}}
            </p>
            <div>
              {{item.description}}
            </div>
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
      timeSelect: "",
      isOpen: false,
      histroyDate: [],
      complianceList: [],
      new_date: "",
      importantWork:[]
    }
  },
  created(){
    this.getComplianceRiskHistory();
    this.getComplianceRiskData();
    this.getStressData();
  },
  methods:{
    getStressData(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getStressData(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.importantWork = res.data
          }
        })
    },
    getComplianceRiskData(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getComplianceRiskData(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.new_date = res.data.new_date;
            this.complianceList = res.data.data;
          }
        })
    },
    //时间
    getComplianceRiskHistory(){
      llgtfoo
        .getComplianceRiskHistory()
        .then((res) => {
          if (res.ret_code === 0) {
            // console.log(res, "-----");
            this.histroyDate = res.data;
            this.timeSelect = this.histroyDate.length > 0 && this.histroyDate[0];
          }
        })
    },
    //日期改变
    confrim(time){
      this.timeSelect=time
      this.getComplianceRiskData();
      this.getStressData();
    }
  },
};
</script>

<style lang="scss" scoped>
.section-5 {
  margin-top: 20px;
  &::after{
    content: '';
    position: fixed;
    display: block;
  }
  > .title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bolder;
    color: #2f2f2f;
    margin-left: 10px;
  }
  .content-main {
    .line-divider {
      width: 100%;
      height: 1px;
      background: #e2e2e2;
      opacity: 0.5;
      margin: 20px 0;
    }
    .compliance-top {
      > .list {
        li {
          display: flex;
          align-items: center;
          // min-height: 42px;
          padding: 10px 0;
          border-radius: 10px;
          border: 1px solid #efefef;
          margin-bottom: 20px;
          &:last-of-type {
            margin-bottom: 0;
          }
          > div {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            // font-weight: bold;
            color: #2f2f2f;

            &:nth-of-type(1) {
              flex: 1;
              box-sizing: border-box;
              padding-left: 50px;
              position: relative;
              word-break: break-all;
              &::before {
                content: "";
                position: absolute;
                width: 10px;
                height: 10px;
                background: #363fc8;
                top: 7px;
                left: 30px;
                border-radius: 50%;
              }
            }
            &:nth-of-type(2) {
              width: 200px;
              text-align: center;
            }
            &:nth-of-type(3) {
              flex-wrap: nowrap;
              white-space: nowrap;
              width: 650px;
              text-align: center;
              text-overflow: ellipsis;
              overflow: hidden;
              color: #3653ff;
              padding-right: 30px;
              position: relative;
              > img {
                position: absolute;
                right: 10px;
                top: 5px;
                cursor: pointer;
              }
            }
          }
        }
      }
      > .header {
        display: flex;
        align-items: center;
        p {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #2f2f2f;
          &:nth-of-type(1) {
            margin-left: 50px;
            flex: 1;
          }
          &:nth-of-type(2) {
            width: 200px;
            text-align: center;
          }
          &:nth-of-type(3) {
            text-align: center;
            width: 650px;
          }
        }
      }
      .head_p{
        background-color: #f4f4f4;
        margin-bottom: 20px;
        p{
          margin: 0;
          line-height: 40px;
          text-align: center;
        }
      }
    }
    .compliance-bottom {
      .title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bolder;
        color: #2f2f2f;
        margin-bottom: 10px;
      }
      > .list {
        li {
          height: 114px;
          border-radius: 10px;
          border: 1px solid #efefef;
          margin-bottom: 20px;
          padding: 20px 20px 20px 30px;
          > p {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bolder;
            color: #2f2f2f;
            position: relative;
            margin-bottom: 10px;
            &::before {
              content: "";
              width: 10px;
              height: 10px;
              background: #08c4cf;
              position: absolute;
                 top: 7px;
    left: -16px;
              border-radius: 50%;
            }
          }
          > div {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #2f2f2f;
            line-height: 25px;
            position: relative;
            &::before {
              content: "";
              position: absolute;
              top: -1px;
              left: -22px;
              width: 20px;
              height: 20px;
              background: url("~@/assets/imgs/technology/file.png");
            }
          }
        }
      }
    }
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
    background: #ffffff;
    border-radius: 10px;
    .date-title {
      position: absolute;
      z-index: 99;
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
