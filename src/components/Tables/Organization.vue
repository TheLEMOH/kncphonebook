<template>
    <Table :data="data" :add="'organizationCreate'" :edit="'organizationEdit'" @change-page="SearchGet" :structure="false">
        <template #columns>
            <el-table-column prop="shortName" label="Сокращенное наименование">
                <template #header>
                    <el-input v-model="filter.shortName" size="small" placeholder="Сокращенное наименование"
                        @input="SearchChange" clearable />
                </template>
            </el-table-column>
            <el-table-column prop="name" label="Полное наименование">
                <template #header>
                    <el-input v-model="filter.name" size="small" placeholder="Полное наименование" @input="SearchChange"
                        clearable />
                </template>
            </el-table-column>
            <el-table-column prop="address" label="Адрес">
                <template #header>
                    <el-input v-model="filter.address" size="small" placeholder="Адрес" @input="SearchChange" clearable />
                </template>
            </el-table-column>
        </template>
    </Table>
</template>

<script setup>
import Table from './Table.vue';
import debounce from '../../scripts/debounce';
import { ref, reactive } from 'vue'
import { Get } from '../../scripts/fetch';

const data = ref(await Get('/organizations/pages'))

const filter = reactive({})

const SearchGet = async (page = 1) => {
    filter.page = page
    const searchParams = new URLSearchParams(filter).toString()
    const res = await Get(`/organizations/pages?${searchParams}`)
    data.value = res
}

const SearchChange = debounce(() => SearchGet());

</script>

<style></style>