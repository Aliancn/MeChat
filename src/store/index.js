// 创建pinia仓库
import { createPinia } from 'pinia'
const store = createPinia()

// 定义聊天软件使用的用户信息的仓库
import { defineStore } from 'pinia'
import {GetItemWithExpiration, SetItemWithExpiration} from "@/utils/localstorage.js";
export const userStore = defineStore('user', {
    state: () => {
        return {
            user: {
                id: 1,
                name: '',
                avatar: '',
                token: ''
            }
        }
    },
    actions: {
        setUser(user) {
            this.user = user;
            SetItemWithExpiration('user', user, 60 * 24 );
        },
        getUser() {
            return GetItemWithExpiration('user');
        }
    }
})

export const chatStore = defineStore('chat', {
    state: () => {
        return {
            chatlist: [],
        }
    },
    actions: {
        // 为chatlist添加一条数据
        addChat(chat) {
            this.chatlist.push(chat);
        },
        // 获取chatlist
        getChat() {
            return this.chatlist;
        },
        // 设置chatlist
        setChat(chatlist) {
            this.chatlist = chatlist;
        }
    },
})

export default store
