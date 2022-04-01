<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">席位租赁收入</div>
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
                <div class="titleC">
                    <span>席位租赁收入</span>
                </div>
                <div class="echartsC"></div>
                <div class="titleList">
                    <p>
                        <span>席位租赁收入(万元)</span>
                        <span class="color1">35612.3</span>
                    </p>
                    <p>
                        <span>市场份额</span>
                        <span class="color2">13.56%</span>
                    </p>
                </div>
            </div>
            <div class="center">
                <div class="titleC">
                    <span>席位租赁收入走势</span>
                    <img @click="centerTable = true" 
                        src="@/assets/imgs/overallOperation/biaodan.png" alt="">
                </div>
                <div class="echartsC"></div>
            </div>
            <div class="right">
                <div class="titleC">
                    <span>市场份额走势</span>
                    <img @click="rightTable = true" 
                        src="@/assets/imgs/overallOperation/biaodan.png" alt="">
                </div>
                <div class="echartsC"></div>
            </div>
        </div>

        <model-page :modelValue="centerTable" @changeModel="changeModel" title="席位租赁收入走势">
            <sample-table-x
                :columns="tableColumns"
                :data="tableData"
            ></sample-table-x>
        </model-page>

        <model-page :modelValue="rightTable" @changeModel="changeModelR" title="席位租赁收入市场份额走势">
            <sample-table-x
                :columns="tableColumnsR"
                :data="tableDataR"
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
            centerTable:false,
            tableColumns:[],
            tableData:[],
            rightTable:false,
            tableColumnsR:[],
            tableDataR:[],
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
            this.centerTable=val
        },
        changeModelR(val){
            this.rightTable=val
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
        height: 400px;
        margin-top: 10px;
        padding: 20px 10px;
        border-radius: 10px;
        background-color: #fff;
        >div{
            padding:10px;
            border-radius: 10px;
            border: 1px solid #ececec;
        }
        .left{
            flex: none;
            width: 300px;
            margin-right: 10px;
            .echartsC{
                height: 183px;
                margin: 35px 0;
                border: 1px solid pink;
            }
            .titleList{
                >p{
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                    margin-bottom: 10px;
                    .color1{
                        color: #ff8546;
                    }
                    .color2{
                        color: #363fc8;
                    }
                }
            }
        }
        .center{
            margin-right: 15px;
        }
        .center,.right{
            flex: 1;
        }
        .titleC{
            display: flex;
            justify-content: space-between;
            font-size: 16px;
        }
    }
}
</style>