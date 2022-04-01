<template>
    <div class="myCon">
        <div class="conBox">
            <!-- 左侧 股基交易 -->
            <div class="leftCon">
                <div class="headCon">
                    <div class="title">股基交易额(全年累计)<span class="dataFrom">数据来源: 协会系统</span></div>
                    <div class="timeBox">
                        <div class="title">
                            <span class="dateCon">数据日期: <span>{{new_dateVolume}}</span></span>
                            <month-picker 
                                :histroyDate="histroyDateVolume" 
                                :timeSel="timeSelVolume"
                                @getTime="changeTimeVolume" 
                            ></month-picker>
                        </div>
                    </div>
                </div>
                <div class="mainCon">
                    <div class="topCon">
                        <div class="left">
                            <span>{{tradeVolume.turnover?$toT(tradeVolume.turnover):''}}</span>
                            <span><i class="iconfont icon-integral-fill1"></i>股基交易额(万元)</span>
                        </div>
                        <div class="center">
                            <span>{{tradeVolume.turnover_ranking+'/'+tradeVolume.turnover_statistics}}</span>
                            <span><i class="iconfont icon-tradingdata"></i>排名</span>                            
                        </div>
                        <div class="right">
                            <span>{{(tradeVolume.turnover_share*100).toFixed(2)+'%'}}</span>
                            <span><i class="iconfont icon-jingyingqingkuang"></i>市场份额</span>
                        </div>
                    </div>
                    <div class="bottomCon">
                        <echart-common :options="optionsVolume"></echart-common>
                    </div>
                </div>
            </div>
            <!-- 右侧营业收入 -->
            <div class="rightCon">
                <div class="headCon">
                    <div class="title">营业收入(万元)<span class="dataFrom">数据来源: 计划财务部</span></div>
                    <div class="timeBox">
                        <div class="title">
                            <span class="dateCon">数据日期: <span>{{new_dateIncome}}</span></span>
                            <month-picker 
                                :histroyDate="histroyDateIncome" 
                                :timeSel="timeSelIncome"
                                @getTime="changeTimeIncome" 
                            ></month-picker>
                        </div>
                    </div>
                </div>
                <div class="mainCon">
                    <div class="chartsCon">
                        <echart-common :options="optionsIncome"></echart-common>
                    </div>
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
    data(){
        return{
            // 股基交易 开始
            new_dateVolume:'',
            histroyDateVolume:[],
            timeSelVolume:'',
            tradeVolume:{},
            tradeVolumeList:[],
            optionsVolume:{
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
                        name:'股基交易额(万元)',
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
                            {offset:1,color:'#919eee'}
                        ])
                    },
                    
                ],
                grid: {
                    top: "20%",
                    left: "3%",
                    right: "3%",
                    bottom: "0%",
                    containLabel: true,
                },
                legend: {
                    right:'20',
                    top: "0",
                    selectedMode: false,
                    itemWidth: 40,
                    data: [
                        {
                        name: "市场份额",
                        },
                        {
                        name: "股基交易额(万元)",
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
                        <p class='tooltip-line'>股基交易额(万元)：${this.$toT(params[0].value)}</p>
                        <p class='tooltip-line'>市场份额：${(params[1].value).toFixed(2)+'%'}</p>
                        <p class='tooltip-line'>排名：${this.tradeVolumeList[params[1].dataIndex].turnover_ranking+'/'+this.tradeVolumeList[[params[1].dataIndex]].turnover_statistics}</p>
                        </div>`;
                    },
                },
            },
            // 股基交易 结束
            // 营业收入 开始
            new_dateIncome:'',
            histroyDateIncome:[],
            timeSelIncome:'',
            // 营业收入 结束
            optionsIncome:{
                series:[
                    {
                        type:'pie',
                        radius:['40%','60%'],
                        width:650,
                        left:'center',
                        itemStyle:{
                            borderColor:'#fff',
                            borderWidth:1
                        },
                        label:{
                            alignTo:'edge',
                            minMargin:5,
                            edgeDistance:10,
                            lineHeight:15,
                            // formatter:'{b}\n{c}\n\n'
                            formatter(v){
                                let name=v.data.name
                                let val=v.data.val_num
                                let index=v.dataIndex
                                return '{name|'+name+'}\n'+'{value|'+val+'}\n\n\n\n'
                            },
                            rich:{
                                name:{
                                    color:'#101010',
                                    fontSize:16,
                                    lineHeight:30
                                },
                                value:{
                                    fontSize:14
                                }
                            }
                        },
                        labelLine:{
                            length:15,
                            length2:0,
                            maxSurfaceAngle:80
                        },
                        labelLayout:function(params){
                            // console.log(params,'..params')
                            const points=params.labelLinePoints
                            // const isLeft=params.labelRect.x<(this.chartsConWidth/2)
                            const isLeft=params.labelRect.x<200
                            points[2][0]=isLeft?(params.labelRect.x):params.labelRect.x+params.labelRect.width
                            return{
                                labelLinePoints:points
                            }
                        },
                        data:[]

                    }
                ]
            }
        }
    },
    created(){
        // 股基交易 开始
        this.getTradeVolumeTime()
        this.getTradeVolume()
        // 股基交易 结束
        // 营业收入 开始
        this.getBusinessIncomeTime()
        this.getBusinessIncome()
        // 营业收入 结束
    },
    methods:{
        moment,
        // 股基交易 开始
        // 获取时间列表
        getTradeVolumeTime(){
            api.getTradeVolumeTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateVolume=res.data
                    this.timeSelVolume = this.histroyDateVolume.length > 0 && this.histroyDateVolume[0];
                }

            })
        },
        // 股基交易时间变化
        changeTimeVolume(time){
            this.timeSelVolume=time
            this.getTradeVolume()
        },
        // 获取股基交易额（全年累计）
        getTradeVolume(){
            const params={
                time: this.timeSelVolume
                ? moment(this.timeSelVolume).format("YYYYMM")
                : '',
            }
            api.getTradeVolume(params).then(res=>{
                if(res.ret_code==0){
                  this.new_dateVolume=res.data.trade_volume.new_time  
                  this.tradeVolume=res.data.trade_volume
                  this.tradeVolumeList=res.data.trade_volume_list
                  this.optionsVolume.xAxis[0].data=res.data.trade_volume_list.map(item=>item.time_str)
                  this.optionsVolume.series[1].data=res.data.trade_volume_list.map(item=>item.turnover_share*100)
                  this.optionsVolume.series[0].data=res.data.trade_volume_list.map(item=>item.turnover)

                }
            })
        },
        // 股基交易 结束
        // 营业收入 开始
        getBusinessIncomeTime(){
            api.getBusinessIncomeTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateIncome=res.data
                    this.timeSelIncome = this.histroyDateIncome.length > 0 && this.histroyDateIncome[0];
                }

            })
        },
        changeTimeIncome(time){
            this.timeSelIncome=time
            this.getBusinessIncome()
        },
        getBusinessIncome(){
            const params={
                time: this.timeSelIncome
                ? moment(this.timeSelIncome).format("YYYYMM")
                : '',
            }
            api.getBusinessIncome(params).then(res=>{
                if(res.ret_code==0){ 
                  this.new_dateIncome=res.data.new_time
                  res.data.list.forEach((el,i)=>{
                    el.value=el.val_num
                  }) 
                  this.optionsIncome.series[0].data=res.data.list
                  this.optionsIncome.series[0].data.forEach(el=>{
                      el.val_num=this.$toT(el.val_num)
                  })
                }
            })
        }
        // 营业收入 结束
    }
}
</script>

<style lang="scss" scoped>
.myCon{
    // min-width: 1400px;
    margin:0 20px 20px;
    .conBox{
        display: flex;
        .leftCon,.rightCon{
            flex: 48%;
            .headCon{
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
                        top: 3px;
                        right: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        font-size: 14px;
                        // font-family: PingFangSC-Regular, PingFang SC;
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
            .mainCon{
                margin: 10px;
                height: 370px;
                border-radius: 10px;
                border: 1px solid #d4d4d4;
                background-color: #fff;
                .topCon{
                    display: flex;
                    justify-content: space-around;
                    height: 84px;
                    padding:0 10px 0 20px;
                    margin-top: 22px;
                    .left,.center,.right{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        flex: 1;
                        margin-right: 10px;
                        border-radius: 10px;
                        border: 1px solid #d4d4d4;
                        >span{
                            font-size: 16px;
                            .iconfont{
                                font-size: 22px;
                                vertical-align: middle;
                            }
                        }
                    }
                    .left{
                        color: #002552;
                        background-color: #a0d5ff;
                        >span{
                            .iconfont{
                                color: #0067b9;
                                margin-right: 2px;
                            }
                        }
                    }
                    .center{
                        color: #013d1b;
                        background-color: #c3f0d7;
                        >span{
                            .iconfont{
                                color: #006c30;
                            }
                        }
                    }
                    .right{
                        color:#5b1200;
                        background-color: #ffc6b8;
                        >span{
                            .iconfont{
                                color: #a62100;
                                font-size: 16px;
                                margin-right: 4px;
                            }
                        }
                    }
                }
                .bottomCon{
                    height: 225px;
                    margin-top: 20px;
                }
                .chartsCon{
                    width: 100%;
                    height: 100%;
                    // margin-top: 30px;
                }
            }
        }
        .leftCon{
            flex: 45%;
            margin-right: 10px;

        }
        .rightCon{
            flex: 51%;
        }
    }
}
</style>
    
