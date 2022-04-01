<template>
  <!-- vue实例外创建 -->
  <div class="section-1">
    <!-- 头部 -->
    <div class="main-head">
      <div class="title">业务规模和平仓金额<span class="dataFrom">数据来源: 证券金融部/计划财务部</span></div>
      <div class="right">
        <div class="title">
          <span class="date">数据日期: <span>{{new_date}}</span></span>
          <date-picker 
            :histroyDate="histroyDate"
            :timeSel="timeSelect"
            @getTime="confrim" 
          ></date-picker>
        </div>
      </div>
    </div>
    <!-- 主题数据 -->
    <div class="content-main">
      <div class="main-left">
        <span class="conTitle">业务规模(万元)</span>
        <div class="leftCon">
          <div class="kehu">
            <div class="kehuT">
              <div class="title">
                <i class="iconfont icon-jigoukehu"></i>
                机构客户
              </div>
              <div class="num">{{$toT(dataInfo.mechanism_scale)}}</div>
            </div>
            <div class="kehuB">
              <div class="title">
                <i class="iconfont icon-putongkehu"></i>
                普通客户
              </div>
              <div class="num">{{$toT(dataInfo.customer_scale)}}</div>
            </div>
          </div>
          <div class="chartsCon">
            <echart-common :options="pieOptions1"></echart-common>
          <!-- <a-tooltip placement="bottom">
            <template #title>
              <span>融资融券规模 = 收市融资负债金额+收市融券负债金额+收市费用负债+收市其他负债</span>
            </template>
            <a-icon type="question-circle" class="icon1"></a-icon>
          </a-tooltip> -->
          </div>
          <div class="chartsCon">
<echart-common :options="pieOptions2"></echart-common>
          <!-- <a-tooltip placement="bottom">
            <template #title>
              <span>股票质押规模 = 委托金额 - 已还金额</span>
            </template>
            <a-icon type="question-circle" class="icon2"></a-icon>
          </a-tooltip> -->
          </div>
          
        </div>
      </div>
      <div class="main-right">
        <span class="conTitle">平仓规模(万元)</span>
        <div class="leftCon">
          <div class="rightChart">
            <echart-common :options="pieOptions3"></echart-common>
                <img
                  v-if="isValue"
                  @click="riskModelTwo = true"
                  src="@/assets/imgs/overallOperation/biaodan_n.png"
                  alt
                />
          </div>
           <div class="rightChart">
          <echart-common :options="pieOptions4"></echart-common>

           </div>

        </div>
      </div>
    </div>
    <!-- 亏损列表 -->
    <model-page :modelValue="riskModelTwo" title="融资融券平仓亏损清单" @changeModel="changeModel">
      <sample-table-y :columns="columns" :data="data" :setWidth="true"></sample-table-y>
    </model-page>
  </div>
</template>


<script>
import * as api from "../api.js";
import datePicker from '@/components/datePicker/index.vue';
import moment from 'moment'

export default {
  components:{
    datePicker
  },
  data(){
    return{
      new_date: "", // 最新日期
      timeSelect: "", // 选择日期
      isOpen: false, // 显示时间控件
      histroyDate: [], // 返回的时间数组
      percent1: 0,
      percent2: 0,
      percent3: 0,
      percent4: 0,
      dataInfo: {},
      riskModelTwo: false,
      data: [],
      columns: [
        {
          name: "亏损机构",
          key: "branch_name",
        },
        {
          name: "亏损金额(万元)",
          key: "value"
        }
      ],
      isValue: false,
      scaleValue1: "",
      scaleValue2: "",
      moneyValue1: "",
      moneyValue2: "",
      pieOptions1:{
        title:{
          text:'',
          subtext:'融资融券规模',
          left: "38%",
          top: "88",
          // itemGap:15,
          textAlign:'center',
          textStyle:{
            fontSize:20,
            color:'#4850cd'
          },
          subtextStyle:{
            fontSize:18,
            color:'#646464'
          }
        },
        tooltip: {
          trigger: "item",
          show: false
        },
        legend: {
          show: false
        },
        series:[{
          name:'',
          type:'pie',
          center:['38%','center'],
          radius:['75%','100%'],
          hoverAnimation:false,
          avoidLabelOverlap: false,
          label:{
            normal:{
              show:false
            }
          },
          data:[
            {
            value:0,
            itemStyle:{
              normal:{
                color:'#63a5ff',
              },
              emphasis:{
                color:'#63a5ff'
              }
            }
          },
            {
            value:0,
            itemStyle:{
              normal:{
                color:'#4049ce',
              },
              emphasis:{
                color:'#4049ce'
              }
            }
          },{
            value:0,
            itemStyle:{
              normal:{
                color:'#eeeffb',
              },
              emphasis:{
                color:'#eeeffb'
              }
            }
          },
          ]
        }]
      },
      pieOptions2:{
        title:{
          text:'',
          subtext:'股票质押规模',
          left: "center",
          top: "88",
          // itemGap:15,
          textStyle:{
            fontSize:20,
            color:'#d357f2'
          },
          subtextStyle:{
            fontSize:18,
            color:'#646464'
          }
        },
        tooltip: {
          trigger: "item",
          show: false
        },
        legend: {
          show: false
        },
        series:[{
          name:'',
          type:'pie',
          radius:['75%','100%'],
          hoverAnimation:false,
          avoidLabelOverlap: false,
          label:{
            normal:{
              show:false
            }
          },
          data:[{
            value:0,
            itemStyle:{
              normal:{
                color:'#9768f4'
              }
            }
          },{
            value:0,
            itemStyle:{
              normal:{
                color:'#fcf2fe'
              },
              emphasis:{
                color:'#fcf2fe'
              }
            }
          }],
           emphasis: {
              show: false
            },
        }]
      },
      pieOptions3:{
        title:{
          text:'',
          subtext:'融资融券平仓金额',
          left: "47%",
          top: "88",
          // itemGap:15,
          textAlign:'center',
          textStyle:{
            fontSize:20,
            color:'#ff631f'
          },
          subtextStyle:{
            fontSize:18,
            color:'#646464'
          }
        },
        tooltip: {
          trigger: "item",
          show: false
        },
        legend: {
          show: false
        },
        series:[{
          name:'',
          type:'pie',
          radius:['75%','100%'],
          hoverAnimation:false,
          avoidLabelOverlap: false,
          label:{
            normal:{
              show:false
            }
          },
          data:[{
            value:0,
            itemStyle:{
              normal:{
                color:'#ff8f31'
              }
            }
          },{
            value:0,
            itemStyle:{
              normal:{
                color:'#ffefe8'
              },
              emphasis:{
                color:'#ffefe8'
              }
            }
          }],
           emphasis: {
              show: false
            },
        }]
      },
      pieOptions4:{
        title:{
          text:'',
          subtext:'股票质押平仓金额',
          left: "60%",
          top: "88",
          // itemGap:15,
          textAlign:'center',
          textStyle:{
            fontSize:20,
            color:'#f45352'
          },
          subtextStyle:{
            fontSize:18,
            color:'#646464',
          }
        },
        tooltip: {
          trigger: "item",
          show: false
        },
        legend: {
          show: false
        },
        series:[{
          name:'',
          type:'pie',
          center:['60%','center'],
          radius:['75%','100%'],
          hoverAnimation:false,
          avoidLabelOverlap: false,
          label:{
            normal:{
              show:false
            }
          },
          data:[{
            value:0,
            itemStyle:{
              normal:{
                color:'#f8605f'
              }
            }
          },{
            value:0,
            itemStyle:{
              normal:{
                color:'#fef1f0'
              },
              emphasis:{
                color:'#fef1f0'
              }
            }
          }],
           emphasis: {
              show: false
            },
        }]
      },
    }
  },
  created(){
    this.getBusinessScaleTime(); // 获取时间
    this.getBusinessScale(); // 获取规模和金额
    this.getBusinessLoss(); // 亏损列表
  },
  methods:{
    moment,
    //获取时间列表
    getBusinessScaleTime(){
      api
        .getBusinessScaleTime()
        .then(res => {
          if (res.ret_code === 0) {
            this.histroyDate = res.data;
            this.timeSelect = this.histroyDate.length > 0 && this.histroyDate[0];
          }
        })
    },
    //日期改变
    confrim(time){
      this.timeSelect=time
      // 日期变化重新获取数据
      this.getBusinessScale();
      this.getBusinessLoss();
    },
    // 业务规模和平仓金额
    getBusinessScale(){
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ''
      };
      api.getBusinessScale(params).then(res => {
        if (res.ret_code == 0) {
          this.new_date = res.data.time;
          this.dataInfo = res.data;
          // 千分位
          this.scaleValue2 = this.$toT(this.dataInfo.equity_pledge_scale);
          this.moneyValue1 = this.$toT(this.dataInfo.margin_trading_money);
          this.moneyValue2 = this.$toT(this.dataInfo.equity_pledge_money);

          let data1 = Number(res.data.customer_scale)+Number(res.data.mechanism_scale);
          let data2 = res.data.equity_pledge_scale;
          let percent1 = (data1 / (data1 + data2)) * 100; // 融资融券规模占比
          let percent2 = (data2 / (data1 + data2)) * 100; // 股票质押规模占比
          // 融资融券规模
          this.scaleValue1 = this.$toT(data1.toFixed(2));
          let prc1=((res.data.mechanism_scale)/(data1+data2))*100 // 机构占比
          let prc2=percent1-prc1 // 普通占比
          this.pieOptions1.title.text=this.scaleValue1
          this.pieOptions1.series[0].data[0].value=prc1
          this.pieOptions1.series[0].data[1].value=prc2
          this.pieOptions1.series[0].data[2].value=100-percent1
          // 股票质押规模
          this.pieOptions2.title.text=this.scaleValue2
          this.pieOptions2.series[0].data[0].value=percent2
          this.pieOptions2.series[0].data[1].value=100-percent2


          let data3 = res.data.margin_trading_money;
          let data4 = res.data.equity_pledge_money;
          let percent3 = (data3 / (data3 + data4)) * 100;
          let percent4 = (data4 / (data3 + data4)) * 100;
          // 融资融券平仓金额
          this.pieOptions3.title.text=this.moneyValue1
          this.pieOptions3.series[0].data[0].value=percent3
          this.pieOptions3.series[0].data[1].value=100-percent3

        // 股票质押平仓金额
          this.pieOptions4.title.text=this.moneyValue2
          this.pieOptions4.series[0].data[0].value=percent4
          this.pieOptions4.series[0].data[1].value=100-percent4

        }
      });
    },
    // 业务规模和平仓金额 亏损列表
    getBusinessLoss(){
      const params = {
        time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMMDD")
          : ''
      };
      api.getBusinessLoss(params).then(res => {
        if (res.ret_code == 0) {
          if (res.data.length > 0) {
            this.isValue = true;
            let addValue={
                branch_name:'总计',
                value:0
            }
            let arr=[]
            // res.data[0].value='-12.35'
            // res.data[1].value=13
            // res.data[2].value= -2034.78
            res.data.forEach(el=>{
              arr.push(el.value)
            })
            addValue.value=arr.reduce(function(a, b) {
            return a*1 + b*1; // *1将数值转为数字类型
            }, 0);
            addValue.value=(addValue.value).toFixed(2)
            res.data.push(addValue)
            this.data = JSON.parse(JSON.stringify(res.data));  // 深拷贝 防止数值影响
            this.data.forEach(el=>{
              el.value=this.$toT(el.value)
            })
            // console.log(this.data,'..this.data')         
          } else {
            this.isValue = false;
          }
        }
      });
    },
    changeModel(val){
      this.riskModelTwo=val
    }
  },
};
</script>


<style lang="scss" scoped>
.section-1 {
  margin-bottom: 20px;
  &::after{
    content: '';
    position: fixed;
    display: block;
  }
  .main-head {
    display: flex;
    .title {
      font-size: 18px;
      // font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bolder;
      color: #2f2f2f;
      margin-left: 10px;
    }
    .right {
      flex: 1;
      height: 100%;
      position: relative;
      .title {
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
        .date {
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
  .content-main {
    display: flex;
    // justify-content: space-around;
    align-items: center;
    height: 391px;
    padding: 10px;
    margin-top: 15px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    .main-left,
    .main-right {
      flex: 1;
      text-align: center;
      height: 100%;
      .conTitle {
        display: inline-block;
        font-size: 20px;
        color: #2f2f2f;
        margin: 56px 0 33px;
        font-weight: 700;
      }
      .leftCon {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 230px;
         img {
           position: absolute;
           left: 50%;
           top: 125px;
           transform: translateX(600%);
                  width: 12px;
                  height: 12px;
                  vertical-align: inherit;
                }
                img:hover{
                  cursor: pointer;
                }
        :deep(.ant-progress) {
          margin-right: 100px;
          .ant-progress-inner {
            width: 230px !important;
            height: 230px !important;
            .ant-progress-text {
              padding: 0 50px;
              div {
                font-size: 16px;
              }
              .numCon {
                color: #363fc8; // 6572e5 3841c9
                font-size: 20px;
                margin-bottom: 6px;
              }
              .perCon2 {
                color: #d255f2;
              }
              .perCon3 {
                color: #ff5f19;
                img {
                  width: 12px;
                  height: 12px;
                  vertical-align: inherit;
                }
              }
              .perCon4 {
                color: #f44d4c;
              }
            }
          }
        }
        :deep(.ant-progress-circle.ant-progress-status-success
          .ant-progress-text) {
          color: #000;
        }
      }
    }
    .main-right {
      flex: 1;
      .rightChart{
        width: 50%;
        height: 100%;
        position: relative;
      }
    }
    .main-left{
      position: relative;
      .kehu{
        position: absolute;
        top:50%;
        left: 50%;
        transform:translate(-85%,-50%);
        >div{
          .title{
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            font-size: 16px;
            color:#fff;
            font-weight: 500;
            border-radius: 15px;
            background-color: #61A0ff;
            >i{
              font-size: 18px;
              margin-right: 0px !important;
            }
          }
          .num{
            font-size: 20px;
            font-weight: 500;
          }
        }
        .kehuT{
          margin-bottom: 20px;
          .num{
            color: #418dff;
          }
        }
        .kehuB{
          .title{
            background-color: #363fc8;
          }
          .num{
            color: #363fc8;
          }
        }
      }
      .chartsCon{
        width: 50%;
        height: 100%;
        position: relative;
      }
      .icon1{
        position: absolute;
        left: 50%;
        top: 123px;
        transform: translateX(135%);
      }
      .icon2{
        position: absolute;
        left: 50%;
        top: 123px;
        transform: translateX(485%);
      }
    }
  }
}
</style>
<style lang="scss">
.ant-calendar{
  width: 350px !important;
}
.ant-calendar-input-wrap{
  display: none;
}
.date-footer-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
