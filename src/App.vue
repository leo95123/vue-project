<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { ref } from "vue";
const locale = ref(zhCn);
</script>

<style scoped></style>
