<template>
  <div class="app-wrap">
    <el-form class="demo-ruleForm login-container"
             v-if="isLogin"
             ref="AccountForm"
             :model="account"
             :rules="rules"
             label-position="left"
             label-width="0px">
      <h3 class="title">欢迎登录</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="account.username"
                  auto-complete="off"
                  @keyup.enter.native="validateForm"
                  placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password"
                  v-model="account.pwd"
                  :autofocus="pwdFocus"
                  auto-complete="off"
                  @keyup.enter.native="validateForm"
                  placeholder="请输入登录密码"></el-input>
      </el-form-item>
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <el-form-item class="extra-text">
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"
                   style="width:100%;"
                   @click.native.prevent="validateForm"
                   :loading="loading">登录
        </el-button>
      </el-form-item>
    </el-form>
    <div class="footer">
      <footer-copyright></footer-copyright>
    </div>
  </div>
</template>
<script>
  import {Base64} from 'js-base64';
  import {setToken, setUserInfo} from "@/utils/index";
  import {rest_s} from "../http";

  export default {
    data() {
      return {
        loading: false,
        account: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [
            {required: true, message: '请填写用户名', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: '请填写密码', trigger: 'blur'},
          ]
        },
        pwdFocus: false,
        isLogin: true,
        checked: true
      };
    },
    created() {
      let reg_user = JSON.parse(window.localStorage.getItem('register-user'));
      if (reg_user) {
        this.account.username = reg_user.username;
        this.account.pwd = '';
        this.pwdFocus = true;
      }
    },
    methods: {
      async handleLogin() {
        this.loading = true;
        const data = {
          password: this.account.pwd,
          userName: this.account.username,
          rememberMe: 0
        }
        const resp = await this.$axios.post(`${rest_s}/specialReport/login`, data);
        if (resp.errcode === '0') {
          setToken(resp.data);
          this.$router.push('/');
        } else {
          this.$message.error('账号或密码错误');
        }
        this.loading = false;
      },
      validateForm() {
        this.$refs["AccountForm"].validate((valid) => {
          if (valid) {
            this.handleLogin()
          } else {
            return false;
          }
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
  .app-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("~@/assets/images/bg.png");
    background-size: cover;
    background-repeat: no-repeat;
  }

  .header-content {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    padding: 6px 0;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 0 2px #ddd;

    .logo-part {
      margin-left: 10px;
      font-size: 18px;
      color: #999;

      img {
        vertical-align: middle;
      }
    }
  }

  .login-container {
    width: 350px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cac6c6;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    background: #fff;
    background-clip: padding-box;
    background: -ms-linear-gradient(top, #ace, #00c1de); /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00c1de); /*火狐*/
    background: -webkit-gradient(
        linear,
        0% 0%,
        0% 100%,
        from(#ace),
        to(#00c1de)
    ); /*谷歌*/
    background: -webkit-linear-gradient(
        top,
        #ace,
        #00c1de
    ); /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top, #ace, #00c1de); /*Opera 11.10+*/
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }

    .remember {
      margin: 0px 0px 35px 0px;
    }

    .extra-text {
      position: relative;
      margin-bottom: 0;
      padding-left: 2px;
    }

    .extra-text a {
      font-size: 12px;
      color: #aaa;
    }

    .extra-text a:hover {
      color: #29e;
    }

    .extra-text .reg-text {
      position: absolute;
      top: 4px;
      right: 2px;
    }
  }
</style>
