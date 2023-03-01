<template>
  <Table :data="data" :add="'positionCreate'" :edit="'positionEdit'" @change-page="SearchGet" :structure="false">
    <template #columns>
      <el-table-column prop="name" label="Наименование">
        <template #header>
          <el-input v-model="filter.name" size="small" placeholder="Наименование" @input="SearchChange" clearable />
        </template>
      </el-table-column>
      <el-table-column prop="levelSort" label="Уровень сортировки">
        <template #header>
          <el-input v-model="filter.levelSort" size="small" placeholder="Уровень сортировки" @input="SearchChange" clearable />
        </template>
      </el-table-column>
    </template>
  </Table>
</template>

<script setup>
import Table from "./Table.vue";
import debounce from "../../scripts/debounce";
import { reactive, ref } from "vue";
import { Get } from "../../scripts/fetch";

const filter = ref({});

const treeProps = {
  label: "name",
};

const data = ref(await Get("/positions/pages"));

const SearchGet = async (page = 1) => {
  filter.value.page = page;
  const searchParams = new URLSearchParams(filter.value).toString();
  const res = await Get(`/positions/pages?${searchParams}`);
  data.value = res;
};

const SearchChange = debounce(() => SearchGet());
</script>

<style></style>
