<template>
  <Form :form="form" :url="url" :rules="rules">
    <template #fields>
      <el-form-item label="Имя пользователя" prop="name">
        <el-input v-model="form.name" maxlength="100" show-word-limit />
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input v-model="form.password" type="password" show-password maxlength="100" show-word-limit />
      </el-form-item>
    </template>

    <template #buttons>
      <el-button type="primary" @click="Login">Войти</el-button>
    </template>
  </Form>
</template>

<script setup>
import Form from "./Form.vue";
import { reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const rules = reactive({
  name: [{ required: true, message: "Введите имя", trigger: "blur" }],
});

const url = "/login";

let form = reactive({});

const Login = async () => {
  store.dispatch("Login", form);
};
</script>
