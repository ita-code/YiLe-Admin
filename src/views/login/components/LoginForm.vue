<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="密码：123456" show-password autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> 重置 </el-button>
    <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login(loginFormRef)">
      登录
    </el-button>
  </div>
  <div class="test" v-if="['development', 'production'].includes(env.VITE_USER_NODE_ENV)">
    <el-divider content-position="center">演示账号一键登录</el-divider>
    <el-tag effect="plain" class="ml2 mr2" v-for="item in TEST_ACCOUNT" :key="item.username" @click="getUserLogin(item)">
      {{ item.username }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { ElNotification } from "element-plus";
import { Login } from "@/api/interface";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
const env = import.meta.env;
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive<Login.ReqLoginForm>({
  username: "",
  password: ""
});

import { useUserStore } from "@/stores/modules/user";
const userStore = useUserStore();
import { useRouter } from "vue-router";
const router = useRouter();
import { HOME_URL, TEST_ACCOUNT } from "@/config";
import { getTimeState } from "@/utils";
// 登录
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    await getUserLogin(loginForm);
  });
};
const getUserLogin = async (loginForm: Login.ReqLoginForm) => {
  try {
    loading.value = true;
    await userStore.UserLogin(loginForm);
    router.push(HOME_URL);
    ElNotification({
      title: getTimeState(),
      message: `欢迎登录 ${loginForm.username}`,
      type: "success",
      duration: 3000
    });
    loading.value = false;
  } finally {
    loading.value = false;
  }
};
// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

onMounted(() => {
  // 监听 enter 事件（调用登录）
  document.onkeydown = (e: KeyboardEvent) => {
    e = (window.event as KeyboardEvent) || e;
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return;
      login(loginFormRef.value);
    }
  };
});
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
