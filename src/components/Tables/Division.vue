<template>
  <Table :data="data" :add="'divisionCreate'" :edit="'divisionEdit'" :filter="filter" :url="'/divisions/pages'"
    @download-done="Done" @set-filter="SetFilter" @clear-filter="ClearFilter">
    <template #search-menu-header>Структура</template>
    <template #search-menu-body>
      <el-tree :data="structure" default-expand-all :props="treeProps" :expand-on-click-node="false" highlight-current
        node-key="id" @node-click="NodeClick"> </el-tree>
    </template>
    <template #columns>
      <el-table-column prop="name" label="Наименование">
        <template #header>
          <el-input v-model="filter.name" size="small" placeholder="Наименование" clearable />
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
import { ref } from "vue";
import { Get } from "../../scripts/fetch";

import Filter from "./scripts/filter"
import Data from "./scripts/data"

const { filter, SetFilter, ClearFilter } = Filter()
const { data, treeProps, Done, } = Data()

const structure = ref(await Get("/organizations"));

const NodeClick = (node) => {
  filter.value[node.type] = node.shortName;
};


</script>

<style></style>
