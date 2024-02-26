<template>
    <Form :form=form :url=url :rules="rules" :redirect="'userAll'">
        <template #fields>
            <el-form-item label="Имя пользователя" prop="name">
                <el-input v-model="form.name" maxlength="100" show-word-limit />
            </el-form-item>
            <el-form-item label="Пароль" prop="password">
                <el-input v-model="form.password" type="password" show-password maxlength="100" show-word-limit />
            </el-form-item>
        </template>
    </Form>
</template>

<script setup>
import Form from "./Form.vue"
import { reactive } from 'vue';

const ruSymbols = /[А-яЁё]/;

const latinValidator = (rule, value) => {
    return new Promise((resolve, reject) => {
        if (value.search(ruSymbols) != -1) {
            reject('Только латиница и цифры')
        } else {
            resolve()
        }
    })
}

const rules = reactive({
    name: [
        { required: true, message: 'Введите имя', trigger: 'blur' },
        { asyncValidator: latinValidator }
    ],

    password: [
        { required: true, message: 'Введите пароль', trigger: 'blur' },
        { min: 5, message: 'Минимальная длина 5 символов', trigger: 'blur' },
        { asyncValidator: latinValidator }
    ],
})

const url = '/registration'

let form = reactive({

})
</script>