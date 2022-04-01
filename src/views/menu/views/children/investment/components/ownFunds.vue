<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">自有资金投资收益分部门 (公允+投资收益)</div>
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
            <img @click="leftTable = true" src="@/assets/imgs/overallOperation/biaodan.png" alt="">
            <div class="echartsC"></div>
        </div>

        <model-page :modelValue="leftTable" @changeModel="changeModel" title="各部门近13个月投资收益走势(万元)">
            <sample-table-x
                :columns="tableColumns"
                :data="tableData"
            ></sample-table-x>
        </model-page>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import * as api from '../api.js'
import moment from 'moment'

export default {
    data(){
        return {
            new_date:'',
            histroyDate:[],
            timeSel:'',
            leftTable:false,
            tableColumns:[],
            tableData:[],    
        }
    },
    created(){
        this.getOwnProfitTime()
        this.getOwnProfit()
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
            this.getOwnProfit()
        }, 
        // 关闭弹窗
        changeModel(val){
            this.leftTable=val
        },
        // 自有资金投资收益分部门 时间列表 getOwnProfitTime
        getOwnProfitTime(){
            api.getOwnProfitTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 自有资金投资收益分部门（公允 + 投资收益） getOwnProfit
        getOwnProfit(){
            // this.detailData={}
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getOwnProfit(params).then(res=>{
                if(res.ret_code==0){
                    console.log(res,'...res')
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
            font-family: PingFangSC-Medium, PingFang SC;
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
        position: relative;
        height: 415px;
        margin: 10px 0 0 10px;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #c3c3c3;
        >img{
            position: absolute;
            right: 20px;
            top: 20px;
        }
    }    
}
</style>