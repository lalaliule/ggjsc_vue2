<template>
      <div class="myCon">
        <div class="main-head">
            <div class="title">资管业务<span class="dataFrom">数据来源: 协会系统</span></div>
        </div>
        <div class="main-con">
            <!-- <div class="conT">
                <div class="conH">
                    <div class="conH-t">月度经营指标</div>
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
                <div class="conE">
                    <echart-common :options="options1"></echart-common>
                </div>
            </div> -->
            <div class="conB">
                <div class="conH">
                    <!-- <div class="conH-t">季度经营指标</div> -->
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
                <div class="conB-b">
                    <div class="conB-l">
                        <div class="conBh">
                            <div class="htitle">资管合规受托资金规模</div>
                            <div class="hcon">
                                <!-- <tab-toggle
                                :change="tabChange"
                                :tab="['合规受托资金', '资产管理产品日均保有量占比']"
                                ></tab-toggle> -->
                            </div>
                        </div>
                        <div class="conBe">
                            <echart-common :options="current==0?options2:options3"></echart-common>
                        </div>
                    </div>
                    <!-- <div class="conB-l">
                        <ul>
                            <li>
                                <img src="@/assets/imgs/business/img-6.png" alt="">
                                <div>
                                    <p class="count1">{{option4Last.income&&$toT(option4Last.income)}}</p>
                                    <p>资管业务净收入</p>
                                </div>
                            </li>
                            <li>
                                <img src="@/assets/imgs/business/img-2.png" alt="">
                                <div>
                                    <p class="count2">{{(option4Last.market_rate*100).toFixed(2)+'%'}}</p>
                                    <p>市场份额</p>
                                </div>
                            </li>
                            <li>
                                <img src="@/assets/imgs/business/img-3.png" alt="">
                                <div>
                                    <p class="count3"> <span>{{option4Last.rate}}</span>/{{option4Last.num}}</p>
                                    <p>排名</p>
                                </div>
                            </li>
                        </ul>
                    </div> -->
                    <div class="conB-r">
                        <div class="conBh">
                            <div class="htitle">资管业务净收入</div>
                        </div>
                        <div class="conBe">
                            <echart-common :options="options4"></echart-common>
                        </div>
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
            new_dateT:'',
            timeSelT:'',
            histroyDateT:[],
            options1:{
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
                    },
                    {
                        type: "value",
                        min:0,
                        max:100,
                        splitNumber:10,
                        axisLabel:{
                            formatter: (params) => {
                                return params.toFixed(2)+'%'
                            }
                        },
                        splitLine: {
                            show:false,
                        },
                    },
                ],
                series:[
                {
                    name:'资管产品日均保有量',
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
                    bottom: "0%",
                    containLabel: true,
                },
                legend: {
                    right:'5%',
                    top: "6",
                    selectedMode: false,
                    itemHeight:10,
                    data: ['资管产品日均保有量'],
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
                        <p class='tooltip-line'>资管产品日均保有量(万元)：${this.$toT(params[0].value)}</p>
                        </div>`;
                    },
                },
            },

            new_dateB:'',
            timeSelB:'',
            histroyDateB:[],
            current:0,
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
                        name:'资金规模',
                        splitLine: {
                            show:false,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                        },
                        nameLocation:'end',
                        nameTextStyle:{
                            fontSize:14,
                            padding:[0,70,0,0]
                        }
                    },
                    {
                        type: "value",
                        name:'市场份额',
                        axisLabel:{
                            formatter: (params) => {
                                return params.toFixed(2)+'%'
                            }
                        },
                        nameTextStyle:{
                            fontSize:14,
                            padding:[0,-70,0,0]
                        }
                    },
                ],
                series:[
                    {
                      name: "合规受托资金(万元)",
                      type: "bar",
                      barWidth: "30",
                      data: [],
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 1, color: "#94a4ff" },
                            { offset: 0, color: "#2142ff" },
                        ]),
                      itemStyle: {
                          barBorderRadius: 15
                      }
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
                            color:'#ff885d'
                        },
                        lineStyle:{
                            type:'dashed',
                            width:2
                        },
                        emphasis: {
                            lineStyle: {
                               width:2 
                            }
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
                        <p class='tooltip-line'>合规受托资金(万元)：${
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
                grid: {
                    top: "20%",
                    left: "5%",
                    right: "5%",
                    bottom: "6%",
                    containLabel: true,
                },
                legend: {
                    left:'center',
                    top: "15",
                    selectedMode: false,
                    itemHeight:10,
                    data: [
                        {
                        name: "合规受托资金(万元)",
                        
                        },
                        {
                        name: "市场份额",
                        },
                        
                    ],
                },
            },
            options3Data:[],
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
                yAxis: [
                    {
                        type: "value",
                        name:'业务规模',
                        splitLine: {
                            show:false,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                        },
                        nameLocation:'end',
                        nameTextStyle:{
                            fontSize:14,
                            padding:[0,70,0,0]
                        }
                    },
                    {
                        type: "value",
                        name:'市场份额',
                        axisLabel:{
                            formatter: (params) => {
                                return params.toFixed(2)+'%'
                            }
                        },
                        nameTextStyle:{
                            fontSize:14,
                            padding:[0,-70,0,0]
                        }
                    },
                ],
                series:[
                    {
                      name: "业务规模",
                      type: "bar",
                      barWidth: 50,
                      data: [],
                    //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    //         { offset: 1, color: "#94a4ff" },
                    //         { offset: 0, color: "#2142ff" },
                    //     ]),
                      itemStyle: {
                          color:'rgba(208,172,255,0.5)',
                          barBorderRadius: [10,10,0,0]
                      }
                    },
                        {
                        name:'市场份额',
                        type:'bar',
                        data:[],
                        // z:1,
                        yAxisIndex: 1,
                        barGap:'-90%',
                        barWidth:40,
                        itemStyle:{
                            // borderWidth:2,
                            color:'#ff885d',
                            barBorderRadius: [10,10,0,0]
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
                        <p class='tooltip-line'>资管总规模(万元)：${
                            this.$toT(params[0].value)
                        }</p>
                        <p class='tooltip-line'>资管产品日均保有量(万元)：${
                            this.options3Data[params[0].dataIndex].rate?this.$toT(this.options3Data[params[0].dataIndex].rate):''
                        }</p>
                        <p class='tooltip-line'>占比：${(params[1].value).toFixed(2)+'%'}</p>
                        
                        </div>`;
                    },
                },
                grid: {
                    top: "20%",
                    left: "5%",
                    right: "5%",
                    bottom: "6%",
                    containLabel: true,
                },
            },
            options4Data:[],
            options4:{
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
                        name:'净收入规模',
                        splitLine: {
                            show:false,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                        },
                        nameLocation:'end',
                        nameTextStyle:{
                            fontSize:14,
                            padding:[0,70,0,0]
                        }
                    },
                    {
                        type: "value",
                        name:'市场份额',
                        axisLabel:{
                            formatter: (params) => {
                                return params.toFixed(2)+'%'
                            }
                        },
                        nameTextStyle:{
                            fontSize:14,
                            padding:[0,-70,0,0]
                        }
                    },
                ],
                series:[
                    {
                      name: "资管业务净收入(万元)",
                      type: "bar",
                      barWidth: "30",
                      data: [],
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 1, color: "#ffc1a0" },
                            { offset: 0, color: "#ff805b" },
                        ]),
                      itemStyle: {
                          barBorderRadius: 15
                      }
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
                            color:'#4964ff'
                        },
                        lineStyle:{
                            type:'dashed',
                            width:2
                        },
                        emphasis: {
                            lineStyle: {
                               width:2 
                            }
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
                        <p class='tooltip-line'>资管业务净收入(万元)：${
                            this.$toT(params[0].value)
                        }</p>
                        <p class='tooltip-line'>市场份额：${
                            (params[1].value).toFixed(2)+'%'
                        }</p>
                        <p class='tooltip-line'>排名：${
                            this.options4Data[params[0].dataIndex].rate
                        }/${this.options4Data[params[0].dataIndex].num}</p>
                        
                        </div>`;
                    },
                },
                grid: {
                    top: "20%",
                    left: "5%",
                    right: "5%",
                    bottom: "6%",
                    containLabel: true,
                },
                legend: {
                    left:'center',
                    top: "15",
                    selectedMode: false,
                    itemHeight:10,
                    data: [
                        {
                        name: "资管业务净收入(万元)",
                        
                        },
                        {
                        name: "市场份额",
                        },
                        
                    ],
                },
            },
            option4Last:{},
            detailOption:{}

        }
    },
    created(){
        this.getAssetBusinessMMTime()
        this.getAssetBusinessMM()

        this.getAssetBusinessSETime()
        this.getAssetBusinessSE()
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
            this.getAssetBusinessMM()
        },
        changeTimeB(time){
            this.timeSelB=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_dateB=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.getAssetBusinessSE()
        },
        // 切换 
        tabChange(index){
            this.current=index
            this.options2Data=[]
            this.options3Data=[]
            switch(this.current){
                case 0:
                    this.options2.xAxis[0].data=this.detailOption.complianca_list.map(item=>item.time_str)
                    this.options2.series[0].data=this.detailOption.complianca_list.map(item=>item.income)
                    this.options2.series[1].data=this.detailOption.complianca_list.map(item=>item.market_rate*100)
                    this.options2Data=this.detailOption.complianca_list
                break;
                case 1:
                    this.options3.xAxis[0].data=this.detailOption.asset_list.map(item=>item.time_str)
                    this.options3.series[0].data=this.detailOption.asset_list.map(item=>item.income)
                    this.options3.series[1].data=this.detailOption.asset_list.map(item=>item.market_rate*100)
                    this.options3Data=this.detailOption.asset_list
                break;
            }
        },
        // 资管业务月度经营指标查看历史 
        getAssetBusinessMMTime(){
            api.getAssetBusinessMMTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateT=res.data
                    this.timeSelT = this.histroyDateT.length > 0 && this.histroyDateT[0];
                    let str=this.histroyDateT.length > 0 && this.histroyDateT[0]
                    let tiemStr=str.split('-')
                    this.new_dateT=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 资管业务季度经营指标查看历史 
        getAssetBusinessSETime(){
            api.getAssetBusinessSETime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateB=res.data
                    this.timeSelB = this.histroyDateB.length > 0 && this.histroyDateB[0];
                    let str=this.histroyDateB.length > 0 && this.histroyDateB[0]
                    let tiemStr=str.split('-')
                    this.new_dateB=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 资管业务月度经营指标 
        getAssetBusinessMM(){
            const params={
                time: this.timeSelT
                ? moment(this.timeSelT).format("YYYYMM")
                : '',
            }
            api.getAssetBusinessMM(params).then(res=>{
                if(res.ret_code==0){
                    this.options1.xAxis[0].data=res.data.map(item=>item.time_str)
                    this.options1.series[0].data=res.data.map(item=>item.income)
                    // this.options1Data=res.data

                }
            })
        },
        // 资管业务季度经营指标 
        getAssetBusinessSE(){
            const params={
                time: this.timeSelB
                ? moment(this.timeSelB).format("YYYYMM")
                : '',
            }
             this.options2Data=[]
            this.options3Data=[]
            this.options4Data=[]
            api.getAssetBusinessSE(params).then(res=>{
                if(res.ret_code==0){
                    //合规受托集合 List compliancaList = new ArrayList(); 
                    //资产管理产品日均保有量 集合 List assetList = new ArrayList(); 
                    //资产管理业务净收入 集合 List netIncome = new ArrayList(); 
                    switch(this.current){
                        case 0:
                            this.options2.xAxis[0].data=res.data.complianca_list.map(item=>item.time_str)
                            this.options2.series[0].data=res.data.complianca_list.map(item=>item.income)
                            this.options2.series[1].data=res.data.complianca_list.map(item=>item.market_rate*100)
                            this.options2Data=res.data.complianca_list
                        break;
                        case 1:
                            this.options3.xAxis[0].data=res.data.asset_list.map(item=>item.time_str)
                            this.options3.series[0].data=res.data.asset_list.map(item=>item.income)
                            this.options3.series[1].data=res.data.asset_list.map(item=>item.market_rate*100)
                            this.options3Data=res.data.asset_list
                            // console.log(this.options3Data,'..this.options3Data')
                        break;
                    }
                    
                    this.options4.xAxis[0].data=res.data.net_income.map(item=>item.time_str)
                    this.options4.series[0].data=res.data.net_income.map(item=>item.income)
                    this.options4.series[1].data=res.data.net_income.map(item=>item.market_rate*100)
                    this.options4Data=res.data.net_income
                    this.detailOption=res.data
                    this.option4Last=this.options4Data[this.options4Data.length-1]
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
        // height: 763px;
        height: 320px;
        margin-left: 10px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #c3c3c3;
        position: relative;
        .conT{
            height: 349px;
            .conE{
                height: calc(100% - 40px);
            }
        }
        .conB{
            // height: calc(100% - 349px);
            height: 100%;
            .conB-b{
                display: flex;
                height: calc(100% - 34px);
                padding: 0 20px;
                >div{
                    flex: 1;
                    height: 100%;
                }
                // .conB-l{
                //     flex: none;
                //     width: 257px;
                //     ul{
                //         li{
                //             display: flex;
                //             justify-content: space-between;
                //             align-items: center;
                //             height: 64px;
                //             margin-top: 20px;
                //             padding-left:8px;
                //             border: 1px solid #c3c3c3;
                //             background-color: #f8f9fa;
                //             img{
                //         flex: none;
                //         width: 50px;
                //         height: 50px;
                //     }
                //     >div{
                //         flex: 1;
                //         text-align: center;
                //         >p{
                //             margin-bottom: 0;
                //             &:nth-child(1){
                //                 font-weight: 600;
                //             }
                //         }
                //         .count1{
                //             color: #2646ff;
                //         }
                //         .count2{
                //             color: #ff8a5f;
                //         }
                //         .count3{
                //             >span{
                //                 color: #ae70ff;
                //             }
                //         }
                //     }
                //         }
                //     }
                // }
                .conB-r{
                    flex: 1;
                }
                .conBh{
                    display: flex;
                    justify-content: space-between;
                    padding-left: 25px;
                    line-height: 40px;
                    .htitle{
                        font-size: 16px;
                        font-weight: 600;
                    }
                    .hcon{
                        width: 338px;
                        height: 40px; 
                        ::v-deep .tab-toggle{
                            height: 40px;
                            li{
                                padding: 0 18px;
                                line-height: 38px;
                            }

                        }  
                    }
                }
                .conBe{
                    height: calc(100% - 40px);
                }
            }
            
        }
        .conH{
            position: absolute;
            right: -20px;
            top:-40px;
            width: 280px;
            display: flex;
            padding: 10px 20px 0;
            .conH-t{
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
    }
}
</style>