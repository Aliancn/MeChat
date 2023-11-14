<template>
  <div style="height: 100%">
    <!-- 使用 Element Plus 布局组件 -->
    <el-container class="chat-container" style="height: 100%">
      <el-main class="el-main">
        <!-- 聊天窗口 -->
        <el-scrollbar wrap-class="message-list" :view-style="{maxHeight: '500px'}">
          <div v-for="message in messages" :key="message.id" class="message">
            <el-avatar :src="message.avatar" size="small"></el-avatar>
            <div class="message-content">
              <div class="sender">{{ message.sender }}</div>
              <div class="content">{{ message.content }}</div>
              <div class="timestamp">{{ message.timestamp }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-main>
      <el-footer class="el-footer">
        <!-- 消息输入框 -->
        <el-input v-model="newMessage" @keyup.enter.native="sendMessage" placeholder="输入消息..."></el-input>
        <!-- 发送按钮 -->
        <el-button @click="sendMessage" type="primary">发送</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import {chatStore} from "@/store/index.js";
import {API_URL_DEV_CHAT_HISTORY, API_URL_DEV_CHAT_HISTORY_MOCK} from "@/utils/api.js";

export default {
  setup() {
    const store = chatStore();

    return {
      store
    }
  },
  data() {
    return {
      messages: [
        { id: 1, sender: 'Alice', content: '你好！', timestamp: '2023-12-10 06:55:31', avatar: '' },
        // 其他消息...
      ],
      newMessage: '',
    };
  },
  mounted() {
    // TODO: 从服务器获取历史消息
    this.getHistory()
    // TODO: 连接 WebSocket 服务器
    this.connect()
    // TODO: 监听 WebSocket 服务器的消息
    this.listen()
    // 监听 WebSocket 服务器的连接状态
    // this.listenStatus()
    // 监听 WebSocket 服务器的错误
    // this.listenError()
    // 监听 WebSocket 服务器的关闭
    // this.listenClose()
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        // 添加新消息到消息列表
        this.messages.push({
          id: Date.now(),
          sender: 'Bob',
          content: this.newMessage,
          timestamp: new Date().toLocaleString(),
          avatar: 'bob.jpg',
        });
        this.newMessage = ''; // 清空输入框
      }
    },
    getHistory(){
      let d = new Date('2023-07-25T23:30:00Z');
      axios.get(API_URL_DEV_CHAT_HISTORY_MOCK,{
        params: {
          time : d
        }
      }).then(res => {
        if (res.status === 200) {
          this.store.setChat(res.data.messages)
          this.messages = res.data.messages;
        }
      }).catch(err => {
        console.log("get chatList history fail" ,err);
      });
    },
    listen() {

    },
    connect(){

    },


  },
};
</script>

<style scoped>
.chat-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  height: 100%;
}

.el-main{
  height: auto;
}
.el-footer{
  height: 50px;
}

.message-list {
  padding: 10px;
}

.message {
  display: flex;
  margin-bottom: 10px;
  //border: brown 2px;
}

.message-content {
  flex-grow: 1;
}

.sender {
  font-weight: bold;
}

.content {
  /* 样式可以根据实际需求进行调整 */
}

.timestamp {
  font-size: 12px;
  color: #999;
}
</style>
