import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import * as ElementPlusIcons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIcons)) {
  app.component(key, component);
}

app.mount("#app");
