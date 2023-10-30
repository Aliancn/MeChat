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
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {userStore} from "../store/index.js";
import router from "../router/index.js";

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
          // 在这里处理登录逻辑
          if (this.loginCheck(this.loginForm)) {
            // this.getUser();
            console.log(this.getUser)
            router.push('/chat')
            alert('登录成功');
          }
        } else {
          return false;
        }
      });
    },
    loginCheck(loginForm) {
      console.log(loginForm,'\n',"this is in loginCheck");
      const user ={
        id: loginForm.id,
        password: loginForm.password,
        name : "jerry",
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }
      this.store.setUser(user);
      return true;
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
