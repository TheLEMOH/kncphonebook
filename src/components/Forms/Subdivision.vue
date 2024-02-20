<template>
    <Form :form=form :url=url :rules="rules" :redirect="'subdivisionAll'">
        <template #fields>
            <el-form-item label="Наименование" prop="name">
                <el-input v-model="form.name" maxlength="100" show-word-limit />
            </el-form-item>
            <el-form-item label="Вышестоящее подразделение" prop="divisionId">
                <el-select v-model="form.divisionId" filterable placeholder="Выберите подразделение"
                    @change="SelectDivision">
                    <el-option-group v-for="group in structure" :key="group.id" :label="group.shortName">
                        <el-option v-for="item in group.divisions" :key="item.id" :label="item.name" :value="item.id" />
                    </el-option-group>
                </el-select>
            </el-form-item>
        </template>
    </Form>
</template>

<script setup>
import Form from "./Form.vue"
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import { Get } from "../../scripts/fetch"

const url = '/subdivisions'

const structure = ref(await Get('/structure?level=1'))
const divisions = await Get(`/divisions`)

const route = useRoute()

const id = route.params.id

const rules = reactive({
    name: [
        { required: true, message: 'Введите наименование', trigger: 'blur' },
    ],
    divisionId: [
        { required: true, message: 'Выберите организацию', trigger: 'change' },
    ]
})

let form = reactive({
    name: null,
    divisionId: null,
    organizationId: null
})

if (id) {
    form = reactive(await Get(`/${url}/${id}`))
}

const SelectDivision = (divId) => {
    const division = divisions.find(d => d.id == divId)
    const organization = division.organization

    form.organizationId = organization.id
}



</script>