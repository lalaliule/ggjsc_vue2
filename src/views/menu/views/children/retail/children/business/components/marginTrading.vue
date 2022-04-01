<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">融资融券业务<span class="dataFrom">数据来源: 协会系统/证券金融部/金融科技部</span></div>
        </div>
        <div class="main-con">
            <div class="conT">
                <div class="conT-l">
                    <div class="conT-l-h">
                        <div class="headT">融资融券业务余额</div>
                        <div class="timeBox">
                            <div class="title">
                                <span class="dateCon">数据日期: <span>{{new_dateL}}</span></span>
                                <month-picker 
                                    :histroyDate="histroyDateL"
                                    :timeSel="timeSelL"
                                    @getTime="changeTimeL" 
                                ></month-picker>
                            </div>
                        </div>
                    </div>
                    <div class="cont-l-e">
                        <echart-common :options="options1"></echart-common>
                    </div>
                </div>
                <div class="conT-r">
                    <div class="conT-l-h">
                        <div class="headT">融资融券业务利息收入</div>
                        <div class="timeBox">
                            <div class="title">
                                <span class="dateCon">数据日期: <span>{{new_dateR}}</span></span>
                                <month-picker 
                                    :histroyDate="histroyDateR"
                                    :timeSel="timeSelR"
                                    @getTime="changeTimeR" 
                                ></month-picker>
                            </div>
                        </div>
                    </div>
                    <div class="cont-l-e">
                        <echart-common :options="options2"></echart-common>
                    </div>
                </div>
            </div>
            <div class="conB">
                <div class="conB-h">
                    <div class="conB-h-t">已开信用证券账户数</div>
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
                <div class="conB-e">
                    <echart-common :options="options3"></echart-common>
                    <a-tooltip placement="bottom">
                        <template #title>
                        <span>满足交易满半年、开户日前二十个交易日的日均资产大于等于50万的客户数</span>
                        </template>
                        <a-icon type="question-circle" class="iconCir"></a-icon>
                    </a-tooltip>
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
            timeSelL:'',
            new_dateL:'',
            histroyDateL: [],
            options1Data:[],
            options1:{
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
                yAxis: [
                    {
                        type: "value",
                        splitLine: {
                            show:false,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                        },
                    },
                    {
                        type: "value",
                        axisLabel:{
                            formatter: (params) => {
                                return params.toFixed(2)+'%'
                            }
                        },
                    },
                ],
                series:[
                    {
                        name:'融资融券业务余额(万元)',// 柱形图 
                        type:'pictorialBar',
                        data:[],
                        yAxisIndex: 0,
                        label: {
                            normal: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                    offset: 1,
                                    color: "#7e9dff", // 0% 处的颜色
                                    },
                                    {
                                    offset: 0,
                                    color: "#294aff", // 100% 处的颜色
                                    },
                                ],
                                globalCoord: false, // 缺省为 false
                                }, //渐变颜色
                            },
                            },
                            symbol: "path://M150 50 L130 130 L170 130  Z",
                            barWidth: "40%",
                        },
                        {
                        name:'市场份额',// 线 
                        type:'line',
                        data:[],
                        // z:1,
                        yAxisIndex: 1,
                        symbolSize:6,
                        itemStyle:{
                            borderWidth:2,
                            color:'#ff875c'
                        },
                    },
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
                        // console.log(params,'..params')
                        return `<div style='color:#fff'>
                        <p class='tooltip-title'>${
                            params[0].axisValue
                        }</p>
                        <p class='tooltip-line'>融资融券业务余额(万元)：${
                            this.$toT(params[0].value)
                        }</p>
                        <p class='tooltip-line'>市场份额：${
                            (params[1].value).toFixed(2)+'%'
                        }</p>
                        <p class='tooltip-line'>排名：${
                            this.options1Data[params[0].dataIndex].rate
                        }/${this.options1Data[params[0].dataIndex].num}</p>
                        
                        </div>`;
                    },
                },
                legend: {
                    right:'5%',
                    top: "15",
                    selectedMode: false,
                    itemHeight:10,
                    data: [
                        {
                        name: "融资融券业务余额(万元)",
                        
                        },
                        {
                        name: "市场份额",
                        },
                        
                    ],
                },
                grid: {
                    top: "20%",
                    left: "5%",
                    right: "5%",
                    bottom: "6%",
                    containLabel: true,
                },
            },

            new_dateR:'',
            timeSelR:'',
            histroyDateR:[],
            options2Data:[],
            options2:{
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
                yAxis: [
                    {
                        type: "value",
                        splitLine: {
                            show:false,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                        },
                    },
                    {
                        type: "value",
                        axisLabel:{
                            formatter: (params) => {
                                return params.toFixed(2)+'%'
                            }
                        },
                    },
                ],
                series:[
                    {
                        name:'融资融券业务利息收入(万元)',// 柱形图 
                        type:'pictorialBar',
                        data:[],
                        yAxisIndex: 0,
                        label: {
                            normal: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                    offset: 1,
                                    color: "#ef9562", // 0% 处的颜色
                                    },
                                    {
                                    offset: 0,
                                    color: "#ff8d67", // 100% 处的颜色
                                    },
                                ],
                                globalCoord: false, // 缺省为 false
                                }, //渐变颜色
                            },
                            },
                            symbol: "path://M150 50 L130 130 L170 130  Z",
                            barWidth: "40%",
                        },
                        {
                        name:'市场份额',// 线 
                        type:'line',
                        data:[],
                        // z:1,
                        yAxisIndex: 1,
                        symbolSize:6,
                        itemStyle:{
                            borderWidth:2,
                            color:'#3553ff'
                        },
                    },
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
                        // console.log(params,'..params')
                        return `<div style='color:#fff'>
                        <p class='tooltip-title'>${
                            params[0].axisValue
                        }</p>
                        <p class='tooltip-line'>融资融券业务利息收入(万元)：${
                            this.$toT(params[0].value)
                        }</p>
                        <p class='tooltip-line'>市场份额：${
                            (params[1].value).toFixed(2)+'%'
                        }</p>
                        <p class='tooltip-line'>排名：${
                            this.options2Data[params[0].dataIndex].rate
                        }/${this.options2Data[params[0].dataIndex].num}</p>
                        
                        </div>`;
                    },
                },
                legend: {
                    right:'5%',
                    top: "15",
                    selectedMode: false,
                    itemHeight:10,
                    data: [
                        {
                        name: "融资融券业务利息收入(万元)",
                        
                        },
                        {
                        name: "市场份额",
                        },
                        
                    ],
                },
                grid: {
                    top: "20%",
                    left: "5%",
                    right: "5%",
                    bottom: "6%",
                    containLabel: true,
                },
            },

            histroyDateB:[],
            new_dateB:'',
            timeSelB:'',
            options3:{
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
                        type:'value'
                    }
                ],
                legend: {
                    right:'20%',
                    top: "2",
                    selectedMode: false,
                    itemHeight:10,
                    data: [
                        {
                        name: "已开信用证券帐户数",
                        
                        },
                        {
                        name: "符合开立条件的客户数",
                        },
                        
                    ],
                },
                grid: {
                    top: "20%",
                    left: "2%",
                    right: "2%",
                    bottom: "2%",
                    containLabel: true,
                },
                series:[
                    {
                        name:'已开信用证券帐户数',
                        type:'line',
                        data:[],
                        symbolSize:6,
                        smooth:0.6,// [0,1]
                        itemStyle:{
                            borderWidth:2,
                            color:'#445fff'
                        },  
                    },
                    {
                        name:'符合开立条件的客户数',
                        type:'line',
                        data:[],
                        symbolSize:6,
                        smooth:0.6,
                        itemStyle:{
                            borderWidth:2,
                            color:'#31ced8'
                        },  
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
                        // console.log(params,'..params')
                        return `<div style='color:#fff'>
                        <p class='tooltip-title'>${
                            params[0].axisValue
                        }</p>
                        <p class='tooltip-line'>已开信用证券帐户数：${
                            this.$toT(params[0].value)
                        }</p>
                        <p class='tooltip-line'>符合开立条件的客户数：${
                            this.$toT(params[1].value)
                        }</p>
                        <p class='tooltip-line'>占比：${
                            (this.options3Data[params[0].dataIndex].rate*100).toFixed(2)+'%'
                        }</p>
                        
                        </div>`;
                    },
                },
            },
            options3Data:[]
        }
    },
    created(){
        this.getMarginTradingBalanceTime()
        this.getMarginTradingBalance()

        this.getMarginTradingInterestTime()
        this.getMarginTradingInterest()

        this.getSecuritiesAccountsNumTime()
        this.getSecuritiesAccountsNum()
    },
    methods:{
         moment,
         // 时间变化 重新调取数据
        changeTimeL(time){
            this.timeSelL=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_dateL=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.getMarginTradingBalance()
        },
        changeTimeR(time){
            this.timeSelR=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_dateR=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.getMarginTradingInterest()
        },
        changeTimeB(time){
            this.timeSelB=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_dateB=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.getSecuritiesAccountsNum()
        },
        // 融资融券业务余额查看历史 
        getMarginTradingBalanceTime(){
            api.getMarginTradingBalanceTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateL=res.data
                    this.timeSelL = this.histroyDateL.length > 0 && this.histroyDateL[0];
                    let str=this.histroyDateL.length > 0 && this.histroyDateL[0]
                    let tiemStr=str.split('-')
                    this.new_dateL=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        //  融资融券业务利息收入查看历史 
        getMarginTradingInterestTime(){
            api.getMarginTradingInterestTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateR=res.data
                    this.timeSelR = this.histroyDateR.length > 0 && this.histroyDateR[0];
                    let str=this.histroyDateR.length > 0 && this.histroyDateR[0]
                    let tiemStr=str.split('-')
                    this.new_dateR=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 已开信用证券账号数查看历史 
        getSecuritiesAccountsNumTime(){
            api.getSecuritiesAccountsNumTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateB=res.data
                    this.timeSelB = this.histroyDateB.length > 0 && this.histroyDateB[0];
                    let str=this.histroyDateB.length > 0 && this.histroyDateB[0]
                    let tiemStr=str.split('-')
                    this.new_dateB=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 融资融券业务余额  
        getMarginTradingBalance(){
            const params={
                time: this.timeSelL
                ? moment(this.timeSelL).format("YYYYMM")
                : '',
            }
            this.options1Data=[]
            api.getMarginTradingBalance(params).then(res=>{
                if(res.ret_code==0){
                    this.options1.xAxis[0].data=res.data.map(item=>item.time_str)
                    this.options1.series[0].data=res.data.map(item=>item.income)
                    this.options1.series[1].data=res.data.map(item=>item.market_rate*100)
                    this.options1Data=res.data
                }
            })
        },
        // 融资融券业务利息收入   
        getMarginTradingInterest(){
            const params={
                time: this.timeSelR
                ? moment(this.timeSelR).format("YYYYMM")
                : '',
            }
            this.options2Data=[]
            api.getMarginTradingInterest(params).then(res=>{
                if(res.ret_code==0){
                    this.options2.xAxis[0].data=res.data.map(item=>item.time_str)
                    this.options2.series[0].data=res.data.map(item=>item.income)
                    this.options2.series[1].data=res.data.map(item=>item.market_rate*100)
                    this.options2Data=res.data
                }
            })
        },
        // 已开信用证券账号数 
        getSecuritiesAccountsNum(){
            const params={
                time: this.timeSelB
                ? moment(this.timeSelB).format("YYYYMM")
                : '',
            }
            this.options3Data=[]
            api.getSecuritiesAccountsNum(params).then(res=>{
                if(res.ret_code==0){
                    this.options3.xAxis[0].data=res.data.map(item=>item.time_str)
                    this.options3.series[0].data=res.data.map(item=>item.income)
                    this.options3.series[1].data=res.data.map(item=>item.total_assets)
                    this.options3Data=res.data

                }
            })
        }
    }

}
</script>
<style lang="scss" scoped>
.myCon{
    margin:0 20px 20px;
    // min-width: 1530px;
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
        height: 685px;
        margin-left: 10px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #c3c3c3;
        .conT{
            display: flex;
            height: 360px;
            >div{
                flex: 1;
                padding-top:8px;
                .conT-l-h{
                    display: flex;
                    margin-right: 30px;
                    .headT{
                        font-size: 16px;
                        font-weight: 600;
                        padding-left: 20px;
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
                .cont-l-e{
                    height: calc(100% - 24px);
                }
            }
        }
        .conB{
            position: relative;
            height: 315px;
            .conB-h{
                position: absolute;
                width: 100%;
                display: flex;
                padding: 0 20px;
                .conB-h-t{
                    font-size: 16px;
                    font-weight: 600;
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
            .conB-e{
                position: relative;
                height: calc(100% - 24px);
                .iconCir{
                    position: absolute;
                    right: 20%;
                    top: 5px;
                    transform: translateX(200%);
                    cursor: pointer;
                }
            }
        }

    }
}
</style>