<template>
<div class="myContain">
    <!-- 可视化 -->
    <div v-show="current==0" class="contain_visual">
         <div 
            v-infinite-scroll="handleInfiniteOnLoad"
            :infinite-scroll-disabled="busy"
            :infinite-scroll-distance="10"
            >
            <a-list :data-source="splitData" :split="false">
                <a-list-item slot="renderItem" slot-scope="item">
                <div class="title">{{item.branch_name}}</div>
            <div class="listStyle">
                <div class="picNum">
                    <div class="picCon">
                        <img src="@/assets/imgs/cus1.png" alt="">
                        <p class="rateCon">{{item.tradvolume_indoor_zb+'%'}}</p>
                        <p>交易量内部占比</p>
                    </div>
                    <div class="picCon">
                        <img src="@/assets/imgs/cus2.png" alt=""> 
                        <p class="rateCon">{{item.year_count_commission_rate+'%'}}</p>                
                        <p>年累计佣金率</p>
                    </div>
                </div>
                <div class="progressNum">
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
                </a-list-item>
            </a-list>
         </div>
        <!-- <div v-for="(item,i) in tableData" :key="i">
            
        </div> -->
    </div>
    <!-- 表格 -->
    <div v-show="current==1" class="contain_table">
        <a-table :bordered="true" :columns="columns" :data-source='tableData' :pagination="false" :rowKey="(record,index)=>{return index}" :scroll="{y:550}">
            <span slot="indoor" slot-scope="indoor">{{indoor+'%'}}</span>
            <span slot="rate" slot-scope="rate">{{rate+'%'}}</span>
            <span slot="ten" slot-scope="ten">{{ten+'%'}}</span>
            <span slot="twentieth" slot-scope="twentieth">{{twentieth+'%'}}</span>
            <span slot="thiry" slot-scope="thiry">{{thiry+'%'}}</span>
        </a-table>
    </div>
</div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
export default {
    directives:{infiniteScroll},
    props:{
        current:{
            type:[Number,String],
            default:0
        },
        dataDetail:{
            type:Array,
            default:()=>[]
        },
        activeKey:{
            type:[Number,String]
        }
    },
    data(){
        return {
            tableData:[],
            columns:[
                {
                    title:'分支机构名称',
                    key:'branch_name',
                    dataIndex:'branch_name',
                    align:'center'
                },
                {
                    title:'所属辖区',
                    key:'in_area_name',
                    dataIndex:'in_area_name',
                    align:'center'

                },
                {
                    title:'交易量内部占比',
                    key:'tradvolume_indoor_zb',
                    dataIndex:'tradvolume_indoor_zb',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.tradvolume_indoor_zb-b.tradvolume_indoor_zb,
                    scopedSlots:{customRender:'indoor'}
                },
                {
                    title:'年累计佣金率',
                    key:'year_count_commission_rate',
                    dataIndex:'year_count_commission_rate',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.year_count_commission_rate-b.year_count_commission_rate,
                    scopedSlots:{customRender:'rate'}
                },
                {
                    title:'净佣金收入前10客户占比',
                    key:'only_commission_ten_zb',
                    dataIndex:'only_commission_ten_zb',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.only_commission_ten_zb-b.only_commission_ten_zb,
                    scopedSlots:{customRender:'ten'}
                },
                {
                    title:'净佣金收入前20客户占比',
                    key:'only_commission_twentieth_zb',
                    dataIndex:'only_commission_twentieth_zb',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.only_commission_twentieth_zb-b.only_commission_twentieth_zb,
                    scopedSlots:{customRender:'twentieth'}
                },
                {
                    title:'净佣金收入前50客户占比',
                    key:'only_commission_thiry_zb',
                    dataIndex:'only_commission_thiry_zb',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.only_commission_thiry_zb-b.only_commission_thiry_zb,
                    scopedSlots:{customRender:'thiry'}
                },
            ],
            splitData:[],
            splitArr:[],
            count:0,
            loading:false,
            busy:false,

        }
    },
    watch:{
        dataDetail:{
            handler(arr){
                this.tableData=arr
                this.splitArr=arr&&this.$splitArr(arr,5)
                this.splitData=this.splitArr[0]

            },
            immediate:true,
            deep:true
        },
        activeKey(val){
            if(val==4){
               this.count=0
           }
        }
    },
    methods:{
        handleInfiniteOnLoad(){
            const data=this.splitArr
            this.loading=true
            this.count++
            if(this.count>data.length){
                this.busy=true
                this.loading=false
                return 
            }
            if(data[this.count]){
                this.splitData=this.splitData.concat(data[this.count])
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .myContain{
        width: 100%;
        .contain_visual{
            height: calc(100vh - 200px);
            overflow-y: scroll;
            padding-right: 20px;
            ::v-deep .ant-list-items{
            .ant-list-item{
                display: block;
                padding: 0;
            }
        }
            .title{
                font-size: 16px;
                font-weight: 700;
                margin: 10px;
            }
            .listStyle{
                display: flex;
                height: 200px;
                border-radius: 10px;
                border:1px solid #ccc;
                .picNum{
                    flex: 40%;
                    display: flex;
                    .picCon{
                        flex: 1;
                        padding: 22px 70px 20px 30px;
                        text-align: right;
                        img{
                            width: 90px;
                            height: 90px;
                        }
                        p{
                            font-size: 16px;
                            text-align: left;
                            line-height: 30px;
                            margin-bottom: 0;
                        }
                        .rateCon{
                            font-weight: 700;
                            margin-top: 20px;
                        }
                    }
                }
                .progressNum{
                    flex: 60%;
                    // text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 20px 0;
                    .progressCon{
                        span{
                            margin-right: 20px;
                            font-size: 16px;
                        }
                        .ant-progress-line{
                            width: 65%;
                            .ant-progress-inner{
                                // transition: all 3s;
                            }
                        }
                    }
                }
            }
        }
    //     .contain_table{
    //         .ant-table-body{
    //   max-height: calc(100vh - 260px) !important;
    // }
    //     }

        
    }
</style>
    
