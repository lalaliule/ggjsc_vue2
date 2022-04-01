<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">代理销售金融产品<span class="dataFrom">数据来源: 营销管理部/协会系统</span></div>
        </div>
        <div class="main-con">
            <div class="conTop">
                <div class="top">
                    <div class="title">金融产品日均保有量
                        <a-tooltip placement="bottom">
                            <template #title>
                            <span>含客户持有的公募基金、私募基金、信托、资管产品、收益凭证等月日均总规模</span>
                            </template>
                            <a-icon type="question-circle" class="iconCir"></a-icon>
                        </a-tooltip>
                    </div>
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
                    <div class="title">代销金融产品净收入</div>
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
                                <img src="@/assets/imgs/business/img-4.png" alt="">
                                <div>
                                    <p class="count1">{{lastData.income&&$toT(lastData.income)}}</p>
                                    <p>代销金融产品净收入(万元)</p>
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
                    data: ["客户总资产(万元)", "金融产品日均保有量(万元)"],
                },
                grid:{
                    left:'6%',
                    right:'4%',
                    bottom:'15%',
                    top:'20%'
                },
                series:[
                    {
                        name:'客户总资产(万元)',
                        type:'bar',
                        data:[],
                        barWidth:40,
                        color:new echarts.graphic.LinearGradient(0,0,0,1,[
                            {offset:0,color:'#56bcda'},
                            {offset:1,color:'#18c9d3'}
                        ]),
                        itemStyle:{
                            normal:{
                                barBorderRadius:[10,10,0,0],
                            }
                        }
                    },
                    {
                        name:'金融产品日均保有量(万元)',
                        type:'bar',
                        data:[],
                        barWidth:60,
                        barGap:'-126%',
                        // z:1,
                        itemStyle:{
                            normal:{
                                color:'rgba(255,255,255,0)',
                                barBorderColor:'tomato',
                                barBorderWidth:3,
                                barBorderRadius:[10,10,0,0],
                                borderType:'dotted'
                            }
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
                            <p class='tooltip-line'>金融产品日均保有量(万元)：${
                                this.$toT(params[1].value)
                            }</p>
                            <p class='tooltip-line'>客户总资产(万元)：${
                                this.$toT(params[0].value)
                            }</p>
                            <p class='tooltip-line'>占比：${
                                (this.optionsData[params[0].dataIndex].rate*100).toFixed(2)+'%'
                            }</p>
                        </div>`;
                    },
                },
            },
            optionsData:[],

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
                        name:'代销金融产品净收入(万元)',
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
                            {offset:0,color:'#ad6eff'},
                            {offset:1,color:'#c090ff'}
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
                    right:'11.5%',
                    top: "15",
                    selectedMode: false,
                    itemHeight:10,
                    data: [
                        {
                        name: "市场份额",
                        },
                        {
                        name: "代销金融产品净收入(万元)",
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
                        <p class='tooltip-line'>代销金融产品净收入(万元)：${this.$toT(params[0].value)}</p>
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
        this.getFinanceRetentionTime()
        this.getFinanceRetention()

        this.getFinanceIncomeTime()
        this.getFinanceIncome()
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
            this.getFinanceRetention()
        },
        changeTimeB(time){
            this.timeSelB=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_dateB=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.getFinanceIncome()
        },
        // 代理销售金融产品保有量查看历史 
        getFinanceRetentionTime(){
            api.getFinanceRetentionTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateT=res.data
                    this.timeSelT = this.histroyDateT.length > 0 && this.histroyDateT[0];
                    let str=this.histroyDateT.length > 0 && this.histroyDateT[0]
                    let tiemStr=str.split('-')
                    this.new_dateT=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 代销金融产品净收入查看历史 
        getFinanceIncomeTime(){
            api.getFinanceIncomeTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateB=res.data
                    this.timeSelB = this.histroyDateB.length > 0 && this.histroyDateB[0];
                    let str=this.histroyDateB.length > 0 && this.histroyDateB[0]
                    let tiemStr=str.split('-')
                    this.new_dateB=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 代理销售金融产品保有量  
        getFinanceRetention(){
            const params={
                time: this.timeSelT
                ? moment(this.timeSelT).format("YYYYMM")
                : '',
            }
            this.optionsData=[]
            api.getFinanceRetention(params).then(res=>{
                if(res.ret_code==0){
                    this.options.xAxis[0].data=res.data.map(item=>item.time_str)
                    this.options.series[0].data=res.data.map(item=>item.total_assets)
                    this.options.series[1].data=res.data.map(item=>item.income)
                    this.optionsData=res.data
                }

            })
        },
        // 代销金融产品净收入 
        getFinanceIncome(){
            const params={
                time: this.timeSelB
                ? moment(this.timeSelB).format("YYYYMM")
                : '',
            }
            this.optionsIncomeData=[]
            api.getFinanceIncome(params).then(res=>{
                if(res.ret_code==0){
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
                            color: #f777c0;
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