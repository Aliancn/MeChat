// 编写一个vue router的根组件
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from "@/router/routes.js";
import {GetItemWithExpiration} from "@/utils/localstorage.js";

// 创建router路由
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
// 添加路由守卫验证登陆信息
router.beforeEach((to, from, next) => {
    // 获取token
    const token = localStorage.getItem("user");
    // 如果token不存在
    if (!token) {
        // 如果访问的是login页面或者是404页面，直接放行
        if (to.path === "/login" || to.path === "/404") {
            next();
        } else {
            // 如果访问的是其他页面，直接跳转到登录页面
            next("/login");
        }
    } else {
        // 如果token存在，判断是否过期
        let userinfo = GetItemWithExpiration('user');
        if (userinfo == null){
            next("/login");
        }
        next();
    }
})
export default router;
