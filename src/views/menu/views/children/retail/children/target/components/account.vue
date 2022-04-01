<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">A股账户<span class="dataFrom">数据来源: 协会系统</span></div>
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
            <div class="left">
                <div class="leftHead">A股账户数</div>
                <div class="leftCon">
                    <div class="left1">
                        <ul>
                            <li>
                                <p>A股资金账户数</p>
                                <p class="lip1">{{(accountDetail.a_share_account_num)}}</p>
                            </li>
                            <li>
                                <p>市场份额</p>
                                <p class="lip2">{{accountDetail.a_share_account_market}}</p>
                            </li>
                            <li>
                                <p class="lip3">排名</p>
                                <p> <span class="lip4">{{accountDetail.a_share_account_rank}}</span>/<span>{{accountDetail.a_share_account_all_rank}}</span> </p>
                            </li>
                        </ul>
                    </div>
                    <div class="left1">
                        <ul>
                            <li>
                                <p>A股证券账户数</p>
                                <p class="lip1">{{(accountDetail.a_bond_account_num)}}</p>
                            </li>
                            <li>
                                <p>市场份额</p>
                                <p class="lip2">{{accountDetail.a_bond_account_market}}</p>
                            </li>
                            <li>
                                <p class="lip3">排名</p>
                                <p> <span class="lip4">{{accountDetail.a_bond_account_rank}}</span>/<span>{{accountDetail.a_bond_account_all_rank}}</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="echartCon">
                    <echart-common :options="options"></echart-common>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import monthPicker from "@/components/monthPicker/index";
import * as echarts from 'echarts'
import * as api from '../api.js'
import moment from 'moment'

export default {
    components: {
        monthPicker,
    },
    data(){
        return {
            timeSel:'',
            new_date:'',
            histroyDate: [],
            accountDetail:{},
            accountData:[],
            options:{
                title:{
                    text:'A股账户数历史走势',
                    left:10,
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
                            <p class='tooltip-line'>A股资金账户数：${
                                this.$toThousands(this.accountData[params[0].dataIndex].a_share_account_num)
                            }</p>
                            <p class='tooltip-line'>市场份额：${
                                (this.accountData[params[0].dataIndex].a_share_account_market)
                            }</p>
                            <p class='tooltip-line'>排名：${
                                (this.accountData[params[0].dataIndex].a_share_account_rank)
                            }/${(this.accountData[params[0].dataIndex].a_share_account_all_rank)}</p>
                            <p class='tooltip-line'>A股证券账户数：${
                                this.$toThousands(this.accountData[params[0].dataIndex].a_bond_account_num)
                            }</p>
                            <p class='tooltip-line'>市场份额：${
                                (this.accountData[params[0].dataIndex].a_bond_account_market)
                            }</p>
                            <p class='tooltip-line'>排名：${
                                (this.accountData[params[0].dataIndex].a_bond_account_rank)
                            }/${(this.accountData[params[0].dataIndex].a_bond_account_all_rank)}</p>
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
                    right: "10%",
                    icon: "rect",
                    top: "0",
                    // height: "10",
                    itemHeight:6,
                    selectedMode: false,
                    data: ["A股资金账户数", "A股证券账户数"],
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
                        type: "",
                        name:'',
                        show:false,
                        axisTick:{show:false},
                        axisLine:{show:false},
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                        },
                    },
                ],
                series:[
                    {
                     name: "A股资金账户数",
                     type: "bar",
                     barWidth: "30",
                     data: [],
                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 1, color: "#99a7f6" },
                            { offset: 0, color: "#1d3eff" },
                            ]),
                     itemStyle:{
                        barBorderRadius: 15 
                     }
                    },{
                      name: "A股证券账户数",
                      type: "bar",
                      barWidth: "30",
                      data: [],
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 1, color: "#ff805b" },
                            { offset: 0, color: "#fe8b49" },
                        ]),
                      itemStyle: {
                          barBorderRadius: 15
                      }
                    }
                ],
                grid:{
                    left:'2%',
                    right:'4%',
                    bottom:'20%',
                    top:'20%'
                }
            }
        }
    },
    created(){
        this.getAShareAccountHistoryTime() // 历史时间
        this.getAShareAccountDetail() // 获取数据
        this.getAShareAccountHistoryData() // 数据走势
    },
    methods:{
        moment,
        // 获取历史时间
        getAShareAccountHistoryTime(){
            api.getAShareAccountHistoryTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    // console.log(this.timeSel,'...')
                }
            })
        },
        // 获取A股账户最新数据
        getAShareAccountDetail(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getAShareAccountDetail(params).then(res=>{
                if(res.ret_code==0){
                    this.new_date=res.data.date
                    this.accountDetail=res.data.data
                    this.accountDetail.a_share_account_num=this.accountDetail.a_share_account_num?this.$toThousands(this.accountDetail.a_share_account_num):''
                    this.accountDetail.a_bond_account_num=this.accountDetail.a_bond_account_num?this.$toThousands(this.accountDetail.a_bond_account_num):''
                }
            })
        },
        getAShareAccountHistoryData(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getAShareAccountHistoryData(params).then(res=>{
                if(res.ret_code==0){
                    this.accountData=res.data
                    this.options.series[0].data=res.data.map(item=>item.a_share_account_num)
                    this.options.series[1].data=res.data.map(item=>item.a_bond_account_num)
                    this.options.xAxis[0].data=res.data.map(item=>item.oc_date)
                }
            })
        },
        // 时间变化 重新调取数据
        changeTime(time){
            this.timeSel=time
            this.getAShareAccountDetail()
            this.getAShareAccountHistoryData()
        },
    }
}
</script>

<style lang="scss" scoped>
.myCon{
    margin:0 20px 20px;
    &::after{
    content: '';
    position: fixed;
    display: block;
  }
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
    .main-con{
        display: flex;
        height: 285px;
        margin: 0 10px;
        border: 1px solid #d4d4d4;
        border-radius: 10px;
        overflow: hidden;
        background-color: #fff;
        // >div{
        //     border: 1px solid #d4d4d4;
        //     border-radius: 10px;
        // }
        .left{
            flex: 1;
            // width: 416px;
            margin-right: 20px;
            padding: 20px;
            font-size: 16px;
            background-color: #fff;
            .leftHead{
                line-height: 46px;
                font-size: 18px;
                border-bottom: 1px solid #e5e5e5;
            }
            .leftCon{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: calc(100% - 45px);
                padding-top: 20px;
                .left1{
                    ul{
                        display: flex;
                        justify-content: space-between;
                        li{
                            p{
                                margin-bottom: 0;
                                text-align: center;
                                line-height: 30px;
                            }
                            .lip1{
                                color:#3740c8;
                                font-weight: 700;
                            }
                            .lip2{
                                color: #ff7335;
                                font-weight: 700;
                            }
                            .lip3{
                                // letter-spacing: 10px;
                                min-width: 43px;
                                // -moz-text-align-last:justify;
                                // -webkit-text-align-last:justify ;
                                text-align-last: justify;
                                // text-align: justify;
                            }
                            .lip4{
                                font-weight: 700;
                            }
                        }
                    }
                }
            }
            
        }
        .right{
            flex: 3;
            padding: 32px 0 0;
            background-color: #fff;
            .echartCon{
                width: 100%;
                height: 100%;
            }

        }
    }
}
</style>