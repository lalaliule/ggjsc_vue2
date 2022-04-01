<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">托管客户资产<span class="dataFrom">数据来源: 协会系统</span></div>
            <div class="timeBox">
                <div class="title">
                    <span class="dateCon">数据日期: <span>{{new_date}}</span></span>
                    <month-picker 
                        :histroyDate="histroyDate" 
                        :timeSel="timeSel"
                        @getTime="changeTime" 
                    ></month-picker>
                </div>
            </div>
        </div>
        <div class="main-con">
            <div class="conL">
                <div class="conLTitle">托管客户资产</div>
                <div class="conLMain">
                    <div class="left">
                        <ul>
                            <li class="firstC">托管证券市值</li>
                            <li>{{assetData.deposit_bond_market_value}}</li>
                            <li>{{assetData.deposit_bond_market_rank+'/'+assetData.deposit_bond_market_all_rank}}</li>
                            <li>{{assetData.deposit_bond_market}}</li>
                        </ul>
                    </div>
                    <div class="center">
                        <div class="centerLine">
                            <i class="iconfont icon-integral-fill1"></i>
                            <span>数值(万元)</span>
                        </div>
                        <div class="centerLine">
                            <i class="iconfont icon-tradingdata"></i>
                            <span>排名</span></div>
                        <div class="centerLine">
                            <i class="iconfont icon-jingyingqingkuang"></i>
                            <span>市场份额</span></div>
                    </div>
                    <div class="right">
                        <ul>
                            <li class="firstC">托管客户结算资金余额</li>
                            <li>{{assetData.deposit_cust_trade_value}}</li>
                            <li>{{assetData.deposit_cust_trade_rank+'/'+assetData.deposit_cust_trade_all_rank}}</li>
                            <li>{{assetData.deposit_cust_trade_market}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="conR">
                <!-- <input type="color"> -->
                <div class="echartCon">
                    <echart-common :options="options"></echart-common>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import monthPicker from "@/components/monthPicker/index";
import modelPage from '@/components/modelPage/index'
import * as echarts from 'echarts'
import * as api from '../api.js'
import moment from 'moment'

export default {
  components: {
    monthPicker,
    modelPage
  },
  data(){
    return {
        timeSel:'',
        histroyDate:[],
        new_date:'', 
        assetData:{},
        optionsData:[],
        options:{
            title:{
                text:'托管客户资产走势',
                textStyle:{
                    fontWeight:400
                }
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
                        // console.log(params,'..params')
                        return `<div style='color:#fff'>
                        <p class='tooltip-title'>${
                            params[0].axisValueLabel
                        }</p>
                        <p class='tooltip-line'>托管证券市值(万元)：${
                            this.$toT(this.optionsData[params[0].dataIndex].deposit_bond_market_value)
                        }</p>
                        <p class='tooltip-line'>市场份额：${
                            this.optionsData[params[0].dataIndex].deposit_bond_market
                        }</p>
                        <p class='tooltip-line'>排名：${
                            this.optionsData[params[0].dataIndex].deposit_bond_market_rank+'/'+this.optionsData[params[0].dataIndex].deposit_bond_market_all_rank
                        }</p>
                        <p class='tooltip-line'>托管客户资金结算余额(万元)：${
                            this.$toT(this.optionsData[params[0].dataIndex].deposit_cust_trade_value)
                        }</p>
                        <p class='tooltip-line'>市场份额：${
                            this.optionsData[params[0].dataIndex].deposit_cust_trade_market
                        }</p>
                        <p class='tooltip-line'>排名：${
                            this.optionsData[params[0].dataIndex].deposit_cust_trade_rank+'/'+this.optionsData[params[0].dataIndex].deposit_cust_trade_all_rank
                        }</p>
                        </div>`;
                    },
                    position:function(point,params,dom,rect,size){
                        // 提示框位置
                        let x=0
                        let y=0

                        // 当前鼠标位置
                        let pointX=point[0]
                        let pointY=point[1]

                        // 提示框大小
                        let boxW=size.contentSize[0]
                        let boxH=size.contentSize[1]

                        // boxW>pointX说明鼠标左边放不下提示框
                        if(boxW>pointX){
                            x=5
                        }else{
                            x=pointX-boxW
                        }

                        // boxH>pointY 说明鼠标上边放不下提示框
                        if(boxH>pointY){
                            y=5
                        }else{
                            y=pointY-boxH
                        }
                        return [x,y]
                    }
                },
            legend: {
                    selectedMode: false,
                    right:'15'
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
            yAxis:[
                {
                    type:'value',
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                    },
                },
                {
                    type:'value',
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
                }
            ],
            series:[
                {
                    name:'托管证券市值(万元)',
                    type:'line',
                    data:[],
                    animation:true,
                    symbolSize:6,
                    areaStyle:{
                        color:{
                            type:'line',
                            x:0,
                            y:0,
                            x2:2,y2:1,
                            colorStops:[
                                {
                                    offset:0,color:'rgba(53,240,243,.5)'
                                },
                                {
                                    offset:1,color:'rgba(210,249,251,1)'
                                },
                            ],
                            global:false
                        }
                    },
                    linStyle:{
                            color:'#29e1eb',
                            width:1,
                            type:'solid'
                    },
                    itemStyle:{
                            borderWidth:2,
                            // borderColor:'pink',
                            color:'#29e1eb'
                    },
                },
                {
                    name:'托管客户资金结算余额(万元)',
                    type:'line',
                    yAxisIndex: 1,
                    animation:true,
                    data:[],
                    symbol:'emptyRect',
                        symbolSize:[6,14],
                        linStyle:{
                            color:'#506ac3',
                            width:1,
                            type:'solid'
                        },
                        itemStyle:{
                            borderWidth:2,
                            // borderColor:'pink',
                            color:'#506ac3'
                        },
                }
            ],
            grid: {
                    top: "15%",
                    left: "1%",
                    right: "1%",
                    bottom: "5%",
                    containLabel: true,
            },
        }
    }
  },
  created(){
    //   获取历史时间
      this.getDepositAssetHistoryTime()
    // 获取数据
    this.getDepositCustAssetData()
    this.getDepositAssetHistoryData()
  },
  methods:{
        moment,
        // 时间变化 重新调取数据
        changeTime(time){
            this.timeSel=time
            // 获取数据
            this.getDepositCustAssetData()
            this.getDepositAssetHistoryData()
        },
        // 获取历史时间
        getDepositAssetHistoryTime(){
            api.getDepositAssetHistoryTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                }
            })
        },
        // 获取托管客户资产最新数据
        getDepositCustAssetData(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getDepositCustAssetData(params).then(res=>{
                if(res.ret_code==0){
                    this.new_date=res.data.date                    
                    this.assetData=res.data.data
                    this.assetData.deposit_bond_market_value=this.$toT(this.assetData.deposit_bond_market_value)
                    this.assetData.deposit_cust_trade_value=this.$toT(this.assetData.deposit_cust_trade_value)
                }
            })
        },
        // 托管客户资产历史走势
        getDepositAssetHistoryData(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getDepositAssetHistoryData(params).then(res=>{
                if(res.ret_code==0){
                    this.options.xAxis[0].data=res.data.map(item=>item.oc_date)
                    this.options.series[0].data=res.data.map(item=>item.deposit_bond_market_value)
                    this.options.series[1].data=res.data.map(item=>item.deposit_cust_trade_value)
                    this.optionsData=res.data
                }
            })
        },
  }


}
</script>

<style lang="scss" scoped>
.myCon{
    margin:0 20px 20px;
    .main-head{
        display: flex;
        .title{
            font-size: 18px;
            // font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bolder;
            color: #2f2f2f;
            margin-left: 10px;
        }
        .timeBox{
            flex: 1;
            height: 100%;
            position: relative;
            .title{
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
                    width: 24px;
                    height: 24px;
                    margin-left: 10px;
                }
                .dateCon{
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #969696;
                    >span{
                        color: #333;
                        font-weight: 600;
                    }
                }
            }
        }
    }
    .main-con{
        display: flex;
        height: 348px;
        margin: 10px;
        padding: 20px;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid #d4d4d4;
        background-color: #fff;
        .conL{
            flex: 4;
            padding: 10px;
            // border: 1px solid pink;
            .conLTitle{
                font-size: 18px;
                // font-weight: 600;
            }
            .conLMain{
                display: flex;
                padding: 10px;
                .left,.right{
                    flex: 1;
                    padding-bottom: 6px;
                    border: 1px solid #bcc2bf;
                    ul{
                        padding:0 6px;
                        margin: 0;
                        font-size: 18px;
                        li{
                            height: 39px;
                            line-height: 39px;
                            padding: 0 6px;
                            margin-top: 14px;
                            border: 1px solid #bcc2bf;
                        }
                        .firstC{
                            font-size: 16px;
                            border: none;
                            padding-right: 0;
                        }
                    }
                }
                .center{
                    flex: none;
                    width: 80px;
                    padding-top: 55px;
                    .centerLine{
                        text-align: center;
                        line-height: 1;
                        margin-top: 14px;
                        span{
                            display: block;
                            margin-top: 5px;
                        }
                        .iconfont{
                            font-size: 22px;
                        }
                        .icon-jingyingqingkuang{
                            font-size: 18px;
                        }
                    }
                    
                }
                .left{
                    background-color: #edfaf3;
                    // background-color:rgba(195,240,215,.5);
                    ul{
                        li{
                            text-align: right;
                            background-color: #c3f0d7;
                            border-radius: 18px 0 0 18px;
                            &:nth-child(1){
                                background-color: #edfaf3;
                            }
                        }
                    }
                }
                .right{
                    background-color: #e2f2ff;
                    // background-color:rgba(160,213,255,.5);
                    ul{li{
                        background-color: #a0d5ff;
                        border-radius: 0 18px 18px 0;
                        &:nth-child(1){
                            background-color: #e2f2ff;
                        }
                    }}
                    
                }
            }
        }
        .conR{
            flex: 6;
            margin-left: 20px;
            padding: 10px 0 0 20px;
            // border: 1px solid red;
            .echartCon{
                width: 100%;
                height: 100%;
            }
        }
    }

}
</style>