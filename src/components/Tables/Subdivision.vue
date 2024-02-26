<template>
    <Table :data="data" :add="'subdivisionCreate'" :edit="'subdivisionEdit'" :filter="filter" :url="'/subdivisions/pages'"
        @download-done="Done" @set-filter="SetFilter" @clear-filter="ClearFilter">
        <template #search-menu-header>Структура</template>
        <template #search-menu-body>
            <el-tree :data="structure" default-expand-all :props="treeProps" :expand-on-click-node="false" highlight-current
                @node-click="NodeClick">
            </el-tree>
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
            <el-table-column prop="division.name" label="Вышестоящее подразделение">
                <template #header>
                    <el-input v-model="filter.division" size="small" placeholder="Вышестоящее подразделение" clearable />
                </template>
            </el-table-column>
        </template>
    </Table>
</template>

<script setup>
import Table from './Table.vue';
import { ref } from 'vue'
import { Get } from '../../scripts/fetch';
import CreateStructere from "../../scripts/structure"

import Filter from "./scripts/filter"
import Data from "./scripts/data"

const { filter, SetFilter, ClearFilter } = Filter()
const { data, treeProps, Done, } = Data()

const structure = ref(CreateStructere(await Get('/structure?level=1')))

const NodeClick = (node, treeNode) => {
    filter.value = {}

    if (treeNode.level > 1) {
        const parent = treeNode.parent.data

        filter.value[parent.type] = parent.shortName || parent.name
    }

    filter.value[node.type] = node.shortName || node.name
}

</script>

<style></style>