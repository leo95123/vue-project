<template>
  <el-config-provider :locale="locale" size="small">
    <el-container>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { ref } from "vue";
const locale = ref(zhCn);
</script>

<style scoped lang="scss">
:deep(.el-pagination) {
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
