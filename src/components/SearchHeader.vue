<template>
  <div class="search-header">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <el-space><slot name="right"></slot></el-space>
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.search-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .right {
    display: flex;
    :deep(.el-form-item) {
      margin-right: 0;
    }
  }
}
</style>
