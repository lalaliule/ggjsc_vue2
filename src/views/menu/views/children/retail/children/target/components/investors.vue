<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">新增投资者数量<span class="dataFrom">数据来源: 信息技术部/中国证券登记结算网</span></div>
            <div class="timeBox">
                <div class="title">
                    <span class="dateCon">数据日期: <span>{{new_date}}</span></span>
                    <month-picker 
                        :histroyDate="histroyDate" 
                        :timeSel="timeSel"
                        @getTime="changeTime" 
                    ></month-picker>
                    <img @click="leftTable = true" 
                    src="@/assets/imgs/overallOperation/biaodan.png" alt="">
                </div>
            </div>
        </div>
        <div class="main-con">
            <echart-common :options="options"></echart-common>
        </div>

        <model-page :modelValue="leftTable" @changeModel="changeModel" title="新增投资者数量">
            <sample-table-x
                :columns="tableColumns"
                :data="dataA"
            ></sample-table-x>
        </model-page>
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
            dataA:[],
            optionsData:[],
            options: {
                title:{
                    text:''
                },
                backgroundColor: "#fff",// 图表背景色
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
                    <p class='tooltip-line'>公司新开证券账户数：${
                        this.$toThousands(params[0].value)
                    }</p>
                    <p class='tooltip-line'>中登新开证券账户数：${
                        this.$toThousands(this.optionsData[params[0].dataIndex].zd_bond_account_add_num)
                    }</p>
                    <p class='tooltip-line'>${params[1].seriesName}：${
                        (params[1].value*100).toFixed(2)+'%'
                    }</p>
                    
                    </div>`;
                },
                },
                legend: {
                right: "center",
                top: "20",
                selectedMode: false,
                itemWidth: 40,
                data: [
                    {
                    name: "新开证券帐户数",
                    // icon: "roundRect",
                    },
                    {
                    name: "市场份额",
                    // icon: "line",
                    },
                ],
                },
                grid: {
                top: "20%",
                left: "1%",
                right: "1%",
                bottom: "3%",
                containLabel: true,
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
                        color: "#2f2f2f", //坐标值得具体的颜色
                    },
                    },
                },
                ],
                yAxis: [
                {
                    type: "",
                    show: false,
                    axisTick:{show:false},
                    axisLine:{show:false},
                    splitLine: {
                     show: false,
                    },
                },
                {
                    type: "",
                    show: false,
                    axisTick:{show:false},
                    axisLine:{show:false},
                    splitLine: {
                        show: false,
                    },
                },
                ],
                color:['#363FC8'],
                series: [
                {
                    name: "新开证券帐户数",
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 1, color: "#6bcac1" },
                        { offset: 0, color: "#2ccdd7" },
                    ]),
                    itemStyle: {
                    normal:{
                        barBorderRadius: [15,15,0,0],
                    }              
                    },
                    type: "bar",
                    barWidth: "10%",
                    data: [],
                },
                {
                    name: "市场份额",
                    type: "line",
                    yAxisIndex: 1,
                    showSymbol: false,
                    lineStyle: {
                    color: "#363FC8",
                    type:'dashed',
                    },
                    emphasis: {
                            lineStyle: {
                               width:2 
                            }
                        },
                    data: [],
                },
                ],
            },
            leftTable:false,
            tableColumns:['日期','新开证券账户数','中登新开证券账户数','市场份额']
        }
    },
    created(){
        // 获取历史时间
        this.getInvestoeAddHistoryTime()
        this.getInvestorAddHistoryData()
    },
    methods:{
        moment,
        // 时间变化 重新调取数据
        changeTime(time){
            this.timeSel=time
            this.getInvestorAddHistoryData()
            // this.getAShareAccountHistoryData()
        },
        // 获取历史时间
        getInvestoeAddHistoryTime(){
            api.getInvestoeAddHistoryTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                }
            })
        },
        // 新增投资者数量历史走势
        getInvestorAddHistoryData(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getInvestorAddHistoryData(params).then(res=>{
                // console.log(res,'...ree')
                if(res.ret_code==0){
                  this.new_date=res.data.date  
                  this.options.xAxis[0].data=res.data.data.map(item=>item.oc_date)
                  this.options.series[0].data=res.data.data.map(item=>item.bond_add_account_num)
                  this.options.series[1].data=res.data.data.map(item=>item.market)
                  this.dataA=[]
                  this.optionsData=[]
                  this.dataA.push(res.data.data.map(item=>item.oc_date))
                  this.dataA.push(res.data.data.map(item=>this.$toThousands(item.bond_add_account_num)))
                  this.dataA.push(res.data.data.map(item=>this.$toThousands(item.zd_bond_account_add_num)))
                //   this.dataA.push(res.data.data.map(item=>item.market))
                  this.dataA.push(res.data.data.map(item=>(item.market*100).toFixed(2)+'%'))
                  this.optionsData=res.data.data
                }
            })
        },
        // 关闭弹窗
        changeModel(val){
            this.leftTable=val
        }
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
                z-index: 9996;
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
                    // width: 24px;
                    // height: 24px;
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
        height: 348px;
        margin: 10px;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid #d4d4d4;
    }
}
</style>