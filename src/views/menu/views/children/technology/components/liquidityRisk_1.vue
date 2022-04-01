<template>
  <div class="section-4">
    <div class="title">流动性风险<span class="dataFrom">数据来源: 资产管理部</span></div>
    <div class="content-main">
      <div class="date-title">
        <span class="date">数据日期：<span>{{ new_date }}</span></span>
        <month-picker 
            :histroyDate="histroyDate"
            :timeSel="timeSelect"
            @getTime="confrim" 
          ></month-picker>
      </div>
      <div class="liquidity-risk">
        <div class="left">
          <ul class="situation">
            <li>
              <div class="name">
                <img src="@/assets/imgs/technology/p4.png" alt="" />
              </div>
              <div class="t3">
                <p>
                  <span>新增发行集合产品</span>
                  <span style="color:#ff8356"
                    >{{ $toT(ransomData.set_product_num) }}只</span
                  >
                </p>
                <p>
                  <span>募集金额</span>
                  <span>{{ $toT(ransomData.product_raise) }}万元</span>
                </p>
              </div>
            </li>
            <li>
              <div class="name">
                <img src="@/assets/imgs/technology/p3.png" alt="" />
              </div>
              <div class="t2">
                <p>
                  <span>前5大集合产品净赎回</span>
                </p>
                <p>
                  <span>{{ $toT(ransomData.product_ransom) }}万元</span>
                  <img
                    src="@/assets/imgs/technology/exp.png"
                    alt=""
                    @click="childModel = true"
                  />
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <model-page :modelValue="childModel" title="前5大集合产品净赎回" @changeModel="changeModel">
      <sample-table-y
        :columns="childColumns"
        :data="childData"
        :setWidth="true"
      ></sample-table-y>
    </model-page>
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
      childModel: false,
      new_date: "",
      isOpen: false,
      histroyDate: [],
      tableChild: [
        {
          name: "合赢#号",
          value1: "1100000",
          value2: "20000011010",
          type1: "较小",
          type2: "暂无",
        },
        {
          name: "合赢#号",
          value1: "1100000",
          value2: "20000011010",
          type1: "较小",
          type2: "暂无",
        },
        {
          name: "合赢#号",
          value1: "1100000",
          value2: "20000011010",
          type1: "较小",
          type2: "暂无",
        },
        {
          name: "合赢#号",
          value1: "1100000",
          value2: "20000011010",
          type1: "较小",
          type2: "暂无",
        },
        {
          name: "合赢#号",
          value1: "1100000",
          value2: "20000011010",
          type1: "较小",
          type2: "暂无",
        },
        {
          name: "合赢#号",
          value1: "1100000",
          value2: "20000011010",
          type1: "较小",
          type2: "暂无",
        },
      ],
      product: [
        {
          name: "本月发行数量(只)",
          icon: require("@/assets/imgs/technology/p4.png"),
          value: "2",
        },
        {
          name: "本月募集金额(万元)",
          icon: require("@/assets/imgs/technology/p3.png"),
          value: "101110",
        },
      ],
      childColumns: [
        {
          name: "产品名称",
          key: "prouct_name",
        },
        {
          name: "净赎回（万元）",
          key: "prouct_vlaue",
        },
      ],
      childData: [],
      ransomData: {},
    }
  },
  created(){
    this.getProductRansomHistory();
    this.getProductRansomData();
    this.getFiveProductRansomData()
  },
  methods:{
    getProductRansomData(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getProductRansomData(params)
        .then((res) => {
          if (res.ret_code === 0) {
            this.new_date = res.data.oc_date;
            this.ransomData = res.data;
          }
        })
    },
    getFiveProductRansomData(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getFiveProductRansomData(params)
        .then((res) => {
          if (res.ret_code === 0) {
            // res.data[0].prouct_vlaue=-223527.28
            // res.data[1].prouct_vlaue=-115911.18
            // res.data[2].prouct_vlaue=-61274.44
            // res.data[3].prouct_vlaue=-40530.43
            // res.data[4].prouct_vlaue=-38948.1
            this.childData=JSON.parse(JSON.stringify(res.data))
            let prouctValue=res.data.reduce((curr,prev)=>{
                return curr + Number(prev.prouct_vlaue)
            },0)
            prouctValue=prouctValue.toFixed(2) // 保留2位小数 不然在千分位时 会出错
            this.childData.forEach(el=>{
              // console.log(el,'...ell')
              el.prouct_vlaue=this.$toT(el.prouct_vlaue)
            })
            this.childData.push({
              prouct_vlaue:this.$toT(prouctValue),
              prouct_name:'合计'
            })
            // console.log(prouctValue,this.childData,'..this.childData')
          }
        })
        .catch((err) => console.error(err));
    },
    //获取时间列表
    getProductRansomHistory(){
      llgtfoo
        .getProductRansomHistory()
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
      this.getProductRansomData();
      this.getFiveProductRansomData()
    },
    changeModel(val){
      this.childModel=val
    }
  },
};
</script>

<style lang="scss" scoped>
.section-4 {
  margin-top: 20px;
  &::after{
    content: '';
    position: fixed;
    display: block;
  }
  > .title {
    font-size: 18px;
    // font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bolder;
    color: #2f2f2f;
    margin-left: 10px;
  }
  .content-main {
    .liquidity-risk {
      display: flex;
      height: 100%;
      .title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #2f2f2f;
      }
      .left {
        flex: 1;
        margin-right: 20px;
        .situation {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 50px;
          li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            box-sizing: border-box;
            flex: 1;
            height: 105px;
            background: #f8f9fa;
            border-radius: 10px;
            &:last-of-type {
              margin-left: 50px;
            }
            .name {
              width: 50px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              > img {
                width: 80px;
                height: 50px;
                // height: 80px;
              }
            }
            .t2 {
              flex: 1;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              p {
                padding-left: 130px;
                margin: 0;
                width: 100%;
                display: flex;
                align-items: center;
                line-height: 40px;
                img {
                  margin-left: 20px;
                  cursor: pointer;
                }
                &:first-of-type {
                  span {
                    font-size: 18px;
                    font-weight: bolder;
                    font-family: PingFangSC-Regular, PingFang SC;
                  }
                }
                span {
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                }
              }
            }
            .t3 {
              p {
                margin: 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding: 0 110px;
                align-items: center;
                line-height: 40px;
                span {
                  &:first-of-type {
                    font-weight: bolder;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-size: 18px;
                  }
                  &:last-of-type {
                    font-size: 16px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                  }
                }
              }
              flex: 1;
              height: 100%;
              display: flex;
              align-items: center;
              flex-direction: column;
              justify-content: center;
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
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 244px;
    background: #ffffff;
    border-radius: 10px;
  }
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
</style>
