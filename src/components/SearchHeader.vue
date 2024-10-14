<template>
  <el-form ref="formRef" size="small" :model="form" inline>
    <div class="search-header">
      <div class="left">
        <slot name="left"></slot>
        <!-- 可隐藏的筛选条件 -->
        <template v-if="slots['hide-left']">
          <el-form-item>
            <!-- 按钮 -->
            <el-space :size="4" class="show-hide-left-btn" @click="showHideLeft = !showHideLeft">
              <el-text type="primary">{{ showHideLeft ? "收起" : "展开" }}</el-text>
              <el-text type="primary">
                <el-icon v-if="showHideLeft"> <ArrowUp /></el-icon>
                <el-icon v-else> <ArrowDown /> </el-icon>
              </el-text>
            </el-space>
          </el-form-item>
          <div>
            <slot v-if="showHideLeft" name="hide-left"></slot>
          </div>
        </template>
      </div>
      <div class="right">
        <el-space v-if="slots['right']">
          <slot name="right"></slot>
        </el-space>
        <el-form-item v-else>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { useSlots, ref } from "vue";
import type { ElForm } from "element-plus";
const slots = useSlots();
const formRef = ref<InstanceType<typeof ElForm>>();

const props = withDefaults(
  defineProps<{
    showHideCondition?: boolean; // 默认是否显示隐藏的筛选条件
    form?: any; // 表单
    reset?: Function; // 重置
    search?: Function; // 查询
  }>(),
  {
    showHideCondition: false
  }
);
const showHideLeft = ref(props.showHideCondition);
// 查询
const onSearch = () => {
  props.search && props.search(props.form);
};
// 重置
const onReset = () => {
  formRef.value?.resetFields();
  props.reset && props.reset();
};
</script>
<style lang="scss" scoped>
.search-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  .left {
    .show-hide-left-btn {
      cursor: pointer;
      transition: all 0.3s;
    }
  }
  .right {
    margin-left: auto;
    display: flex;
    :deep(.el-form-item) {
      margin-right: 0;
    }
  }
}
</style>
