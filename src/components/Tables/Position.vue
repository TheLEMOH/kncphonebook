<template>
  <Table :data="data" :add="'positionCreate'" :edit="'positionEdit'" :filter="filter" :url="'/positions/pages'"
    @download-done="Done" @set-filter="SetFilter" :structure="false" @clear-filter="ClearFilter">
    <template #columns>
      <el-table-column prop="name" label="Наименование">
        <template #header>
          <el-input v-model="filter.name" size="small" placeholder="Наименование" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="levelSort" label="Уровень сортировки">
        <template #header>
          <el-input v-model="filter.levelSort" size="small" placeholder="Уровень сортировки" clearable />
        </template>
      </el-table-column>
    </template>
  </Table>
</template>

<script setup>
import Table from "./Table.vue";

import Filter from "./scripts/filter"
import Data from "./scripts/data"

const { filter, SetFilter, ClearFilter } = Filter()
const { data, Done, } = Data()
</script>

<style></style>
