<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">金融产品覆盖率
                <a-tooltip placement="bottom">
            <template #title>
              <span>购买公募基金、私募基金、信托、资管产品等金融产品的有效客户绝对数占总有效户的比例</span>
            </template>
            <a-icon type="question-circle" class="iconCir"></a-icon>
          </a-tooltip>
                <span class="dataFrom">数据来源: 金融科技部</span></div>
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

        <!-- 表格 -->
        <model-page :modelValue="leftTable" @changeModel="changeModel" title="新增投资者数量">
            <sample-table-x
                :columns="tableColumns"
                :data="tableData"
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
    omponents: {
        monthPicker,
        modelPage
    },
    data(){
        return{
            timeSel:'',
            histroyDate:[],
            new_date:'',
            leftTable:false,
            tableColumns:['日期','购买金融产品有效户','总有效户数','占比'],
            tableData:[],
            optionsData:[],
            options:{
                xAxis:{
                    type:'category',
                    data:[],
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
                yAxis:{
                    type:'value',
                    showMInLabel: true,
                    // splitNumber: 10,
                    // min: 0,
                    // max: 100,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#2f2f2f", //坐标值得具体的颜色
                        },
                        formatter:'{value}%'
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#E2E2E2",
                        },
                    },
                },
                series:[{
                    name:'',
                    type:'scatter',
                    data:[],
                    symbolSize:function(val){
                        val=Math.ceil(val)
                        let res
                        if(val<25){
                            res=12
                        }else if(val>30){
                            res=54
                        }else{
                            switch(val){
                                case 25:
                                    res=18
                                break;
                                case 26:
                                    res=24
                                break;
                                case 27:
                                    res=30
                                break;
                                case 28:
                                    res=36
                                break;
                                case 29:
                                    res=42
                                break;
                                case 30:
                                    res=48
                                break;
                            }
                        }
                        return res
                    },
                    itemStyle:{
                        shadowBlur:5,
                        shadowColor:'rgba(120,36,50,.3)',
                        shadowOffsetY:2,
                        color:new echarts.graphic.RadialGradient(0.4,0.3,1,[
                            {offset:0,color:'rgb(104,138,255)'},
                            {offset:1,color:'rgb(57,86,255)'}
                        ])
                    }
                }],
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
                        <p class='tooltip-line'>购买金融产品的有效户：${
                            this.optionsData[params[0].dataIndex].finance_account
                        }</p>
                        <p class='tooltip-line'>总有效户数：${
                            this.optionsData[params[0].dataIndex].sum_account
                        }</p>
                        <p class='tooltip-line'>金融产品覆盖率：${
                            (params[0].value).toFixed(2)+'%'
                        }</p>
                        </div>`;
                    },
                },
                grid: {
                    top: "18%",
                    left: "1%",
                    right: "1%",
                    bottom: "5%",
                    containLabel: true,
                },
            }
        }
    },
    created(){
        this.getFinancialCoverageTime()
        this.getFinancialCoverage()
    },
    methods:{
        moment,
        // 时间变化 重新调取数据
        changeTime(time){
            this.timeSel=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`

            this.getFinancialCoverage()
        },
        // 关闭弹窗
        changeModel(val){
            this.leftTable=val
        },
        // 获取时间列表
        getFinancialCoverageTime(){
            api.getFinancialCoverageTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`

                }
            })
        },
        // 获取数据
        getFinancialCoverage(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getFinancialCoverage(params).then(res=>{
                if(res.ret_code==0){
                    if(res.data.length>0){
                        // this.new_date=res.data[0].time_str
                        this.options.xAxis.data=res.data.map(item=>item.time_str)
                        this.options.series[0].data=res.data.map(item=>item.finance_ranking*100)

                        this.optionsData=[]
                        this.optionsData=res.data
                        this.optionsData.forEach(el=>{
                            el.finance_account=this.$toT(el.finance_account)
                            el.sum_account=this.$toT(el.sum_account)
                        })
                        this.tableData=[]
                        this.tableData.push(res.data.map(item=>item.time_str))
                        this.tableData.push(res.data.map(item=>item.finance_account))
                        this.tableData.push(res.data.map(item=>item.sum_account))
                        this.tableData.push(res.data.map(item=>(item.finance_ranking*100).toFixed(2)+'%'))

                    }else{
                        this.new_date=''
                        this.options.xAxis.data=[]
                         this.options.series[0].data=[]
                         this.optionsData=[]
                         this.tableData=[]
                    }
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
        height: 340px;
        margin: 10px;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid #d4d4d4;
        background-color: #fff;
    }
}
</style>
