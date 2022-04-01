<template>
<div class="myCon">
        <div class="main-head">
            <div class="title">基金托管规模</div>
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
                <div class="top">
                    <div class="topC">
                        <div class="topT">
                            <span class="tips">公</span>
                            <span class="tipsT">公募基金规模</span>
                        </div>
                        <div class="topN">
                            <span class="topN_l">120只</span>
                            <span class="topN_r">30000000万元</span>
                        </div>
                    </div>
                </div>
                <div class="bom">
                    <div class="topC">
                        <div class="topT">
                            <span class="tips">私</span>
                            <span class="tipsT">私募基金规模</span>
                        </div>
                        <div class="topN">
                            <span class="topN_l">25只</span>
                            <span class="topN_r">300000万元</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="tabsC">
                    <tab-toggle
                        :change="tabChange"
                        :tab="['公募基金规模(万元)', '私募基金规模(万元)']"
                    ></tab-toggle>
                    <img @click="leftTable = true" 
                    src="@/assets/imgs/overallOperation/biaodan.png" alt="">
                </div>
                <div class="chartsC"></div>
            </div>
        </div>
        <model-page :modelValue="leftTable" @changeModel="changeModel" title="基金托管规模(万元)">
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
            current:0,
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
        tabChange(index){
            this.current=index
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
        height: 510px;
        margin-top: 10px;
        padding: 20px 10px;
        border-radius: 10px;
        background-color: #fff;
        .left{
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: none;
            width: 420px;
            margin-right: 20px;
            border-radius: 10px;
            background-color: pink;
            .top,.bom{
                flex: 1;
                width: 100%;
                align-self: center;
                padding: 0 10px;
                .topC{
                    padding: 50px 20px 0;
                    font-size: 18px;
                    color: #fff;
                    box-sizing: border-box;
                    .topT{
                        margin-bottom:40px;
                        >span{
                            display: inline-block;
                            height: 30px;
                            line-height: 30px;
                        }
                        .tips{
                           width: 30px;
                            margin-right: 20px;
                            text-align: center;
                            font-size: 12px;
                            vertical-align: middle;
                            border-radius: 50%;
                            background-color: rgba(255,255,255,.4);
                        }
                    }
                    .topN{
                        display: flex;
                        justify-content: space-between;
                        color: #FFF;
                        font-size: 24px;
                        .topN_l{
                            line-height: 52px;
                        }
                        .topN_r{
                            padding: 8px 15px;
                            color: #363fc8;
                            border-radius: 10px;
                            background-color: #fff;
                        }
                    }
                }
            }
            .top{
                .topC{
                    height: 100%;
                    width: 100%;
                    border-bottom: 3px solid #bbb;
                }
            }
        }
        .right{
            flex: 1;
            border: 1px solid pink;
            .tabsC{
                display: flex;
                justify-content: flex-end;
                align-items: center;
                ::v-deep .tab-toggle{
                    width: 340px;
                    li{
                        padding: 0 20px;
                        line-height:44px;
                    }
                }
                >img{
                    width: 24px;
                    height: 24px;
                    margin-left: 30px;
                    cursor: pointer;
                }
            }

        }
    }
}
</style>