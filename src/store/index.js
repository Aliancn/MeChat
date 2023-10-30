// 创建pinia仓库
import { createPinia } from 'pinia'
const store = createPinia()

// 定义聊天软件使用的用户信息的仓库
import { defineStore } from 'pinia'
export const userStore = defineStore('user', {
    state: () => {
        return {
            user: {
                id: 1,
                name: 'TOM',
                avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            }
        }
    },
    actions: {
        setUser(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user))
        },
        getUser() {
            return JSON.parse(localStorage.getItem('user')) || {}
        }
    }
})


export default store
