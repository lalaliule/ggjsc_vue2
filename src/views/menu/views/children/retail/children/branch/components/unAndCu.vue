<template>
<div class="mainCon">
    <div class="main-head">
        <div class="left">非通道业务收入
            <img @click="leftTable = true" src="@/assets/imgs/overallOperation/biaodan.png" alt="">
        </div>
        <div class="right">客户集中度
            <img @click="rightTable = true" src="@/assets/imgs/overallOperation/biaodan.png" alt="">
        </div>
    </div>
    <div class="main-con" v-for="(item,i) in listData" :key="i">
        <div class="leftCon">
            <!-- <div class="title">{{codeTitle}}</div> -->
            <div class="title">{{item.branch_name}}</div>
            <!-- 左侧list -->
            <div class="listCon">
                <div class="left">
                    <div class="listTitle">非通道收入占比
                        <a-tooltip placement="bottom">
                            <template #title>
                                <span>非通道收入占营业收入和营业外收入的比例</span>
                            </template>
                            <a-icon type="question-circle" class="iconCir"></a-icon>
                        </a-tooltip>
                    </div>
                    <ul>
                        <!-- <li class="titleSq">非通道收入占比：{{$BigTimes(item.un_business_income_zb)+'%'}}</li> -->
                        <li>非通道收入排名：{{item.un_business_income_rank?item.un_business_income_rank:'-'}}</li>
                        <li>非通道收入排名变化：<span v-if="item.branch_name=='公司整体'">-</span> <span v-else> 
                            <a-icon v-if="item.un_business_income_rank_cg>=0" type="arrow-up"></a-icon> <a-icon v-else type="arrow-down"></a-icon>  {{item.un_business_income_rank_cg}}</span></li>
                    </ul>
                </div>
                <div class="center">
                    <echart-common :options="item.options"></echart-common>
                </div>
                <div class="right">
                    <div class="listTitle">非通道收入占比明细</div>
                    <ul class="listlI">
                        <li class="titleSq list1">财富管理类业务：{{$BigTimes(item.asset_manage_service_zb)+'%'}}</li>
                        <li class="titleSq list2">{{item.isThanFive?'投行、类投行类业务':'创新及其他'}}：{{$BigTimes(item.un_business_thlthzb)+'%'}}</li>
                        <li class="titleSq list3">{{item.isThanFive?'其他非通道类业务':'协同业务'}}： <span class="">{{$BigTimes(item.other_unbusiness_channel_zb)+'%'}}</span></li>
                        <li class="titleSq list4" v-if="!item.isThanFive">信用业务： {{$BigTimes(item.credit_unbusiness_channel_zb)+'%'}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="rightCon">
            <div class="title"></div>
            <!-- 右侧list -->
            <div class="listCon">
                <div class="top">
                    <div class="left">
                        <div class="bun">交易量内部占比</div>
                        <div class="bunN">{{item.tradvolume_indoor_zb+'%'}}</div>
                    </div>
                    <div class="right">
                        <div class="bun">年累计佣金率</div>
                        <div class="bunN">{{item.year_count_commission_rate+'%'}}</div>
                    </div>
                </div>
                <div class="bot">
                    <div class="progressCon">
                        <span>净佣金收入前10客户占比</span>
                        <a-progress :percent="Number(item.only_commission_ten_zb)" :strokeWidth="25" strokeColor="#ff8356">
                        </a-progress>
                    </div>
                    <div class="progressCon">
                        <span>净佣金收入前20客户占比</span>
                        <a-progress :percent="Number(item.only_commission_twentieth_zb)" :strokeWidth="25" strokeColor="#18c9d4">
                        </a-progress>
                    </div>
                    <div class="progressCon">
                        <span>净佣金收入前50客户占比</span>
                        <a-progress :percent="Number(item.only_commission_thiry_zb)" :strokeWidth="25" strokeColor="#454ad5">
                        </a-progress>
                    </div>
                </div>
            </div>
        </div>

    </div>

    
      <!-- 下钻表格 -->
    <model-page :modelValue="leftTable" @changeModel="changeModel" :title="codeTitle">
      <sample-table-y
          :columns="columns"
          :data="tableData"
      ></sample-table-y>
    </model-page>

    <!-- 下钻表格 -->
    <model-page :modelValue="rightTable" @changeModel="changeModelR" :title="codeTitle">
      <sample-table-y
          :columns="columnsR"
          :data="tableDataR"
      ></sample-table-y>
    </model-page>
</div>
</template>

<script>
import * as api from "../api.js";
import Big from '@/lib/big.min.js'

export default {
    props:{
      propData:{
        type:Object,
        default:()=>{}
      },
      codeTitle:{
        type:String,
        default:'公司整体'
      }
    },
    watch:{
      propData:{
        handler(newV){
          // 监听改变 发送接口请求
          this.getUnBusiness(newV)
        //   this.getCustCrDetail(newV)
        },
        immediate:true,
        deep:true
      },
    },
    data(){
        return{
            // unData:[],
            // curData:[],
            leftTable:false,
            tableData:[],
            columns:[
                {
                    name:'分支机构名称',
                    key:'branch_name',
                },
                {
                    name:'所属辖区',
                    key:'in_area_name',
                },
                {
                    name:'非通道收入占比',
                    key:'un_business_income_zb',
                },
                {
                    name:'非通道收入排名',
                    key:'un_business_income_rank',
                },
                {
                    name:'非通道收入排名变化',
                    key:'un_business_income_rank_cg',
                },
                {
                    name:'财富管理类业务收入占比',
                    key:'asset_manage_service_zb',
                },
                {
                    name:'投行、类投行业务收入占比',
                    key:'un_business_thlthzb',
                },
                {
                    name:'非通道中其他类收入占比',
                    key:'other_unbusiness_channel_zb',
                },
            ],
            rightTable:false,
            tableDataR:[],
            columnsR:[
                {
                    name:'分支机构名称',
                    key:'branch_name',
                },
                {
                    name:'所属辖区',
                    key:'in_area_name',
                },
                {
                    name:'交易量内部占比',
                    key:'tradvolume_indoor_zb',
                },
                {
                    name:'年累计佣金率',
                    key:'year_count_commission_rate',
                },
                {
                    name:'净佣金收入前10客户占比',
                    key:'only_commission_ten_zb',
                },
                {
                    name:'净佣金收入前20客户占比',
                    key:'only_commission_twentieth_zb',
                },
                {
                    name:'净佣金收入前50客户占比',
                    key:'only_commission_thiry_zb',
                },
            ],
            listData:[]

        }
    },
    methods:{
        // 非通道收入 
        getUnBusiness(obj){
            const params={
                time:obj.timeSelect,
                branch_code:obj.branch_code,
                area_code:obj.area_code
            }
            api.getUnBusiness(params).then(res=>{
                if(res.ret_code==0){
                    // 添加option数据
                    res.data.forEach(el=>{
                        // 非通道收入占比明细
                        let datas=this.$BigTimes(el.un_business_income_zb)
                        let data1=el.asset_manage_service_zb*100 // 财富管理
                        let data2=el.un_business_thlthzb*100 // 投行、类投行 -- 创新及其他
                        let data3=el.other_unbusiness_channel_zb*100 // 其他 -- 协同业务 
                        let data4=el.credit_unbusiness_channel_zb*100 // 信用业务
                        let dataValue=(100-data1-data2-data3-data4).toFixed(2)
                        let options={
                            title: {
                    text: datas+'%',
                    subtext: "非通道收入占比",
                    left: "center",
                    top: "74",
                     textStyle:{
                      fontSize:20,
                      color:'#4850cd'
                    },
                    subtextStyle: {
                        fontSize: 14,
                        color:'#646464'
                    }
                },
                        tooltip: {
                        trigger: "item",
                        show: false
                    },
                    legend: {
                        orient:'vertical',
                        right:'10%',
                        top:'center',
                        itemWidht:16,
                        itemHeight:16,
                        icon:'rect',
                        selectedMode:false
                    },
                    series: [
                        {
                            type: "pie",
                            radius: ["70%", "90%"],
                            center: ["50%", "50%"],
                            avoidLabelOverlap: false,
                            hoverAnimation: false,
                            label: {
                            show: false,
                            position: "center"
                            },
                            labelLine: {
                            show: false
                            },
                            emphasis: {
                            show: false
                            },
                            data: [
                            {value:data1,
                            // name:`财富管理类业务: ${data3.toFixed(2)}%`,
                            itemStyle:{
                                normal:{
                                    color:'#f68180'
                                }
                                }
                            },
                            {
                                value:data2,
                                //  name:`投行、类投行类业务: ${data4.toFixed(2)}%`,
                                itemStyle:{
                                normal:{
                                    color:'#ce70fe'
                                },
                                }
                            },
                                {
                                value:data3,
                            // name:`其他非通道类业务: ${data5.toFixed(2)}%`,
                                itemStyle:{
                                normal:{
                                    color:'#79a2fc'
                                },
                                emphasis:{
                                    color:'#79a2fc'
                                }
                                }
                            },
                            {
                                value:data4,
                            // name:`其他非通道类业务: ${data5.toFixed(2)}%`,
                                itemStyle:{
                                normal:{
                                    color:'#ffbe56'
                                },
                                emphasis:{
                                    color:'#ffbe56'
                                }
                                }
                            },
                            {
                                value:dataValue,
                            // name:`其他非通道类业务: ${data5.toFixed(2)}%`,
                                itemStyle:{
                                normal:{
                                    color:'#e6ebf8'
                                },
                                emphasis:{
                                    color:'#e6ebf8'
                                }
                                }
                            },
                            ]
                        }
                    ]
                        }
                        this.$set(el,'options',options)
                        // 2021.1-4与5月及以后
                        if(Number(el.time)<=20210430){
                            this.$set(el,'isThanFive',false)
                        }else{
                            this.$set(el,'isThanFive',true)
                        }

                        // 右侧数据处理
                        el.only_commission_ten_zb=this.$BigTimes(el.only_commission_ten_zb)
                        el.only_commission_thiry_zb=this.$BigTimes(el.only_commission_thiry_zb)
                        el.only_commission_twentieth_zb=this.$BigTimes(el.only_commission_twentieth_zb)
                        el.tradvolume_indoor_zb=this.$BigTimes4(el.tradvolume_indoor_zb)
                        el.year_count_commission_rate=this.$BigTimes4(el.year_count_commission_rate)

                    })
                    this.listData=res.data
                    // this.unData=res.data 
                    this.tableData=JSON.parse(JSON.stringify(res.data))
                    this.tableData.forEach(el=>{
                        el.income=this.$BigTimes(el.income)+'%'
                        el.service=this.$BigTimes(el.service)+'%'
                        el.thlthzb=this.$BigTimes(el.thlthzb)+'%'
                        el.channel=this.$BigTimes(el.channel)+'%'
                        el.credit=this.$BigTimes(el.credit)+'%'
                        el.un_business_income_zb=this.$BigTimes(el.un_business_income_zb)+'%'
                        el.asset_manage_service_zb=this.$BigTimes(el.asset_manage_service_zb)+'%'
                        el.un_business_thlthzb=this.$BigTimes(el.un_business_thlthzb)+'%'
                        el.other_unbusiness_channel_zb=this.$BigTimes(el.other_unbusiness_channel_zb)+'%'
                        el.credit_unbusiness_channel_zb=this.$BigTimes(el.credit_unbusiness_channel_zb)+'%'
                    })
                    let isThanFive=res.data[0]&&res.data[0].isThanFive
                    if(!isThanFive){
                        this.columns.push({
                            name:'信用业务',
                            key:'credit_unbusiness_channel_zb',
                        })
                    }else{
                        this.columns=this.columns.filter(el=>{
                            return el.key!='credit_unbusiness_channel_zb'
                        })
                    }
                    this.columns[6].name=isThanFive?'投行、类投行业务收入占比':'创新及其他'
                    this.columns[7].name=isThanFive?'非通道中其他类收入占比':'协同业务'

                    this.tableDataR=JSON.parse(JSON.stringify(res.data))
                    this.tableDataR.forEach(el=>{
                        el.only_commission_ten_zb=(el.only_commission_ten_zb)+'%'
                        el.only_commission_thiry_zb=(el.only_commission_thiry_zb)+'%'
                        el.only_commission_twentieth_zb=(el.only_commission_twentieth_zb)+'%'
                        el.tradvolume_indoor_zb=(el.tradvolume_indoor_zb)+'%'
                        el.year_count_commission_rate=(el.year_count_commission_rate)+'%'
                    })

                }
            })
        },
        // 获取客户集中度 
        // getCustCrDetail(obj){
        //     const params={
        //         time:obj.timeSelect,
        //         branch_code:obj.branch_code,
        //         area_code:obj.area_code
        //     }
        //     api.getCustCrDetail(params).then(res=>{
        //         if(res.ret_code==0){
        //             res.data.forEach(el=>{
        //                 el.only_commission_ten_zb=this.$BigTimes(el.only_commission_ten_zb)
        //                 el.only_commission_thiry_zb=this.$BigTimes(el.only_commission_thiry_zb)
        //                 el.only_commission_twentieth_zb=this.$BigTimes(el.only_commission_twentieth_zb)
        //                 el.tradvolume_indoor_zb=this.$BigTimes4(el.tradvolume_indoor_zb)
        //                 el.year_count_commission_rate=this.$BigTimes4(el.year_count_commission_rate)
        //             })
        //             this.curData=res.data 
        //             this.tableDataR=JSON.parse(JSON.stringify(res.data))
        //             this.tableDataR.forEach(el=>{
        //                 el.only_commission_ten_zb=(el.only_commission_ten_zb)+'%'
        //                 el.only_commission_thiry_zb=(el.only_commission_thiry_zb)+'%'
        //                 el.only_commission_twentieth_zb=(el.only_commission_twentieth_zb)+'%'
        //                 el.tradvolume_indoor_zb=(el.tradvolume_indoor_zb)+'%'
        //                 el.year_count_commission_rate=(el.year_count_commission_rate)+'%'
        //             })

        //         }
        //     })
        // },
        changeModel(val){
            this.leftTable=val
        },
        changeModelR(val){
            this.rightTable=val
        }
    }
    
}
</script>

<style lang="scss" scoped>
.mainCon{
    margin-top: 50px;
    .main-head{
        display: flex;
        padding: 0 20px;
        .left,.right{
            flex: 1;
            font-size: 18px;
            font-weight: 700;
            color: #2f2f2f;
        }
        .right{
            margin-left: 40px;
        }
    }
    .main-con{
        display: flex;
        margin-top: 10px;
        padding: 0 20px;
        .leftCon,.rightCon{
            flex:1;
            .title{
                font-size: 18px;
                font-weight: 700;
                color: #2f2f2f;
                height: 36px;
                line-height: 36px;
                padding-left: 20px;
                background-color: #f8f9fa;
            }
            .listCon{
                height: 220px;
                margin-top: 10px;
                margin-right: 20px;
                border-radius: 10px;
                background-color: #f8f9fa;
            }
        }
        .leftCon{
            .listCon{
                display: flex;
                align-items: center;
                .left,.right{
                    flex: 1;
                    .listTitle{
                        font-size: 18px;
                        font-weight: 500;
                        color: #2f2f2f;
                        margin-bottom: 16px;
                    }
                    ul{
                        li{
                            font-size: 16px;
                            margin-bottom: 16px;
                        }
                    }
                }
                .left{
                    text-align: right;
                    margin-right: 10px;
                }
                .anticon-arrow-up{
                    color: #f83030;
                }
                .anticon-arrow-down{
                    color: #18c9d4;
                }
                .center{
                    flex: none;
                    width: 200px;
                    height: 200px;
                }
                .right{
                    margin-left: 10px;
                    // margin-top: 50px;
                    .titleSq{
                           margin-left: 0;
                           margin-bottom: 10px;
                           &::before{
                               display: inline-block;
                               content: '';
                               width: 16px;
                               height: 16px;
                               background-color: #4853d3;
                               vertical-align: middle;
                               margin-right: 14px;
                           }
                       }
                    .list1{
                           &::before{
                               background-color: #f68180;
                           }
                       }
                       .list2{
                           &::before{
                               background-color: #ce70fe;
                           }
                       }
                       .list3{
                           &::before{
                               background-color: #79a2fc;
                           }
                       }
                       .list4{
                           &::before{
                               background-color: #ffbe56;
                           }
                       }
                }
                
            }
        }
        .rightCon{
            .listCon{
                margin-left: 20px;
                margin-right: 0px;
            }
            .top{
                width: 400px;
                margin: 0 auto;
                padding: 20px 0;
                .left,.right{
                    display: inline-block;
                    margin-left: 20px;
                    .bun{
                        font-size: 16px;
                        color: #fff;
                        padding: 3px 16px;
                        border-radius: 15px;
                        background-color: #61A0ff;
                    }
                    .bunN{
                        font-size: 26px;
                        font-weight: 500;
                        color: #418dff;
                        text-align: center;
                    }
                }
                .right{
                    .bun{
                        background-color: #363fc8;
                    }
                    .bunN{
                        color: #363fc8;
                    }
                }
            }
            .bot{
                height: 110px;
                padding: 0 35px 0 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .progressCon{
                    flex: 1;
                    display: flex;
                    >span{
                        width: 260px;
                        font-size: 16px;
                    }
                }
            }
        }
    }
}
</style>