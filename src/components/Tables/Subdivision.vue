<template>
    <Table :data="data" :add="'subdivisionCreate'" :edit="'subdivisionEdit'" @change-page="SearchGet">
        <template #search-menu-header>Структура</template>
        <template #search-menu-body>
            <el-tree :data="structure" default-expand-all :props="treeProps" :expand-on-click-node="false"  highlight-current
                @node-click="NodeClick">
            </el-tree>
        </template>
        <template #columns>
            <el-table-column prop="name" label="Наименование">
                <template #header>
                    <el-input v-model="filter.name" size="small" placeholder="Наименование" @input="SearchChange"
                        clearable />
                </template>
            </el-table-column>
            <el-table-column prop="organization.shortName" label="Организация">
                <template #header>
                    <el-input v-model="filter.organization" size="small" placeholder="Организация" @input="SearchChange"
                        clearable />
                </template>
            </el-table-column>
            <el-table-column prop="division.name" label="Вышестоящее подразделение">
                <template #header>
                    <el-input v-model="filter.division" size="small" placeholder="Вышестоящее подразделение"
                        @input="SearchChange" clearable />
                </template>
            </el-table-column>
        </template>
    </Table>
</template>

<script setup>
import Table from './Table.vue';
import debounce from '../../scripts/debounce';
import { reactive, ref } from 'vue'
import { Get } from '../../scripts/fetch';
import CreateStructere from "../../scripts/structure"

const filter = ref({})

const structure = ref(CreateStructere(await Get('/structure?level=1')))

const treeProps = {
    label: 'name',
}

const data = ref(await Get('/subdivisions/pages'))

const NodeClick = (node, treeNode) => {
    filter.value = {}

    if (treeNode.level > 1) {
        const parent = treeNode.parent.data

        filter.value[parent.type] = parent.name
    }

    filter.value[node.type] = node.name
    SearchGet()
}

const SearchGet = async (page = 1) => {
    filter.value.page = page
    const searchParams = new URLSearchParams(filter.value).toString()
    const res = await Get(`/subdivisions/pages?${searchParams}`)
    data.value = res
}

const SearchChange = debounce(() => SearchGet());

</script>

<style></style>