<template>
  <Form :form="form" :url="url" :rules="rules" :redirect="'positionAll'">
    <template #fields>
      <el-form-item label="Наименование" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Уровень сортировки" prop="levelSort">
        <el-input-number v-model="form.levelSort" />
      </el-form-item>
    </template>
  </Form>
</template>

<script setup>
import Form from "./Form.vue";
import { useRoute } from "vue-router";
import { reactive } from "vue";
import { Get } from "../../scripts/fetch";

const route = useRoute();

const id = route.params.id;

const rules = reactive({
  name: [{ required: true, message: "Введите наименование", trigger: "blur" }],
});

const url = "/positions";

let form = reactive({
  levelSort: 0,
});

if (id) {
  form = reactive(await Get(`/${url}/${id}`));
}
</script>
