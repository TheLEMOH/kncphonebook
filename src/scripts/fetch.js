import router from "../router/index"
import { ElMessage } from 'element-plus'
const pre = '/api'


const GetToken = () => {
    const token = localStorage.getItem('TOKEN_KNCPHONEBOOK_SYSTEM')
    return token
}


const Get = async (url, options = {}) => {

    const headers = new Headers()
    const token = GetToken()
    headers.set('Authorization', token)

    const res = await fetch(`${pre}${url}`, { headers: options.headers || headers })

    if (!res.ok) {
        const error = await res.json()
        ElMessage({
            message: error.message,
            type: "error",
            duration: 2000
        })

        throw new Error(error.message);
    }

    {
        const json = await res.json()
        return json
    }

}

const Post = async (url, object) => {
    const headers = new Headers()
    const token = GetToken()
    headers.set('Authorization', token)
    headers.set("Content-Type", "application/json")

    const body = JSON.stringify(object)
    const res = await fetch(`${pre}${url}`, {
        method: 'POST',
        headers: headers,
        body: body
    })

    if (!res.ok) {
        const error = await res.json()
        ElMessage({
            message: error.message,
            type: "error",
            duration: 2000
        })
        return false
    }

    else {
        ElMessage({
            message: 'Объект сохранен!',
            type: 'success',
            duration: 2000
        })
        return true
    }


}


const Put = async (url, object) => {
    const headers = new Headers()
    const token = GetToken()
    headers.set('Authorization', token)
    headers.set("Content-Type", "application/json")

    const body = JSON.stringify(object)
    const id = object.id
    const putUrl = `${url}/${id}`
    const res = await fetch(`${pre}${putUrl}`, {
        method: 'PUT',
        headers: headers,
        body: body
    })


    if (!res.ok) {
        const error = await res.json()
        ElMessage({
            message: error,
            type: "error",
            duration: 2000
        })
        return false
    }

    else {
        ElMessage({
            message: 'Объект сохранен!',
            type: 'success',
            duration: 2000
        })
        return true
    }

}

const Delete = async (url, object) => {
    const headers = new Headers()
    const token = GetToken()
    headers.set('Authorization', token)
    headers.set("Content-Type", "application/json")

    const id = object.id
    const deleteUrl = `${url}/${id}`
    const res = await fetch(`${pre}${deleteUrl}`, {
        headers: headers,
        method: 'delete',
    })

    if (!res.ok) {
        const error = await res.json()
        ElMessage({
            message: error.message,
            type: "error",
            duration: 2000
        })
        return false
    }

    else {
        ElMessage({
            message: 'Объект удален!',
            type: 'success',
            duration: 2000
        })
        return true
    }

}



export { Post, Get, Put, Delete }