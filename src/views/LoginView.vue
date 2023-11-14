<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <h3>登录</h3>
      <el-form ref="loginForm" :model="loginForm" label-width="80px">
        <el-form-item label="用户名" prop="username" :rules="usernameRules">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="passwordRules">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">登录</el-button>
          <el-button type="primary" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {userStore} from "../store/index.js";
import router from "../router/index.js";
import axios from 'axios'
import {API_TEMP_TEST, API_URL_DEV_LOGIN, API_URL_LOGIN} from "@/utils/api.js";
import {GetItemWithExpiration, SetItemWithExpiration} from "@/utils/localstorage.js";
export default {
  setup(){
    const store = userStore()
    return{
      store
    }
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        remember: false
      },
      usernameRules: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        // 在这里可以添加更多的校验规则
      ],
      passwordRules: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        // 在这里可以添加更多的校验规则
      ]
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginCheck(this.loginForm).then(res => {
            console.log("res", res)
            if (res) {
              router.push({path: '/home'});
            }
          }).catch(err => {
            console.log("login fail" ,err);
          });
        }
      });
    },
    async loginCheck(loginForm) {
      try{
        // console.log(loginForm,"this is in loginCheck");
        const response = await axios.post(API_URL_DEV_LOGIN,{
          username : loginForm.username,
          password : loginForm.password,
        });
        console.log(response);
        if (response.status === 200){
          this.store.setUser({
            id : response.data.id,
            name: response.data.username,
            token: response.data.token,
            avatar : response.data.avatar,
          });
          return true;
        }
        else return false ;
      } catch (error){
        throw error;
      }
    },
    handleRegister(){

    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 400px;
  padding: 20px;
  text-align: center;
}
</style>
