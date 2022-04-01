<template>
  <div class="section-4">
    <!-- <div class="title">产品申赎情况</div> -->
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
            <div class="top">
                <ul>
                    <li>
                        <span>集合产品上月累计申购</span>
                        <span class="moneyCon">{{$toT(ransomData.apply_purchase.toFixed(2))}}<i>万元</i></span>
                    </li>
                    <li>
                        <span>累计赎回</span>
                        <span class="moneyCon">{{$toT(ransomData.redeem.toFixed(2))}}<i>万元</i></span>
                    </li>
                    <li>
                        <span>净赎回</span>
                        <span class="moneyCon">{{$toT(ransomData.net_redeem.toFixed(2))}}<i>万元</i></span>
                    </li>
                </ul>
            </div>
            <div class="bot">
                <ul>
                    <li>
                        <span>
                            <img src="@/assets/imgs/overallOperation/biaodan_n.png" @click="childModel=true" alt="">
                            新增发行集合产品</span>
                        <span class="moneyCon">{{$toT(ransomData.set_product_num.toFixed(2))}}<i>只</i></span>
                    </li>
                    <li>
                        <span>募集金额</span>
                        <span class="moneyCon">{{$toT(ransomData.product_raise.toFixed(2))}}<i>万元</i></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="center">
            <div class="top">
                <img class="iconfont" src="@/assets/imgs/downDD.png" alt="">
                前5大集合产品净赎回<span class="moneyS">123,456.23万元</span>
            </div>
            <div class="tableCon">
                <a-table
                    :columns="columns"
                    :data-source="listValue"
                    :pagination="false"
                    :rowKey="(record,index)=>{return index}"
                    bordered
                >
                </a-table>
            </div>
        </div>
        <div class="right"></div>
      </div>
    </div>
    <model-page :modelValue="childModel" title="新增发行集合产品清单" @changeModel="changeModel">
      <sample-table-y
        :columns="childColumns"
        :data="childData"
      ></sample-table-y>
      <div class="noVal" v-if="childData.length<=0">暂无数据</div>
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
          name: "募集金额（万元）",
          key: "prouct_vlaue",
        },
      ],
      childData: [],
      ransomData: {},
      columns:[
        {
            title: "名称",
            dataIndex: "prouct_name",
            key: "prouct_name",
            align: "center"
        },
        {
            title: "赎回面值(万元)",
            dataIndex: "prouct_vlaue",
            key: "prouct_vlaue",
            align: "center"
        },
        {
            title: "净值(万元)",
            dataIndex: "title2",
            key: "title2",
            align: "center"
        },
        {
            title: "赎回面值占净值比",
            dataIndex: "title3",
            key: "title3",
            align: "center",
            width:100
        },
      ],
      listValue:[]
    }
  },
  created(){
    this.getProductRansomHistory();
    this.getProductRansomData();
    this.getFiveProductRansomData();
    this.getAggregateList();
  },
  methods:{
    //   集合产品数据
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
            this.ransomData.apply_purchase=this.ransomData.apply_purchase.toFixed(2)
          }
        })
    },
    // 新增集合产品清单
    getAggregateList(){
        const params = {
            time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
        };
        llgtfoo
        .getAggregateList(params).then(res=>{
            if(res.ret_code==0){
                this.childData=JSON.parse(JSON.stringify(res.data))
                // let prouctValue=res.data.reduce((curr,prev)=>{
                //     return curr + Number(prev.prouct_vlaue)
                // },0)
                // prouctValue=prouctValue.toFixed(2) // 保留2位小数 不然在千分位时 会出错
                // this.childData.forEach(el=>{
                // // console.log(el,'...ell')
                // el.prouct_vlaue=this.$toT(el.prouct_vlaue)
                // })
                // this.childData.push({
                // prouct_vlaue:this.$toT(prouctValue),
                // prouct_name:'合计'
                // })
            }
        })
    },
    // 前5大
    getFiveProductRansomData(){
      const params = {
        time: this.timeSelect ? moment(this.timeSelect).format("YYYYMM") : "",
      };
      llgtfoo
        .getFiveProductRansomData(params)
        .then((res) => {
          if (res.ret_code === 0) {
              this.listValue=res.data
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
      this.getFiveProductRansomData();
      this.getAggregateList();
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
        width: 100%;
        margin-top: 15px;
        background: #fff;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 10px 20px;
        position: relative;
        height: 360px;
    .liquidity-risk {
      display: flex;
      height: 100%;
      >div{
        flex: 1;
        margin-right: 10px;
        border: 1px solid pink;
      }
      .left{
        display: flex;
        flex-direction: column;
        >div{
            flex:1;
            border-radius: 10px;
            background-color: #f8f9fa;
            ul{
                display: flex;
                flex-direction: column;
                height: 100%;
                li{
                    display: flex;
                    flex: 1;
                    align-items: center;
                    border: 1px solid red;
                    span{
                        flex:1;
                        font-size: 16px;
                        color:#6c6c6c;
                        line-height: 22px;
                        margin-right: 20px;
                        &:nth-child(1){
                            text-align: right;
                        }
                        img{
                            cursor: pointer;
                        }
                    }
                    .moneyCon{
                        margin-right: 0;
                        font-size: 24px;
                        color: #313131;
                        font-weight: 500;
                        i{
                            font-style: normal;
                            font-weight: 400;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
        .top{
            margin-bottom: 10px;
        }
        .bot{
            ul{
                padding: 25px 0;
            }
        }
      }
      .center{
          .top{
            position: relative;
            height: 44px;
            line-height: 44px;
            font-size: 18px;
            color: #9f4f3c; 
            margin-bottom: 10px;
            padding-left: 30px;
            border-radius: 10px;
            background-color: #ffc6b8;
            .iconfont{
                position: absolute;
                bottom: 6px;
                left: 50%;
                transform: translate(-50%,70%);
                z-index: 999;
            }
            .moneyS{
                font-weight: 500;
                margin-left: 20px;
            }
          }
          ::v-deep .tableCon{
              .ant-table-wrapper{
                  .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
                    padding: 6px 16px;
                  }
              }
          }
      }
      .right{
        margin-right: 0;
      }
      
    }

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
  ::v-deep .modal-content{
      .table-main{
          .noVal{
              font-size: 14px;
              color: rgba(0,0,0,.25);
              text-align: center;
              margin: 20px 0;
          }
      }
  }
}
</style>
