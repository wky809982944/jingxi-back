<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <img src="@/static/img/logo.png" alt="">
      </div>
      <div class="login-title">
        商家注册
      </div>
      <el-form
        class="login-form"
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        label-width="65px">
        <el-form-item prop="shopName" label="店铺名">
          <el-input
            placeholder="店铺名"
            prefix-icon="el-icon-s-shop"
            v-model="registerForm.shopName"
          />
        </el-form-item>
        <el-form-item prop="loginName" label="登录名">
          <el-input
            placeholder="登录名"
            prefix-icon="el-icon-user-solid"
            v-model="registerForm.loginName"
          />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            placeholder="密码"
            prefix-icon="el-icon-lock"
            type="password"
            v-model="registerForm.password"
          />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input
            placeholder="邮箱地址"
            prefix-icon="el-icon-s-promotion"
            v-model="registerForm.email"
          />
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="register">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="商家注册提示"
      :visible.sync="regTipDialogVisible"
      width="30%"
      top="30vh"
      >
      <span>尊敬的商家您好，当您填写完信息并且提交后，我们需要对您提供的信息进行审核，所以请您务必填写正确的邮箱地址，以便于审核通过时，能及时通知您，感谢您的配合。</span>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="regTipDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="注册成功"
      :visible.sync="regSuccessDialogVisible"
      width="30%"
      top="30vh"
    >
      <span>恭喜您注册成功，我们将尽快对您的信息进行审核，请您注意查收邮件。</span>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeRegSuccessDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { register } from '@/api/shop';

export default {
  data() {
    const checkEmail = (rule, value, callback) => {
      const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (regEmail.test(value)) {
        return callback();
      }
      return callback(new Error('请输入正确的邮箱地址'));
    };
    return {
      regTipDialogVisible: true,
      regSuccessDialogVisible: false,
      registerForm: {
        shopName: '',
        loginName: '',
        password: '',
        email: '',
      },
      registerRules: {
        shopName: [
          { required: true, message: '请输入店铺名', trigger: 'blur' },
          {
            min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur',
          },
        ],
        loginName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          {
            min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    register() {
      this.$refs.registerFormRef.validate((valid) => {
        if (valid) {
          register(this.registerForm).then((res) => {
            if (res.code === 2000) {
              this.regSuccessDialogVisible = true;
            }
          });
        }
      });
    },
    closeRegSuccessDialog() {
      this.regSuccessDialogVisible = false;
      this.$router.replace('/login');
    },
  },
};
</script>

<style lang="less" scoped>
.login-container{
  background-color: #f4f4f4;
  width: 100vw;
  height: 100vh;
  .login-box{
    width: 450px;
    height: 470px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 1px 1px rgba(0,0,0,.05);
    .avatar-box{
      width: 110px;
      height: 110px;
      border: 1px solid #eee;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 10px;
      background-color: #fff;
      box-shadow: 0 0 10px #ddd;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .login-form{
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .btn{
        text-align: center;
        .el-button{
          width: 100%;
        }
      }
      .link{
        padding-bottom: 20px;
        text-align: center;
      }
    }
    .login-title{
      width: 100%;
      text-align: center;
      color: #333;
      position: absolute;
      top: 85px;
      font-size: 25px;
    }
  }
}
.el-button--primary{
  background-color: #F53415;
  border-color: #F53415;
}
/deep/.el-input__inner:focus {
  border-color: #27ae60;
  outline: 0;
}
.reg-lk{
  color: #F53415;
  position: relative;
  &:hover:after{
    content: '';
    display: block;
    width: 96%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #e4393c;
  }
}
</style>
