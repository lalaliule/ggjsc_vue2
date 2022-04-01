/** *@name: 系统导航栏 * @param {type} */
<template>
<div>
<a-layout-header class="layout-header-nav">
    <div class="logo">
      <img src="../../assets/imgs/logo.png" alt="" />
    </div>
    <div class="system-name">高管驾驶舱</div>
    <div class="system-time">
      <date-time v-slot:default="slotProps">
        {{ slotProps.data.year }}年 {{ slotProps.data.month }}月
        {{ slotProps.data.day }}日&nbsp;&nbsp;&nbsp;
        {{ slotProps.data.week }}&nbsp;&nbsp;&nbsp;
        {{ slotProps.data.time }}
      </date-time>
    </div>
    <div class="login-userInfo">
      <a-dropdown :trigger="['click']" placement="bottomLeft" overlayClassName="userClass" >
        <a-avatar>{{ userInfo.operator_name }}</a-avatar>
        <template #overlay>
          <a-menu @click="infoChange">
            <a-menu-item key="changePSW">修改密码</a-menu-item>
            <a-menu-item key="logout">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <span>欢迎您，{{ userInfo.operator_name }}</span>
    </div>
  </a-layout-header>

   <!-- 修改密码 -->
   <model-page :modelValue="changePSW" @changeModel="changeModel" title="修改密码" class="pswModel">
     <a-form
      ref="formRef"
      labelAlign="right"
      :form="form"   
      @submit="onSubmit" 
     >
        <a-form-item label="原密码" v-bind="formItemLayout">
          <a-input 
            placeholder="请输入原密码"
            autocomplete="off"
            v-decorator="['formState.old_password',{rules:[{required:true,message:'原密码不能为空'}]}]"
            type="password"></a-input>
        </a-form-item>
        <a-form-item label="新密码" v-bind="formItemLayout">
          <a-input placeholder="请输入新密码"
            autocomplete="off" v-decorator="['formState.new_password',{rules:[{required:true,message:'新密码不能为空'},{validator:validateNewPassword}]}]" type="password"></a-input>
        </a-form-item>
        <a-form-item label="确认密码" v-bind="formItemLayout">
          <a-input placeholder="请输入确认密码" v-decorator="['formState.check_password',{rules:[{required:true,message:'确认密码不能为空'},{validator:validateCheckPassword}]}]" type="password"></a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24,}" class="btnCOn">
            <a-button
              type="primary"
              size="default"
              block
              shape="round"
              :loading="isLoading"
              html-type="submit"
            >
              确定
            </a-button>
          </a-form-item>
     </a-form>
    </model-page>

</div>
</template>

<script>
import { encryptParam } from "@/utils/encryption";
import dateTime from '../deteTime/index'
export default {
  name: "SystemNav",
  components:{
    dateTime,
  },
  data(){
    return{
      changePSW:false,
      formState:{
        old_password: "",
        new_password: "",
        check_password:"",
      },
      isLoading:false,
      formItemLayout:{
        labelCol:{span: 4},
        wrapperCol:{span: 20},
      },
      form:this.$form.createForm(this,{name:'check-password'}),

    }
  },
  computed:{
    userInfo(){
      return this.$store.getters["common/user/userInfo"];   
    }
  },
  watch:{
    changePSW(newV){
      if(!newV){
        this.form.resetFields()
      }
    }
  },
  methods: {
    // 密码自定义规则
    // 验证原始密码是否正确
    validateOldPassword(rule, value,callback){
      if (value) {
        callback();
      }
    },
    validateNewPassword(rule, value,callback){
      const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}/g
      if(value){
        if(!regex.test(value)){
          callback("新密码需同时包含大写、小写、数字和特殊字符,请不低于12位");
        }else{
          callback();
        }
      }else{
        callback();
      }
    },
    validateCheckPassword(rule, value,callback){
      const form=this.form
      if(value&&value!=form.getFieldValue('formState.new_password')){
       callback("确认密码与新密码不一致");
      } else {
        callback();
      }
    },
    infoChange(ele){
      if (ele.key === "logout") {
        const params = {
          operator_code: this.userInfo.operator_code,
          user_token:this.userInfo.user_token,
        };
        this.$store
          .dispatch("common/user/logout", params)
          .then(async (result) => {
            if (result.data[0].return_code === "0") {
              this.$message.success("退出登录成功！", 0.5, () => {
                this.$store.commit('common/user/SET_TOKEN','')
                this.$store.commit('common/user/SET_USER_INFO',{})
                this.$router.push("/login");
                // 退出登录清除存储
                localStorage.removeItem('myMenus')
              });
            }else {
              message.error('退出登录失败！')
            }
          })
          .catch((err) => console.log(err));
      }else if(ele.key=='changePSW'){
        this.changePSW=true
              console.log(ele.key,'...ee')

      }
    },
    onSubmit(e){
      e.preventDefault();
      this.form.validateFields((err,value)=>{
        if(!err){
          const params={
          operator_code: this.userInfo.operator_code,
          old_password:encryptParam(value.formState.old_password),
          new_password:encryptParam(value.formState.new_password),
        }
         this.$store
          .dispatch("common/user/updatePwd", params)
          .then(result=>{
            console.log(result,'...xiu')
            // 为0则修改正确 跳转到登录页
            if(result.data[0].return_code ==0){
              this.$message.success('修改成功！',0.5,()=>{
                  this.$router.push("/login");
              })
            }else{
              // 修改出现错误
              // message.error('修改失败！')
              this.$message.error(result.data[0].error_info);
              // message.error(`${result.data[0].return_info}`)
            }
          })
          .catch(err=>{
            console.log(err)
          })
        }
      })
    },
    changeModel(val){
      this.changePSW=val
    }
  },
};

// ?
</script>

<style lang="scss" scoped>
.ant-layout-header {
  align-items: center;
  height: 60px;
  display: flex;
  padding: 0px;
  min-width: 800px;
  line-height: 60px;
  background: linear-gradient(90deg, #363fc8 0%, #786eff 100%);
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 99;
  .logo {
    width: 200px;
    height: 100%;
    text-align: center;
  }
  .system-name {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    font-weight: bolder;
    margin-left: 50px;
  }
  .system-time {
    color: #fff;
    margin-left: auto;
    margin-right: 40px;
    font-size: 20px;
    font-weight: bolder;
    height: 50px;
    line-height: 50px;
  }
  .login-userInfo {
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 50px;
    cursor: pointer;
    span {
      margin-left: 10px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
  ::v-deep .pswModel{
    .modal-content{
      width: 600px;
      .ant-form {
        margin: 20px 30px;
        .btnCOn{
          .ant-form-item-control-wrapper{
            text-align: center;
            .ant-btn-block{
              width: 100px;
            }
            .ant-btn-round{
              line-height: 29px;
            }
          }
        }
      }
    }
}

</style>
<style lang="scss">

.ant-message{
  z-index: 9999999999 !important;
}
.userClass{
  z-index: 9999 !important;
}
</style>
