<template>
  <Table :data="data" :add="'individualCreate'" :edit="'individualEdit'" :url="'/individuals/pages'" :filter="filter"
    @download-done="Done" @set-filter="SetFilter" :structure="true" @clear-filter="ClearFilter">
    <template #search-menu-header>Структура</template>
    <template #search-menu-body>
      <el-tree :data="structure" default-expand-all :props="treeProps" :expand-on-click-node="false" highlight-current
        @node-click="NodeClick"> </el-tree>
    </template>
    <template #columns>
      <el-table-column prop="name" label="ФИО">
        <template #header>
          <el-input v-model="filter.name" size="small" placeholder="ФИО" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="organization.shortName" label="Организация">
        <template #header>
          <el-input v-model="filter.organization" size="small" placeholder="Организация" clearable />
        </template>
      </el-table-column>
    </template>
  </Table>
</template>

<script setup>
import Table from "./Table.vue";
import { reactive, ref } from "vue";
import { Get } from "../../scripts/fetch";
import debounce from "../../scripts/debounce";

const structure = ref(await Get("/organizations"));
const data = ref({ count: 0, rows: [] });

const treeProps = {
  label: 'shortName',
};

const filter = ref({});

const NodeClick = (node) => {
  filter.value[node.type] = node.shortName;
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

<style></style>
