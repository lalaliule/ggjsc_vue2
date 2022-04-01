<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">代理机构客户买卖证券交易额</div>
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
            <div class="left"></div>
            <div class="right">
                <img @click="leftTable = true" 
                    src="@/assets/imgs/overallOperation/biaodan.png" alt="">
                <div class="detalC">
                    <div class="title">{{new_date}}最新数据</div>
                    <div class="echartsC"></div>
                    <div class="detailNum">
                        <p>3561.02(万元)</p>
                        <p>代理机构客户买卖证券交易额</p>
                        <p>5012.89(万元)</p>
                        <p>代理全部客户买卖证券交易额</p>
                    </div>
                </div>
            </div>
        </div>


         <model-page :modelValue="leftTable" @changeModel="changeModel" title="代理机构客户买卖证券交易额(万元)">
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
    methods:{
        moment,
        // 时间变化
        changeTime(time){
            this.timeSel=time
            let str=time?moment(time).format("YYYY-MM"):''
            let tiemStr=str.split('-')
            this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
            // 重新获取数据
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
        height: 460px;
        margin-top: 10px;
        padding: 20px 10px;
        border-radius: 10px;
        background-color: #fff;
        .left{
            flex: 1;
            border: 1px solid pink;
        }
        .right{
            flex: none;
            position: relative;
            width: 315px;
            border: 1px solid pink;
            >img{
                position: absolute;
                right: 0;
                top:0;
            }
            .detalC{
                width: 300px;
                height: 373px;
                margin-top: 40px;
                border: 1px solid #ececec;
                border-radius: 8px 8px 0 0;
                .title{
                    height: 46px;
                    color: #fff;
                    font-size: 16px;
                    text-align: center;
                    line-height: 46px;
                    border-radius: 8px 8px 0 0;
                    background-color: #3653ff;
                }
                .echartsC{
                    height: 200px;
                    background-color: pink;
                }
                .detailNum{
                    margin-top: 10px;
                    p{
                        margin-bottom: 0;
                        text-align: center;
                        font-size: 16px;
                        &:nth-child(2n){
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
}
</style>