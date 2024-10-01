import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";

// 模拟环境
const server = "http://imc.test.lg.china-yongfeng.com/imc/laboratory";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    // WSL 热更新
    watch: {
      usePolling: true
    },
    // 代理配置
    proxy: {
      // 订单模块
      "/order/process/api": {
        target: server,
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/imc\/laboratory\/order\/process\/api/, "/order/process/api");
          return newPath;
        }
      },
      // 规范模块
      "/specification/manage/api": {
        target: server,
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/imc\/laboratory\/specification\/manage\/api/, "/specification/manage/api");
          return newPath;
        }
      }
    }
  }
});
