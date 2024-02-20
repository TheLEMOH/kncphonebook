<template>
  <Table :data="data" :url="'/employees/pages'" :add="'employeeCreate'" :edit="'employeeEdit'" :filter="filter"
    @download-done="Done" @set-filter="SetFilter" @clear-filter="ClearFilter">
    <template #search-menu-header>Структура</template>
    <template #search-menu-body>
      <el-tree :data="structure" default-expand-all :props="treeProps" :expand-on-click-node="false" highlight-current
        @node-click="NodeClick"> </el-tree>
    </template>
    <template #columns>
      <el-table-column prop="room" label="Кабинет" width="80px">
        <template #header>
          <el-input v-model="filter.room" size="small" placeholder="Каб." clearable />
        </template>
      </el-table-column>
      <el-table-column label="ФИО" min-width="150">
        <template #header>
          <el-input v-model="filter.name" size="small" placeholder="ФИО" clearable />
        </template>
        <template #default="scope"> {{ scope.row.surname }} {{ scope.row.name }} {{ scope.row.patronymic }} </template>
      </el-table-column>
      <el-table-column prop="position.name" label="Должность" min-width="100px">
        <template #header>
          <el-input v-model="filter.position" size="small" placeholder="Должность" clearable />
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
      <el-table-column prop="email" label="Почта" min-width="150">
        <template #header>
          <el-input v-model="filter.email" size="small" placeholder="Почта" clearable />
        </template>
      </el-table-column>
    </template>
  </Table>
</template>

<script setup>
import Table from "./Table.vue";
import { Get } from "../../scripts/fetch";
import { ref, computed, reactive } from "vue";
import CreateStructure from "../../scripts/structure";

let filter = ref({});

const data = ref({ count: 0, rows: [] });
const structure = ref(CreateStructure(await Get("/structure?level=2")));

const treeProps = {
  label: (data) => {
    return data.shortName || data.name
  },
};

const SetFilterValue = (tree) => {
  if (tree.parent && tree.level > 1) {
    SetFilterValue(tree.parent);
  }
  const data = tree.data;
  filter.value[data.type] = data.shortName || data.name;
};

const NodeClick = (event, tree) => {
  filter.value = { page: filter.value.page };
  SetFilterValue(tree);
};

const Done = (e) => {
  data.value = e
}

const SetFilter = (e) => {
  if (e.page)
    filter.value = e
}

const ClearFilter = () => {
  filter.value = {}
}

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
