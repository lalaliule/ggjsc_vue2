<template>
  <table
    border
    style="table-layout:fixed"
  >
    <tr>
      <th
        v-for="(item,index) in columns"
        :key="index"
        :style="setWidth?'width:300px':''"
      >
        {{item.name}}
      </th>
    </tr>
    <tr
      v-for="(item,index) in data"
      :key="index"
    
    >
      <td
        v-for="(it,i) in columns"
        :key="i"
        :class='{active:spacicalTd.indexOf(item.name)>=0}'
        :style="setWidth?'width:200px':''"
      >
        {{item[it.key]}}
      </td>
    </tr>
  </table>
</template>

<script>
// import { reactive, toRefs } from 'vue'

export default {
  name: 'SampleTableY',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    setWidth:{
      type:Boolean,
      default:false
    }
  },
  data(){
      return {
        count: 0,
        spacicalTd:['公司总部','母公司合计','子公司合计','分支机构','合计']
      }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  border: none;
  overflow: auto;
  table-layout: fixed;
  th,
  td {
    text-align: center;
    height: 60px;
    width: 150px;
    padding: 5px 10px;
    &.active{
      font-weight: bolder;
      background-color: #f5f6ff;
    }
  }
}
</style>