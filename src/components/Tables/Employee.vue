<template>
  <Table :data="data" :add="'employeeCreate'" :edit="'employeeEdit'" @change-page="SearchGet" @change-sort="SearchByLevel">
    <template #search-menu-header>Структура</template>
    <template #search-menu-body>
      <el-tree :data="structure" default-expand-all :props="treeProps" :expand-on-click-node="false" highlight-current @node-click="NodeClick"> </el-tree>
    </template>
    <template #columns>
      <el-table-column prop="room" label="Кабинет" width="80px">
        <template #header>
          <el-input v-model="filter.room" size="small" placeholder="Каб." @input="SearchChange" clearable />
        </template>
      </el-table-column>
      <el-table-column label="ФИО" min-width="150">
        <template #header>
          <el-input v-model="filter.name" size="small" placeholder="ФИО" @input="SearchChange" clearable />
        </template>
        <template #default="scope"> {{ scope.row.surname }} {{ scope.row.name }} {{ scope.row.patronymic }} </template>
      </el-table-column>
      <el-table-column prop="position.name" label="Должность" min-width="100px">
        <template #header>
          <el-input v-model="filter.position" size="small" placeholder="Должность" @input="SearchChange" clearable />
        </template>
        <template #default="scope">
          {{ scope.row.position.name }}
          <template v-if="scope.row.degree">
            <p>{{ scope.row.degree.name }}</p>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="organization.shortName" label="Организация" width="125px">
        <template #header>
          <el-input v-model="filter.organization" size="small" placeholder="Организация" @input="SearchChange" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="division.name" label="Структ. подразделение">
        <template #header>
          <el-input v-model="filter.division" size="small" placeholder="Структ. подразделение" @input="SearchChange" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="subdivision.name" label="Подразделение">
        <template #header>
          <el-input v-model="filter.subdivision" size="small" placeholder="Подразделение" @input="SearchChange" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="Рабочий тел." width="115px">
        <template #header>
          <el-input v-model="filter.phone" size="small" placeholder="Рабочий тел." @input="SearchChange" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Почта" min-width="150">
        <template #header>
          <el-input v-model="filter.email" size="small" placeholder="Почта" @input="SearchChange" clearable />
        </template>
      </el-table-column>
    </template>
  </Table>
</template>

<script setup>
import Table from "./Table.vue";
import { Get } from "../../scripts/fetch";
import { ref, computed, reactive } from "vue";
import debounce from "../../scripts/debounce";
import CreateStructere from "../../scripts/structure";

let filter = ref({});

const data = ref(await Get(`/employees/pages`));
const structure = ref(CreateStructere(await Get("/structure?level=2")));

const treeProps = {
  label: "name",
};

const SetFilterValue = (tree) => {
  if (tree.parent && tree.level > 1) {
    SetFilterValue(tree.parent);
  }
  const data = tree.data;
  filter.value[data.type] = data.name;
};

const NodeClick = (event, tree) => {
  filter.value = {};
  SetFilterValue(tree);
  SearchGet();
};

const SearchGet = async (page = 1) => {
  filter.value.page = page;
  const searchParams = new URLSearchParams(filter.value).toString();
  const res = await Get(`/employees/pages?${searchParams}`);
  data.value = res;
};

const SearchByLevel = async (byLevel = false) => {
  filter.value.page = 1;
  filter.value.byLevel = byLevel;
  const searchParams = new URLSearchParams(filter.value).toString();
  const res = await Get(`/employees/pages?${searchParams}`);
  data.value = res;
};

const SearchChange = debounce(() => SearchGet());
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
