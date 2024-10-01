import { createRouter, createWebHistory } from "vue-router";
import home from "./home";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...home]
});

export default router;
