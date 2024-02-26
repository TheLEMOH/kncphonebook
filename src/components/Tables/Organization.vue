<template>
    <Table :data="data" :add="'organizationCreate'" :edit="'organizationEdit'" :url="'/organizations/pages'"
        :filter="filter" :structure="false" @download-done="Done" @set-filter="SetFilter" @clear-filter="ClearFilter">
        <template #columns>
            <el-table-column prop="shortName" label="Сокращенное наименование">
                <template #header>
                    <el-input v-model="filter.shortName" size="small" placeholder="Сокращенное наименование" clearable />
                </template>
            </el-table-column>
            <el-table-column prop="name" label="Полное наименование">
                <template #header>
                    <el-input v-model="filter.name" size="small" placeholder="Полное наименование" clearable />
                </template>
            </el-table-column>
            <el-table-column prop="address" label="Адрес">
                <template #header>
                    <el-input v-model="filter.address" size="small" placeholder="Адрес" clearable />
                </template>
            </el-table-column>
        </template>
    </Table>
</template>

<script setup>
import Table from './Table.vue';

import Filter from "./scripts/filter"
import Data from "./scripts/data"

const { filter, SetFilter, ClearFilter } = Filter()
const { data, Done, } = Data()

</script>

<style></style>