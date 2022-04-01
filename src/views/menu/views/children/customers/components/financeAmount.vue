<template>
    <div class="myCon">
        <!-- 股权融资 -->
        <div class="con-left">
            <div class="main-head">
                <div class="title">股权融资金额<span class="dataFrom">数据来源: 协会系统</span></div>
                    <div class="timeBox">
                        <div class="title">
                            <span class="dateCon">数据日期:<span>{{new_dateL}}</span></span>
                            <month-picker 
                                :histroyDate="histroyDateL"
                                :timeSel="timeSelL"
                                @getTime="changeTimeL" 
                            ></month-picker>
                        </div>
                    </div>
                </div>
            <div class="main-con">
                <img src="@/assets/imgs/overallOperation/biaodan.png" 
                @click="leftTable=true"
                >
                <div class="echartsCon">
                    <echart-common :options="options1"></echart-common>
                </div>
            </div>
        </div>
        <!-- 债券融资 -->
        <div class="con-right">
            <div class="main-head">
                <div class="title">债券融资金额<span class="dataFrom">数据来源: 协会系统</span></div>
                    <div class="timeBox">
                        <div class="title">
                            <span class="dateCon">数据日期:<span>{{new_dateR}}</span></span>
                            <month-picker 
                                :histroyDate="histroyDateR"
                                :timeSel="timeSelR"
                                @getTime="changeTimeR" 
                            ></month-picker>
                        </div>
                </div>
            </div>
            <div class="main-con">
                <img src="@/assets/imgs/overallOperation/biaodan.png" 
                @click="rightTable=true"
                >
                <div class="echartsCon">
                    <echart-common :options="options2"></echart-common>
                </div>
            </div>
        </div>
        <model-page :modelValue="leftTable" @changeModel="changeModelL" title="股权融资金额(万元)">
            <sample-table-x
                :columns="tableColumnsL"
                :data="dataL"
            ></sample-table-x>
        </model-page>
        <model-page :modelValue="rightTable" @changeModel="changeModelR" title="债券融资金额(万元)">
            <sample-table-x
                :columns="tableColumnsR"
                :data="dataR"
            ></sample-table-x>
        </model-page>
    </div>
</template>

<script>
import monthPicker from "@/components/monthPicker/index"
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
        return{
            // 时间 开始
            histroyDateL:[],
            timeSelL:'',
            new_dateL:'',
            histroyDateR:[],
            timeSelR:'',
            new_dateR:'',
            // 时间 结束
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
                        axisLabel:{
                            formatter: (params) => {
                                return params.toFixed(2)+'%'
                            }
                        },
                        position:'left',
                    },
                    {
                        type: "value",
                        inverse: true,
                        min:1,
                        // interval:15,
                        splitLine: {
                            show:false,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                        },
                        position:'right'
                    },
                ],
                series:[
                    {
                        name:'排名',// 线 
                        type:'line',
                        data:[],
                        // z:1,
                        yAxisIndex: 1,
                        showSymbol: false,
                        itemStyle:{
                            borderWidth:2,
                            color:'#1f40ff'
                        },
                    },
                    {
                        name:'市场份额',// 柱形图 
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
                ],
                legend: {
                    right:'120',
                    top: "10",
                    selectedMode: false,
                    itemWidth: 40,
                    data: [
                        {
                        name: "市场份额",
                        },
                        {
                        name: "排名",
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
            return `<div style='color:#fff'>
               <p class='tooltip-title'>${
                 params[0].axisValue
               }</p>
               <p class='tooltip-line'>市场份额：${
                 (params[1].value).toFixed(2)+'%'
               }</p>
               <p class='tooltip-line'>排名：${
                 params[0].value
               }/${this.options1Data[params[0].dataIndex].number}</p>
               <p class='tooltip-line'>本年累计(万元)：${
                 this.$toT(this.options1Data[params[0].dataIndex].money)
               }</p>
              
             </div>`;
          },
        },
            },
            options1Data:[],
            leftTable:false,
            dataL:[],
            tableColumnsL:['机构名称','市场份额','排名','股权融资金额(万元)'],
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
                        axisLabel:{
                            formatter: (params) => {
                                return params.toFixed(2)+'%'
                            }
                        },
                        position:'left',
                    },
                    {
                        type: "value",
                        inverse: true,
                        min:1,
                        // interval:15,
                        splitLine: {
                            show:false,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                        },
                        position:'right'
                    },
                ],
                series:[
                    {
                        name:'排名',// 线 
                        type:'line',
                        data:[],
                        // z:1,
                        yAxisIndex: 1,
                        showSymbol: false,
                        itemStyle:{
                            borderWidth:2,
                            color:'#ff8354'
                        },
                        // areaStyle:{
                        // color:{
                        //     type:'line',
                        //     x:0,
                        //     y:0,
                        //     x2:2,y2:1,
                        //     colorStops:[
                        //         {
                        //             offset:0,color:'#d7ddff'
                        //         },
                        //         {
                        //             offset:1,color:'#d7ddff'
                        //         },
                        //     ],
                        //     global:false
                        // }
                        // },
                    },
                    {
                        name:'市场份额',// 柱形图 
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
                                    color: "#fdac7e", // 0% 处的颜色
                                    },
                                    {
                                    offset: 0,
                                    color: "#ff805b", // 100% 处的颜色
                                    },
                                ],
                                globalCoord: false, // 缺省为 false
                                }, //渐变颜色
                            },
                            },
                            symbol: "path://M150 50 L130 130 L170 130  Z",
                            barWidth: "40%",
                        },
                ],
                legend: {
                    right:'120',
                    top: "10",
                    selectedMode: false,
                    itemWidth: 40,
                    data: [
                        {
                        name: "市场份额",
                        },
                        {
                        name: "排名",
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
            return `<div style='color:#fff'>
               <p class='tooltip-title'>${
                 params[0].axisValue
               }</p>
               <p class='tooltip-line'>市场份额：${
                 (params[1].value).toFixed(2)+'%'
               }</p>
               <p class='tooltip-line'>排名：${
                 params[0].value
               }/${this.options2Data[params[0].dataIndex].number}</p>
               <p class='tooltip-line'>本年累计(万元)：${
                 this.$toT(this.options2Data[params[0].dataIndex].money)
               }</p>
              
             </div>`;
          },
        },
            },
            options2Data:[],
            rightTable:false,
            dataR:[],
            tableColumnsR:['机构名称','市场份额','排名','债券融资金额(万元)']
        }
    },
    created(){
        this.getSharesMoneyTime()
        this.getBondMoneyTime()

        this.getSharesMoney()
        this.getBondMoney()
    },
    methods:{
        moment,
        // 时间变化 开始
        changeTimeL(time){
            this.timeSelL=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_dateL=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.getSharesMoney()
        },
        changeTimeR(time){
            this.timeSelR=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_dateR=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.getBondMoney()
        },
        // 时间变化 结束

        // 获取时间列表 开始
        // 股权融资金额 时间列表
        getSharesMoneyTime(){
            api.getSharesMoneyTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateL=res.data
                    this.timeSelL = this.histroyDateL.length > 0 && this.histroyDateL[0];
                    let str=this.histroyDateL.length > 0 && this.histroyDateL[0]
                    let tiemStr=str.split('-')
                    this.new_dateL=`${tiemStr[0]}年${tiemStr[1]}月`
                }
            })
        },
        // 债券融资金额 时间列表
        getBondMoneyTime(){
            api.getBondMoneyTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDateR=res.data
                    this.timeSelR = this.histroyDateR.length > 0 && this.histroyDateR[0];
                    let str=this.histroyDateR.length > 0 && this.histroyDateR[0]
                    let tiemStr=str.split('-')
                    this.new_dateR=`${tiemStr[0]}年${tiemStr[1]}月`
                }
            })
        },
        // 获取时间列表 结束

        // 获取融资金额 开始
        // 股权融资金额
        getSharesMoney(){
            const params={
                time: this.timeSelL
                ? moment(this.timeSelL).format("YYYYMM")
                : '',
            }
            this.options1Data=[]
            this.dataL=[]
            api.getSharesMoney(params).then(res=>{
                if(res.ret_code==0){
                    this.options1.xAxis[0].data=res.data.map(item=>item.time_str)
                    this.options1.series[1].data=res.data.map(item=>(item.market_share*100))
                    this.options1.series[0].data=res.data.map(item=>item.ranking)
                    this.options1Data=res.data

                    this.dataL.push(res.data.map(item=>item.time_str))
                    this.dataL.push(res.data.map(item=>(item.market_share*100).toFixed(2)+'%'))
                    this.dataL.push(res.data.map(item=>item.ranking))
                    this.dataL.push(res.data.map(item=>this.$toT(item.money)))
                }
            })
        },
        // 债券融资金额
        getBondMoney(){
            const params={
                time: this.timeSelR
                ? moment(this.timeSelR).format("YYYYMM")
                : '',
            }
            this.options2Data=[]
            this.dataR=[]
            api.getBondMoney(params).then(res=>{
                if(res.ret_code==0){
                    this.options2.xAxis[0].data=res.data.map(item=>item.time_str)
                    this.options2.series[1].data=res.data.map(item=>(item.market_share*100))
                    this.options2.series[0].data=res.data.map(item=>item.ranking)
                    this.options2Data=res.data

                    this.dataR.push(res.data.map(item=>item.time_str))
                    this.dataR.push(res.data.map(item=>(item.market_share*100).toFixed(2)+'%'))
                    this.dataR.push(res.data.map(item=>item.ranking))
                    this.dataR.push(res.data.map(item=>this.$toT(item.money)))

                }
            })
        },
        // 获取融资金额 结束

        // 关闭弹窗
        changeModelL(val){
            this.leftTable=val
        },
        changeModelR(val){
            this.rightTable=val
        }
    },
}
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
}
.myCon{
    display: flex;
    margin:0 30px 20px;
    &::after{
    content: '';
    position: fixed;
    display: block;
  }
    .con-left,.con-right{
        flex: 1;
        .main-head{
            display: flex;
            .title{
                font-size: 18px;
                // font-family: PingFangSC-Medium, PingFang SC;
                font-weight: bolder;
                color: #2f2f2f;
                // margin-left: 10px;
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
            position: relative;
            height: 389px;
            margin: 10px 0 0 0;
            border-radius: 10px;
            background-color: #fff;
            img{
                position: absolute;
                top: 10px;
                right: 20px;
                // width: 24px;
                // height: 24px;
                cursor: pointer;
                z-index: 9996;
            }
            .echartsCon{
                height: 100%;
            }
        }
    }
    .con-left{
        margin-right: 20px;
    }

}
</style>