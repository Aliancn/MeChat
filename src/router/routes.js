// 创建routes作为路由表
const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: () => import('@/components/HelloWorld.vue'),
    },
    {
        path: "/home",
        name: "Home",
        component: () => import('@/views/HomeView.vue'),
        children: [
            {
                path: "/chat",
                name: "HomeIndex",
                component: () => import('@/views/ChatView.vue'),
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import('@/views/LoginView.vue'),
    },
    {
        path: "/404",
        name: "404",
        component: () => import('@/views/NotFoundView.vue'),
    }
]

export default routes
