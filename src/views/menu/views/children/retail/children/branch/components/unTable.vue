<template>
    <div class="myContain">
        <div  class="contain_table">
          <a-table :bordered="true" :columns="columns" :data-source='myData' :pagination="false" :rowKey="(record,index)=>{return index}" :scroll="{y:550}">
              <span slot="income" slot-scope="income">{{(income*100).toFixed(2)+'%'}}</span>
              <span slot="service" slot-scope="service">{{(service*100).toFixed(2)+'%'}}</span>
              <span slot="thlthzbTitle">{{isThanFive?'投行、类投行业务收入占比':'创新及其他'}}</span>  
              <span slot="otherTitle">{{isThanFive?'非通道中其他类收入占比':'协同业务'}}</span>  
              <span slot="thlthzb" slot-scope="thlthzb">{{(thlthzb*100).toFixed(2)+'%'}}</span>
              <span slot="channel" slot-scope="channel">{{(channel*100).toFixed(2)+'%'}}</span>
              <span slot="credit" slot-scope="credit">{{(credit*100).toFixed(2)+'%'}}</span>
              <span slot="rank" slot-scope="rank" :class="rank>0?'upRank':rank==0?'noUp':'downRank'">{{rank>0?'+'+rank:rank}}</span>
          </a-table>
      </div>  
    </div>
</template>

<script>
export default {
    props:{
        dataDetail:{
            type:Array,
            default:()=>[]
        },
    },
    data(){
        return{
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
                    // title:'投行、类投行业务收入占比',
                    key:'un_business_thlthzb',
                    dataIndex:'un_business_thlthzb',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.un_business_thlthzb-b.un_business_thlthzb,
                    scopedSlots:{customRender:'thlthzb'},
                    slots:{title:'thlthzbTitle'}
                },
                {
                    // title:'非通道中其他类收入占比',
                    key:'other_unbusiness_channel_zb',
                    dataIndex:'other_unbusiness_channel_zb',
                    align:'center',
                    sortDirections:['descend','ascend'],
                    defaultSortOrder:'descend',
                    sorter:(a,b)=>a.other_unbusiness_channel_zb-b.other_unbusiness_channel_zb,
                    scopedSlots:{customRender:'channel'},
                    slots:{title:'otherTitle'}
                },
            ],
            isThanFive:false
        }
    },
    watch:{
        dataDetail:{
            handler(arr,oldArr){
                this.isThanFive=arr[0]&&arr[0].isThanFive
                if(!this.isThanFive){
                    this.columns.push({
                        title:'信用业务',
                        key:'credit_unbusiness_channel_zb',
                        dataIndex:'credit_unbusiness_channel_zb',
                        align:'center',
                        sortDirections:['descend','ascend'],
                        defaultSortOrder:'descend',
                        sorter:(a,b)=>a.credit_unbusiness_channel_zb-b.credit_unbusiness_channel_zb,
                        scopedSlots:{customRender:'credit'},
                    })
                }else{
                    this.columns=this.columns.filter(el=>{
                        return el.key!='credit_unbusiness_channel_zb'
                    })
                }
                this.myData=arr
            },
            immediate:true,
            deep:true
        },
    },
}
</script>

<style lang="scss" scoped>

::v-deep .myContain{
    .contain_table{
        .ant-table-body{
            max-height: calc(100vh - 260px) !important;
        }
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