<template>
    <div class="myContain">
      <div v-show="current==0" class="contain_visual">
          <!-- v-show="current==0" 不能使用v-if不然tbs切换回来inifinte-scroll不生效 -->
          <div 
            v-infinite-scroll="infiniteOnLoad"
            :infinite-scroll-disabled="busy"
            :infinite-scroll-distance="10"
            >
            <a-list :data-source="splitData" :split="false">
                <a-list-item slot="renderItem" slot-scope="item">
                    <div class="title">{{item.branch_name}}</div>
                    <div class="listStyle">
                        <div class="left">
                            <div class="chartCon">
                                <echart-common :options="item.options"></echart-common>
                            </div>
                            <div class="listData">
                                <div class="listCon">
                                <div class="listTitle">非通道收入占比
                                    <a-tooltip placement="bottom">
                                        <template #title>
                                            <span>非通道收入占营业收入和营业外收入的比例</span>
                                        </template>
                                        <a-icon type="question-circle" class="iconCir"></a-icon>
                                        </a-tooltip>
                                </div>
                                <ul class="listlI">
                                    <li class="titleSq">非通道收入占比：{{(item.un_business_income_zb*100).toFixed(2)+'%'}}</li>
                                    <li>非通道收入排名：{{item.un_business_income_rank}}</li>
                                    <li>非通道收入排名变化： <span> <a-icon v-if="item.un_business_income_rank_cg>=0" type="arrow-up"></a-icon> <a-icon v-else type="arrow-down"></a-icon>  {{item.un_business_income_rank_cg}}</span></li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="chartCon">
                            <echart-common :options="item.options2"></echart-common>
                            </div>
                            <div class="listData">
                            <div class="listCon">
                                <div class="listTitle">非通道收入占比明细</div>
                                <ul class="listlI">
                                    <li class="titleSq list1">财富管理类业务：{{(item.asset_manage_service_zb*100).toFixed(2)+'%'}}</li>
                                    <li class="titleSq list2">{{item.isThanFive?'投行、类投行类业务':'创新及其他'}}：{{(item.un_business_thlthzb*100).toFixed(2)+'%'}}</li>
                                    <li class="titleSq list3">{{item.isThanFive?'其他非通道类业务':'协同业务'}}： <span class="">{{(item.other_unbusiness_channel_zb*100).toFixed(2)+'%'}}</span></li>
                                    <li class="titleSq list4" v-if="!item.isThanFive">信用业务： {{(item.credit_unbusiness_channel_zb*100).toFixed(2)+'%'}}</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                </a-list-item>
            </a-list>
        </div>
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
        selectTime:{
            type:[Number,String],
            default:''
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
        return{
            loading:false,
            busy:false,
            myData:[],
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
                    title:'非通道收入占比',
                    key:'un_business_income_zb',
                    dataIndex:'un_business_income_zb',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.un_business_income_zb-b.un_business_income_zb,
                    scopedSlots:{customRender:'income'}
                },
                {
                    title:'非通道收入排名',
                    key:'un_business_income_rank',
                    dataIndex:'un_business_income_rank',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.un_business_income_rank-b.un_business_income_rank
                },
                {
                    title:'非通道收入排名变化',
                    key:'un_business_income_rank_cg',
                    dataIndex:'un_business_income_rank_cg',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.un_business_income_rank_cg-b.un_business_income_rank_cg,
                    scopedSlots:{customRender:'rank'}
                },
                {
                    title:'财富管理类业务收入占比',
                    key:'asset_manage_service_zb',
                    dataIndex:'asset_manage_service_zb',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.asset_manage_service_zb-b.asset_manage_service_zb,
                    scopedSlots:{customRender:'service'}
                },
                {
                    title:'投行、类投行业务收入占比',
                    key:'un_business_thlthzb',
                    dataIndex:'un_business_thlthzb',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.un_business_thlthzb-b.un_business_thlthzb,
                    scopedSlots:{customRender:'thlthzb'}
                },
                {
                    title:'非通道中其他类收入占比',
                    key:'other_unbusiness_channel_zb',
                    dataIndex:'other_unbusiness_channel_zb',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.other_unbusiness_channel_zb-b.other_unbusiness_channel_zb,
                    scopedSlots:{customRender:'channel'}
                },
            ],
            splitData:[],
            splitArr:[],
            count:0,
        }
    },
    watch:{
        dataDetail:{
            handler(arr,oldArr){
                this.splitArr=arr&&this.$splitArr(arr,5)
                this.myData=arr
                this.splitData=this.splitArr[0]
            },
            immediate:true,
            deep:true
        },
        activeKey(val){
           if(val==3){
               this.count=0
           }
        }
    },
    mounted(){
        this.$nextTick(()=>{
        })
    },
    computed:{
        
    },
    methods:{
        infiniteOnLoad(){
            const data=this.splitArr
            this.loading=true
            if(this.count>=data.length){
                this.busy=true
                this.loading=false
                return 
            }
            this.count++
            if(data[this.count]){
                this.splitData=this.splitData.concat(data[this.count])
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.myContain{
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
            justify-content: space-between;
            height: 200px;
            border-radius: 10px;
            border:1px solid #ccc;
            .left,.right{
                flex: 1;
                display: flex;
                .chartCon{
                    flex: 4;
                }
               .listData{
                   flex: 1;
                   position: relative;
                   .listCon{
                   position: absolute;
                   top: 50%;
                   left: -120%;
                   transform: translateY(-50%);
                   .listTitle{
                       margin-bottom: 20px;
                       font-size: 18px;
                       font-weight: 700;
                   }
                    .listlI{
                       font-size: 14px;
                       >li{
                           margin-left: 30px;
                           line-height: 25px;
                       }
                       .titleSq{
                           margin-left: 0;
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
                       .anticon-arrow-up{
                           color: #f83030;
                       }
                       .anticon-arrow-down{
                           color: #18c9d4;
                       }
                   }
                   }

               }
            }
        }
    }
    ::v-deep .contain_table{
        // .ant-table-body{
        // max-height: calc(100vh - 260px) !important;
        // }
        .upRank{
            color: #f96e6e;
        }
        .noUp{
            color: #3b59ff;
        }
        .downRank{
            color: #48b246;
        }
    }
}
    
</style>
    
