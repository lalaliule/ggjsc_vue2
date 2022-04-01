<template>
     <div class="myCon">
        <div class="main-head">
            <div class="title">期货业务<span class="dataFrom">数据来源: 华安期货</span></div>
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
                <ul>
                    <li>
                        <div class="left">
                            <img src="@/assets/imgs/business/qh-1.png" alt="">
                        </div>
                        <div class="right">
                            <div class="right1">{{detailData[1]&&detailData[1].name}}(万元)</div>
                            <div class="right2">
                                <p>{{detailData[1]&&$toT(detailData[1].income)}}</p>
                                <p class="paim">
                                    排名 <span>{{detailData[1]&&detailData[1].rate}}</span>/{{detailData[1]&&detailData[1].num}}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            <img src="@/assets/imgs/business/qh-2.png" alt="">
                        </div>
                       <div class="right">
                            <div class="right1">{{detailData[3]&&detailData[3].name}}(万元)</div>
                            <div class="right2">
                                <p>{{detailData[3]&&$toT(detailData[3].income)}}</p>
                                <p class="paim">
                                    排名 <span>{{detailData[3]&&detailData[3].rate}}</span>/{{detailData[3]&&detailData[3].num}}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            <img src="@/assets/imgs/business/qh-3.png" alt="">
                        </div>
                        <div class="right">
                            <div class="right1">{{detailData[4]&&detailData[4].name}}(万元)</div>
                            <div class="right2">
                                <p>{{detailData[4]&&$toT(detailData[4].income)}}</p>
                                <p class="paim">
                                    排名 <span>{{detailData[4]&&detailData[4].rate}}</span>/{{detailData[4]&&detailData[4].num}}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            <img src="@/assets/imgs/business/qh-4.png" alt="">
                        </div>
                        <div class="right">
                            <div class="right1">{{detailData[2]&&detailData[2].name}}(万元)</div>
                            <div class="right2">
                                <p>{{detailData[2]&&$toT(detailData[2].income)}}</p>
                                <p class="paim">
                                    排名 <span>{{detailData[2]&&detailData[2].rate}}</span>/{{detailData[2]&&detailData[2].num}}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="conR">
               <img src="@/assets/imgs/business/qh-5.png" alt="">
               <div>
                    <span class="rijun">{{detailData[0]&&detailData[0].name}}(万元)</span>
                    <p>{{detailData[0]&&$toT(detailData[0].income)}}</p>
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
            detailData:[]
        }
    },
    created(){
        this.getFuturesBusinessTime()
        this.getOperaIndicatorsMon()
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
            this.getOperaIndicatorsMon()
        },
        getFuturesBusinessTime(){
            api.getFuturesBusinessTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 期货业务 月度经营指标 
        getOperaIndicatorsMon(){
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            this.detailData=[]
            api.getOperaIndicatorsMon(params).then(res=>{
                if(res.ret_code==0){
                    this.detailData=res.data
                }
            })
        }
      
    }
}
</script>
<style lang="scss" scoped>
.myCon{
    margin:0 20px 20px;
    min-width: 1200px;
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
        height: 290px;
        margin-left: 10px;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #c3c3c3;
        .conL{
            flex: 1;
            height: 100%;
            ul{
                display: flex;
                flex-wrap: wrap;
                li{
                    display: flex;
                    flex: 40%;
                    height: 103px;
                    margin-bottom: 40px;
                    margin-right: 30px;
                    padding:10px 20px;
                    color: #2f2f2f;
                    background-color: #f8f9fa;
                    border-radius: 10px;
                    border: 1px solid #d2d6da;
                    &:nth-child(1){
                        // background-color: #4f88fb;
                    }
                    &:nth-child(2){
                        // background-color: #604dff;
                    }
                    &:nth-child(3){
                        // background-color: #6b36ec;
                    }
                    &:nth-child(4){
                        // background-color: #fa5d33;
                    }
                    .left{
                        flex: none;
                        width: 72px;
                        position: relative;
                        img{
                            width: 100%;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }
                    .right{
                        flex: 1;
                        display: flex;
                        justify-content: space-between;
                        font-weight: 600;
                        font-size: 16px;
                        >div{
                            flex: 1;
                        }
                        .right1{
                            // text-align: right;
                            margin-left: 35px;
                            margin-top: 7px;
                        }
                        .right2{
                            >p{
                                margin-bottom: 10px;
                                &:nth-child(1){
                                    font-size: 24px;
                                    font-weight: 500;
                                }
                            }
                            .paim{
                                // color:rgba(255,255,255,0.7);
                                color: #2f2f2f;
                                font-size: 14px;
                                font-weight: 400;
                                span{
                                    font-size: 20px;
                                }
                            }
                        }
                    }
                }
            }
            
        }
        .conR{
            flex: none;
            width: 324px;
            // padding-top: 40px;
            margin-left: 20px;
            border-radius: 10px;
            border: 1px solid #e2e2e2;
            text-align: center;
            overflow: hidden;
            >img{
                width:120px;
                height:120px;
                margin: 20px 0;
            }
            >div{
                height: 86px;
                padding-top: 15px;
                background:url(~@/assets/imgs/business/qh-6.png);
                >span{
                    padding: 3px 15px;
                    color: #fefdfc;
                    font-weight: 500;
                    background-color: #f66c72;
                    border-radius: 20px;
                }
                >p{
                    font-weight: 500;
                    font-size: 32px;
                    color: #e35f56;
                }
            }
        }
    }
}
</style>