<template>
    <div class="page-generate-csv">
        <el-select v-model="selectedTable" placeholder="Выберите таблицу">
            <el-option v-for="table in tables" :key="table.id" :label="table.label" :value="table.id" />
        </el-select>
        <el-select v-model="selectedOrg" filterable placeholder="Выберите организацию">
            <el-option v-for="org in organizations" :key="org.id" :label="org.name" :value="org.id" />
        </el-select>
        <input type="file" @input="UpdateFile" />
        <el-button @click="Create" type="primary" :disabled="disabled">Добавить объекты</el-button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Get, Post } from '../scripts/fetch';


const tables = [
    /*     { id: 'divisions', label: 'Структурные подразделения' },
        { id: 'subdivisions', label: 'Подразделения' }, */
    { id: 'employees', label: 'Сотрудники' }
]

const organizations = await Get(`/organizations`)

const selectedTable = ref(null)
const selectedOrg = ref(null)

const json = ref(null)

const disabled = computed(() => {
    if (!selectedOrg.value || !selectedTable.value || !json.value)
        return true
    else
        return false
})

const UpdateFile = async (event) => {
    const reader = new FileReader()
    reader.readAsText(event.target.files[0])
    const res = await new Promise((resolve, reject) => {
        reader.onload = () => {
            const csv = reader.result
            const lines = csv.split("\r" + "\n")
            const headers = lines[0].split(';')

            const result = []
            for (let i = 1, length = lines.length; i < length; i++) {
                const obj = {}
                const line = lines[i].split(';')

                for (let j = 0, lineL = line.length; j < lineL; j++) {
                    obj[headers[j]] = line[j]
                }
                result.push(obj)
            }
            resolve(result)
        }
    })
    json.value = res
}

const Create = async () => {
    const res = await Post(`/${selectedTable.value}/bulkcreate`, { json: json.value, organizationId: selectedOrg.value })
}
</script>

<style>
.page-generate-csv {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;
    padding: 1rem;
    background: #fff;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
}
</style>