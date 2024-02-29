<template>
  <Table
    :data="data"
    :url="'/employees/pages'"
    :add="'employeeCreate'"
    :edit="'employeeEdit'"
    :filter="filter"
    @download-done="Done"
    @set-filter="SetFilter"
    @clear-filter="ClearFilter"
    @change-sort="SearchByLevel"
    @open-dialog="visible = true"
    @add-objects="AddObject"
  >
    <template #search-menu-header>Структура</template>
    <template #search-menu-body>
      <el-tree :data="structure" default-expand-all :props="treeProps" :expand-on-click-node="false" highlight-current @node-click="NodeClick"> </el-tree>
    </template>
    <template #columns>
      <el-table-column type="selection" width="30px" v-if="client" />
      <el-table-column prop="room" label="Кабинет" width="80px">
        <template #header>
          <el-input v-model="filter.room" size="small" placeholder="Каб." clearable />
        </template>
      </el-table-column>
      <el-table-column label="ФИО" width="200px">
        <template #header>
          <el-input v-model="filter.name" size="small" placeholder="ФИО" clearable />
        </template>
        <template #default="scope"> {{ scope.row.surname }} {{ scope.row.name }} {{ scope.row.patronymic }} </template>
      </el-table-column>
      <el-table-column prop="position.name" label="Должность" width="150px">
        <template #header>
          <el-input v-model="filter.position" size="small" placeholder="Должность" clearable />
        </template>
        <template #default="scope">
          {{ scope.row.position.name }}
          <template v-if="scope.row.individual.degree">
            <p>{{ scope.row.individual.degree.name }}</p>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="employment.name" label="Вид занятости" width="140px">
        <template #header>
          <el-input v-model="filter.employment" size="small" placeholder="Вид занятости" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="organization.shortName" label="Организация" width="125px">
        <template #header>
          <el-input v-model="filter.organization" size="small" placeholder="Организация" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="division.name" label="Структ. подразделение">
        <template #header>
          <el-input v-model="filter.division" size="small" placeholder="Структ. подразделение" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="subdivision.name" label="Подразделение">
        <template #header>
          <el-input v-model="filter.subdivision" size="small" placeholder="Подразделение" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="Рабочий тел." width="115px">
        <template #header>
          <el-input v-model="filter.phone" size="small" placeholder="Рабочий тел." clearable />
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Почта" width="200px">
        <template #header>
          <el-input v-model="filter.email" size="small" placeholder="Почта" clearable />
        </template>
      </el-table-column>
    </template>
  </Table>

  <EmployeeModal :data="objectsForBulkUpdate" :visible="visible" @close="visible = false" @delete-object="DeleteObject" @done="DoneUpdate"></EmployeeModal>
</template>

<script setup>
import Table from "./Table.vue";
import { Get } from "../../scripts/fetch";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import EmployeeModal from "../Modals/Employee.vue";
import CreateStructure from "../../scripts/structure";

import Filter from "./scripts/filter";
import Data from "./scripts/data";

const { filter, SetFilter, ClearFilter } = Filter();
const { data, treeProps, Done } = Data();

const emits = defineEmits(["open-dialog", "add-objects"]);

const store = useStore();

const visible = ref(false);
const objectsForBulkUpdate = ref([]);

const client = computed(() => store.getters.client);

const structure = ref(CreateStructure(await Get("/structure?level=2")));

const SetFilterValue = (tree) => {
  if (tree.parent && tree.level > 1) {
    SetFilterValue(tree.parent);
  }
  const data = tree.data;
  filter.value[data.type] = data.shortName || data.name;
};

const SearchByLevel = async (byLevel = false) => {
  filter.value.byLevel = byLevel;
};

const NodeClick = (event, tree) => {
  filter.value = { page: filter.value.page };
  SetFilterValue(tree);
};

const AddObject = (e) => {
  e.forEach((newElement) => {
    const index = objectsForBulkUpdate.value.findIndex((element) => element.id == newElement.id);

    if (index == -1) {
      objectsForBulkUpdate.value.push(newElement);
    }
  });
};

const DeleteObject = (id) => {
  const index = objectsForBulkUpdate.value.findIndex((element) => element.id == id);

  objectsForBulkUpdate.value.splice(index, 1);
};

const DoneUpdate = () => {
  filter.value = {};
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
