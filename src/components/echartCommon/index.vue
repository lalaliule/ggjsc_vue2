/**
 * @description: echarts动画统一封装
 * @param {echarts 选项options}
 * @return:
 */
<template>
  <div class="chart-box relative">
    <div ref="echartCommon" class="chart" />
  </div>
</template>

<script>
import {Throttle} from '@/utils/index.js'
import doAnimation from '@/utils/doAnimation.js'
//import { mixin } from '@/utils/mixin.js'
export default {
  name: 'EchartCommon',
  //mixins:[mixin],
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
    hasClick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // chart: null,
      showNoData: true,
      animate: null,
    }
  },
  watch: {
    options: {
      handler() {
        this.updateChartView()
      },
      deep: true,
    },
  },
  created(){
   
  },
   activated : function(){
       let canvasObj = document.getElementsByTagName('canvas');
        if(canvasObj&&canvasObj.length>0){
            let canvasH = canvasObj[0].clientHeight;
            // console.log('canvasH',canvasH);
            if(canvasH==0){
                this.updateChartView()
            }
        } 
         let chart = this.echarts.getInstanceByDom(this.$refs.echartCommon);
          if (chart == undefined) {
      chart = this.echarts.init(this.$refs.echartCommon);
      this.updateChartView()
    }
    },
  beforeMount(){
     this.handleWindowResize()
   /** let timer = setTimeout(()=>{
     // window.addEventListener('resize', this.handleWindowResize)
       
    },2000) **/
  },
  mounted() {
    let chart = this.$refs.echartCommon&&this.echarts.getInstanceByDom(this.$refs.echartCommon);
    if (!chart) {
      chart = this.echarts.init(this.$refs.echartCommon);
      this.updateChartView()
    }
   // window.addEventListener('resize', this.handleWindowResize)
    if (!chart) {
      this.$once('hook:beforeDestroy', function () {
        this.echarts.dispose(chart)
       /** if(window.CollectGarbage){
           window.CollectGarbage()
        } **/
        window.removeEventListener('resize', this.handleWindowResize)
      })
    }

  },
  deactivated(){
    let Chart = this.echarts.getInstanceByDom(this.$refs.echartCommon)
    Chart&&Chart.dispose()
    this.echarts.dispose(Chart)

    /**if(window.CollectGarbage){
      window.CollectGarbage()
    }**/
    Chart=null
    if (this.animate) {
      this.animate.destory()
    }
  },
   beforeDestroy() {
    let Chart = this.echarts.getInstanceByDom(this.$refs.echartCommon)
    Chart&&Chart.dispose()
    this.echarts.dispose(Chart)

    /**if(window.CollectGarbage){
      window.CollectGarbage()
    }**/
    Chart=null
    if (this.animate) {
      this.animate.destory()
    }
  },
  methods: {
    /**
     * 更新echart视图
     */
    updateChartView() {
      let chart = this.echarts.getInstanceByDom(this.$refs.echartCommon)
      if (!chart || Object.keys(this.options).length === 0) {
        return
      }
      // eslint-disable-next-line no-unused-vars
      new Promise((resolve, reject) => {
        chart.clear()
        chart.setOption(this.options, true)
        //点击
        if (this.hasClick) {
          chart.on('click', Throttle((params) => {
            this.$emit('handleChange', params)
          }),500)
        }
        
        resolve()
      }).then(() => {
        if (this.animate) {
          this.animate.destory()
          this.animate = null
        }
        // this.animate = new doAnimation(this.chart) // 防止formatter自动触发
        // this.animate.animate()
      })
    },
    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      let chart = this.$refs.echartCommon&&this.echarts.getInstanceByDom(this.$refs.echartCommon)
      if (!chart) {
        return
      }
      chart.resize()
    },
  },
}
</script>

<style lang="scss" scoped>
.chart,
.chart-box {
  width: 100%;
  height: 100%;
}
</style>
