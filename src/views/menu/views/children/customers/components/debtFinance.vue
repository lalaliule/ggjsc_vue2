<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">债券融资家数<span class="dataFrom">数据来源: 投行管理部</span></div>
            <div class="timeBox">
                <div class="title">
                    <span class="dateCon">数据日期:<span>{{new_date}}</span></span>
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
                <a-table 
                    :bordered="true" 
                    :columns="columns" 
                    :data-source='tableData' 
                    :pagination="false" 
                    :rowKey="(record,index)=>{return index}"
                    :scroll="{y:350}"
                >
                </a-table>
            </div>
            <div class="con-right">
                <div>
                    <div class="echartsCon">
                        <echart-common :options="options"></echart-common>
                    </div>
                    <div class="numCon">
                        <ul>
                            <li>
                                <span>已内核</span>
                                <span>{{detailData.karnel_num}}家</span>
                            </li>
                            <li>
                                <span>已获批文</span>
                                <span>{{detailData.approval_num}}家</span>
                            </li>
                            <li>
                                <span>批文转化率</span>
                                <span>{{(detailData.complete_num*100).toFixed(2)+'%'}}</span>
                            </li>
                        </ul>
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
    components: {
        monthPicker,
    },
    data(){
        return{
            // 时间 开始
            histroyDate:[],
            timeSel:'',
            new_date:'',
            // 时间 结束
            detailData:{},
            columns:[
                {
                    title:'序号',
                    key:'indexes',
                    dataIndex:'indexes',
                    align:'center',
                    customRender:(text,record,index)=>index+1,
                    width:80,
                },
                {
                    title:'项目名称',
                    key:'pro_name',
                    dataIndex:'pro_name',
                    align:'center',
                    width:330,
                },
                {
                    title:'注册地',
                    key:'regis_place',
                    dataIndex:'regis_place',
                    align:'center',
                },
                {
                    title:'项目类型',
                    key:'pro_type',
                    dataIndex:'pro_type',
                    align:'center',
                },
                {
                    title:'部门',
                    key:'department',
                    dataIndex:'department',
                    align:'center',
                },
                {
                    title:'立项时间',
                    key:'project_time',
                    dataIndex:'project_time',
                    align:'center',
                },
                {
                    title:'预计申报时间',
                    key:'estim_time',
                    dataIndex:'estim_time',
                    align:'center',
                },
                {
                    title:'是否获得批文',
                    key:'approval_ornot',
                    dataIndex:'approval_ornot',
                    align:'center',
                },
                {
                    title:'获得批文时间',
                    key:'approval_time',
                    dataIndex:'approval_time',
                    align:'center',
                },
                {
                    title:'状态',
                    key:'state',
                    dataIndex:'state',
                    align:'center',
                },
            ],
            tableData:[],
            options:{
                color: ["#3653FF","#08C4CF"],
                tooltip:{
                    show:false
                },
                series:[
                    {
                        name:'',
                        type:'pie',
                        radius:'70%',
                        animation:true,
                        data:[
                            {
                                value:0,
                                name:'已获批文'
                            },{
                                value:0,
                                name:'已内核'
                            }
                        ],
                        itemStyle:{
                            borderColor:'#fff',
                            borderWidth:2
                        },
                        label: {
                            position: "inner",
                            color: "#fff",
                            formatter: "{d}%",
                        },
                        // hoverAnimation: false,
                    }
                ],
                legend: {
                    right:'2%',
                    top: "15",
                    selectedMode: false,
                    itemHeight:10,
                    orient:'vertical'
                    
                },
            }
        }
    },
    created(){
        this.getMarginTradingNumTime()
        this.getMarginTradingNum()
    },
    methods:{
        moment,
        // 时间变化
        changeTime(time){
            this.timeSel=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.getMarginTradingNum()
        },
        // 债券融资家数 时间列表
        getMarginTradingNumTime(){
            api.getMarginTradingNumTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 债券融资家数
        getMarginTradingNum(){
            // this.detailData={}
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            this.tableData=[]
            api.getMarginTradingNum(params).then(res=>{
                if(res.ret_code==0){
                    this.detailData=res.data
                    this.tableData=res.data.list
                    this.options.series[0].data[1].value=res.data.karnel_num
                    this.options.series[0].data[0].value=res.data.approval_num
                }
            })
        }
    },
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
        // height: 520px;
        height:475px;
        margin:10px;
        // padding-top: 66px;
        padding-top: 10px;
        border-radius: 10px;
        background-color: #fff;
        .con-left{
            flex: 1;
            margin:0 0 10px 10px;
        }
        .con-right{
            flex: none;
            width: 340px;
            padding: 0 20px;
            >div{
                // height: 100%;
                border: 1px solid #cecece;
                border-radius: 10px;
            }
            .echartsCon{
                width: 100%;
                height: 260px;
                border-bottom: 1px solid #cecece;
            }
            .numCon{
                height:177px;
                background: #f8f9fa;
                border-radius: 0 0 10px 10px;
                ul{
                    margin: 0;
                    padding: 10px 30px 10px 60px;
                    li{
                        display: flex;
                        line-height: 52px;
                        span{
                            flex: 2;
                            &:nth-child(2){
                                flex: 1;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>