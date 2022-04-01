<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">资管产品带动新开户
                <!-- <a-tooltip placement="bottom">
                    <template #title>
                    <span>当年新增有效户的第一笔交易为购买资管产品的客户数</span>
                    </template>
                    <a-icon type="question-circle" class="iconCir"></a-icon>
                </a-tooltip> -->
                <span class="dataFrom">数据来源: 金融科技部</span>
            </div>
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
            <!-- 带动新开户 -->
            <a-tooltip placement="bottom">
                    <template #title>
                    <span>当年新增有效户的第一笔交易为购买资管产品的客户数</span>
                    </template>
                    <a-icon type="question-circle" class="iconCir1"></a-icon>
            </a-tooltip>
            <!-- 新增有效客户 -->
            <a-tooltip placement="bottom">
                    <template #title>
                    <span>本年新增客户资产或交易量大于一万的客户数量</span>
                    </template>
                    <a-icon type="question-circle" class="iconCir2"></a-icon>
            </a-tooltip>
            <echart-common :options="options"></echart-common>
        </div>

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
    components: {
        monthPicker,
        modelPage
    },
    data(){
        return{
            timeSel:'',
            histroyDate:[],
            new_date:'',
            leftTable:false,
            tableColumns:['日期','资管产品带动新开户数',
            '新增有效数','占比'],
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
                yAxis:[
                    {
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
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#E2E2E2",
                        },
                    },
                },
                {
                    type:'value',
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(243,244,245,1)",
                        },
                    },
                    position:'right',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#2f2f2f", //坐标值得具体的颜色
                        },
                        formatter:'{value}%'
                    },
                },
                ],
                legend:{
                    left: "center",
                    icon: "rect",
                    top: "20",
                    itemGap:30,
                    // height: "10",
                    itemHeight:10,
                    selectedMode: false,
                    textStyle:{
                        fontSize:16
                    }
                },
                series:[
                    {
                        name:'资管产品带动新开户数',
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
                        name:'新增有效客户数',
                        type:'bar',
                        animation:true,
                        // yAxisIndex: 1,
                        data:[],
                        barWidth:60,
                        barGap:'-125%',
                        // z:1,
                        itemStyle:{
                            normal:{
                                color:'rgba(255,255,255,0)',
                                barBorderColor:'tomato',
                                barBorderWidth:3,
                                barBorderRadius:[10,10,0,0],
                                borderType:'dotted'
                            }
                        },
                    },
                    {
                        name:'',
                        type:'line',
                        data:[],
                        animation:true,
                        symbol:'emptyRect',
                        symbolSize:[6,14],
                        yAxisIndex: 1,
                        // symbolSize:6,
                        linStyle:{
                            color:'pink',
                            width:1,
                            type:'solid'
                        },
                        itemStyle:{
                            borderWidth:2,
                            color:'pink'
                        },
                        label:{
                            show:true,
                            color:'#333',
                            position:'top',
                            // padding:10,
                            distance:10,
                            formatter: function(parmas) {
                                return (parmas.value)+'%';
                            },
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
                            params[0].axisValueLabel
                        }</p>
                        <p class='tooltip-line'>资管产品带动新开户：${
                            this.$toT(this.optionsData[params[0].dataIndex].asset_product_new_accounts)
                        }</p>
                        <p class='tooltip-line'>新增有效客户：${
                            this.$toT(this.optionsData[params[0].dataIndex].valid_accounts_adds)
                        }</p>
                        <p class='tooltip-line'>占比：${
                            (this.optionsData[params[0].dataIndex].ratio*100).toFixed(2)+'%'
                        }</p>
                        </div>`;
                        },
                },
                grid: {
                    top: "20%",
                    left: "3%",
                    right: "3%",
                    bottom: "3%",
                    containLabel: true,
                },
            }

        }
    },
    created(){
        this.getAssetProdCustHistoryTime()
        this.getAssetPrdAccountAddData()
    },
    methods:{
        moment,
        // 时间变化 重新调取数据
        changeTime(time){
            this.timeSel=time
            this.getAssetPrdAccountAddData()
        },
        // 获取历史时间
        getAssetProdCustHistoryTime(){
            api.getAssetProdCustHistoryTime().then(res=>{                
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                }
            })
        },
        // 获取数据
        getAssetPrdAccountAddData(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getAssetPrdAccountAddData(params).then(res=>{
                this.optionsData=[]
                this.tableData=[]
                if(res.ret_code==0){
                  this.new_date=res.data.date  
                  this.options.xAxis.data=res.data.data.map(item=>item.oc_date)
                  this.options.series[0].data=res.data.data.map(item=>item.asset_product_new_accounts)
                  this.options.series[1].data=res.data.data.map(item=>item.valid_accounts_adds)
                  this.options.series[2].data=res.data.data.map(item=>(item.ratio*100).toFixed(2))
                  this.optionsData=res.data.data

                  this.tableData.push(res.data.data.map(item=>item.oc_date))
                  this.tableData.push(res.data.data.map(item=>this.$toThousands(item.asset_product_new_accounts)))
                  this.tableData.push(res.data.data.map(item=>this.$toThousands(item.valid_accounts_adds)))
                  this.tableData.push(res.data.data.map(item=>(item.ratio*100).toFixed(2)+'%'))
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
        position: relative;
        height: 348px;
        margin: 10px;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid #d4d4d4;
        background-color: #fff;
        .iconCir1,.iconCir2{
            position: absolute;
            left: 50%;
            top: 25px;
            z-index: 9999;
        }
        .iconCir1{
            transform: translateX(135%);
        }
        .iconCir2{
            transform: translateX(1390%);
        }
    }
}
</style>