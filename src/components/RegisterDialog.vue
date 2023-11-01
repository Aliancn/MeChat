<template>
  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form
        ref="ruleFormRef"
        :model="RegisterForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="username" prop="username">
        <el-input v-model="RegisterForm.username" type="password" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input
            v-model="RegisterForm.password"
            type="password"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit
        </el-button
        >
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'

const dialogFormVisible = ref(false)


const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (RegisterForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== RegisterForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const RegisterForm = reactive({
  password: '',
  username: '',
})

const rules = reactive<FormRules<typeof RegisterForm>>({
  pass: [{validator: validatePass, trigger: 'blur'}],
  checkPass: [{validator: validatePass2, trigger: 'blur'}],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>