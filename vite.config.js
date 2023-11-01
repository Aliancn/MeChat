import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src'), // 路径别名
        },
        extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    // 开启代理服务器
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8081', // 你要代理的目标地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //这里理解成用'/api'代替target里面的地址
                }
            },
        },
    },
})
