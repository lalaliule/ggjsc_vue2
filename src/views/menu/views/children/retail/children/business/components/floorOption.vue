<template>
     <div class="myCon">
        <div class="main-head">
            <div class="title">期权业务<span class="dataFrom">数据来源: 运营管理总部</span></div>
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
            <div class="conH">
                <tab-toggle
                :change="tabChange"
                :tab="['场内期权权益金(月日均)', '月佣金收入']"
                ></tab-toggle>
            </div>
            <div class="conE">
                <echart-common :options="options"></echart-common>
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
            new_date:'',
            timeSel:'',
            histroyDate:[],
            current:0,
            options:{
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
                        // axisLabel:{
                        //     formatter: (params) => {
                        //         // console.log(params,'..val')
                        //         return params.toFixed(2)+'%'
                        //     }
                        // },
                    }
                ],
                series:[
                {
                    name:'55周岁以下客户占比',
                    type:'line',
                    animation:true,
                    data:[],
                    showSymbol:false,
                        linStyle:{
                            color:'#3653ff',
                            width:1,
                            type:'solid'
                        },
                        itemStyle:{
                            borderWidth:1,
                            // borderColor:'pink',
                            color:'#3653ff'
                        },
                    areaStyle:{
                        color:{
                            type:'line',
                            x:0,
                            y:0,
                            x2:2,y2:1,
                            colorStops:[
                                {
                                    offset:0,color:'rgba(130,146,245,.3)'
                                },
                                {
                                    offset:1,color:'rgba(130,146,245,.6)'
                                },
                            ],
                            global:false
                        }
                    },
                },
              
                ],
                grid: {
                    top: "15%",
                    left: "2%",
                    right: "2%",
                    bottom: "5%",
                    containLabel: true,
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
                        <p class='tooltip-line'>${this.current==0?'场内期权权益金':'月佣金收入'}(万元)：${this.$toT(params[0].value)}</p>
                        </div>`;
                    },
                },
            },
        }
    },
    created(){
        this.getOptionBusinessTime()
        this.getOptionBusiness()
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
            this.getOptionBusiness()
        },
        // 切换 
        tabChange(index){
            this.current=index
            this.getOptionBusiness()
        },
        // 场内期权业务查看历史 
        getOptionBusinessTime(){
            api.getOptionBusinessTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 场内期权业务 
        getOptionBusiness(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
                type:'0'+(this.current+1)
            }
            api.getOptionBusiness(params).then(res=>{
                if(res.ret_code==0){
                    this.options.xAxis[0].data=res.data.map(item=>item.time_str)
                    this.options.series[0].data=res.data.map(item=>item.income)
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
        height: 333px;
        margin-left: 10px;
        padding-top: 8px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #c3c3c3;
        .conH{
            width: 293px;
            height: 46px;
            margin-left: 20px;
            ::v-deep .tab-toggle{
                li{
                    padding: 0 18px;
                    line-height: 44px;
                }
            }
        }
        .conE{
            height: calc(100% - 46px);
        }
    }
}
</style>