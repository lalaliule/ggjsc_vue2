<template>
<div class="myCon">
    <div class="main-head">
            <div class="title">客户结构<span class="dataFrom">数据来源: 金融科技部</span></div>
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
        <!-- 上部饼图 -->
        <div class="topCon">
            <div class="topItem">
                <div class="echartsCon">
                    <img src="@/assets/imgs/customer.png" alt="">
                </div>
                <div class="numCon">
                    <p class="numC">{{ customer.sum_account?$toT(customer.sum_account):''}}</p>
                    <p class="titleC">总有效户数
                        <a-tooltip placement="bottom">
                            <template #title>
                            <span>近12个月资产或交易量大于一万的客户数量</span>
                            </template>
                            <a-icon type="question-circle" class="iconCir"></a-icon>
                        </a-tooltip>
                    </p>
                </div>
            </div>
            <div class="topItem">
                <div class="echartsCon">
                    <echart-common :options="pieOptions1"></echart-common>
                </div>
                <div class="numCon">
                    <p class="numC">{{ customer.assets_exceed30?$toT(customer.assets_exceed30):'' }}</p>
                    <p class="titleC">资产30万以上有效客户数</p>
                </div>
            </div>
            <div class="topItem">
                <div class="echartsCon">
                    <echart-common :options="pieOptions2"></echart-common>
                </div>
                <div class="numCon">
                    <p class="numC">{{ customer.age_less55?$toT(customer.age_less55):'' }}</p>
                    <p class="titleC">55周岁以下有效客户数</p>
                </div>
            </div>
            <div class="topItem">
                <div class="echartsCon">
                    <echart-common :options="pieOptions3"></echart-common>
                </div>
                <div class="numCon">
                    <p class="numC">{{ customer.low_risk?$toT(customer.low_risk):'' }}</p>
                    <p class="titleC">低风险偏好有效客户数
                        <a-tooltip placement="bottom">
                            <template #title>
                            <span>风险偏好为保守和稳健型的有效客户数</span>
                            </template>
                            <a-icon type="question-circle" class="iconCir"></a-icon>
                        </a-tooltip>
                    </p>
                </div>
            </div>
        </div>
        <!-- 下部折线图 -->
        <div class="bottomCon">
            <img @click="leftTable = true" 
                 src="@/assets/imgs/overallOperation/biaodan.png" alt="">
            <echart-common :options="options"></echart-common>
        </div>

        <!-- 列表 -->
        <model-page :modelValue="leftTable" @changeModel="changeModel" title="客户结构">
            <sample-table-x
                :columns="tableColumns"
                :data="tableData"
            ></sample-table-x>
        </model-page>
    </div>
    
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
            customer:{},
            customerList:[],
            pieOptions1:{
                series: [
                    {
                        type: "pie",
                        radius: "100%",
                        center: 'center',
                        hoverAnimation:false,
                        silent:true,
                        data:[{
                            value:0,
                            name:'123',
                            itemStyle:{
                                normal:{
                                    color:'#ad6eff'
                                },
                                emphasis:{
                                    color:'#ad6eff'
                                }
                            },
                            label:{
                                position: "center",
                                color: "#333",
                                formatter: "{d}%",
                                fontSize:16
                            },
                            
                        },{
                            value:0,
                            itemStyle:{
                            normal:{
                                color:'#ebebeb',
                            },
                            emphasis:{
                                color:'#ebebeb'
                            }
                            },
                        }]
                    },
                ],

            },
            pieOptions2:{
                series: [
                    {
                        type: "pie",
                        radius: "100%",
                        center: 'center',
                        hoverAnimation:false,
                        silent:true,
                        data:[{
                            value:0,
                            name:'123',
                            itemStyle:{
                                normal:{
                                    color:'#7c9bff'
                                },
                                emphasis:{
                                    color:'#7c9bff'
                                }
                            },
                            label:{
                                position: "center",
                                color: "#333",
                                formatter: "{d}%",
                                fontSize:16
                            },
                            
                        },{
                            value:0,
                            itemStyle:{
                            normal:{
                                color:'#ebebeb',
                            },
                            emphasis:{
                                color:'#ebebeb'
                            }
                            },
                        }]
                    },
                ],
            },
            pieOptions3:{
                series: [
                    {
                        type: "pie",
                        radius: "100%",
                        center: 'center',
                        hoverAnimation:false,
                        silent:true,
                        data:[{
                            value:0,
                            name:'123',
                            itemStyle:{
                                normal:{
                                    color:'#08c4cf'
                                },
                                emphasis:{
                                    color:'#08c4cf'
                                }
                            },
                            label:{
                                position: "center",
                                color: "#333",
                                formatter: "{d}%",
                                fontSize:16
                            },
                            
                        },{
                            value:0,
                            itemStyle:{
                            normal:{
                                color:'#ebebeb',
                            },
                            emphasis:{
                                color:'#ebebeb'
                            }
                            },
                        }]
                    },
                ],
            },
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
                        // axisLine: {
                        //     lineStyle: {
                        //         color: "#E2E2E2",
                        //     },
                        //     },
                        //     axisLabel: {
                        //     textStyle: {
                        //         color: "#929292", //坐标值得具体的颜色
                        //     },
                        // },
                        axisLabel:{
                            formatter: (params) => {
                                // console.log(params,'..val')
                                return params.toFixed(2)+'%'
                            }
                        },
                    },
                    {
                        type: "value",
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                        },
                        axisLabel:{
                            formatter: (params) => {
                                // console.log(params,'..val')
                                return params.toFixed(2)+'%'
                            }
                        },
                        position:'right'
                    },
                ],
                series:[
                {
                    name:'资产30万以上有效客户占比',
                    type:'line',
                    animation:true,
                    data:[],
                    showSymbol:false,
                    areaStyle:{
                        color:{
                            type:'line',
                            x:0,
                            y:0,
                            x2:2,y2:1,
                            colorStops:[
                                {
                                    offset:0,color:'rgba(173,121,254,.2)'
                                },
                                {
                                    offset:1,color:'rgba(173,121,254,.5)'
                                },
                            ],
                            global:false
                        }
                    },
                    linStyle:{
                            color:'#af7bf4',
                            width:1,
                            type:'solid'
                    },
                    itemStyle:{
                            borderWidth:1,
                            // borderColor:'pink',
                            color:'#af7bf4'
                    },
                },
                {
                    name:'55周岁以下有效客户占比',
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
                {
                    name:'低风险偏好有效客户占比',
                    type:'line',
                    animation:true,
                    yAxisIndex: 1,
                    data:[],
                    showSymbol:false,
                        linStyle:{
                            color:'#08c4cf',
                            width:1,
                            type:'solid'
                        },
                        itemStyle:{
                            borderWidth:1,
                            // borderColor:'pink',
                            color:'#08c4cf'
                        },
                    areaStyle:{
                        color:{
                            type:'line',
                            x:0,
                            y:0,
                            x2:2,y2:1,
                            colorStops:[
                                {
                                    offset:0,color:'rgba(82,205,224,.3)'
                                },
                                {
                                    offset:1,color:'rgba(82,205,224,.6)'
                                },
                            ],
                            global:false
                        }
                    },
                }
                ],
                legend: {
                    selectedMode: false,
                    right:'10%',
                    height:10,
                    itemHeight:8,
                    data:[
                        {
                            name:'资产30万以上有效客户占比',
                            icon:'rect',
                        },
                        {
                            name:'55周岁以下有效客户占比',
                            icon:'rect'
                        },
                        {
                            name:'低风险偏好有效客户占比',
                            icon:'rect'
                        },
                    ],
                    itemStyle:{
                        borderWidth:1,
                        borderColor:'#d4d4d4'
                    }
                },
                grid: {
                    top: "20%",
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
                            <p class='tooltip-line'>总有效户数：${
                                this.$toT(this.customerList[params[0].dataIndex].sum_account)
                            }</p>
                            <p class='tooltip-line'>资产30万以上有效客户占比：${(params[0].value).toFixed(2)+'%'}</p>
                            <p class='tooltip-line'>55周岁以下有效客户占比：${(params[1].value).toFixed(2)+'%'}</p>
                            <p class='tooltip-line'>低风险偏好有效客户占比：${(params[2].value).toFixed(2)+'%'}</p>
                        </div>`;
                    },
                },
            },
            tableColumns:['日期','总有效户数','资产30万以上有效客户占比','55周岁以下有效客户占比','低风险偏好有效客户占比'],
            tableData:[]
        }
    },
    created(){
        this.getCustomerTime()
        this.getCustomer()
    },
    methods:{
        moment,
        // 时间变化 重新调取数据
        changeTime(time){
            this.timeSel=time
            this.getCustomer()
        },
        // 获取时间列表
        getCustomerTime(){
            api.getCustomerTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                }               
            })
        },
        // 获取客户结构
        getCustomer(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getCustomer(params).then(res=>{
                if(res.ret_code==0){
                  this.new_date=res.data.customer.new_time
                  this.customer=res.data.customer
                  
                // 资产30万
                  this.pieOptions1.series[0].data[0].value=res.data.customer.assets_exceed30_ranking*100
                  this.pieOptions1.series[0].data[1].value=100-res.data.customer.assets_exceed30_ranking*100
                // 55周岁
                  this.pieOptions2.series[0].data[0].value=res.data.customer.age_less55_ranking*100
                  this.pieOptions2.series[0].data[1].value=100-res.data.customer.age_less55_ranking*100
                // 低风险
                  this.pieOptions3.series[0].data[0].value=res.data.customer.low_risk_ranking*100
                  this.pieOptions3.series[0].data[1].value=100-res.data.customer.low_risk_ranking*100
                // 走势图
                this.options.xAxis[0].data=res.data.customer_list.map(item=>item.time_str)
                this.options.series[0].data=res.data.customer_list.map(item=>item.assets_exceed30_ranking*100)
                this.options.series[1].data=res.data.customer_list.map(item=>item.age_less55_ranking*100)
                this.options.series[2].data=res.data.customer_list.map(item=>item.low_risk_ranking*100)
                
                this.customerList=JSON.parse(JSON.stringify(res.data.customer_list))

                // 表单
                this.tableData=[]
                this.tableData.push(this.customerList.map(item=>item.time_str))
                this.tableData.push(this.customerList.map(item=>this.$toT(item.sum_account)))
                this.tableData.push(this.customerList.map(item=>(item.assets_exceed30_ranking*100).toFixed(2)+'%'))
                this.tableData.push(this.customerList.map(item=>(item.age_less55_ranking*100).toFixed(2)+'%'))
                this.tableData.push(this.customerList.map(item=>(item.low_risk_ranking*100).toFixed(2)+'%'))
                
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
        height: 456px;
        margin: 10px;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid #d4d4d4;
        background-color: #fff;
        .topCon{
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 110px;
            margin: 20px 0;
            box-sizing: border-box;
            >div{
                flex: 1;
                align-self: center;
                height: 100%;
                // border: 1px solid pink;
            }
            .topItem{
                display: flex;
                justify-content: center;
                align-items: center;
                .echartsCon{
                    width: 110px;
                    height: 110px;
                    // border: 1px solid yellow;
                    img{
                        width:100%;
                    }
                }
                .numCon{
                    margin-left: 10px;
                    >p{
                        margin: 0;
                    }
                    .numC{
                        font-size: 16px;
                        font-weight: 600;
                    }
                    .titleC{
                        font-size: 16px;
                        font-weight: 500;
                    }

                }
            }
        }
        .bottomCon{
            height: calc(100% - 150px);
            position: relative;
            img {
                position: absolute;
                right: 2%;
                top: 0;
                cursor: pointer;
                // width: 24px;
                // height: 24px;
                margin-left: 10px;
                z-index: 999;
            }
        }
    }
}
</style>
