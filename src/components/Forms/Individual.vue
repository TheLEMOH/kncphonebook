<template>
  <Form :form="form" :url="url" :rules="rules" :redirect="'individualAll'">
    <template #fields>
      <el-form-item label="ФИО" prop="name">
        <el-input v-model="form.name" maxlength="100" show-word-limit />
      </el-form-item>
      <el-form-item label="Организация" prop="organizationId">
        <el-select v-model="form.organizationId" filterable placeholder="Выберите организацию">
          <el-option v-for="org in organizations" :key="org.id" :label="org.shortName" :value="org.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Ученая степень">
        <el-select v-model="form.degreeId" filterable placeholder="Выберите степень">
          <el-option v-for="degree in degrees" :key="degree.id" :label="degree.name" :value="degree.id" />
        </el-select>
      </el-form-item>
    </template>
  </Form>
</template>

<script setup>
import Form from "./Form.vue";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { Get } from "../../scripts/fetch";

const rules = reactive({
  name: [{ required: true, message: "Введите ФИО", trigger: "blur" }],
});

const url = "/individuals";

const route = useRoute();

const organizations = await Get(`/organizations`);
const degrees = await Get(`/degrees`);

const id = route.params.id;

const dialogVisible = ref(false);

let form = reactive({});

if (id) {
  form = reactive(await Get(`/${url}/${id}`));
}
</script>
