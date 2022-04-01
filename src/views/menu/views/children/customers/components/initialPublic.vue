<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">IPO家数<span class="dataFrom">数据来源: 投行管理部</span> </div>
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
            <!-- 上部 选择 -->
            <div class="con-sel">
                <!-- 注册地的select -->
                <div class="selectP">
                     <a-select
                    allowClear
                    placeholder="注册地"
                    showArrow
                    @change="changeAdress"
                    v-model="adressKey"
                    :getPopupContainer="triggerNode=>triggerNode.parentNode"

                >
                    <a-select-option
                        v-for="i in adressData"
                        :key="i"
                    >
                        {{i}}
                    </a-select-option>
                </a-select>
                </div>

                <!-- 部门 -->
                <div class="selectP">
                    <a-select
                    allowClear
                    placeholder="部门"
                    showArrow
                    @change="changeDepart"
                    v-model="departKey"
                    :getPopupContainer="triggerNode=>triggerNode.parentNode"
                >
                    <a-select-option
                        v-for="i in departData"
                        :key="i"
                    >
                        {{i}}
                    </a-select-option>
                </a-select>
                </div>

                <!-- 状态 -->
                <div class="selectP">
                    <a-select
                    allowClear
                    placeholder="状态"
                    showArrow
                    @change="changeState"
                    v-model="stateKey"
                    :getPopupContainer="triggerNode=>triggerNode.parentNode"
                >
                    <a-select-option
                        v-for="i in stateData"
                        :key="i.value"
                    >
                        {{i.label}}
                    </a-select-option>
                </a-select>
                </div>
</div>
            <!-- 下部 数据展示 -->
            <div class="con-detail">
                <div class="con-left">
                    <ul>
                        <li>
                            <div>
                                <div class="imgCon">
                                <img src="@/assets/imgs/IPO1.png" alt="">
                                </div>
                                <div>
                                    <p class="numCon">{{numData.coach_num}}家</p>
                                    <p class="numTitle">辅导家数</p>
                                </div>
                            </div>
                            <img src="@/assets/imgs/IPO5.png" alt="">
                        </li>
                        <li>
                            <div>
                                <div class="imgCon">
                                <img src="@/assets/imgs/IPO2.png" alt="">
                                </div>
                                <div>
                                    <p class="numCon">{{numData.meeting_num}}家</p>
                                    <p class="numTitle">在会家数</p>
                                </div>
                            </div>
                            <img src="@/assets/imgs/IPO5.png" alt="">
                        </li>
                        <li>
                            <div>
                                <div class="imgCon">
                                <img src="@/assets/imgs/IPO3.png" alt="">
                                </div>
                                <div>
                                    <p class="numCon">{{numData.later_num}}家</p>
                                    <p class="numTitle">过会家数</p>
                                </div>
                            </div>
                            <img src="@/assets/imgs/IPO5.png" alt="">
                        </li>
                        <li>
                            <div>
                                <div class="imgCon">
                                <img src="@/assets/imgs/IPO4.png" alt="">
                                </div>
                                <div>
                                    <p class="numCon">{{numData.list_num}}家</p>
                                    <p class="numTitle">本年上市</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="con-right">
                    <a-table
                        :bordered="true"
                        :columns="columns"
                        :data-source="tableData"
                        :pagination="false"
                        :rowKey="(record,index)=>{return index}"
                        :scroll="{y:370}"
                    >
                    </a-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import monthPicker from '@/components/monthPicker/index'
import * as echarts from 'echarts'
import * as api from '../api.js'
import moment from 'moment'
export default {
  components: {
    monthPicker,
  },
  data() {
    return {
      // 时间 开始
      histroyDate: [],
      timeSel: '',
      new_date: '',
      // 时间 结束
      adressData: [],
      adressKey: [], // 被选中的注册地址
      departData: [],
      departKey: [], // 被选中的部门
      stateData: [
        {
          value: '辅导',
          label: '辅导',
        },
        {
          value: '在会',
          label: '在会',
        },
        {
          value: '过会',
          label: '过会',
        },
        {
          value: '上市',
          label: '上市',
        },
      ],
      stateKey: [], // 被选中的状态
      numData: {},
      tableData: [], // 表格数据
      columns: [
        {
          title: '序号',
          key: 'indexes',
          dataIndex: 'indexes',
          align: 'center',
          customRender: (text, record, index) => index + 1,
          width: 80,
        },
        {
          title: '项目名称',
          key: 'pro_name',
          dataIndex: 'pro_name',
          align: 'center',
          width: 240,
        },
        {
          title: '注册地',
          key: 'regis_place',
          dataIndex: 'regis_place',
          align: 'center',
        },
        {
          title: '项目类型',
          key: 'pro_type',
          dataIndex: 'pro_type',
          align: 'center',
        },
        {
          title: 'IPO类型',
          key: 'ipo_type',
          dataIndex: 'ipo_type',
          align: 'center',
        },
        {
          title: '立项时间',
          key: 'project_time',
          dataIndex: 'project_time',
          align: 'center',
        },
        {
          title: '预计申报时间',
          key: 'estim_time',
          dataIndex: 'estim_time',
          align: 'center',
        },
        {
          title: '预计收入(万元)',
          key: 'estim_income',
          dataIndex: 'estim_income',
          align: 'center',
        },
        {
          title: '部门',
          key: 'department',
          dataIndex: 'department',
          align: 'center',
        },
        {
          title: '状态',
          key: 'state',
          dataIndex: 'state',
          align: 'center',
        },
      ],

    }
  },

  created() {
    // 获取时间列表
    this.getIPONumTime()
    // 获取家教数
    this.getIPONum()
    // 获取表格
    this.getIPONumTable()
  },
  methods: {
    moment,
    // 时间变化
    changeTime(time) {
      this.timeSel = time
      // console.log(moment(time).format("YYYY-MM"),'..tiem')
      const str = time ? moment(time).format('YYYY-MM') : ''
      const tiemStr = str.split('-')
      this.new_date = `${tiemStr[0]}年${Number(tiemStr[1])}月`
      // 重新获取数据 并清空下拉选项
      this.adressKey = []
      this.departKey = []
      this.stateKey = []
      this.getIPONum()
      this.getIPONumTable()
    },
    // 注册地变化
    changeAdress(val) {
      this.adressKey = val
      // 获取表格
      this.getIPONumTable()
    },
    // 部门变化
    changeDepart(val) {
      this.departKey = val
      // 获取表格
      this.getIPONumTable()
    },
    // 状态变化
    changeState(val) {
      this.stateKey = val
      // 获取表格
      this.getIPONumTable()
    },
    // 获取时间列表
    getIPONumTime() {
      api.getIPONumTime().then(res => {
        if (res.ret_code == 0) {
          this.histroyDate = res.data
          // console.log(this.histroyDate,'..this.histroyDate')
          this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0]
          const str = this.histroyDate.length > 0 && this.histroyDate[0]
          const tiemStr = str.split('-')
          this.new_date = `${tiemStr[0]}年${Number(tiemStr[1])}月`
        }
      })
    },
    // 获取ipo家教数
    getIPONum() {
      const params = {
        time: this.timeSel ?
          moment(this.timeSel).format('YYYYMM') :
          '',
        regis_place_list: this.adressKey ? (this.adressKey.length > 0 ? [this.adressKey] : []) : [],
        department_list: this.departKey ? (this.departKey.length > 0 ? [this.departKey] : []) : [],
        state_list: this.stateKey ? (this.stateKey.length > 0 ? [this.stateKey] : []) : [],
      }
      api.getIPONum(params).then(res => {
        if (res.ret_code == 0) {
          this.adressData = res.data.place_list
          this.departData = res.data.depart_list
          this.numData = res.data
        }
      })
    },
    // IPO家数 表格
    getIPONumTable() {

      this.tableData = []
      const params = {
        time: this.timeSel ?
          moment(this.timeSel).format('YYYYMM') :
          '',
        regis_place_list: this.adressKey ? (this.adressKey.length > 0 ? [this.adressKey] : []) : [],
        department_list: this.departKey ? (this.departKey.length > 0 ? [this.departKey] : []) : [],
        state_list: this.stateKey ? (this.stateKey.length > 0 ? [this.stateKey] : []) : [],
      }
      api.getIPONumTable(params).then(res => {
        if (res.ret_code == 0) {
          this.tableData = res.data
          this.tableData.forEach((el, index) => {
            el.estim_income = this.$toT(el.estim_income)
            if (el.estim_income == 0) {
              el.estim_income = '待定'
            }

          })
        }
      })

    },
  },
}
</script>

<style lang="scss" scoped>
.myCon{
    margin:0 20px 20px;
    &::after{
    content: '';
    position: fixed;
    display: block;
  }
    .main-head{
        display: flex;
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
        background-color: #fff;
        border-radius: 10px;
        padding-top: 30px;
        margin: 10px;
        .con-sel{
            display: flex;
            justify-content: flex-end;
            padding-right: 20px;
            .ant-select{
                width: 240px;
                height: 42px;
                margin-left: 30px;
            }
        }
        .con-detail{
            display: flex;
            justify-content: space-between;
            height: 470px;
            margin:10px 0 20px;
            .con-left{
                flex: none;
                width: 340px;
                ul{
                    li{
                        position: relative;
                        width: 300px;
                        height: 95px;
                        border: 1px solid #bbb;
                        margin: 0 auto 22px;
                        border-radius: 10px;
                        >img{
                            position: absolute;
                            left: 50%;
                            bottom:-25%;
                            transform: translateX(-50%);
                        }
                        >div{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            height: 100%;
                            >div{
                                flex: 1;
                                align-self: center;
                                height: 100%;
                                padding: 20px 0;
                                img{
                                    margin-left: 25px;
                                }
                                p{
                                    margin-bottom: 0;
                                    line-height: 1.5;
                                    font-size: 20px;
                                }
                                .numTitle{
                                    font-size: 16px;
                                }
                            }
                        }
                        &:nth-child(1){
                            >div{
                                >div{
                                    .numCon{
                                        color:#193bff;
                                    }
                                }
                            }
                        }
                        &:nth-child(2){
                            >div{
                                >div{
                                    .numCon{
                                        color:#ff8356;
                                    }
                                }
                            }
                        }
                        &:nth-child(3){
                            >div{
                                >div{
                                    .numCon{
                                        color:#ad6eff;
                                    }
                                }
                            }
                        }
                        &:nth-child(4){
                            >div{
                                >div{
                                    .numCon{
                                        color:#24cdcf;
                                    }
                                }
                            }
                        }
                        .imgCon{
                            padding: 31px 0;
                        }
                    }
                }
            }
            .con-right{
                flex: 1;
            }
        }
    }
    .selectP{
        position: relative;
    }
}
</style>
<style lang="scss">
    // .ant-select{
    //     width: 240px;
    //     height: 42px;
    // }
</style>