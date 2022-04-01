<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">公司大类资产结构</div>
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
            <div class="top">
                <img @click="topTable = true" src="@/assets/imgs/overallOperation/biaodan.png" alt="">
            </div>
            <div class="bto">
                <img @click="bomTable = true" src="@/assets/imgs/overallOperation/biaodan.png" alt="">
            </div>
        </div>

        <model-page :modelValue="topTable" @changeModel="changeModelT" title="123456789(万元)">
            <sample-table-x
                :columns="tableColumnsT"
                :data="tableDataT"
            ></sample-table-x>
        </model-page>
        <model-page :modelValue="bomTable" @changeModel="changeModelB" :title="titleChage+'近13个月走势(万元)'">
            <sample-table-x
                :columns="tableColumnsB"
                :data="tableDataB"
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
            topTable:false,
            tableColumnsT:[],
            tableDataT:[],   
            bomTable:false, 
            tableColumnsB:[],
            tableDataB:[],
            titleChage:'123'
        }
    },
    created(){
        this.getBroadAssetsTime()
        this.getBroadAssets()
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
            this.getBroadAssets()
        }, 
        // 关闭弹窗
        changeModelT(val){
            this.topTable=val
        },
        changeModelB(val){
            this.bomTable=val
        },
        // 公司大类资产结构 时间列表 getBroadAssetsTime
        getBroadAssetsTime(){
            api.getBroadAssetsTime().then(res=>{
                if(res.ret_code==0){
                    this.histroyDate=res.data
                    this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0];
                    let str=this.histroyDate.length > 0 && this.histroyDate[0]
                    let tiemStr=str.split('-')
                    this.new_date=`${tiemStr[0]}年${Number(tiemStr[1])}月`
                }
            })
        },
        // 公司大类资产结构 getBroadAssets
        getBroadAssets(){
            // this.detailData={}
            const params={
                time: this.timeSel
                ? moment(this.timeSel).format("YYYYMM")
                : '',
            }
            api.getBroadAssets(params).then(res=>{
                if(res.ret_code==0){
                    console.log(res,'...res')
                }
            })
        }
        // 公司大类资产结构走势图 getBroadAssetsTrend
        
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
        height: 844px;
        margin: 10px 0 0 10px;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #c3c3c3;
        >div{
            position: relative;
            >img{
                position: absolute;
                top: 20px;
                right: 20px;
            }
        }
        .top{
            height: 500px;
            border-bottom: 1px solid #c3c3c3;
        }
    }
}
</style>