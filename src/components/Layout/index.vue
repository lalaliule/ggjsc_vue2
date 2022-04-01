<template>
  <a-layout >
    <system-nav></system-nav>
    <a-layout>
      <!-- 导航栏 -->
      <a-layout-sider
        v-model="collapsed"
        collapsible
        :trigger="null"
        class="menu-layout"
        width="200"
      >
        <a-menu
          mode="inline"
          theme="dark"
          :open-keys.sync="openKeys"
          v-model="selectedKeys"
          :inlineCollapsed="collapsed"
          @click="selectedItem"
          @openChange="onOpenChange"
        >
          <template v-for="v in allMenu">
            <template v-if="!v.children.length > 0">
              <a-menu-item :key="v.url" :disabled="v.id=='insBusiness'||v.id=='investmentBusiness'">
              <!-- <a-menu-item :key="v.url"> -->
                <span class="iconfont" :class="v.icon" v-if="v.icon"></span>
                <span>{{ v.title }}</span>
              </a-menu-item>
            </template>
            <template v-else>
              <!-- <sub-menu :menuInfo="v" :key="v.url" disabled/> -->
              <!-- <sub-menu :menuInfo="v" :key="v.url"/> -->
              <a-sub-menu :key="v.url">
                <span slot="title">
                  <span class="iconfont" :class="v.icon" v-if="v.icon"></span>
                  <span v-if='!collapsed'>{{v.title }}</span>
                </span>
                <template v-for="item in v.children">
                  <template v-if="!item.children.length>0">
                    <a-menu-item :key="item.url" :disabled="item.isDisabled">
                    <span
                        class="iconfont" :class="item.icon" v-if="item.icon"></span>
                        <span>{{item.title}}</span>
                      </a-menu-item>
                  </template>
                </template>
              </a-sub-menu>
            </template>
          </template>
        </a-menu>
      </a-layout-sider>

      <a-layout>
        <!-- 内容区 -->
        <a-layout-content class="layout-content" :style="{ margin: '15px', 'margin-right': '5px' }">
        <keep-alive>
          <router-view />
        </keep-alive>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
// import menusJson from "mock/menus/index.json"; //路由json
import { Icon } from "ant-design-vue";
import systemNav from '../systemNav/index.vue'
// import router from '@/router/index'

//阿里图标库引用
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2287282_0cednzk5tnru.js"
});
export default {
  name: "Layouts",
  components: {
    "icon-font": IconFont,
    systemNav,
  },
  data(){
    return{
      current: ["setting:1"],
      visible: false,
      // menusJson, //mock数据
      collapsed: false,
      openKeys: [this.$route.matched[0].path], //根据路由打开菜单
      selectedKeys: [this.$route.fullPath], //根据路由选中菜单
      timer:null,

    }
  },
  watch:{
    collapsed(newVal){
      if (newVal) {
        this.openKeys = [];
      } else {
        this.openKeys = [this.$route.matched[0].path];
      }
    }
  },
  computed:{
    systemName(){
      return this.$route.meta.name;
    },
    allMenu(){
      return this.$store.getters["common/user/getAllMenu"].length > 0
        ? this.$store.getters["common/user/getAllMenu"][0].children
        : [];
    }
  },
  mounted(){
  },
  created(){
     this.timer = setInterval(()=>{
      if(window.CollectGarbage){
        console.log('垃圾回收')
        window.CollectGarbage()
      }
    },60*1000)
  },
  deactivated(){
    clearInterval(this.timer);
  },
  beforeDestroy(){
    clearInterval(this.timer);
  },
  methods:{
    onOpenChange(openKeys){
      if (openKeys.length !== 0) {
        this.openKeys = [openKeys[1]];
      } else {
        this.openKeys = [""];
      }
    },
    // 点击跳转
    selectedItem(item){
      this.$router.push({path:item.key})
    },
    infoChange(e){
      this.current = [e.key];
    }
  },
};
// ?
</script>
<style lang="scss" scoped>
.layout-content {
  // background: #fff;
  height: calc(100vh - 80px);
  // padding: 20px;
  margin: 0;
  // overflow: scroll;
  min-width: 800px;
  padding-bottom: 20px;
  min-width: 1200px;
  max-width: calc(100vw - 200px);
}
.menu-layout {
  position: fixed;
  height: 100%;
  left: 0;
  top: 60px;
  z-index: 9999;
}
.menu-layout,
.ant-menu.ant-menu-dark,
.ant-menu-dark .ant-menu-sub,
.ant-menu.ant-menu-dark .ant-menu-sub,
/deep/.ant-menu-inline {
  background: #363fc8 !important;
  font-size: 16px;
  // font-family: PingFangSC-Regular, PingFang SC;
}
/deep/.ant-menu-item-selected {
  background: #fff !important;
  span {
    color: #363fc8 !important;
  }
}
/deep/.iconfont {
  margin-right: 5px !important;
}
.ant-layout-has-sider {
  // overflow: auto;
  margin: 60px 0 0px 0;
  padding-left: 200px;
}

  .ant-menu-title-content{
    position: relative;
    .icon-jingqingqidai{
      position: absolute;
      top: 50%;
      left: 30%;
      transform: translate(-50%,-50%);
      color: darkGray;
      font-size: 30px;
    }
    .icon-jingqingqidai1{
        position: absolute;
        top: 50%;
        left: 38%;
        transform: translate(-50%,-50%) rotate(-20deg);
        color: darkGray;
        font-size: 30px;
      }
  }
  ::v-deep .ant-menu-inline.ant-menu-sub{
    box-shadow: none;
  }
  ::v-deep .ant-menu-submenu-title,.ant-menu-item{
    font-size: 16px;
  }

::v-deep .ant-menu-item{
  position: relative;
    .icon-jingqingqidai1{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-80%,-50%) rotate(-20deg);
      color: darkGray;
      font-size: 30px;
    }
}
</style>
