<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">代理买卖证券业务净收入<span class="dataFrom">数据来源: 协会系统</span></div>
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
                <ul>
                    <li>
                        <img src="@/assets/imgs/business/img-1.png" alt="">
                        <div>
                            <p class="count1">{{lastData.income&&$toT(lastData.income)}}</p>
                            <p>代理买卖证券业务净收入(万元)</p>
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
                <div class="rTitle">代理买卖证券业务净收入历史走势</div>
                <div class="rEchart">
                    <echart-common :options="optionsIncome"></echart-common>
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
            timeSel:'',
            new_date:'',
            histroyDate: [],
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
                        name:'代理买卖证券净收入(万元)',
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
                            // padding:10,
                            distance:15,
                            formatter: function(parmas) {
                                return (parmas.value).toFixed(2)+'%';
                            },
                        },
                    },
                    
                ],
                grid: {
                    top: "25%",
                    left: "5%",
                    right: "5%",
                    bottom: "6%",
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
                        name: "代理买卖证券净收入(万元)",
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
                        <p class='tooltip-line'>代理买卖证券净收入(万元)：${this.$toT(params[0].value)}</p>
                        <p class='tooltip-line'>市场份额：${(params[1].value).toFixed(2)+'%'}</p>
                        <p class='tooltip-line'>排名：${this.optionsIncomeData[params[1].dataIndex].rate+'/'+this.optionsIncomeData[[params[1].dataIndex]].num}</p>
                        </div>`;
                    },
                },
            },
            lastData:[]
        }
    },
    created(){
        this.getSecuritiesBusinessTime()
        this.getSecuritiesBusiness()
    },
    methods:{
        moment,
         // 时间变化 重新调取数据
        changeTime(time){ 
            this.timeSel=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.getSecuritiesBusiness()
        },
        // 获取历史时间
        getSecuritiesBusinessTime(){
            api.getSecuritiesBusinessTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        getSecuritiesBusiness(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            this.optionsIncomeData=[]
            api.getSecuritiesBusiness(params).then(res=>{
                // console.log(res,1233)
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
    &::after{
    content: '';
    position: fixed;
    display: block;
  }
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
    .main-con{
        display: flex;
        height: 273px;
        margin-left: 10px;
        >div{
            background-color: #fff;
            border: 1px solid #c3c3c3;
            border-radius: 10px;
        }
        >.left{
            flex: none;
            width: 333px;
            margin-right: 20px;
            ul{
                width: 275px;
                margin: 0 auto;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 64px;
                    margin-top: 20px;
                    padding-left:8px;
                    background-color: #f8f9fa;
                    border: 1px solid #c3c3c3;
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
                            color: #2a4aff;
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
        >.right{
            flex: 1;
            max-width: calc(100% - 353px);
            .rTitle{
                font-size: 16px;
                font-weight: 600;
                padding:10px 0 0 20px;
            }
            .rEchart{
                height: calc(100% - 34px);
            }
        }
    }
}
</style>