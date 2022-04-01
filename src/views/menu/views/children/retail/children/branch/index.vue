<template>
     <div class="content">
      <div class="section-1">
       <div class="main-head">
         <div class="title">分支机构业绩<span class="dataFrom">数据来源: 机构管理部/信息技术部</span></div>
          <div class="right">
           <div class="title">
              <span class="date">数据日期: <span>{{new_date}}</span></span>
                <a-month-picker
                  v-model="timeSelect"
                  size="large"
                  format="YYYY-MM"
                  :open="isOpen"
                  :disabled-date="disabledDate"
                  :align="{ offset: [0, 20] }"
                >
            <span class="goSelect" @click="isOpen = true">查看历史</span>
            <template #renderExtraFooter>
              <div class="date-footer-box">
                <span>{{
                  timeSelect ? moment(timeSelect).format("YYYY-MM") : ""
                }}</span>
                <div class="button-box">
                  <a-button
                    type="primary"
                    shape="round"
                    ghost
                    @click="currtentMonth"
                  >
                    最新
                  </a-button>
                  <a-button type="primary" shape="round" @click.native.prevent="confrim">
                    确定
                  </a-button>
                </div>
              </div>
            </template>
          </a-month-picker>
                         
                         </div>
                    </div>
              </div>
               <!-- 内容区 -->
      <div class="mainCon">
        <!-- 内容部分 头部切换 -->
        <div class="mainCon-head">
          <!-- 左侧toggle切换 -->
          <div class="left">
            <tab-toggle
            :change="tabChange"
            :tab="['可视化展示', '表格展示']"
            ></tab-toggle>
          </div>
          <!-- 右侧 区域选择 -->
          <div class="right">
            <!-- 区域 -->
            <a-select 
            v-model="branchValue"
            show-search 
            placeholder="请选择" 
            @change="handleChange" 
            @search="handlerSearch"
            :filter-option="false"
            :not-found-content="null"
            @focus="focusSelect"
            @blur="blurSel"
            :getPopupContainer="triggerNode=>triggerNode.parentNode"
            >
            <a-select-option v-for="item in selectOptions" :key="item.branch_code">{{item.branch_office}}</a-select-option>
            </a-select>
            <!-- 分部 -->
            <a-select 
            v-model="areaValue"
            :disabled="branchCode?false:true"
            :filter-option="false"
            :not-found-content="null"
            show-search 
            placeholder="请选择" 
            @change="handleChange2" 
            @search="handlerSearch2"
            @focus="focusSelect2"
            @blur="blurSel2"
            :getPopupContainer="triggerNode=>triggerNode.parentNode"
            >
            <a-select-option v-for="el in selectOptions2" :key="el.branch_code">{{el.branch_name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- 内容主体 tab切换 -->
        <div class="tabsCon">
          <a-tabs v-model="activeKey" :animated="false" @change="activeChange">
            <!-- 营业部目标完成情况 -->
            <a-tab-pane key="1" tab="营业部目标完成情况">
              <business-depart 
                :current="current" 
                :selectTime="timeSelect ? moment(timeSelect).format('YYYY-MM') : ''" 
                :dataDetail="businessDetail" 
                :busDepartTar="busDepartTar"
                :tarHistory="tarHistory"
                @changeSe="changeSe"
                :codeTitle="codeTitle"
              >
              </business-depart>
            </a-tab-pane>
            <!-- 财务指标排名情况 -->
            <a-tab-pane key="2" tab="财务指标排名情况">
              <financial-index :current="current" :dataDetail="financialData" :financeDepartTar="financeDepartTar"></financial-index>
            </a-tab-pane>
            <!-- 非通道业务收入 -->
            <a-tab-pane key="3" tab="非通道业务收入">
              <un-business-detail v-if="activeKey==3&&current==0" :activeKey="activeKey" :current="current" :selectTime="timeSelect ? moment(timeSelect).format('YYYY-MM') : ''" :dataDetail="unBusinessDetail"></un-business-detail>
              <un-table v-if="activeKey==3&&current==1"  :dataDetail="unBusinessDetail"></un-table>
            </a-tab-pane>
            <!-- 客户集中度 -->
            <a-tab-pane key="4" tab="客户集中度">
              <cust-cr-detail :activeKey="activeKey" :current="current" :dataDetail="custCrDetail"></cust-cr-detail>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
         </div>
     </div>
</template>
    
<script>
import businessDepart from "./components/businessDepart.vue";
import unBusinessDetail from './components/unBusinessDetail.vue'
import custCrDetail from './components/custCrDetail.vue'
import financialIndex from './components/financialIndex.vue'
import tabToggle from '@/components/tabToggle/index.vue'
import unTable from './components/unTable.vue'
import * as api from './api.js'
import moment from 'moment'
// import { delete } from 'vue/types/umd';
export default {
       components: {
          businessDepart,
          unBusinessDetail,
          custCrDetail,
          financialIndex,
          tabToggle,
          unTable
          },
    data(){
         return{
          new_date: "", // 最新日期
          timeSelect: undefined, // 选择日期
          isOpen: false, // 显示时间控件
          histroyDate: [], // 返回的时间数组
          current:0,// 可视化 表格展示切换按钮,
          selectOptions:[],
          branchValue:'', // 输入搜索
          branchCode:'', // 选择的code
          areaCode:'', // 选择区域时的areaCode
          selectOptions2:[],
          areaCode2:'', // 选择的code
          areaValue:'', // 输入搜索
          activeKey:'1',
          unBusinessDetail:[],// 非通道业务收入
          custCrDetail:[], // 客户集中度
          businessDetail:[], // 营业部 表格
          busDepartTar:{},// 营业部 数据
          tarHistory:[],// 营业部 走势
          financialData:[], // 财务信息 表格
          financeDepartTar:{}, // 财务信息
          historySel:'01' // 营业部走势图的色勒财团选项
         }
    },
    created(){
         this.getAreaNameList() // 获取区域列表
         this.getBranchDetailTime() // 获取时间列表
         this.getBusDepartTar()
         this.getFinanceDepartTarHistory()
         this.getBusDepartTarTable()
    },
    computed:{
      codeTitle(){
        let str=''
        if(this.areaCode2){
          let val=this.selectOptions2.filter(el=>{
            // console.log(el.area_code,this.selectOptions2,'....')
            return el.branch_code==this.areaCode2
          })
          str=val.length>0?val[0].branch_name:''
        }else if(this.branchCode){
          str='区域整体'
        }else if(!this.branchCode){
          str='公司整体'
        }
        return str
      }
    },
    mounted() {
          window.addEventListener("click", this.closeDateTip);
    },
    beforeDestroy(){
          window.removeEventListener("click", this.closeDateTip);
          delete this.unBusinessDetail// 非通道业务收入
          delete this.custCrDetail // 客户集中度
          delete this.businessDetail// 营业部 表格
          delete this.busDepartTar// 营业部 数据
          delete this.tarHistory// 营业部 走势
          delete this.financialData// 财务信息 表格
          delete this.financeDepartTar // 财务信息
    },
    methods:{
      moment,
      // 日期操作  开始
      // 获取日期列表
      getBranchDetailTime(){
        api.getBranchDetailTime().then(res=>{
          if(res.ret_code==0){
            this.histroyDate=res.data
            this.timeSelect = this.histroyDate.length > 0 && this.histroyDate[0];
          }
        })
      },
      confrim(){
        if (this.timeSelect == "") {
            message.warning("请先选择日期！");
            return;
            }
          this.isOpen = false;
          // 日期变化重新获取数据 
          // 营业部
          this.getBusDepartTar()
          this.getFinanceDepartTarHistory(this.historySel)
          this.getBusDepartTarTable()
          // 财务
          this.getFinanceDepartTar()
          this.getFinanceDepartTarTable()
          // 非通道
          this.getUnBusinessDetail()
          // 客户
          this.getCustCrDetail()
      },
      currtentMonth(){
        this.timeSelect = this.histroyDate.length > 0 && this.histroyDate[0];
      },
      disabledDate(current){
           return !(
          current &&
          this.histroyDate.includes(moment(current).format("YYYY-MM"))
          );   
      },
      closeDateTip(e){
          const cal = document.querySelector(".ant-calendar-picker-container");
          const root = document.querySelector(".goSelect");
          let seM=e.target.className!='ant-calendar-month-panel-year-select-content'
          let seY=e.target.className!='ant-calendar-year-panel-year'
          let seYZ=e.target.className!='ant-calendar-year-panel-decade-select-content'
          let seYZS=e.target.className!='ant-calendar-decade-panel-decade'
          // console.log(e.target.className,'ant-calendar-decade-panel-decade')
          if (cal && e.target.className !== root.className) {
            // if (!cal.contains(e.target)) {
            if (!cal.contains(e.target)&&seM&&seY&&seYZ&&seYZS) {
              this.isOpen = false;
            }
          }
      },
        // 日期操作  结束
        // 千分位化
        toThousands(num){
          return (
            num && num.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
          );
        },
        // 切换 可视化
        tabChange(index){
            this.current=index
            if (index == 0) {
            } else {
            }
        },
        // 右侧select选择 开始
        handleChange(val,opt){
          this.branchCode=val?val:''
          this.areaCode=val?val:''
          if(this.branchCode==''){
            this.branchValue=''
            this.getAreaNameList()
          }
          // 通过获取到的branchCode值 为areaCode的赋值
          this.selectOptions.forEach(el=>{
            if(el.branch_code&&el.branch_code==val){
              this.areaCode=el.area_code
            }
          })
          // 区域变化 重置营业部
          this.areaValue=''
          this.areaCode2=''
          // 获取营业部的list
          // this.getBranchNameList()
          // 区域变化 重新请求数据
          // this.getUnBusinessDetail() // 区域选择blur时重新调取了 此位置不需要重复调用
          // this.getCustCrDetail()
          // console.log(this.activeKey,'...this.activeKey')
          this.changeA(this.activeKey)
        },
        handlerSearch(val){
          // console.log(val,'...sss')
          this.branchValue=val
          // 输入内容 重新搜索
          this.getAreaNameList() // 区域list
        },
        handleChange2(val){
            this.areaCode2=val?val:''
            if(this.areaCode2==''){
            this.getBranchNameList()
          }
            // 区域变化 重新请求数据
            // this.getUnBusinessDetail()
            // this.getCustCrDetail()
            this.changeA(this.activeKey)
        },
        handlerSearch2(val){
          this.areaValue=val
            this.getBranchNameList()
        },
        // 右侧select选择  结束
        // 切换tabs项
        activeChange(key){
            this.activeKey=key
            this.changeA(key)
        },
        changeA(key){
          switch(key){
              case '1':
                this.getBusDepartTar()
                this.getFinanceDepartTarHistory(this.historySel)
                this.getBusDepartTarTable()
              break;
              case '2':
                this.getFinanceDepartTar()
                this.getFinanceDepartTarTable()
              break;
              case '3':
                this.getUnBusinessDetail()
              break;
              case '4':
                this.getCustCrDetail()
              break;
            }
        },
        // 获取区域下拉框所有区域
        getAreaNameList(val){
          this.selectOptions=[]
              const params={
                branch_office:this.branchValue
              }
            api.getAreaNameList(params).then(res=>{
                if(res.ret_code==0){
                  this.selectOptions=res.data
                  if(!this.branchValue){
                    // console.log(this.branchValue,'...this.branchValue')
                    this.selectOptions.unshift({
                    branch_office:'全部',
                    branch_code:'',
                    area_code:''
                  })
                  if(!this.areaValue){
                    this.selectOptions2.unshift({
                      branch_name:'营业部',
                      branch_code:'',
                      area_code:''
                    })
                  }
                  }
                }
            })
        },
        // 根据区域获取对应的所有营业部
        getBranchNameList(val){
          this.selectOptions2=[]
          const params={
            area_code:this.branchCode,
            branch_name:this.areaValue
          }
          api.getBranchNameList(params).then(res=>{
            if(res.ret_code==0){
              this.selectOptions2=res.data
              if(!this.areaValue){
                    this.selectOptions2.unshift({
                      branch_name:'营业部',
                      branch_code:'',
                      area_code:''
                    })
              }
            }
          })
        },
        // 获取非通道业务收入
        getUnBusinessDetail(){
          // 当只选择到区域时 传参branchCode及areaCode 当选择到营业部时不传areaCode只传branchCode
          const params={
           time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMM")
          : '',
            // branch_code:this.areaCode2?'':this.branchCode,
            // area_code:this.areaCode2?this.areaCode2:this.areaCode
            branch_code:this.areaCode2?this.areaCode2:this.branchCode, // 选择到营业部时 只传branch_code
            area_code:this.areaCode2?'':this.areaCode // 选择到营业部时，不传area_code
          }
          this.unBusinessDetail=[]
          api.getUnBusinessDetail(params).then(res=>{
            if(res.ret_code==0){
              // 添加option数据
              res.data.forEach(el=>{
                    let data1=el.un_business_income_zb*100
                    let data2=100-data1
                    // 非通道收入占比1
                    let options={
                title: {
                    text: (data1.toFixed(2))+'%',
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
                    show: false
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
                          itemStyle:{
                              normal:{
                                color:'#4853d3'
                              }
                            }
                          },
                          {
                            value:data2,
                            itemStyle:{
                              normal:{
                                color:'#eeeffb'
                              },
                              emphasis:{
                                color:'#eeeffb'
                              }
                            }
                          },
                          ]
                    }
                ]
                    }
                     this.$set(el,'options',options)
                    //  非通道收入占比2
                    let data3=el.asset_manage_service_zb*100 // 财富管理
                    let data4=el.un_business_thlthzb*100 // 投行、类投行 -- 创新及其他
                    let data5=el.other_unbusiness_channel_zb*100 // 其他 -- 协同业务 
                    let data6=el.credit_unbusiness_channel_zb*100 // 信用业务
                    let dataValue=(100-data3-data4-data5-data6).toFixed(2)
                    // console.log(dataValue,'..dataValue')
                    let options2={
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
                          {value:data3,
                          // name:`财富管理类业务: ${data3.toFixed(2)}%`,
                          itemStyle:{
                              normal:{
                                color:'#f68180'
                              }
                            }
                          },
                          {
                            value:data4,
                            //  name:`投行、类投行类业务: ${data4.toFixed(2)}%`,
                            itemStyle:{
                              normal:{
                                color:'#ce70fe'
                              },
                            }
                          },
                            {
                            value:data5,
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
                            value:data6,
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
                    this.$set(el,'options2',options2)
                    // 2021.1-4与5月及以后
                    if(Number(el.time)<=20210430){
                      this.$set(el,'isThanFive',false)
                    }else{
                      this.$set(el,'isThanFive',true)
                    }
                    
              })
              this.unBusinessDetail=res.data
            }
          })
        },
        // 获取客户集中度
        getCustCrDetail(){
          const params={
           time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMM")
          : '',
            branch_code:this.areaCode2?this.areaCode2:this.branchCode, // 选择到营业部时 只传branch_code
            area_code:this.areaCode2?'':this.areaCode // 选择到营业部时，不传area_code
          }
          this.custCrDetail=[]
          api.getCustCrDetail(params).then(res=>{
             if(res.ret_code==0){
               res.data.forEach(el=>{
                 el.only_commission_ten_zb=(el.only_commission_ten_zb*100).toFixed(2)
                 el.only_commission_thiry_zb=(el.only_commission_thiry_zb*100).toFixed(2)
                 el.only_commission_twentieth_zb=(el.only_commission_twentieth_zb*100).toFixed(2)
                 el.tradvolume_indoor_zb=(el.tradvolume_indoor_zb*100).toFixed(4)
                 el.year_count_commission_rate=(el.year_count_commission_rate*100).toFixed(4)
               })
              this.custCrDetail=res.data
            }
          })
        },
        // 获取营业部目标完成情况
        getBusDepartTar(){
           const params={
           time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMM")
          : '',
            branch_code:this.areaCode2?this.areaCode2:this.branchCode, // 选择到营业部时 只传branch_code
            area_code:this.areaCode2?'':this.areaCode // 选择到营业部时，不传area_code
          }
          api.getBusDepartTar(params).then(res=>{
            if(res.ret_code==0){
              this.new_date=res.data.new_time
              this.busDepartTar=res.data
            }
          })
        },
        // 获取营业部目标完成情况走势
        getFinanceDepartTarHistory(type='01'){
           const params={
           time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMM")
          : '',
            branch_code:this.areaCode2?this.areaCode2:this.branchCode, // 选择到营业部时 只传branch_code
            area_code:this.areaCode2?'':this.areaCode ,// 选择到营业部时，不传area_code
          type
          }

          api.getFinanceDepartTarHistory(params).then(res=>{
             if(res.ret_code==0){
               this.tarHistory=res.data
             }
          })
        },
        changeSe(type){
          this.historySel=type
          this.getFinanceDepartTarHistory(type)
        },
        // 获取营业部目标完成情况 表格
        getBusDepartTarTable(){
          this.businessDetail=[]
          const params={
           time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMM")
          : '',
            branch_code:this.areaCode2?this.areaCode2:this.branchCode, // 选择到营业部时 只传branch_code
            area_code:this.areaCode2?'':this.areaCode // 选择到营业部时，不传area_code
          }
          api.getBusDepartTarTable(params).then(res=>{
            if(res.ret_code==0){
              this.businessDetail=res.data
            }
          })
        },
        // 获取财务指标排名情况
        getFinanceDepartTar(){
          const params={
           time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMM")
          : '',
            branch_code:this.areaCode2?this.areaCode2:this.branchCode, // 选择到营业部时 只传branch_code
            area_code:this.areaCode2?'':this.areaCode // 选择到营业部时，不传area_code
          }
          api.getFinanceDepartTar(params).then(res=>{
            if(res.ret_code==0){
              this.financeDepartTar=res.data
            }
          })
        },
        // 获取财务指标排名情况 表格
        getFinanceDepartTarTable(){
          const params={
           time: this.timeSelect
          ? moment(this.timeSelect).format("YYYYMM")
          : '',
            branch_code:this.areaCode2?this.areaCode2:this.branchCode, // 选择到营业部时 只传branch_code
            area_code:this.areaCode2?'':this.areaCode // 选择到营业部时，不传area_code
          }
          this.financialData=[]
          api.getFinanceDepartTarTable(params).then(res=>{
            if(res.ret_code==0){
              this.financialData=res.data
            }
          })
        },
        // 区域focus
        focusSelect(){
           if(this.branchValue){
             this.branchValue=''
             this.branchCode=''
             this.areaCode=''
             this.getAreaNameList()
             this.getBranchNameList()
           }
        },
        blurSel(){
          this.areaValue='营业部'
          this.areaCode2=''
          this.changeA(this.activeKey)
        },
        // 营业部focus
        focusSelect2(){
          if(this.areaValue){
            this.areaValue=''
            this.areaCode2=''
            this.getBranchNameList()
          }
        },
        blurSel2(){
          this.changeA(this.activeKey)
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
  background-color: #f0f2f5;
  height: 100%;
  overflow-y: scroll;
}
.section-1 {
  margin-left: 20px;
  margin-bottom: 20px;
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
  .mainCon{
    padding: 20px;
    border: 1px solid #c3c3c3;
    border-radius: 10px;
    background-color: #fff;
    .mainCon-head{
      display: flex;
      justify-content: space-between;
      .right{
        .ant-select{
          width: 200px;
          margin-right:10px ;
        }
      }
    }
    .tabsCon{
      margin-top: 10px;
      
    }
  }
}
</style>
<style lang="scss">
        // .ant-tabs-content{
        //   height: calc(100vh - 200px);
        //   overflow-y: scroll;
        //   padding-right: 20px;
        // }
        .ant-tabs-nav-container{
        font-size: 16px !important;
        color:#6c6c6c;
        font-weight: 500;
        font-family: PingFangSC-Medium,PingFang SC;
        .ant-tabs-tab-active{
          color:#454ad5;
        }
        .ant-tabs-ink-bar{
          background-color: #454ad5;
        }
        .ant-tabs-nav .ant-tabs-tab:hover{
          color:#454ad5;
        }
        }
        .ant-calendar-picker-container{
          .date-footer-box{
            display: flex;
            justify-content: space-between;
          }
      }
</style>