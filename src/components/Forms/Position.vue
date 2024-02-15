<template>
  <Form :form="form" :url="url" :rules="rules" :redirect="'positionAll'">
    <template #fields>
      <el-form-item label="Наименование" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-space fill>
        <el-alert type="info" show-icon :closable="false">
          <p>Уровень сортировки заполняется автоматические. Значение по-умолчанию: 0</p>
        </el-alert>
        <el-form-item label="Уровень сортировки" prop="levelSort">
          <el-input-number v-model="form.levelSort" />
        </el-form-item>
      </el-space>
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
  levelSort: [{ type: 'number', message: "Уровень сортировки должнен быть числом" }, { required: true, message: 'Введите уровень сортировки' },]
});

const url = "/positions";

let form = reactive({
  levelSort: 0,
});

if (id) {
  form = reactive(await Get(`/${url}/${id}`));
}
</script>
