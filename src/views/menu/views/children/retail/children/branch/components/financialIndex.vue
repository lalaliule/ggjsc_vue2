<template>
  <div class="myContain">
            <!-- 可视化 -->
      <div v-show="current==0" class="contain_visual">
        <!-- 添加口径解释 -->
        <div style="text-align:right;color:#969696;">* 排名变化指分支机构当月排名与去年12月底排名对比</div>
        <div class="rankCon">
          <!-- 净利润前10 -->
          <div class="rankCon_item">
              <img src="@/assets/imgs/li.png" alt="">
              <div class="title">
                <ul>
                  <li>排名</li>
                  <li class="flexNum">营业部名称</li>
                  <li>排名变化</li>
                </ul>
              </div>
              <div class="list">
                <ul>
                  <li v-for="(item,i) in topData.sales_dep_ranking_list" :key="i">
                    <span>
                        <img v-if="item.ranking==1" src="@/assets/imgs/jin.png">
                        <img v-else-if="item.ranking==2" src="@/assets/imgs/yin.png">
                        <img v-else-if="item.ranking==3" src="@/assets/imgs/tong.png">
                        <span v-else>{{item.ranking}}</span>
                    </span>
                    <span class="flexNum">{{item.name}}</span>
                    <span class="noC">
                        <i>{{item.ranking_change}}</i>
                        <span>
                          <img v-if="item.ranking_change>0" src="@/assets/imgs/overallOperation/ind.png">
                          <img v-if="item.ranking_change<0" src="@/assets/imgs/overallOperation/down.png">
                        </span>
                    </span>
                  </li>
                </ul>
              </div>
          </div>
          <!-- 净收入前10 -->
          <div class="rankCon_item">
            <img src="@/assets/imgs/shou.png" alt="">
             <div class="title">
                <ul>
                  <li>排名</li>
                  <li class="flexNum">营业部名称</li>
                  <li>排名变化</li>
                </ul>
              </div>
              <div class="list">
                <ul>
                  <li v-for="(item,i) in topData.sales_dep_incoming_ranking_list" :key="i">
                    <span>
                        <img v-if="item.ranking==1" src="@/assets/imgs/jin.png">
                        <img v-else-if="item.ranking==2" src="@/assets/imgs/yin.png">
                        <img v-else-if="item.ranking==3" src="@/assets/imgs/tong.png">
                        <span v-else>{{item.ranking}}</span>
                    </span>
                    <span class="flexNum">{{item.name}}</span>
                    <span class="noC">
                        <i>{{item.ranking_change}}</i>
                        <span>
                          <img v-if="item.ranking_change>0" src="@/assets/imgs/overallOperation/ind.png">
                        <img v-if="item.ranking_change<0" src="@/assets/imgs/overallOperation/down.png">
                        </span>
                    </span>
                  </li>
                </ul>
              </div>
          </div>
          <!-- 股基交易量top10 -->
          <div class="rankCon_item">
            <img src="@/assets/imgs/gu.png" alt="">
            <div class="title">
                <ul>
                  <li>排名</li>
                  <li class="flexNum">营业部名称</li>
                  <li>排名变化</li>
                </ul>
              </div>
              <div class="list">
                <ul>
                  <li v-for="(item,i) in topData.sales_dep_trading_ranking_list" :key="i">
                    <span>
                        <img v-if="item.ranking==1" src="@/assets/imgs/jin.png">
                        <img v-else-if="item.ranking==2" src="@/assets/imgs/yin.png">
                        <img v-else-if="item.ranking==3" src="@/assets/imgs/tong.png">
                        <span v-else>{{item.ranking}}</span>
                    </span>
                    <span class="flexNum">{{item.name}}</span>
                    <span class="noC">
                        <i>
                          {{item.ranking_change}}
                        </i>
                        <span>
                          <img v-if="item.ranking_change>0" src="@/assets/imgs/overallOperation/ind.png">
                        <img v-if="item.ranking_change<0" src="@/assets/imgs/overallOperation/down.png">
                        </span>
                    </span>
                  </li>
                </ul>
              </div>
          </div>
        </div>
        <div class="rankBtn" v-if="!isShowMore"> <a-button @click.prevent="changeMore">更多</a-button> </div>
        <a-table v-if="isShowMore" :bordered="true" :columns="columns" :data-source='myData' :pagination="false" :rowKey="(record,index)=>{return index}">
              <span slot="sales_ranking_change" slot-scope="sales_ranking_change">
                <span style="color:#f96e6e;" v-if="sales_ranking_change>0">{{'+'+sales_ranking_change}}</span>
                <span style="color:#48b246" v-if="sales_ranking_change<0">{{sales_ranking_change}}</span>
                <span style="color:#3b59ff" v-if="sales_ranking_change==0">{{sales_ranking_change}}</span>
              </span>
              <span slot="incoming_ranking_change" slot-scope="incoming_ranking_change">
                <span style="color:#f96e6e;" v-if="incoming_ranking_change>0">{{'+'+incoming_ranking_change}}</span>
                <span style="color:#48b246" v-if="incoming_ranking_change<0">{{incoming_ranking_change}}</span>
                <span style="color:#3b59ff" v-if="incoming_ranking_change==0">{{incoming_ranking_change}}</span>
              </span>
              <span slot="trading_ranking_change" slot-scope="trading_ranking_change">
                <span style="color:#f96e6e;" v-if="trading_ranking_change>0">{{'+'+trading_ranking_change}}</span>
                <span style="color:#48b246" v-if="trading_ranking_change<0">{{trading_ranking_change}}</span>
                <span style="color:#3b59ff" v-if="trading_ranking_change==0">{{trading_ranking_change}}</span>
              </span>
        </a-table>
      </div>
      <!-- 表格 -->
      <div v-show="current==1" class="contain_table">
       <a-table :bordered="true" :columns="columnsT" :data-source='myData' :pagination="false" :rowKey="(record,index)=>{return index}" :scroll="{y:550}">
             <span slot="sales_ranking_change" slot-scope="sales_ranking_change">
                <span style="color:#f96e6e;" v-if="sales_ranking_change>0">{{'+'+sales_ranking_change}}</span>
                <span style="color:#48b246" v-if="sales_ranking_change<0">{{sales_ranking_change}}</span>
                <span style="color:#3b59ff" v-if="sales_ranking_change==0">{{sales_ranking_change}}</span>
              </span>
              <span slot="incoming_ranking_change" slot-scope="incoming_ranking_change">
                <span style="color:#f96e6e;" v-if="incoming_ranking_change>0">{{'+'+incoming_ranking_change}}</span>
                <span style="color:#48b246" v-if="incoming_ranking_change<0">{{incoming_ranking_change}}</span>
                <span style="color:#3b59ff" v-if="incoming_ranking_change==0">{{incoming_ranking_change}}</span>
              </span>
              <span slot="trading_ranking_change" slot-scope="trading_ranking_change">
                <span style="color:#f96e6e;" v-if="trading_ranking_change>0">{{'+'+trading_ranking_change}}</span>
                <span style="color:#48b246" v-if="trading_ranking_change<0">{{trading_ranking_change}}</span>
                <span style="color:#3b59ff" v-if="trading_ranking_change==0">{{trading_ranking_change}}</span>
              </span>
        </a-table>
      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
// import * as api from "../api.js";

export default {
    props:{
        current:{
            type:[Number,String],
            default:0
        },
        dataDetail:{ // 财务信息 表格
            type:Array,
            default:()=>[]
        },
        financeDepartTar:{ // 财务信息
            type:Object,
            default:()=>{}
        }
    },
    data(){
      return {
        myData:[],
        topData:{},
        // 可视化
        columns:[
          {
            title:'分支机构名称',
            key:'branch_name',
            dataIndex:'branch_name',
            align:'center'
          },
          {
            title:'所属辖区',
            key:'area_name',
            dataIndex:'area_name',
            align:'center'
          },
          {
            title:'净利润排名',
            key:'sales_ranking',
            dataIndex:'sales_ranking',
            align:'center',
          },
          {
            title:'净利润排名变化',
            key:'sales_ranking_change',
            dataIndex:'sales_ranking_change',
            align:'center',
            scopedSlots:{customRender:'sales_ranking_change'}
          },
          {
            title:'净收入排名',
            key:'incoming_ranking',
            dataIndex:'incoming_ranking',
            align:'center',
          },
          {
            title:'净收入排名变化',
            key:'incoming_ranking_change',
            dataIndex:'incoming_ranking_change',
            align:'center',
            scopedSlots:{customRender:'incoming_ranking_change'}
          },
          {
            title:'股基交易量排名',
            key:'trading_ranking',
            dataIndex:'trading_ranking',
            align:'center',
          },
          {
            title:'股基交易量排名变化',
            key:'trading_ranking_change',
            dataIndex:'trading_ranking_change',
            align:'center',
            scopedSlots:{customRender:'trading_ranking_change'}
          },
        ],
        isShowMore:false,
        // 表格化
        columnsT:[
          {
            title:'分支机构名称',
            key:'branch_name',
            dataIndex:'branch_name',
            align:'center'
          },
          {
            title:'所属辖区',
            key:'area_name',
            dataIndex:'area_name',
            align:'center'
          },
          {
            title:'净利润排名',
            key:'sales_ranking',
            dataIndex:'sales_ranking',
            align:'center',
          },
          {
            title:'净利润排名变化',
            key:'sales_ranking_change',
            dataIndex:'sales_ranking_change',
            align:'center',
            scopedSlots:{customRender:'sales_ranking_change'}
          },
          {
            title:'净收入排名',
            key:'incoming_ranking',
            dataIndex:'incoming_ranking',
            align:'center',
          },
          {
            title:'净收入排名变化',
            key:'incoming_ranking_change',
            dataIndex:'incoming_ranking_change',
            align:'center',
            scopedSlots:{customRender:'incoming_ranking_change'}
          },
          {
            title:'股基交易量排名',
            key:'trading_ranking',
            dataIndex:'trading_ranking',
            align:'center',
          },
          {
            title:'股基交易量排名变化',
            key:'trading_ranking_change',
            dataIndex:'trading_ranking_change',
            align:'center',
            scopedSlots:{customRender:'trading_ranking_change'}
          },
        ],
      }
    },
    watch:{
        dataDetail:{
            handler(arr){
                this.myData=arr
            },
            immediate:true,
            deep:true
        }, // 表格
        financeDepartTar:{
            handler(obj){
                this.topData=obj
            },
            immediate:true,
            deep:true
        } // top 10
    },
    methods: {
      changeMore(){
        this.isShowMore=!this.isShowMore
      }
    },
}
</script>

<style lang="scss" scope>

    .myContain{
      // min-width: 1500px;
        .contain_visual{
          height: calc(100vh - 200px);
            overflow-y: scroll;
            padding-right: 20px;
          .rankCon{
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            .rankCon_item{
              flex: 30%;
              margin-right: 10px;
              &:last-child{
                margin-right: 0;
              }
              >img{
                width: 100%;
              }
              .title,.list{
                padding: 0 20px;
              }
              .title{
                ul{
                  display: flex;
                  justify-content: space-between;
                  li{
                    flex: 1;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 600;
                  }
                  .flexNum{
                    flex: 3;
                  }
                }
              }
              .list{
                ul{
                  li{
                    display: flex;
                    justify-content: space-between;
                    border: 1px solid #eaebeb;
                    border-radius: 6px;
                    padding: 3px 0;
                    margin-bottom: 10px;
                    span{
                      flex: 1;
                      text-align: center;
                      font-size: 16px;
                    }
                    .flexNum{
                      flex: 3;
                    }
                    .noC{
                      display: flex;
                      >span,>i{
                        flex: 1;
                      }
                      >i{
                        font-style: normal;
                        text-align: right;
                      }
                      >span{
                        text-align: left;
                      }
                    }
                  }
                }
              }
            }
          }
          .rankBtn{
            text-align: center;
            .ant-btn{
              height: 40px;
              padding: 0 60px;
            }
          }
        }
        ::v-deep .contain_table{
          .ant-table-body{
      max-height: calc(100vh - 260px) !important;
    }
        }
    }
</style>
