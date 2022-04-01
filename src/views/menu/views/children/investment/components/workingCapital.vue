<template>
<div class="myCon">
        <div class="main-head">
            <div class="title">营运资金投资收益率</div>
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
            <div class="left">
                <ul>
                    <li class="headLi">
                        <span>收益率</span>
                        <span>证券投资部门</span>
                        <span>固定收益部门</span>
                    </li>
                    <li>
                        <span>
                            <img src="@/assets/imgs/overallOperation/biaodan.png" alt="">
                            本月收益率</span>
                        <span>12.1%</span>
                        <span>12.1%</span>
                    </li>
                    <li>
                        <span>
                            <img src="@/assets/imgs/overallOperation/biaodan.png" alt="">
                            本年累计收益率</span>
                        <span>12.1%</span>
                        <span>12.1%</span>
                    </li>
                    <li>
                        <span>
                            <img src="@/assets/imgs/overallOperation/biaodan.png" alt="">
                            上年全年收益率</span>
                        <span>12.1%</span>
                        <span>12.1%</span>
                    </li>
                </ul>
            </div>
            <div class="right">
                <img @click="leftTable = true" src="@/assets/imgs/overallOperation/biaodan.png" alt="">
                <div class="echartsC"></div>
            </div>
        </div>
     
        <model-page :modelValue="leftTable" @changeModel="changeModel" title="营运资金投资收益率本年累计走势(万元)">
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
        this.getWorkProfitTime()
        this.getWorkProfit()
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
            this.getWorkProfit()
        }, 
        // 关闭弹窗
        changeModel(val){
            this.leftTable=val
        },
        // 营运资金投资收益率 时间列表 
        getWorkProfitTime(){
            api.getWorkProfitTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 营运资金投资收益率 getWorkProfit
        getWorkProfit(){
            // this.detailData={}
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getWorkProfit(params).then(res=>{
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
        display: flex;
        height: 285px;
        margin: 10px 0 0 10px;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #c3c3c3;
        .left{
            flex: none;
            width: 493px;
            height: 213px;
            border: 1px solid #c3c3c3;
            >ul{
                box-sizing: border-box;
                li{
                    height: 53px;
                    border-bottom: 1px solid #c3c3c3;
                    >span{
                        display: inline-block;
                        width: 143px;
                        height: 100%;
                        line-height: 52px;
                        text-align: center;
                        border-right: 1px solid #c3c3c3;
                        &:nth-child(1){
                            position: relative;
                            width:205px;
                            >img{
                                position: absolute;
                                left: 10px;
                                top: 50%;
                                transform: translateY(-50%);
                                width: 35px;
                                height: 35px;
                            }

                        }
                        &:last-child{
                            border-right:none;
                        }
                    }
                    &:last-child{
                        border-bottom:none;
                    }
                }
                .headLi{
                    background-color: #f4f4f4;
                }
            }
        }
        .right{
            flex: 1;
            position: relative;
            border: 1px solid pink;
            >img{
                position: absolute;
                right: 0;
                top: 0;
            }
        }

    }
}
</style>