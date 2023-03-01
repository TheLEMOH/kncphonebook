<template>
    <Form :form=form :url=url :rules="rules" :redirect="'divisionAll'">
        <template #fields>
            <el-form-item label="Наименование" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Организация" prop="organizationId">
                <el-select v-model="form.organizationId" filterable placeholder="Выберите организацию">
                    <el-option v-for="org in organizations" :key="org.id" :label="org.name" :value="org.id" />
                </el-select>
            </el-form-item>
        </template>
    </Form>
</template>

<script setup>
import Form from "./Form.vue"
import { reactive } from 'vue';
import { useRoute } from 'vue-router'
import { Get } from "../../scripts/fetch"

const url = '/divisions'

const organizations = await Get(`/organizations`)

const route = useRoute()

const id = route.params.id

const rules = reactive({
    name: [
        { required: true, message: 'Введите наименование', trigger: 'blur' },
    ],
    organizationId: [
        { required: true, message: 'Выберите организацию', trigger: 'change' },
    ]
})


let form = reactive({
    name: null,
    organizationId: null
})

if (id) {
    form = reactive(await Get(`/${url}/${id}`))
}

</script>