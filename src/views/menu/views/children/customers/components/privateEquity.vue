<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">私募股权基金投资项目(华富嘉业)<span class="dataFrom">数据来源: 华富嘉业</span></div>
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
            <div class="con-left">
                <div class="left-top">
                    <div class="left">私募股权基金投资项目清单</div>
                    <div class="right">
                        <a-select
                            allowClear
                            placeholder="IPO状态"
                            showArrow
                            v-model="stateList"
                            @change="change"
                            :getPopupContainer="triggerNode=>triggerNode.parentNode"
                        >
                            <a-select-option
                                v-for="i in typeList"
                                :key="i.value"
                            >
                                {{i.label}}
                            </a-select-option>
                        </a-select>
                    </div>
                </div>
                <div class="left-table">
                    <a-table 
                        :bordered="true" 
                        :columns="columns" 
                        :data-source='tableData' 
                        :pagination="false" 
                        :rowKey="(record,index)=>{return index}"
                        :scroll="{y:370}"
                    >
                    </a-table>
                </div>
            </div>
            <div class="con-right">
                <!-- 时间 -->
                <div class="timeCon">
                    <div class="theTitle">私募股权基金实缴规模走势(万元)</div>
                    <div class="title">
                        <!-- <span class="dateCon">数据日期:{{new_date}}</span>
                        <month-picker 
                            :histroyDate="histroyDate"
                            :timeSel="timeSel"
                            @getTime="changeTime" 
                        ></month-picker> -->
                        <img src="@/assets/imgs/overallOperation/biaodan.png" @click="leftTable=true">
                    </div>
                </div>
                <div class="echartsCon">
                    <echart-common :options="options"></echart-common>
                </div>
            </div>
        </div>

        <model-page :modelValue="leftTable" @changeModel="changeModel" title="私募股权基金实缴规模走势(万元)">
            <sample-table-x
                :columns="tableColumns"
                :data="dataTable"
            ></sample-table-x>
        </model-page>
    </div>
</template>
    
<script>
// import monthPicker from "@/components/monthPicker/index";
import modelPage from '@/components/modelPage/index'

import * as echarts from 'echarts'
import * as api from '../api.js'
import moment from 'moment'

export default {
    components: {
        modelPage
    },
    data(){
        return{
            new_date:'',
            histroyDate:[],
            timeSel:'',
            stateList:[],
            typeList:[
                {
                    value:'辅导',
                    label:'辅导'
                },
                {
                    value:'在会',
                    label:'在会'
                },
                {
                    value:'过会',
                    label:'过会'
                },
                {
                    value:'上市',
                    label:'上市'
                },
                {
                    value:'完全退出',
                    label:'完全退出'
                },
                {
                    value:'其他',
                    label:'其他'
                },
            ],
            temp:{},
            columns:[
                {
                    title:'在管基金名称',
                    key:'fund_name',
                    dataIndex:'fund_name',
                    align:'center',
                    // width:250,
                    customRender:(text,row)=>{
                        return {
                            children:text,
                            attrs:{
                                rowSpan:row.spans[0]
                            }
                        }
                    }
                },
                {
                    title:'实缴规模(万元)',
                    key:'scale',
                    dataIndex:'scale',
                    align:'center',
                    customRender:(text,row)=>{
                        return {
                            children:text,
                            attrs:{
                                rowSpan:row.spans[0]
                            }
                        }
                    }
                },
                {
                    title:'投资项目名称',
                    key:'pro_name',
                    dataIndex:'pro_name',
                    align:'center',
                    // width:250,
                },
                {
                    title:'注册地',
                    key:'regis_place',
                    dataIndex:'regis_place',
                    align:'center',
                    // width:100,
                },
                {
                    title:'初始投资金额(万元)',
                    key:'origin_value',
                    dataIndex:'origin_value',
                    align:'center',
                },
                {
                    title:'IPO状态及更新时间',
                    key:'ipo_time',
                    dataIndex:'ipo_time',
                    align:'center',
                    // width:160,
                },
            ],
            tableData:[],
            options:{
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
                            show:true,
                            lineStyle: {
                                color: "rgba(243,244,245,1)",
                            },
                        },
                    },
                ],
                series:[
                    {
                        name:'',// 柱形图
                        type:'bar',
                        data:[],
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
                                    color: "#a0afff", // 0% 处的颜色
                                    },
                                    {
                                    offset: 0,
                                    color: "#193bff", // 100% 处的颜色
                                    },
                                ],
                                globalCoord: false, // 缺省为 false
                                }, //渐变颜色
                                barBorderRadius: 25,

                            },
                        },
                        barWidth: "20%",
                        
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
                        <p class='tooltip-line'>实缴规模(万元)：${
                            this.$toT(params[0].value)
                        }</p>
                        <p class='tooltip-line'>排名：${
                            this.optionsData[params[0].dataIndex].ranking<0?'本季度未披露排名':this.optionsData[params[0].dataIndex].ranking
                        }</p>
                        </div>`;
                    },
                },
                grid: {
                    left: '13%',
                    right: '5%',
                    bottom: '10%',
                    top: '5%',
                },
            },
            optionsData:[],
            leftTable:false,
            dataTable:[],
            tableColumns:['机构名称','实缴规模','排名']


        }
    },
    created(){
        this.getPrivateMoneyTable()

        this.getPrivateMoneyTime()
        this.getPrivateMoney()
    },
    methods:{
        moment,
        // 下拉框变化 以[]形式并只传value的前2位文字 
        change(val){
            this.stateList=val
            this.getPrivateMoneyTable()
        },
        // 时间变化
        changeTime(time){
            this.timeSel=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.stateList=[]
            this.getPrivateMoney()
            this.getPrivateMoneyTable()
        },
        // 私募股权基金投资项目（华富嘉业）表格 
        getPrivateMoneyTable(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
                // state_list:this.stateList.map(el=>el.slice(0,2))
                state_list:this.stateList?(this.stateList.length>0?[this.stateList]:[]):[]
            }
            this.tableData=[]
            api.getPrivateMoneyTable(params).then(res=>{
                if(res.ret_code==0){
                    // this.tableData=res.data
                    let arr1=[]
                    let arr2=[]
                    res.data.forEach((el,index)=>{
                        // 当数据不为null时千分位
                        if(el.origin_value){
                            el.origin_value=this.$toT(el.origin_value) 
                        }
                       el.scale=this.$toT(el.scale) 

                    })
                    // console.log(arr1,arr2,'..')
                    this.tableData=this.rowSpan(res.data)
                    // this.tableData=this.rowSpan([...arr1,...arr2])
                }
            })
        },
        // 私募股权基金投资项目（华富嘉业） 时间列表
        getPrivateMoneyTime(){
            api.getPrivateMoneyTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 私募股权基金投资项目（华富嘉业）
        getPrivateMoney(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            this.optionsData=[]
            this.dataTable=[]
            api.getPrivateMoney(params).then(res=>{
                if(res.ret_code==0){
                    this.options.xAxis[0].data=res.data.map(item=>item.time_str)
                    this.options.series[0].data=res.data.map(item=>item.money)
                    this.optionsData=res.data

                    this.dataTable.push(res.data.map(item=>item.time_str))
                    this.dataTable.push(res.data.map(item=>this.$toT(item.money)))
                    this.dataTable.push(res.data.map(item=> item.ranking==-1?'未披露':item.ranking))

                }
            })
        },
        // 合并单元格
        rowSpan(arr){
            const uniqueKey=[]
            arr.forEach(item=>{
                if(uniqueKey.some(keyItem=>keyItem==item.fund_name)){
                    item.spans=[0,1]
                    return
                }
                const filterList=arr.filter(proItem=>item.fund_name==proItem.fund_name)
                const proLength=filterList.length
                item.spans=[proLength,1]
                uniqueKey.push(item.fund_name)
            })
            return arr
        },
        // 关闭弹窗
        changeModel(val){
            this.leftTable=val
        },

    }
}
</script>

<style lang="scss" scoped>
.myCon{
    margin:0 20px 20px;
    // min-width: 1600px;
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
        height: 542px;
        margin:10px;
        padding-left: 20px;
        border-radius: 10px;
        background-color: #fff;
        .con-left{
            flex: 1;
            .left-top{
                display: flex;
                justify-content: space-between;
                height: 86px;
                line-height: 75px;
                font-size: 16px;
                font-weight: 600;
                .right{
                    position: relative;
                    .ant-select{
                        width: 260px;
                    }
                }

            }
            .left-table{
                height: calc(100% - 85px);
            }
        }
        .con-right{
            position: relative;
            flex: none;
            width: 614px;
            .timeCon{
                height: 75px;
                line-height: 75px;
                padding-left: 35px;
                padding-right: 10px;
                display: flex;
                justify-content: space-between;
                .theTitle{
                    font-size: 16px;
                    font-weight: 600;
                }
                .title{
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
            .echartsCon{
                height: calc(100% - 75px);
            }

        }
    }
    
}
</style>