import { Get } from "../scripts/fetch"
import router from "../router/index"

import { ElMessage } from 'element-plus'

const LOCAL_NAME = 'TOKEN_KNCPHONEBOOK_SYSTEM'

const state = {
    client: null,
    accessToken: null,
    loadingLogin: true
}

const actions = {
    async Login(ctx, form) {
        const { name, password } = form

        const buffer = window.btoa(`${name}:${password}`)
        const headers = new Headers()

        headers.set('Authorization', `${buffer}`)
        const data = await Get('/login', { headers })

        if (data) {
            localStorage.setItem(LOCAL_NAME, data.token)
            ctx.commit('UpdateClient', data.client)
            router.push({ name: 'employeeAll' })
        }

        else {
            ElMessage({
                message: 'Неверный логин или пароль',
                type: "error",
                duration: 2000
            })
        }
    },

    async Refresh(ctx) {
        const accessToken = localStorage.getItem(LOCAL_NAME)
        const headers = new Headers()
        headers.set('Authorization', accessToken)
        const data = await Get('/refresh', { headers })

        if (data) {
            ctx.commit('UpdateClient', data.client)
        }
        else {
            ctx.commit('UpdateClient', null)
            ctx.commit('UpdateAccessToken', null)
            localStorage.setItem(LOCAL_NAME, null)
        }

        ctx.commit('UpdateLoading', false)
    },

    async Exit(ctx) {
        localStorage.clear(LOCAL_NAME)
        ctx.commit('UpdateClient', null)
        ctx.commit('UpdateAccessToken', null)
        router.push({ name: 'home' })
    }
}

const mutations = {
    UpdateClient(state, client) {
        state.client = client
    },
    UpdateAccessToken(state, accessToken) {
        state.accessToken = accessToken
    },
    UpdateLoading(state, value) {
        state.loadingLogin = value
    }
}

const getters = {
    client(state) {
        return state.client
    },

    clientRole(state) {
        if (state.client) {
            return state.client.role
        }
    },

    loadingLogin(state) {
        return state.loadingLogin
    },

    accessToken(state) {
        return state.accessToken
    }
}

export default { state, actions, mutations, getters }