<template>
  <div class="myCon">
        <div class="main-head">
            <div class="title">证券投资收益</div>
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
                <div class="title">
                    <span>证券投资收益(万元)</span>
                    <img @click="leftTable = true" src="@/assets/imgs/overallOperation/biaodan.png" alt="">
                </div>
                <div class="echartsC"></div>
            </div>
            <div class="right">
                <div class="title">
                    <span>公允价值变动净收益(万元)</span>
                    <img @click="rightTable = true" src="@/assets/imgs/overallOperation/biaodan.png" alt="">
                </div>
                <div class="echartsC"></div>     
            </div>
        </div>

        <model-page :modelValue="leftTable" @changeModel="changeModelL" title="证券投资收益(万元)">
            <sample-table-x
                :columns="tableColumnsL"
                :data="tableDataL"
            ></sample-table-x>
        </model-page>
        <model-page :modelValue="rightTable" @changeModel="changeModelR" title="公允价值变动净收益(万元)">
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
            leftTable:false,
            tableColumnsL:[],
            tableDataL:[],
            rightTable:false,
            tableColumnsR:[],
            tableDataR:[],
        }
    },
    created(){
        this.getBondProfitTime()
        this.getBondProfit()
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
            this.getBondProfit()
        }, 
        // 关闭弹窗
        changeModelL(val){
            this.leftTable=val
        },
        changeModelR(val){
            this.rightTable=val
        },
        // 证券投资收益（季度） 时间列表 
        getBondProfitTime(){
            api.getBondProfitTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 证券投资收益 getBondProfit
        getBondProfit(){
            // this.detailData={}
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getBondProfit(params).then(res=>{
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
        height: 390px;
        margin: 10px 0 0 10px;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #c3c3c3;
        >div{
            flex: 1;
            .title{
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                >img{
                width: 24px;
                height: 20px;
            }
            }
        }
        .left{
            margin-right: 40px;
            
        }

    }
}
</style>