<template>
  <div class="myContain">
      <!-- 可视化 -->
      <div v-show="current==0" class="contain_visual">
          <!-- 上部图表 -->
          <div class="visual_head">
              <div class="title">{{codeTitle}}</div>
              <div class="echartCon">
                  <div class="echartG">
                    <div class="chartTitle">
                      考核净利润(万元)  累计/目标
                      <p class="yeS">{{toThousands(myTar.assessed_net_profit)}} / {{myTar.assnetNum!='NaN'?toThousands(myTar.assnetNum):0}}</p>
                      </div>
                    <echart-common :options="options1"></echart-common>
                  </div>
                  <div class="echartG">
                    <div class="chartTitle">折算新增有效户 
                      <a-tooltip placement="bottom">
                            <template #title>
                            <span>按绩效考核口径统计的新增有效户</span>
                            </template>
                            <a-icon type="question-circle" class="iconCir"></a-icon>
                        </a-tooltip>
                      累计/目标
                      <p class="buS">{{toThousands(myTar.add_customer)}} / {{myTar.addCustomerNum!='NaN'?toThousands(myTar.addCustomerNum):0}}</p></div>
                    <echart-common :options="options2"></echart-common>
                  </div>
                  <div class="echartG">
                    <div class="chartTitle">净增有效客户资产(万元)  累计/目标 
                      <p class="grS">{{toThousands(myTar.add_customer_asset)}} / {{myTar.customerAssetNum!='NaN'?toThousands(myTar.customerAssetNum):0}}</p></div>
                    <echart-common :options="options3"></echart-common>
                  </div>
                  <div class="rightEcharts">
                    <div class="leftCa">
                      <div class="chartTitle">
                        <div>流失客户数 
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>去年交易量或资产大于等于一万但今年资产和交易量均小于一万的客户数</span>
                            </template>
                            <a-icon type="question-circle" class="iconCir"></a-icon>
                          </a-tooltip>
                          </div> 
                        <p class="grS">{{toThousands(myTar.drain_customer)}}</p> 
                      </div>
                      <echart-common :options="options4"></echart-common>
                    </div>
                  </div>
              </div>
          </div>
          <!-- 下部走势图 -->
          <div class="visual_trend">
              <!-- 历史走势 -->
                <echart-common :options="options6"></echart-common>
                <!-- 选择器 -->
                <div class="selectOpt">
                    <a-select
                    :value="selectValue"
                    style="width: 180px;margin-right:20px"
                    @change="selectChange"
                    :getPopupContainer="triggerNode=>triggerNode.parentNode"
                    >
                        <a-select-option
                        :value="item.value"
                        v-for="(item, index) in selectList"
                        :key="index"
                        >
                        {{ item.name }}
                        </a-select-option>
                    </a-select>
                </div>
          </div>
      </div>
      <!-- 表格 -->
      <div v-show="current==1" class="contain_table">
        <a-table :bordered="true" :columns="columns" :data-source='myData' :pagination="false" :rowKey="(record,index)=>{return index}" :scroll="{y:550}">
              <span slot="assessed_net_profit" slot-scope="assessed_net_profit">{{toThousands(assessed_net_profit)}}</span>
              <span slot="theTitle">{{'净增客户净资产'+quarter}}</span>
              <span slot="rateTitle">{{'净增客户净资产完成率'+quarter}}</span>
              <span slot="ass_net_rate" slot-scope="ass_net_rate">{{(ass_net_rate*100).toFixed(2)+'%'}}</span>
              <span slot="add_customer" slot-scope="add_customer">{{toThousands(add_customer)}}</span>
              <span slot="add_customer_rate" slot-scope="add_customer_rate">{{(add_customer_rate*100).toFixed(2)+'%'}}</span>
              <span slot="add_customer_asset" slot-scope="add_customer_asset">{{add_customer_asset?toThousands(add_customer_asset):0}}</span>
              <span slot="customer_asset_rate" slot-scope="customer_asset_rate">{{(customer_asset_rate*100).toFixed(2)+'%'}}</span>
              <span slot="drain_customer" slot-scope="drain_customer">{{toThousands(drain_customer)}}</span>
              <span slot="drain_customer_asset" slot-scope="drain_customer_asset">{{toThousands(drain_customer_asset)}}</span>
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
        selectTime:{
            type:[Number,String],
            default:''
        },
        dataDetail:{
          // 营业部 表格
            type:Array,
            default:()=>[]
        },
        busDepartTar:{
          // 营业部 数据
            type:Object,
            default:()=>{}
        },
        tarHistory:{
          // 营业部 走势
            type:Array,
            default:()=>[]
        },
        codeTitle:{
          type:String,
          default:'公司整体'
        }
    },
    data(){
      const toThousands=function(num){
          return (
            num && num.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
          );
      };
      return {
        myData:[],// 表格数据
        myTar:{}, // 营业部数据
        myHistory:[], // 营业部走势 
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
            title:'考核净利润',
            key:'assessed_net_profit',
            dataIndex:'assessed_net_profit',
            align:'center',
            sortDirections:['descend','ascend'],
            // defaultSortOrder:'ascend',
            sorter:(a,b)=>a.assessed_net_profit-b.assessed_net_profit,
            scopedSlots:{customRender:'assessed_net_profit'}
          },
          {
            title:'净利润完成率',
            key:'ass_net_rate',
            dataIndex:'ass_net_rate',
            align:'center',
            sortDirections:['descend','ascend'],
            // defaultSortOrder:'descend',
            sorter:(a,b)=>a.ass_net_rate-b.ass_net_rate,
            scopedSlots:{customRender:'ass_net_rate'}
          },
          {
            title:'折算新增有效户',
            key:'add_customer',
            dataIndex:'add_customer',
            align:'center',
            scopedSlots:{customRender:'add_customer'}
          },
          {
            title:'折算新增有效户完成率',
            key:'add_customer_rate',
            dataIndex:'add_customer_rate',
            align:'center',
            sortDirections:['descend','ascend'],
            // defaultSortOrder:'descend',
            sorter:(a,b)=>a.add_customer_rate-b.add_customer_rate,
            scopedSlots:{customRender:'add_customer_rate'}
          },
          {
            // title:'新增客户净资产',
            key:'add_customer_asset',
            dataIndex:'add_customer_asset',
            align:'center',
            scopedSlots:{customRender:'add_customer_asset'},
            slots:{title:'theTitle'}
          },
          {
            // title:'新增客户净资产完成率',
            key:'customer_asset_rate',
            dataIndex:'customer_asset_rate',
            align:'center',
            sortDirections:['descend','ascend'],
            // defaultSortOrder:'descend',
            sorter:(a,b)=>a.customer_asset_rate-b.customer_asset_rate,
            scopedSlots:{customRender:'customer_asset_rate'},
            slots:{title:'rateTitle'}
          },
          {
            title:'流失客户数',
            key:'drain_customer',
            dataIndex:'drain_customer',
            align:'center',
            sortDirections:['descend','ascend'],
            // defaultSortOrder:'descend',
            sorter:(a,b)=>a.drain_customer-b.drain_customer,
            scopedSlots:{customRender:'drain_customer'}
          },
          // {
          //   title:'流失客户资产',
          //   key:'drain_customer_asset',
          //   dataIndex:'drain_customer_asset',
          //   align:'center',
          //   scopedSlots:{customRender:'drain_customer_asset'}
          // },

        ],
       options1: {
                    series: [
                    {
                        type: "gauge",
                        // center:['50%','60%'],
                        radius: "53%",
                        axisLine: {
                        show: true,
                        // 两端是否设置为圆角；在5.0之后的版本有效
                        roundCap: false,
                        lineStyle: { // 刻度线样式
                            width: 20,
                            color: [
                              [
                                0,
                                {
                                x: 0,
                                y: 0,
                                x1: 1,
                                y1: 0,
                                colorStops: [
                                    {
                                    offset: 0,
                                    color: "#FFD99F",
                                    },
                                    {
                                    offset: 1,
                                    color: "#FFBE4C",
                                    },
                                ],
                                },
                            ],
                            [1, "#E6EBF8"],
                            ],
                        },
                        },
                        axisTick: { // 小刻度线样式
                          show:true,
                          distance: -30,
                          splitNumber: 5,
                          lineStyle: {
                              width: 1,
                              color: "#E2E2E2",
                          },
                        },
                        splitLine: { // 大刻度线样式
                        distance: -35,
                        length: 14,
                        lineStyle: {
                            width: 2,
                            color: "#E2E2E2",
                        },
                        },
                        axisLabel: { // 刻度标签 标签数值的位置
                        distance: -15,
                        color: "#CFCFCF",
                        fontSize: 13,
                        },
                        itemStyle: {
                        normal: {
                            color: "#FF7373", //指针颜色
                        },
                        },
                        title: {
                        show: true,
                        offsetCenter:[0, "125%"],
                        textStyle:{
                            fontWeight:'bolder',
                            color:'#2f2f2f',
                            fontSize:'16px'
                        }
                        },
                        detail: {
                        valueAnimation: true,
                        fontSize: 20,
                        color: "#FFC867", // 设置title的颜色
                        offsetCenter: [0, "80%"],
                        formatter: "{value}%",
                        },
                        data: [
                        {
                            value:10,
                            name:'考核净利润完成率'
                        },
                        ],
                    },
                    ],
                },
       options2: {
        series: [
          {
            type: "gauge",
            radius: "53%",
            axisLine: {
              show: true,
              // 两端是否设置为圆角；在5.0之后的版本有效
              roundCap: false,
              lineStyle: {
                width: 20,
                color: [
                  [
                    0,
                    {
                      x: 0,
                      y: 0,
                      x1: 1,
                      y1: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#7796FF",
                        },
                        {
                          offset: 1,
                          color: "#1D3FFF",
                        },
                      ],
                    },
                  ],
                  [1, "#E6EBF8"],
                ],
              },
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: "#E2E2E2",
              },
            },
            splitLine: {
              distance: -35,
              length: 14,
              lineStyle: {
                width: 2,
                color: "#E2E2E2",
              },
            },
            axisLabel: {
              distance: -15,
              color: "#CFCFCF",
              fontSize: 13,
            },
            itemStyle: {
              normal: {
                color: "#FF7373", //指针颜色
              },
            },
            detail: {
              valueAnimation: true,
              fontSize: 20,
              color: "#1D3FFF",
              offsetCenter: [0, "80%"],
              formatter: "{value}%",
            },
            title: {
                        show: true,
                        offsetCenter:[0, "125%"],
                        textStyle:{
                            fontWeight:'bolder',
                            color:'#2f2f2f',
                            fontSize:'16px'
                        }
                        },
            data: [
              {
                value: 0,
                name:'折算新增有效用户完成率'
              },
            ],
          },
        ],
                },
       options3: {
                    series: [
                    {
                        type: "gauge",
                        radius: "53%",
                        axisLine: {
                        show: true,
                        // 两端是否设置为圆角；在5.0之后的版本有效
                        roundCap: false,
                        lineStyle: {
                            width: 20,
                            color: [
                            [
                            0,
                                {
                                x: 0,
                                y: 0,
                                x1: 1,
                                y1: 0,
                                colorStops: [
                                    {
                                    offset: 0,
                                    color: "#43D7DC",
                                    },
                                    {
                                    offset: 1,
                                    color: "#10C2DC",
                                    },
                                ],
                                },
                            ],
                            [1, "#E6EBF8"],
                            ],
                        },
                        },
                        axisTick: {
                        distance: -30,
                        splitNumber: 5,
                        lineStyle: {
                            width: 1,
                            color: "#E2E2E2",
                        },
                        },
                        splitLine: {
                        distance: -35,
                        length: 14,
                        lineStyle: {
                            width: 2,
                            color: "#E2E2E2",
                        },
                        },
                        axisLabel: {
                        distance: -15,
                        color: "#CFCFCF",
                        fontSize: 13,
                        },
                        itemStyle: {
                        normal: {
                            color: "#FF7373", //指针颜色
                        },
                        },
                        detail: {
                        valueAnimation: true,
                        fontSize: 20,
                        color: "#10C2DC",
                        offsetCenter: [0, "80%"],
                        formatter: "{value}%",
                        },
                        title: {
                                    show: true,
                                    offsetCenter:[0, "125%"],
                                    textStyle:{
                                        fontWeight:'bolder',
                                        color:'#2f2f2f',
                                        fontSize:'16px'
                                    }
                                    },
                        data: [
                        {
                            value: 0,
                            name:''
                        },
                        ],
                    },
                    ],
                },
       options4: {
        //  backgroundColor: "#F8F9FA",
                    tooltip: {
                      show:false,
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "line", // 默认为直线，可选为：'line' | 'shadow'
                    },
                    backgroundColor: "rgba(153,153,153,0.7)",
                    borderColor: "transparent",
                    textStyle: {
                        color: "#fff",
                    },
                    extraCssText:'border-radius:10px!important',
                    padding:0,
                    formatter: (params) => {
                        return `<div class='tooltips'>
                        </div>`;
                    },
                    },
                    grid: {
                      top: "25%",
                      left: "0%",
                      right: "5%",
                      bottom: "3%",
                      containLabel: true,
                    },
                    xAxis:
                    {
                        type: "category",
                        data: [],
                        bondarGap:true,
                        axisTick: {
                        alignWithLabel: true,
                        },
                        axisLine: {
                        lineStyle: {
                            color: "#E2E2E2",
                        },
                        },
                        axisLabel: {
                          interval:0,
                          align:'center',
                          rotate:15,
                          margin:30,
                        textStyle: {
                            color: "#2f2f2f", //坐标值得具体的颜色
                            fontSize:16
                        },
                        },
                    },
                    yAxis: [{show:false}],
                    series: [
                        {
                          name: "",
                          type: "bar",
                          barWidth: "20%",
                          barBorderRadius: 15,
                          data: [],
                          label:{
                                show:true,
                                position:'top',
                                formatter: function(parmas) {
                                  return toThousands(parmas.value);
                                },
                          },
                           itemStyle: {
                            normal:{
                              barBorderRadius: 15,
                            }
                          },
                        },
                        
                    ],
                },
       options6: {
                    title:{
                        text:'历史走势'
                    },
        backgroundColor: "#fff",// 图表背景色
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "rgba(153,153,153,0.7)",
          borderColor: "transparent",
          textStyle: {
            color: "#fff",
          },
          extraCssText: "border-radius:10px!important",
          padding: 0,
          formatter: (params) => {
            return `<div style='color:#fff'>
               <p class='tooltip-title'>${
                 params[0].axisValueLabel
               }</p>
               <p class='tooltip-line'>${
                 params[0].seriesName
               }：${toThousands(
              params[0].value
            )}</p>
               <p class='tooltip-line'>${params[1].seriesName}：${
                 params[1].value+'%'
               }</p>
              
             </div>`;
          },
        },
        legend: {
          right: "center",
          top: "20",
          selectedMode: false,
          // itemWidth: 40,
          // data: [
          //   {
          //     name: "考核净利润(万元)",
          //     // icon: "roundRect",
          //   },
          //   {
          //     name: "净利润完成率",
          //     // icon: "line",
          //   },
          // ],
        },
        grid: {
          top: "18%",
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: "#E2E2E2",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#2f2f2f", //坐标值得具体的颜色
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(243,244,245,1)",
              },
            },
          },
          {
            type: "value",
            inverse: false,
            axisLabel: {
              formatter: (params) => {
                return params.toFixed(2) + "%";
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
                color:['#363FC8'],
        series: [
          {
            name: "考核净利润(万元)",
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: "#6bcac1" },
                { offset: 0, color: "#2ccdd7" },
              ]),
            itemStyle: {
              normal:{
                 barBorderRadius: [15,15,0,0],
              }              
            },
            type: "bar",
            barWidth: "10%",
            data: [],
          },
          {
            name: "净利润完成率",
            type: "line",
            yAxisIndex: 1,
            showSymbol: false,
            lineStyle: {
              color: "#363FC8",
            },
            data: [],
          },
        ],
                },
       selectValue:'01',
      //  01:考核净利润,03:新增有效户,02:新增客户净利润 
       selectList:[{
                    name:'考核净利润',value:'01'
                },
                {
                    name:'折算新增有效户',value:'03'
                },
                {
                    name:'净增有效客户资产',value:'02'
                },],
        // 季度
        quarter:'',
        
      }
    },
    watch:{
        dataDetail:{
            handler(arr){
                // this.quarter=arr.length>0?this.getQuarter(arr[0].customer_asset_rate_time):''
                let newA=arr&&arr.filter(el=>{
                  return el.customer_asset_rate_time !=null
                })
                if(newA.length>0){
                  this.quarter='('+(newA[0]&&newA[0].customer_asset_rate_time)+')'
                }else{
                  this.quarter=''
                }
                this.myData=arr
            },
            immediate:true,
            deep:true
        },
        busDepartTar:{
            handler(obj){
                this.myTar=obj

                this.options1.series[0].data[0].value=(obj.ass_net_rate*100).toFixed(2)
                this.options1.series[0].axisLine.lineStyle.color[0][0]=obj.ass_net_rate
                
                this.options2.series[0].data[0].value=(obj.add_customer_rate*100).toFixed(2)
                this.options2.series[0].axisLine.lineStyle.color[0][0]=obj.add_customer_rate
                
                this.options3.series[0].data[0].value=(obj.customer_asset_rate*100).toFixed(2)
                this.options3.series[0].axisLine.lineStyle.color[0][0]=obj.customer_asset_rate

                this.options4.xAxis.data=['流失人数','折算新增有效户']
                this.options4.series[0].data=[
                  {
                    value:obj.drain_customer,
                    itemStyle:{
                      color:'#22cccf'
                    }
                  },
                  {
                    value:obj.add_customer,
                    itemStyle:{
                      color:'#ff9c78'
                    }
                  }
                ]
                
                // 计算季度
                // let qu=this.getQuarter(obj.customer_asset_rate_time)
                let qu=obj.customer_asset_rate_time==null?'':'('+obj.customer_asset_rate_time+')'
                this.options3.series[0].data[0].name=`净增有效客户资产完成率${qu}`

                // 添加目标值
                this.myTar.assnetNum=(this.myTar.assessed_net_profit/obj.ass_net_rate).toFixed(2)
                this.myTar.addCustomerNum=(this.myTar.add_customer/obj.add_customer_rate).toFixed(2)
                this.myTar.customerAssetNum=(this.myTar.add_customer_asset/obj.customer_asset_rate).toFixed(2)
            },
            immediate:true,
            deep:true
        },
        tarHistory:{
            handler(arr){
                this.myHistory=arr
                this.options6.xAxis[0].data=arr.map(item=>item.time_str) // x轴时间
                this.options6.series[0].data=arr.map(item=>item.value) // 左Y轴的数据
                this.options6.series[1].data=arr.map(item=>(item.rate*100).toFixed(2)) // 右Y轴的数据
                
                if(this.selectValue=='01'){
                this.options6.series[0].name='考核净利润(万元)'
                this.options6.series[1].name='考核净利润完成率'
                }else if(this.selectValue=='03'){
                this.options6.series[0].name='折算新增有效户'
                this.options6.series[1].name='折算新增有效户完成率'
                }else if(this.selectValue=='02'){
                this.options6.series[0].name='净增有效客户资产(万元)'
                this.options6.series[1].name='净增有效客户资产完成率'
                }

            },
            immediate:true,
            deep:true
        }
    },
    methods: {
      selectChange(val){
            this.selectValue=val
            console.log(this.selectValue,'..this.selectValue')
            // 变化重新调取走势接口
            this.$emit('changeSe',val)
      },
      toThousands(num){
          return (
            num && num.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
          );
      },
      // 根据月份计算季度
      getQuarter(val){
        let str=''
        if(!val){
          return str
        }
        let month=val?val.substring(4,6):''
        if(month>=10){
          str='四季度'
        }else{
          if(Number(month)>=7){
            str='三季度'
          }else if(Number(month)>=4){
            str='二季度'
          }else if(1<=Number(month)<=3){
            str='一季度'
          }else{
            str=''
          }
        }
        return str
      }
    },
}
</script>

<style lang="scss" scope>
    .myContain{
      // min-width: 1200px;
        .contain_visual{
          height: calc(100vh - 200px);
          overflow-y: scroll;
          padding-right: 20px;
            .visual_head{
                .title{
                    font-size: 18px;
                    font-weight: 700;
                    color: #2f2f2f;
                    line-height: 25px;
                    margin-bottom: 18px;
                }
                .echartCon{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 360px;
                    margin-bottom: 20px;
                    >div{
                        flex: 1;
                        height: 100%;
                        align-self: center;
                        border-right: 1px solid #c3c3c3;
                        &:last-child{
                            border-right:none
                        }
                    }
                    .echartG{
                      flex: 27%;
                      position: relative;
                      .chartTitle{
                        left: 50%;
                        transform: translateX(-50%);
                        top: -10px;
                        text-align: center;
                        width: 100%;
                        z-index: 999;
                        // font-weight: 600;
                        >p{
                          font-size: 22px;
                        }
                      }
                    }
                    .rightEcharts{
                      flex: 19%;
                      // display: flex;
                      .leftCa{
                        position: relative;
                        // flex: 1;
                        height: 316px;
                        .chart-box{
                          margin-left: -30px;
                          // margin-top: 60px;
                          height: 340px;
                        }
                        .chartTitle{
                          left: 50%;
                          transform: translateX(-50%);
                          top: -10px;
                          text-align: center;
                          width: 100%;
                          z-index: 999;
                          >p{
                            margin-bottom: 0;
                            font-size: 22px;
                          }
                        }
                      }
                    }
                }
            }
            .visual_trend{
                position: relative;
                height: 436px;
                .selectOpt{
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
        }
        ::v-deep .contain_table{
          .ant-table-body{
            max-height: calc(100vh - 280px) !important;
          }
        }
        .chartTitle{
          position: absolute;
          // left: 10px;
          top: -10px;
          font-size: 17px;
          // font-weight: 600;
          color: #2f2f2f;
          width: 100%;
          text-align: center;
          // font-family: PingFangSC-Medium,PingFang SC;
          >p{
            font-size: 20px;
          }
          .yeS{
            color: #ffc050;
          }
          .buS{
            color: #2f61cf;
          }
          .grS{
            color: #23c5e0;
          }
        }
    }
    
</style>
