<template>
    <Form :form=form :url=url :rules="rules" :redirect="'organizationAll'">
        <template #fields>
            <el-form-item label="Сокращенное наименование" prop="shortName">
                <el-input v-model="form.shortName" maxlength="100" show-word-limit />
            </el-form-item>
            <el-form-item label="Полное наименование" prop="name">
                <el-input v-model="form.name" maxlength="255" show-word-limit />
            </el-form-item>
            <el-form-item label="Адрес организации" prop="address">
                <el-input v-model="form.address" maxlength="100" show-word-limit />
            </el-form-item>
        </template>
    </Form>
</template>

<script setup>
import Form from "./Form.vue"
import { reactive } from 'vue';
import { useRoute } from 'vue-router'
import { Get } from "../../scripts/fetch"

const url = '/organizations'

const route = useRoute()

const id = route.params.id

const rules = reactive({
    shortName: [
        { required: true, message: 'Введите сокращенное наименование', trigger: 'blur' },
    ],
    name: [
        { required: true, message: 'Введите наименование', trigger: 'blur' },
    ],
    address: [
        { required: true, message: 'Введите адрес', trigger: 'blur' },
    ]
})

let form = reactive({
    shortName: null,
    name: null,
    address: null
})


if (id) {
    form = reactive(await Get(`/${url}/${id}`))
}

</script>