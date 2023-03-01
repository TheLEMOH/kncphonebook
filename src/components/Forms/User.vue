<template>
    <Form :form=form :url=url :rules="rules" :redirect="'userAll'">
        <template #fields>
            <el-form-item label="Имя пользователя" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-button type="warning" @click="dialogVisible = true"> Сменить пароль</el-button>
        </template>
    </Form>

    <el-dialog v-model="dialogVisible" title="Смена пароля" width="400px">
        <el-form ref="formRef" label-width="150px" label-position="left" :rules="rulesPass" :model="newPassword">
            <el-form-item label="Новый пароль" prop="password">
                <el-input v-model="newPassword.password" type="password" show-password />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">Отмена</el-button>
            <el-button type="primary" @click="ChangePassword(formRef)">
                Сменить пароль
            </el-button>

        </template>
    </el-dialog>
</template>

<script setup>
import Form from "./Form.vue"
import { reactive, ref } from 'vue';
import { useRoute } from "vue-router";

import { Get, Put } from "../../scripts/fetch";

const route = useRoute()

const id = route.params.id

const rules = reactive({
    name: [
        { required: true, message: 'Введите имя', trigger: 'blur' },
    ],
})

const rulesPass = reactive({
    password: [
        { required: true, message: 'Введите пароль', trigger: 'blur' },
        { min: 5, message: 'Минимальная длина 5 символов', trigger: 'blur' },
    ],
})


const url = '/users'

const formRef = ref()

const dialogVisible = ref(null)

const newPassword = reactive({})

let form = reactive({})

if (id) {
    form = reactive(await Get(`/${url}/${id}`))
}

const ChangePassword = async (el) => {
    await el.validate(async (valid) => {
        if (valid) {
            const res = await Put('/changepassword', { password: newPassword.password, id: form.id })
        }
    })
}

</script>