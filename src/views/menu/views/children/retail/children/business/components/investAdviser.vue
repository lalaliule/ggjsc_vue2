<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">投顾业务<span class="dataFrom">数据来源: 投资顾问部/协会系统</span></div>
        </div>
        <div class="main-con">
            <div class="conTop">
                <div class="top">
                    <div class="title">投顾业务签约客户资产</div>
                    <div class="timeBox">
                        <div class="title">
                            <span class="dateCon">数据日期: <span>{{new_dateT}}</span></span>
                            <month-picker 
                                :histroyDate="histroyDateT"
                                :timeSel="timeSelT"
                                @getTime="changeTimeT" 
                            ></month-picker>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <echart-common :options="options"></echart-common>
                </div>
            </div>
            <div class="conBot">
                <div class="top">
                    <div class="title">投资咨询业务净收入</div>
                    <div class="timeBox">
                        <div class="title">
                            <span class="dateCon">数据日期: <span>{{new_dateB}}</span></span>
                            <month-picker 
                                :histroyDate="histroyDateB"
                                :timeSel="timeSelB"
                                @getTime="changeTimeB"  
                            ></month-picker>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="left">
                        <ul>
                            <li>
                                <img src="@/assets/imgs/business/img-5.png" alt="">
                                <div>
                                    <p class="count1">{{lastData.income&&$toT(lastData.income)}}</p>
                                    <p>投资咨询业务净收入(万元)</p>
                                </div>
                            </li>
                            <li>
                                <img src="@/assets/imgs/business/img-2.png" alt="">
                                <div>
                                    <p class="count2">{{(lastData.market_rate*100).toFixed(2)+'%'}}</p>
                                    <p>市场份额</p>
                                </div>
                            </li>
                            <li>
                                <img src="@/assets/imgs/business/img-3.png" alt="">
                                <div>
                                    <p class="count3"> <span>{{lastData.rate}}</span>/{{lastData.num}}</p>
                                    <p>排名</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <echart-common :options="optionsIncome"></echart-common>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import * as echarts from 'echarts'
import * as api from '../api.js'
import moment from 'moment'

export default {
    data(){
        return{
            timeSelT:'',
            new_dateT:'',
            histroyDateT: [],
            optionsData:[],
            options:{
                xAxis: [
                    {
                        type: "category",
                        data: [],
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLine: {
                            onZero:false,
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
                legend:{
                    right: "10%",
                    icon: "rect",
                    top: "0",
                    // height: "10",
                    itemHeight:10,
                    selectedMode: false,
                    data: ["投顾业务签约客户资产(万元)", "客户总资产(万元)"],
                },
                grid:{
                    left:'8%',
                    right:'4%',
                    bottom:'15%',
                    top:'20%'
                },
                series:[
                    {
                     name: "投顾业务签约客户资产(万元)",
                     type: "bar",
                     barWidth: "30",
                     data: [],
                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 1, color: "#93a3ff" },
                            { offset: 0, color: "#1a3bff" },
                            ]),
                     itemStyle:{
                        barBorderRadius: 15 
                     }
                    },{
                      name: "客户总资产(万元)",
                      type: "bar",
                      barWidth: "30",
                      data: [],
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 1, color: "#f4a97d" },
                            { offset: 0, color: "#ff7f5a" },
                        ]),
                      itemStyle: {
                          barBorderRadius: 15
                      }
                    }
                ],
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
                                params[0].axisValueLabel
                            }</p>
                            <p class='tooltip-line'>投顾业务签约客户资产(万元)：${
                                this.$toT(params[0].value)
                            }</p>
                            <p class='tooltip-line'>客户总资产(万元)：${
                                this.$toT(params[1].value)
                            }</p>
                            <p class='tooltip-line'>占比：${
                                (this.optionsData[params[0].dataIndex].rate*100).toFixed(2)+'%'
                            }</p>
                        </div>`;
                    },
                },
            },

            histroyDateB:[],
            timeSelB:'',
            new_dateB:'',
            optionsIncomeData:[],
            optionsIncome:{
                xAxis:[
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
                        color: "#2f2f2f", //坐标值得具体的颜色
                    },
                    },
                },
                ],
                yAxis: [
                    {
                        type: "value",
                        axisLabel:{
                            formatter: (params) => {
                                // console.log(params,'..val')
                                return params.toFixed(2)+'%'
                            }
                        },
                        position:'left',
                    },
                    {
                        type: "value",
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                        },
                        position:'right'
                    },
                ],
                series:[
                    {
                        name:'投资咨询业务净收入(万元)',
                        type:'line',
                        data:[],
                        animation:true,
                        yAxisIndex: 1,
                        symbolSize:6,
                        linStyle:{
                            color:'#ffc764',
                            width:1,
                            type:'solid'
                        },
                        itemStyle:{
                            borderWidth:2,
                            color:'#ffc764'
                        },
                    },
                    {
                        name:'市场份额',
                        type:'bar',
                        data:[],
                        animation:true,
                        yAxisIndex: 0,
                        barWidth:40,
                        color:new echarts.graphic.LinearGradient(0,0,0,1,[
                            {offset:0,color:'#193bff'},
                            {offset:1,color:'#90a0ff'}
                        ]),
                        label:{
                            show:true,
                            color:'#3f5bff',
                            position:'top',
                             distance:15,
                            formatter: function(parmas) {
                                return (parmas.value).toFixed(2)+'%';
                            },
                        },
                    },
                    
                ],
                grid: {
                    top: "30%",
                    left: "10%",
                    right: "5%",
                    bottom: "0%",
                    containLabel: true,
                },
                legend: {
                    right:'12.2%',
                    top: "15",
                    selectedMode: false,
                    itemHeight:10,
                    data: [
                        {
                        name: "市场份额",
                        },
                        {
                        name: "投资咨询业务净收入(万元)",
                        },
                        
                    ],
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
                        <p class='tooltip-line'>投资咨询业务净收入(万元)：${this.$toT(params[0].value)}</p>
                        <p class='tooltip-line'>市场份额：${(params[1].value).toFixed(2)+'%'}</p>
                        <p class='tooltip-line'>排名：${this.optionsIncomeData[params[1].dataIndex].rate+'/'+this.optionsIncomeData[[params[1].dataIndex]].num}</p>
                        </div>`;
                    },
                },
            },
            lastData:{}
        }
    },
    created(){
        this.getInvestBusinessHistoryTime()
        this.getInvestBusinessHistory()

        this.getInvestBusinessRetentionTime()
        this.getInvestBusinessRetention()
    },
    methods:{
         moment,
         // 时间变化 重新调取数据
        changeTimeT(time){
            this.timeSelT=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_dateT=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.getInvestBusinessHistory()
        },
        changeTimeB(time){
            this.timeSelB=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_dateB=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.getInvestBusinessRetention()
        },
        // 近13个月投顾业务查看历史 
        getInvestBusinessHistoryTime(){
            api.getInvestBusinessHistoryTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateT=res.data
                    this.timeSelT = this.histroyDateT.length > 0 && this.histroyDateT[0];
                    let str=this.histroyDateT.length > 0 && this.histroyDateT[0]
                    let tiemStr=str.split('-')
                    this.new_dateT=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 投资咨询业务净收入查看历史 
        getInvestBusinessRetentionTime(){
            api.getInvestBusinessRetentionTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateB=res.data
                    this.timeSelB = this.histroyDateB.length > 0 && this.histroyDateB[0];
                    let str=this.histroyDateB.length > 0 && this.histroyDateB[0]
                    let tiemStr=str.split('-')
                    this.new_dateB=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 近13个月投顾业务  
        getInvestBusinessHistory(){
            const params={
                time: this.timeSelT
                ? moment(this.timeSelT).format("YYYYMM")
                : '',
            }
            this.optionsData=[]
            api.getInvestBusinessHistory(params).then(res=>{
                if(res.ret_code==0){
                    this.options.xAxis[0].data=res.data.map(item=>item.time_str)
                    this.options.series[1].data=res.data.map(item=>item.total_assets)
                    this.options.series[0].data=res.data.map(item=>item.income)
                    this.optionsData=res.data
                }
            })
        },
        // 投资咨询业务净收入  
        getInvestBusinessRetention(){
            const params={
                time: this.timeSelB
                ? moment(this.timeSelB).format("YYYYMM")
                : '',
            }
            api.getInvestBusinessRetention(params).then(res=>{
                if(res.ret_code==0){
                    // console.log(res,'...')
                    this.optionsIncome.xAxis[0].data=res.data.map(item=>item.time_str)
                    this.optionsIncome.series[0].data=res.data.map(item=>item.income)
                    this.optionsIncome.series[1].data=res.data.map(item=>item.market_rate*100)
                    this.optionsIncomeData=res.data
                    this.lastData=res.data[res.data.length-1]

                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.myCon{
    margin:0 20px 20px;
    .main-head{
        display: flex;
        margin: 10px 0;
        .title{
            font-size: 18px;
            // font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bolder;
            color: #2f2f2f;
            margin-left: 10px;
        }
    }
    .main-con{
        height: 736px;
        margin-left: 10px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #c3c3c3;
        .conTop{
            height: 390px;
            .top{
                display: flex;
                padding-top: 10px;
                .title{
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
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
                        z-index: 9988;
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
            .bottom{
                height: calc(100% - 26px);
            }
        }
        .conBot{
            height: 320px;
            padding: 0 20px;
            .top{
                display: flex;
                .title{
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
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
                        z-index: 9988;
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
            .bottom{
                display: flex;
                .left{
                    flex: none;
                    width: 257px;
                    ul{
                        li{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            height: 64px;
                            margin-top: 20px;
                            padding-left:8px;
                            border: 1px solid #c3c3c3;
                            background-color: #f8f9fa;
                            img{
                        flex: none;
                        width: 50px;
                        height: 50px;
                    }
                    >div{
                        flex: 1;
                        text-align: center;
                        >p{
                            margin-bottom: 0;
                            &:nth-child(1){
                                font-weight: 600;
                            }
                        }
                        .count1{
                            color: #2646ff;
                        }
                        .count2{
                            color: #ff8a5f;
                        }
                        .count3{
                            >span{
                                color: #ae70ff;
                            }
                        }
                    }
                        }
                    }
                }
                .right{
                    flex: 1;
                }
            }
        }
    }
}
</style>