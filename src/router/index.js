// 编写一个vue router的根组件
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from "@/router/routes.js";

// 创建router路由
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router;
