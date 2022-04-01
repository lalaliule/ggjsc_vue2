<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">跟投战投项目(华富瑞兴)<span class="dataFrom">数据来源: 华富瑞兴</span></div>
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
            <!-- 上部 -->
            <div class="con-top">
                <ul>
                    <li>
                        <div>
                            <p>在投项目(家)</p>
                            <p class="numCon">{{detailData.throw_incasting}}</p>
                        </div>
                        <img src="@/assets/imgs/zt.png" alt="">
                    </li>
                    <li>
                        <div>
                            <p>本年投资金额(万元)</p>
                            <p class="numCon">{{detailData.invest_num&&$toT(detailData.invest_num)}}</p>
                        </div>
                        <img src="@/assets/imgs/tz.png" alt="">
                    </li>
                    <li>
                        <div>
                            <p>本年投资收益(万元)</p>
                            <p class="numCon">{{detailData.year_income&&$toT(detailData.year_income)}}</p>
                        </div>
                        <img src="@/assets/imgs/sy.png" alt="">
                    </li>
                    <li>
                        <div>
                            <p>本月投资收益(万元)</p>
                            <p class="numCon">{{detailData.mon_income&&$toT(detailData.mon_income)}}</p>
                        </div>
                        <img src="@/assets/imgs/by.png" alt="">
                    </li>
                </ul>
            </div>
            <!-- 下拉多选 -->
            <div class="con-center">
                <a-select
                    allowClear
                    placeholder="项目类型"
                    showArrow
                    @change="change"
                    v-model="selType"
                    :getPopupContainer="triggerNode=>triggerNode.parentNode"
                    :dropdownStyle="{textAlign:'left !important'}"
                >
                    <a-select-option
                        v-for="i in selData"
                        :key="i.value"
                    >
                        {{i.label}}
                    </a-select-option>
                </a-select>
            </div>
            <!-- 表格 -->
            <div class="con-bottom">
                <a-table
                    :bordered="true" 
                    :columns="columns" 
                    :data-source='tableData' 
                    :rowKey="(record,index)=>{return index}"
                    :pagination="{
                        current:pagination.currentPage,
                        pageSize:10,
                        total:pagination.total,
                        onChange:changePage
                    }"
                >
                <!--:pagination="pagination" @change="changePage" -->
                </a-table>
                <div class="totalP">
                    总{{pagination.total}}条，共{{pagination.pages}}页，每页10条记录
                    <!-- 总{{tableData.length}}条，共{{Math.ceil(tableData.length/10)}}页，每页10条记录 -->
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
    data(){
        return{
            // 时间 开始
            histroyDate:[],
            timeSel:'',
            new_date:'',
            // 时间 结束
            selData:[
                {
                    value:'跟投项目',
                    label:'跟投项目'
                },{
                    value:'战投项目',
                    label:'战投项目'
                }
            ],
            selType:[], // 选中的项目类型
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
                    title:'项目类型',
                    key:'pro_type',
                    dataIndex:'pro_type',
                    align:'center',
                },
                {
                    title:'企业名称',
                    key:'enter_name',
                    dataIndex:'enter_name',
                    align:'center',
                    width:240,
                },
                {
                    title:'投资时间(最新)',
                    key:'invest_time',
                    dataIndex:'invest_time',
                    align:'center',
                },
                {
                    title:'出资比例(最新)',
                    key:'proportion',
                    dataIndex:'proportion',
                    align:'center',
                },
                {
                    title:'投资金额(合计)(万元)',
                    key:'total_value',
                    dataIndex:'total_value',
                    align:'center',
                },
                {
                    title:'投资方向(最新)',
                    key:'invest_dir',
                    dataIndex:'invest_dir',
                    align:'center',
                },
                {
                    title:'投资金额(最新)',
                    key:'latest_value',
                    dataIndex:'latest_value',
                    align:'center',
                },
                {
                    title:'投资收益',
                    key:'total_income',
                    dataIndex:'total_income',
                    align:'center',
                },
                {
                    title:'投资收益(最新)',
                    key:'latest_income',
                    dataIndex:'latest_income',
                    align:'center',
                },
                {
                    title:'投资收益更新时间',
                    key:'update_time',
                    dataIndex:'update_time',
                    align:'center',
                },
            ],
            tableData:[],
            pagination:{
               currentPage:1,
               pageSize:10,
               total:0,
               pages:0,
            //    onChange:(page,pagesize)=>this.changePage(page,pagesize)
            }
        }
    },
    created(){
        this.getThrowProjectTime()
        this.getThrowProject()
        this.getThrowProjectTable()
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
            this.selType=[]
            this.pagination.currentPage=1
            this.getThrowProject()
            this.getThrowProjectTable()
        },
        change(val){
            this.selType=val
            this.pagination.currentPage=1
            this.getThrowProjectTable()
        },
        // 跟投战投项目（华富瑞兴） 时间列表
        getThrowProjectTime(){
            api.getThrowProjectTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                } 
            })
        },
        // 跟投战投项目（华富瑞兴） 
        getThrowProject(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getThrowProject(params).then(res=>{
                if(res.ret_code==0){
                    this.detailData=res.data
                }
            })
        },
        // 跟投战投项目（华富瑞兴）表格
        getThrowProjectTable(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
                state_list:this.selType?(this.selType.length>0?[this.selType]:[]):[],
                current_page:this.pagination.currentPage,
                page_size:this.pagination.pageSize,
            }
            this.pagination.total=0
            this.pagination.pages=0
            api.getThrowProjectTable(params).then(res=>{
                if(res.ret_code==0){
                    this.tableData=res.data
                    this.tableData.forEach(el=>{
                        el.proportion=(el.proportion*100).toFixed(2)+'%'
                        el.total_value=this.$toT(el.total_value)
                        el.latest_value=this.$toT(el.latest_value)
                        el.total_income=this.$toT(el.total_income)
                        el.latest_income=this.$toT(el.latest_income)
                    })
                    this.pagination.total=res.total
                    this.pagination.pages=res.pages
                }
            })
        },
        changePage(page){
            this.pagination.currentPage=page
            this.getThrowProjectTable()
        }
    }
}
</script>

<style lang="scss" scoped>
.myCon{
    margin:0 20px 20px;
    &::after{
    content: '';
    position: fixed;
    display: block;
  }
    // min-width: 1400px;
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
        // min-height: 800px;
        margin:10px;
        padding: 0 10px;
        border-radius: 10px;
        background-color: #fff;
        border: 1px solid transparent;
        .con-top{
            margin-top: 35px;
            height: 140px;
            ul{
                display: flex;
                justify-content: space-between;
                height: 100%;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex: 1;
                    margin-left: 20px;
                    padding:0 20px;
                    background-color: #f5f8fa;
                    border-radius: 10px;
                    >div{
                        font-size: 16px;
                        >p{
                            margin-bottom: 0;
                            line-height: 36px;
                        }
                        .numCon{
                            font-size: 22px;
                        }
                    }
                    >img{
                        width: 80px;
                        height: 80px;
                    }
                    &:nth-child(1){
                        margin-left: 0;
                        .numCon{
                            color: #193bff;
                        }
                    }
                    &:nth-child(2){
                        .numCon{
                            color: #ff8356;
                        }
                    }
                    &:nth-child(3){
                        .numCon{
                            color: #ad6eff;
                        }
                    }
                    &:nth-child(4){
                        .numCon{
                            color: #24cdcf;
                        }
                    }

                }
            }
        }
        .con-center{
            position: relative;
            text-align: right;
            margin-top: 15px;
            .ant-select{
                height: 42px;
                width: 260px;
            }
        }
        .con-bottom{
            position: relative;
            height: calc(100% - 230px);
            // border: 1px solid gold;
            .totalP{
                position: absolute;
                bottom: 16px;
                left: 0;
            }
        }
    }
}
</style>