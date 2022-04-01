<template>
    <div class="myCon">
        <div class="main-head">
            <div class="title">再融资家数<span class="dataFrom">数据来源: 投行管理部</span></div>
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
            <!-- 上部 可视化 -->
            <div class="con-top">
                <div class="top-left">
                    <echart-common :options="options"></echart-common>
                </div>
                <div class="top-right">
                    <ul>
                        <li>
                            <div class="titleC">
                                <span class="iconCon">
                                    <a-icon type="check-square" />
                                </span>
                                <span>本年完成项目</span>
                            </div>
                            <div class="numC">{{detailData.complete_num}}家</div>
                        </li>
                        <li>
                            <div class="titleC">
                                <span class="iconCon">
                                    <a-icon type="edit" />
                                </span>
                                <span>签约家数</span>
                            </div>
                            <div class="numC">{{detailData.sign_num}}家</div>
                        </li>
                        <li class="lastLi">
                            <div class="numC">
                                <span class="iconCon">
                                    <a-icon type="laptop" />
                                </span>
                                <span class="">{{detailData.meeting_num}}家</span>
                            </div>
                            <div class="titleC">在会家数</div>
                        </li>
                        <li class="lastLi">
                            <div class="numC">
                                <span class="iconCon">
                                    <a-icon type="profile" />
                                </span>
                                <span class="">{{detailData.later_num}}家</span>
                            </div>
                            <div class="titleC">过会家数</div>
</li>
                    </ul>
                </div>
            </div>
            <!-- 下部 table -->
            <div class="con-table">
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
                <!-- 下部 表格 -->
                <div class="con-data">
                    <a-table
                        :bordered="true"
                        :columns="columns"
                        :data-source="tableData"
                        :pagination="false"
                        :rowKey="(record,index)=>{return index}"
                        :scroll="{y:440}"
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
          value: '完成',
          label: '完成',
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
          value: '签约',
          label: '签约',
        },
      ],
      stateKey: [], // 被选中的状态
      detailData: {},
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
          title: '项目类型1',
          key: 'pro_type',
          dataIndex: 'pro_type',
          align: 'center',
        },
        {
          title: '项目类型子类',
          key: 'sub_type',
          dataIndex: 'sub_type',
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
      tableData: [],
      options: {
        series: [
          {
            type: 'gauge',
            radius: '70%',
            axisLine: {
              show: true,
              // 两端是否设置为圆角；在5.0之后的版本有效
              roundCap: false,
              lineStyle: {
                width: 20,
                color: [
                  [0, {
                    x: 0,
                    y: 0,
                    x1: 1,
                    y1: 0,
                    colorStops: [
                      { offset: 0, color: '#7796ff' },
                      { offset: 1, color: '#1d3fff' },
                    ],
                  }],
                  [1, '#e6ebf8'],
                ],
              },
            },
            axisTick: {
              distance: -30,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: '#E2E2E2',
              },
            },
            splitLine: {
              distance: -35,
              length: 14,
              lineStyle: {
                width: 2,
                color: '#E2E2E2',
              },
            },
            axisLabel: {
              distance: -15,
              color: '#CFCFCF',
              fontSize: 13,
            },
            itemStyle: {
              normal: {
                color: '#FF7373', //指针颜色
              },
            },
            detail: {
              valueAnimation: true,
              fontSize: 20,
              color: '#1D3FFF',
              offsetCenter: [0, '80%'],
              formatter: '{value}%',
            },
            title: {
              show: true,
              offsetCenter: [0, '110%'],
              textStyle: {
                fontWeight: 'bolder',
                color: '#2f2f2f',
                fontSize: '16px',
              },
            },
            data: [
              {
                value: 0,
                name: '预案完成率',
              },
            ],
          },
        ],
      },
    }
  },
  created() {
    this.getRefinancingNumTime()
    this.getRefinancingNum()
    this.getRefinancingNumTable()
  },
  methods: {
    moment,
    // 时间变化
    changeTime(time) {
      this.timeSel = time
      const str = time ? moment(time).format('YYYY-MM') : ''
      const tiemStr = str.split('-')
      this.new_date = `${tiemStr[0]}年${Number(tiemStr[1])}月`
      // 重新获取数据 并清空下拉选项
      this.adressKey = []
      this.departKey = []
      this.stateKey = []

      this.getRefinancingNum()
      this.getRefinancingNumTable()
    },
    // 注册地变化
    changeAdress(val) {
      this.adressKey = val
      this.getRefinancingNumTable()
    },
    // 部门变化
    changeDepart(val) {
      this.departKey = val
      this.getRefinancingNumTable()
    },
    // 状态变化
    changeState(val) {
      this.stateKey = val
      this.getRefinancingNumTable()
    },
    // 再融资家数 时间列表
    getRefinancingNumTime() {
      api.getRefinancingNumTime().then(res => {
        if (res.ret_code == 0) {
          this.histroyDate = res.data
          this.timeSel = this.histroyDate.length > 0 && this.histroyDate[0]
          const str = this.histroyDate.length > 0 && this.histroyDate[0]
          const tiemStr = str.split('-')
          this.new_date = `${tiemStr[0]}年${Number(tiemStr[1])}月`
        }
      })
    },
    // 再融资家数
    getRefinancingNum() {
      const params = {
        time: this.timeSel ?
          moment(this.timeSel).format('YYYYMM') :
          '',
        regis_place_list: this.adressKey ? (this.adressKey.length > 0 ? [this.adressKey] : []) : [],
        department_list: this.departKey ? (this.departKey.length > 0 ? [this.departKey] : []) : [],
        state_list: this.stateKey ? (this.stateKey.length > 0 ? [this.stateKey] : []) : [],
      }
      api.getRefinancingNum(params).then(res => {
        if (res.ret_code == 0) {
          this.adressData = res.data.place_list
          this.departData = res.data.depart_list
          this.detailData = res.data
          this.options.series[0].data[0].value = (res.data.completion_num * 100).toFixed(2)
          this.options.series[0].axisLine.lineStyle.color[0][0] = res.data.completion_num
        }
      })
    },
    getRefinancingNumTable() {
      this.tableData = []
      const params = {
        time: this.timeSel ?
          moment(this.timeSel).format('YYYYMM') :
          '',
        regis_place_list: this.adressKey ? (this.adressKey.length > 0 ? [this.adressKey] : []) : [],
        department_list: this.departKey ? (this.departKey.length > 0 ? [this.departKey] : []) : [],
        state_list: this.stateKey ? (this.stateKey.length > 0 ? [this.stateKey] : []) : [],
      }
      api.getRefinancingNumTable(params).then(res => {
        if (res.ret_code == 0) {
          this.tableData = res.data
        }
      })
    },
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
        max-height: 920px;
        margin:10px;
        background-color: #fff;
        border-radius: 10px;
        // padding-top: 66px;
        padding-top: 10px;
        padding-bottom: 10px;
        .con-top{
            display: flex;
            height: 270px;
            .top-left{
                flex: none;
                width: 518px;
            }
            .top-right{
                flex:1;
                // min-width: 1100px;
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    height: 100%;
                    li{
                        flex: 40%;
                        height: 46%;
                        margin-top: 20px;
                        margin-right: 20px;
                        padding-top: 20px;
                        color: #fff;
                        padding-left:30px;
                        box-sizing: border-box;
                        &:nth-child(-n+2){
                            margin-top: 0;
                        }
                        &:nth-child(1){
                            background: url('~@/assets/imgs/zrz1.png') no-repeat center;
                            background-size: 100% 100%;
                        }
                        &:nth-child(2){
                            background: url('~@/assets/imgs/zrz2.png') no-repeat center;
                            background-size: 100% 100%;
                        }
                        &:nth-child(3){
                            background: url('~@/assets/imgs/zrz3.png') no-repeat center;
                            background-size: 100% 100%;
                        }
                        &:nth-child(4){
                            background: url('~@/assets/imgs/zrz4.png') no-repeat center;
                            background-size: 100% 100%;
                        }
                        .titleC{
                            position: relative;
                            font-size: 14px;
                            margin-left: 50px;
                            .iconCon{
                                position: absolute;
                                top: 50%;
                                left: -35px;
                                transform: translateY(-50%);
                                width: 30px;
                                height: 30px;
                                font-size: 18px;
                                line-height: 30px;
                                text-align: center;
                                background-color: rgba(255,255,255,.1);
                                border-radius: 50%;
                            }
                        }
                        .numC{
                            position: relative;
                            font-size: 24px;
                            margin: 20px 0;
                            margin-left: 50px;
                            .iconCon{
                                position: absolute;
                                top: 50%;
                                left: -35px;
                                transform: translateY(-50%);
                                width: 30px;
                                height: 30px;
                                font-size: 18px;
                                line-height: 30px;
                                text-align: center;
                                background-color: rgba(255,255,255,.1);
                                border-radius: 50%;
                            }
                        }
                    }
                    .lastLi{
                        padding-top: 10px;
                    }
                }
            }
        }
        .con-table{
            height: calc(100% - 360px);
            .con-sel{
                display: flex;
                justify-content: flex-end;
                padding-right: 20px;
                margin-top: 35px;
                .ant-select{
                    width: 240px;
                    height: 42px;
                    margin-left: 30px;
                }
            }
            .con-data{
                height: 100%;
                margin: 0 20px;
            }
        }
    }
    .selectP{
        position: relative;
    }
}
</style>