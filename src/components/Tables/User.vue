<template>
    <Table :data="data" :add="'userCreate'" :edit="'userEdit'" @change-page="SearchGet" :structure="false">
        <template #columns>
            <el-table-column prop="name" label="Имя пользователя">
            </el-table-column>
        </template>
    </Table>
</template>

<script setup>
import Table from './Table.vue';
import { reactive, ref } from "vue"
import { Get } from '../../scripts/fetch';

const data = ref(await Get('/users/pages'))

const filter = reactive({})

const SearchGet = async (page = 1) => {
    filter.page = page
    const searchParams = new URLSearchParams(filter).toString()
    const res = await Get(`/users/pages?${searchParams}`)
    data.value = res
}


</script>

<style></style>