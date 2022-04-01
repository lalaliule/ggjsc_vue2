<template>
  <div class="login-wraper">
    <div>
      <div class="logo-left"></div>
      <div class="logo-right">
        <div class="login-title"></div>
        <div class="name">用户登录</div>
        <a-form
          labelAlign="left"
          ref="formRef"
          :form="form"   
          @submit="onSubmit"       
        >
          <a-form-item v-bind="formItemLayout">
            <a-input
              placeholder="请输入用户名"
              autocomplete="off"
              v-decorator="['formState.operator_code',{rules:[{required:true,message:'用户名不能为空'}]}]"
            >
              <a-icon slot="prefix" type="user" style="color: #fff"></a-icon>
            </a-input>
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <!-- :allowClear="true" -->
            <a-input
            type="password"
            placeholder="请输入密码"
            class="pswClass"
            v-decorator="['formState.password',{rules:[{required:true,message:'密码不能为空'}]}]"
            >
             <a-icon slot="prefix" type="lock" style="color: #fff"></a-icon>
             <a-icon slot="suffix" type="close-circle" style="color: #fff" @click="claerPsw"></a-icon>
            </a-input>
          </a-form-item>
          <a-form-item name="type" class="forgetCon" v-bind="formItemLayout">
            <a-checkbox
              @change="onChnage"
              style="color: #fff"
              v-decorator="['formState.checked',{valuePropName:'checked',initialValue:formState.checked}]"
            >
              记住用户名
            </a-checkbox>
            <!-- <a href="javascript:;" @click="showForgetModal">忘记密码?</a> -->
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 18, offset: 3 }">
            <a-button
              type="primary"
              block
              shape="round"
              html-type="submit"
              :loading="isLoading"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
      <!-- 忘记密码 -->
  <model-page :modelValue="forgetState.forgetModal" @changeModel="changeModel" title="忘记密码" class="pswModel">
     <a-form
      ref="forgetRef"
      :form="forgetForm"
      labelAlign="right"
      autocomplete="off"
      @submit="forgetSubmit"  
     >
        <a-form-item label="用户名" v-bind="theLayout">
          <a-input
           v-decorator="['forgetState.userName',{rules:[{required:true,message:'用户名不能为空'}]}]"
          autocomplete="off" placeholder="请输入用户名"></a-input>
        </a-form-item>
        <a-form-item label="验证码" class="veriCode"  v-bind="theLayout">
          <a-input
           v-decorator="['forgetState.veriCode',{rules:[{required:true,message:'验证码不能为空'}]}]"
           placeholder="请输入验证码，区分大小写"></a-input>
          <a-button type="primary" size="default" @click.prevent="sendCode" :disabled="forgetState.isAgain">{{forgetState.sendText}}</a-button>
        </a-form-item>
        <a-form-item label="新密码" v-bind="theLayout">
          <a-input
           v-decorator="['forgetState.new_password',{rules:[{required:true,message:'新密码不能为空'},{validator:validateNewPassword}]}]"
           placeholder="请输入包含大写、小写、数字和特殊字符，不低于12位的密码" type="password" autocomplete="new-password"></a-input>
        </a-form-item>
        <a-form-item label="确认密码" v-bind="theLayout">
          <a-input
           v-decorator="['forgetState.check_password',{rules:[{required:true,message:'确认密码不能为空'},{validator:validateCheckPassword}]}]"
           placeholder="请确认密码" type="password" autocomplete="new-password"></a-input>
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
import { useStore } from 'vuex'
import { encryptParam } from "@/utils/encryption";
import { message } from "ant-design-vue";

export default {
  data(){
    return {
      isLoading:false,
      formItemLayout:{
        labelCol:{span: 4,offset:2},
        wrapperCol:{span: 20,offset:2},
      },
      formState:{
        operator_code: "",
        password: "",
        checked: false,
      },
      form:this.$form.createForm(this,{name:'normal-login'}),
      forgetState:{
        forgetModal:false,
        userName:'',
        veriCode:'',
        new_password:'',
        check_password:'',
        isAgain:false,
        sendText:'获取验证码',
        inteval:0,
        times:60,
      },
      theLayout:{
        labelCol:{span: 4},
        wrapperCol:{span: 20},
      },
      forgetForm:this.$form.createForm(this,{name:'forget-form'}),

    }
  },
  mounted(){
    // 获取表单的值
    this.keyEnter();
    if (localStorage.getItem("operator_code")) {
      this.form.setFieldsValue({
        'formState.checked':true,
        'formState.operator_code':localStorage.getItem("operator_code")
      })
    }
  },
  watch:{
    'formState.operator_code':{
      handler(newValue){
        // console.log(newValue,'..newValue')
        if (newValue === "") {
          this.formState.checked = false;
        }
      },
      deep:true
    }
  },
  methods:{
    // 用户名自定义规则
    validateUsername(rule, value,callback){
      if (value === "") {
        callback("用户名不能为空");
      } else {
        callback();
      }
    },
    // 密码自定义规则
    validatePassword(rule, value,callback){
      if (value === "") {
        callback("密码不能为空");
      } else {
        callback();
      }
    },
    // 记住用户名操作
    onChnage(e){
      let objVal=this.form.getFieldsValue()
      if (e.target.checked && objVal.formState.operator_code !== "") {
        localStorage.setItem("operator_code", objVal.formState.operator_code);
      } else {
        localStorage.removeItem("operator_code");
      }
    },
    // enter按键登录
    keyEnter(){
      document.onkeydown = (e) => {
        if (e.keyCode === 13 && e.target.baseURI.includes("login")) {
          this.onSubmit(e);
        }
      };
    },
    onSubmit(e){
      e.preventDefault();
      this.form.validateFields((err,value)=>{
        if(!err){
          const params = {
            operator_code: value.formState.operator_code,
            password: encryptParam(value.formState.password),
          };
          this.$store
          .dispatch("common/user/doLogin2", params)
          .then(async (rst) => {
            this.isLoading = true
            if (rst.data.length > 0 && rst.data[0].return_code !== "-1") {
              // console.log(rst,'dengl')
              // debugger
              this.$store.commit(
                "common/user/SET_TOKEN",
                rst.data[0].user_token
              );
              this.$store.commit("common/user/SET_USER_INFO", rst.data[0]);
              const paramsMenus = {
                operator_code: value.formState.operator_code,
                user_token: rst.data[0].user_token,
              };
              this.$store
                .dispatch("common/user/getUserAuthMenus", paramsMenus)
                .then(async (result) => {
                  if(result.data.length>0){
                  let resData=result.data.filter(el=>el.id=='cockpit')
                  if(resData.length<=0){
                    message.warning("您暂无权限使用本系统", 0.5, () => {
                        this.isLoading = false;
                      });
                      return
                  }
                  this.$store.commit(
                    "common/user/SET_ALL_CURRENT_MENU",
                    resData
                  );
                  localStorage.setItem('myMenus',JSON.stringify(resData))
                  //跳转路由
                  const goRedirectPath = this.$route.query.redirect
                    ? this.$route.query.redirect: `${resData[0].children[0].url}`
                    message.success("登录成功！", 0.5, () => {
                        this.$router.push(goRedirectPath);
                        this.isLoading = false;
                      });
                  }else{
                    message.warning("您暂无权限使用本系统", 0.5, () => {
                        this.isLoading = false;
                      });
                  }
                  
                });
            } else {
              message.error(rst.data[0].error_info);
              this.isLoading = false;
            }
          })
          .catch((error) => {
            this.isLoading = false;
          });
        }
      })
    },
    showForgetModal(){
      this.forgetState.forgetModal=true
    },
    changeModel(val){
      this.forgetState.forgetModal=val
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
      const form=this.forgetForm
      if(value&&value!=form.getFieldValue('forgetState.new_password')){
       callback("确认密码与新密码不一致");
      } else {
        callback();
      }
    },
    sendCode(){
      // 请求接口 发送成功 倒计时 禁止点击
      let userName=this.forgetForm.getFieldValue('forgetState.userName')
       if(userName){
         const params={
           operator_code:userName
         }
         this.$store
          .dispatch("common/user/sendCode", params)
          .then(res=>{
            if(res.ret_code==0){
                this.$message.success(res.ret_msg)
                // this.$message.success('发送成功')
                this.forgetState.isAgain=true
                this.loadingCode()
            }else{
              this.$message.error(res.ret_msg)
            }
          })
       }else{
         this.$message.error('用户名不能为空')
       }
    },
    loadingCode(){
      this.forgetState.inteval=setInterval(()=>{
        if(this.forgetState.times>0){
          this.forgetState.times--
          this.forgetState.sendText=`重新获取(${this.forgetState.times})`
        }else{
          clearInterval(this.forgetState.inteval)
          this.forgetState.sendText='获取验证码'
          this.forgetState.times=60
          this.forgetState.isAgain=false
        }
      },1000)
    },
    forgetSubmit(e){
      e.preventDefault();
      this.forgetForm.validateFields((err,value)=>{
        if(!err){
          const params={
            operator_code:value.forgetState.userName,
            password:encryptParam(value.forgetState.new_password),
            sms:value.forgetState.veriCode,
          }
          this.$store
          .dispatch("common/user/resetPwd", params)
          .then(res=>{
            if(res.ret_code==0){
              this.$message.success('密码修改成功！')
              this.forgetState.forgetModal=false
            }else{
              this.$message.error(res.ret_msg)
            }
          })
        }
      })
    },
    claerPsw(){
      // 点击清除按钮 内容置空并执行校验
      this.form.setFieldsValue({'formState.password':''})
      this.form.validateFields(err=>{})
    }
  },
};
// ;
</script>

<style lang="scss" scoped>
.login-wraper {
  width: 100%;
  height: 100%;
  background: url("../../assets/imgs/login.png") no-repeat;
  position: relative;
  min-width: 1200px;
  position: fixed;
  .logo-left {
    width: 445px;
    height: 462px;
    background: url("../../assets/imgs/chahua.png") no-repeat;
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translateY(-50%);
  }
  .logo-right {
    width: 488px;
    height: 506px;
    background: url("../../assets/imgs/login-bg.png") no-repeat;
    position: absolute;
    top: 50%;
    right: 20%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      text-align: center;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bolder;
      letter-spacing: 3px;
      color: #ffffff;
      margin-bottom: 30px;
    }
    .login-title {
      width: 284px;
      height: 38px;
      background: url("../../assets/imgs/login-title.png") no-repeat;
      position: absolute;
      top: -70px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
::v-deep .pswModel{
  .modal-content{
    width: 600px;
    .ant-form-item-required{
      color: #333;
    }
    .ant-input{
      color: #333;
      border: 1px solid #d9d9d9; 
      border-radius: 4px;
    }
    .ant-input:focus{
      box-shadow: none;
    }
    .ant-form label{
      font-size: 16px;
    }
    .ant-btn{
      height: 38px;
    }
    .veriCode{
      .ant-input{
      margin-right: 20px;
    }
      .ant-form-item-children{
        display: flex;
        justify-content: space-between;
      }
    }
    .btnCOn{
      .ant-form-item-control{
        text-align: center;
      }
      .ant-btn{
        width: 100px;
      }
    }
    .ant-btn-primary[disabled]{
      background-color: #1890ff;
    }
  }
}
</style>

<style lang="scss">
.login-wraper {
  .ant-form {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .ant-form-item-label label,
  .ant-form-item-children span {
    color: #fff;
  }
  .ant-btn-round {
    height: 40px;
    font-size: 16px;
  }
  .ant-input {
    background: transparent !important;
    border: 0;
    -webkit-appearance: none;
    border-radius: 15px;
    // padding: 12px 5px 12px 20px;
    height: 40px !important;
    line-height: 19px;
    color: #fff;
    font-size: 16px;
  }
  .ant-input-prefix{
    transform: translateY(-38%);
  }
  .ant-input-affix-wrapper {
    background: rgba(101, 172, 255, 0.2) !important;
    border-radius: 21px;
    border: 1px solid rgba(135, 231, 255, 0.25);
  }
  .pswClass{
    .ant-input-clear-icon{
    color: #fff;
    }
    .ant-input-clear-icon:hover{
    color: #fff;
    }
  }
  
}
.forgetCon{
  .ant-form-item-children{
    display: flex;
    justify-content: space-between;
    color: #fff;
    a{
      color:#fff;
    }
  }
}
.veriCode{
  .ant-form-item-control-input-content{
    display: flex;
    .ant-input{
      margin-right: 20px;
    }

  }
}
</style>
