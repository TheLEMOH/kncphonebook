<template>
  <Table :data="data" :add="'positionCreate'" :edit="'positionEdit'" :filter="filter" :url="'/positions/pages'"
    @download-done="Done" @set-filter="SetFilter" :structure="false">
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
import { reactive, ref } from "vue";

const filter = ref({});

const treeProps = {
  label: "name",
};

const data = ref({ count: 0, rows: [] });

const Done = (e) => {
  data.value = e
}

const SetFilter = (e) => {
  if (e.page)
    filter.value = e
}

</script>

<style></style>
