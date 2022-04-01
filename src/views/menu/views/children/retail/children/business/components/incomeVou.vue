<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">收益凭证<span class="dataFrom">数据来源: 衍生品交易部</span></div>
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
            <div class="conL">
                <a-table
                    :bordered="true" 
                    :columns="columns" 
                    :data-source='tableData' 
                    :rowKey="(record,index)=>{return index}"
                    :pagination="false"
                    :scroll="{y:310}"

                >
                <span slot="indexes" slot-scope="text,record,index">
                    {{(pagination.currentPage-1)*pagination.pageSize+parseInt(index)+1}}
                </span>
                <span slot="deadlineTitle">
                    {{theTitle}}
                </span>
                </a-table>
                <div class="pageCon" v-if="pagination.total>0">
                    <div class="pageL">
                        <p>总{{pagination.total}}条，共{{pagination.pages}}页，每页{{pagination.pageSize}}条记录</p>
                    </div>
                    <div class="pageR">
                        <a href="javascript:;" @click="changeToF(1)">首页</a>
                        <a-pagination 
                        v-model="pagination.currentPage"
                        :total="pagination.total"
                        @change="changePage"
                        ></a-pagination>
                        <a href="javascript:;" @click="changeToL(pagination.pages)">尾页</a>
                    </div>
                </div>
            </div>
            <div class="conR">
                <div class="conR-e">
                    <echart-common :options="optionsIncome"></echart-common>
                </div>
                <div class="conR-l">
                    <ul>
                        <li>
                            <p>本年发行规模(万元):</p>
                            <p class="listData1">{{incomeData.issuance_scale&&$toT(incomeData.issuance_scale)}}</p>
                        </li>
                        <li>
                            <p>固定利率型(万元):</p>
                            <p class="listData2">{{incomeData.interest_rate&&$toT(incomeData.interest_rate)}}</p>
                        </li>
                        <li>
                            <p>保本+浮动型(万元):</p>
                            <p class="listData3">{{incomeData.break_even&&$toT(incomeData.break_even)}}</p>
                        </li>
                    </ul>
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
            new_date:'',
            timeSel:'',
            histroyDate:[],
            columns:[
                {
                    title:'序号',
                    key:'indexes',
                    dataIndex:'indexes',
                    align:'center',
                    // customRender:(text,record,index)=>index+1,
                    scopedSlots:{customRender:'indexes'},
                    width:80,
                },
                {
                    title:'名称',
                    key:'name',
                    dataIndex:'name',
                    align:'center',
                    // width:300,
                },
                {
                    title:'类型',
                    key:'type',
                    dataIndex:'type',
                    align:'center',
                    // width:130,
                },
                {
                    title:'起息日', 
                    key:'interest_day',
                    dataIndex:'interest_day',
                    align:'center',
                    // width:130,
                },
                {
                    title:'到期日',
                    key:'maturity_date',
                    dataIndex:'maturity_date',
                    align:'center',
                    // width:130,
                },
                {
                    // title:'期限(月)',
                    key:'deadline',
                    dataIndex:'deadline',
                    align:'center',
                    // width:100,
                    slots:{title:'deadlineTitle'},
                },
                {
                    title:'月初本金余额(万元)',
                    key:'principal_amount',
                    dataIndex:'principal_amount',
                    align:'center',
                },
                {
                    title:'本月发行规模(万元)',
                    key:'issue_scale',
                    dataIndex:'issue_scale',
                    align:'center',
                },
                {
                    title:'本月兑付规模(万元)',
                    key:'cashing_scale',
                    dataIndex:'cashing_scale',
                    align:'center',
                },
                {
                    title:'月末本金余额(万元)',
                    key:'balance',
                    dataIndex:'balance',
                    align:'center',
                },
            ],
            tableData:[],
            pagination:{
                currentPage:1,
                pageSize:10,
                total:0,
                pages:0
            },
            incomeData:{},
            optionsIncome:{
                series:[
                    {
                        type:'pie',
                        radius:['35%','45%'],
                        width:250,
                        left:'center',
                        avoidLabelOverlap:false,
                        itemStyle:{
                            borderColor:'#fff',
                            borderWidth:1
                        },
                        label:{
                            alignTo:'edge',
                            minMargin:5,
                            edgeDistance:10,
                            lineHeight:15,
                            formatter:'{b}\n{c}%\n\n',
                        },
                        labelLine:{
                            length:20,
                            length2:48,
                            maxSurfaceAngle:120
                        },
                        data:[],
                        color:['#08c4cf','#3653ff']
                    }
                ]
            }
        }
    },
    created(){
        this.getIncomeVoucherTime()
        this.getIncomeVoucherTable()
        this.getIncomeVoucher()
    },
    computed:{
        // table的title根据日期不同
        theTitle(){
            // let str=this.new_date.toLocaleString().replace(/年|月/g,'')
            let str
            let dateStr=this.new_date.toLocaleString().replace(/年|月/g,'-')
            let arrVal=dateStr.split('-')
            arrVal[1]=arrVal[1]<10?'0'+arrVal[1]:arrVal[1]
            let res=arrVal[0]+arrVal[1]
            str=res<202110?'期限(月)':'剩余存续期限(月)'
            return str
        }
    },
    methods:{
        moment,
         // 时间变化 重新调取数据
        changeTime(time){
            this.timeSel=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
            this.pagination.currentPage=1
            this.getIncomeVoucherTable()
            this.getIncomeVoucher()
            this.getScroll()
        },
        getIncomeVoucherTime(){
            api.getIncomeVoucherTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        changePage(page){
            this.pagination.currentPage=page
            this.getIncomeVoucherTable()
            this.getScroll()
        },
        changeToF(index){
            this.pagination.currentPage=index
            this.getIncomeVoucherTable()
            this.getScroll()
        },
        changeToL(index){
            this.pagination.currentPage=index
            this.getIncomeVoucherTable()
            this.getScroll()
        },
        // 收益凭证 
        getIncomeVoucher(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getIncomeVoucher(params).then(res=>{
                if(res.ret_code==0){
                    this.incomeData=res.data
                    // res.data.issuance_scale=res.data.interest_rate+res.data.break_even
                    let list=[{
                        value:(res.data.interest_rate/res.data.issuance_scale*100).toFixed(2),
                        name:'固定利率型'
                    },
                    {
                        value:(res.data.break_even/res.data.issuance_scale*100).toFixed(2),
                        name:'保本+浮动型'
                    }
                    ]
                    this.optionsIncome.series[0].data=list
                }
            })
        },
        // 收益凭证 表格 
        getIncomeVoucherTable(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
                current_page:this.pagination.currentPage,
                page_size:this.pagination.pageSize
            }
            this.tableData=[]
            api.getIncomeVoucherTable(params).then(res=>{
                if(res.ret_code==0){
                    this.tableData=res.data
                    this.tableData.forEach(el=>{
                        el.principal_amount=this.$toT(el.principal_amount)
                        el.issue_scale=this.$toT(el.issue_scale)
                        el.cashing_scale=this.$toT(el.cashing_scale)
                        el.balance=this.$toT(el.balance)
                    })
                    this.pagination.total=res.total
                    this.pagination.pages=res.pages
                }
            })
        },
        // 改变页码回到顶部
        getScroll(){
            let dom=document.querySelector('.ant-table-body')
            dom.scrollTop=0
        }
    }
}
</script>
<style lang="scss" scoped>
.myCon{
    margin:0 20px 20px;
    // min-width: 1680px;
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
    .main-con{
        display: flex;
        min-height: 431px;
        margin-left: 10px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #c3c3c3;
        .conL{
            flex: 1;
            // max-height: ;
            padding: 6px;
            .pageCon{
                display: flex;
                justify-content: space-between;
                height: 32px;
                margin-top: 10px;
                .pageL{
                    flex: none;
                    line-height: 32px;
                }
                .pageR{
                    display: flex;
                    flex: 1;
                    justify-content: flex-end;
                    >a{
                        width: 80px;
                        height: 32px;
                        line-height: 30px;
                        margin: 0 10px;
                        color:rgba(0, 0, 0, 0.65);
                        text-align: center;
                        border-radius: 4px;
                        border: 1px solid #d9d9d9;
                    }
                }
            }
        }
        .conR{
            flex: none;
            width: 272px;
            // border: 1px solid pink;
            .conR-e{
                // height: calc(100% - 204px);
                height: 220px;
            }
            .conR-l{
                height: 194px;
                margin-bottom: 10px;
                background-color: #e2e2e2;
                border: 1px solid #c3c3c3;
                border-right-color: transparent;
                ul{
                    padding: 40px 20px;
                    li{
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        >p{
                            margin-bottom: 0;
                            font-size: 16px;
                            font-weight: 500;
                        }
                        .listData1{
                            color: #fc8e66;
                        }
                        .listData2{
                            color: #24c8d2;
                        }
                        .listData3{
                            color: #5b73fc;
                        }
                    }
                }
            }
        }
    }
}
</style>