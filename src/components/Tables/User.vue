<template>
    <Table :data="data" :add="'userCreate'" :edit="'userEdit'" :url="'/users/pages'" :filter="filter" :structure="false"
        @download-done="Done" @set-filter="SetFilter">
        <template #columns>
            <el-table-column prop="name" label="Имя пользователя">
                <template #header>
                    <el-input v-model="filter.name" size="small" placeholder="Наименование" clearable />
                </template>
            </el-table-column>
        </template>
    </Table>
</template>

<script setup>
import Table from './Table.vue';
import { ref } from "vue"

const data = ref({ count: 0, rows: [] })

const filter = ref({})

const Done = (e) => {
    data.value = e
}

const SetFilter = (e) => {
    if (e.page)
        filter.value = e
}
</script>

<style></style>