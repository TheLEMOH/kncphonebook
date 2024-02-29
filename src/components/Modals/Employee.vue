<template>
  <Modal :data="data" :visible="visible" :title="'Редактирование сотрудников'" :url="'/employees'" :form="form" @close="emits('close')">
    <template #body>
      <el-space alignment="start">
        <el-table :data="data">
          <el-table-column prop="name" label="ФИО" width="250" />
          <el-table-column>
            <template #default="scope">
              <el-button type="danger" circle text @click="emits('delete-object', scope.row.id)">
                <el-icon>
                  <Delete />
                </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form ref="formRef" label-width="220px" label-position="top" class="spacer-border">
          <el-form-item label="Организация" prop="organizationId">
            <el-select v-model="form.organizationId" filterable placeholder="Выберите организацию" @change="SelectOrg">
              <el-option v-for="org in organizations" :key="org.id" :label="org.shortName" :value="org.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="Подразделение" prop="subdivisionId">
            <el-select v-model="form.subdivisionId" filterable placeholder="Выберите подразделение" @change="SelectSubdivision">
              <el-option-group v-for="group in divisions" :key="group.id" :label="group.name">
                <el-option v-for="item in group.subdivisions" :key="item.id" :label="item.name" :value="item.id" />
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="Должность" prop="position">
            <el-select v-model="form.positionId" filterable placeholder="Выберите должность" @change="SelectPosition">
              <el-option v-for="item in positions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="Вид занятости" prop="employment">
            <el-select v-model="form.employmentId" filterable placeholder="Выберите вид занятости">
              <el-option v-for="item in employments" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="Рабочий телефон">
            <el-input v-model="form.phone" maxlength="100" show-word-limit />
          </el-form-item>
          <el-form-item label="Адрес" prop="address">
            <el-input v-model="form.address" maxlength="100" show-word-limit />
          </el-form-item>
          <el-form-item label="Этаж" prop="floor">
            <el-input v-model="form.floor" maxlength="100" show-word-limit />
          </el-form-item>
          <el-form-item label="Кабинет" prop="room">
            <el-input v-model="form.room" maxlength="100" show-word-limit />
          </el-form-item>
          <el-form-item label="Уровень сортировки" prop="levelSort">
            <el-input-number v-model="form.levelSort" />
          </el-form-item>
        </el-form>
      </el-space>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import Modal from "./Modal.vue";
import { Get } from "../../scripts/fetch";
import { Delete } from "@element-plus/icons-vue";

const props = defineProps({
  title: {
    default: "Модальное окно",
    type: String,
  },

  visible: {
    default: false,
    type: Boolean,
  },

  data: {
    default: [],
    type: Array,
  },
});

const emits = defineEmits(["close", "delete-object"]);

const form = ref({});
const structure = ref([]);

const organizations = await Get(`/organizations`);
const positions = await Get(`/positions`);
const employments = await Get(`/employments`);
const divisions = ref([]);

const SelectSubdivision = (id) => {
  let division = null;
  structure.value[0].divisions.forEach((d) => {
    const subIndex = d.subdivisions.findIndex((s) => s.id == id);
    if (subIndex != -1) division = d;
  });

  form.value.divisionId = division.id;
};

const SelectOrg = async (id) => {
  const org = organizations.find((d) => d.id == id);
  structure.value = await Get(`/structure?level=2&id=${id}`);
  divisions.value = structure.value[0].divisions;

  form.value.subdivisionId = null;
  form.value.address = org.address;
};

const SelectPosition = async (id) => {
  const position = positions.find((d) => d.id == id);

  form.value.levelSort = Number(position.levelSort);
};
</script>

<style>
.spacer-border {
  border-left: 1px solid #ccc;
  padding-left: 1rem;
}
</style>
