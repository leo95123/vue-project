<template>
  <div class="base-table" ref="baseTableRef">
    <!-- 表格操作 -->
    <div class="table-operation">
      <div class="left-operation">
        <slot name="left-operation"></slot>
      </div>
      <div class="right-operation">
        <slot v-if="$slots['right-operation']" name="right-operation"></slot>
        <!-- 刷新 列设置 全屏 -->
        <el-space v-else>
          <el-button icon="RefreshRight" title="刷新" @click="refresh"></el-button>
          <el-dropdown trigger="click">
            <el-button icon="Setting" title="列设置"></el-button>
            <template #dropdown>
              <div class="drap-box">
                <el-checkbox-group v-model="checkedColumnIdList">
                  <VueDraggable v-model="dropColumns">
                    <div v-for="item in dropColumns" :key="item.customId" class="drag-item">
                      <div class="drag-item__move">
                        <el-icon><IconDrap /></el-icon>
                      </div>
                      <el-checkbox size="small" :value="item.customId" :label="item.label" />
                    </div>
                  </VueDraggable>
                </el-checkbox-group>
              </div>
              <div class="drag-reset">
                <el-divider style="margin: 2px 0 8px 0"></el-divider>
                <el-button style="width: 100%" size="small" icon="RefreshRight" type="primary" @click="resetColumns">
                  重置
                </el-button>
              </div>
            </template>
          </el-dropdown>
          <el-button icon="FullScreen" title="全屏" @click="fullScreen"></el-button>
        </el-space>
      </div>
    </div>
    <el-table ref="tableRef" v-bind="$attrs">
      <template #append>
        <slot name="append"></slot>
      </template>
      <template #empty>
        <slot name="empty"></slot>
      </template>
      <BaseTableColumn :columns="renderColumns">
        <template v-for="(value, key) in $slots" #[key]="slotProps" :key="key">
          <slot v-if="key && $slots[key]" :name="key" v-bind="slotProps"></slot>
        </template>
      </BaseTableColumn>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { ColumnType } from "./types";
import { ref, computed } from "vue";
import { api as fullscreen } from "vue-fullscreen";
import IconDrap from "@/assets/icons/IconDrag.vue";
import BaseTableColumn from "./BaseTableColumn";
import { VueDraggable } from "vue-draggable-plus";

const {
  columns = [],
  refresh,
  fullScreenSelector
} = defineProps<{
  columns: ColumnType[];
  refresh: Function;
  fullScreenSelector?: string; // 全屏容器
}>();

const baseTableRef = ref(); // 表格容器
const tableRef = ref(); // 表格实例
const dropColumns = ref<ColumnType[]>([]);
const checkedColumnIdList = ref<(string | undefined)[]>([]); // 选中列
// 重置列
const resetColumns = () => {
  dropColumns.value = columns
    .map((item, index) => {
      item.customId = `${item.prop}-${index}`;
      return item;
    })
    .filter(item => item.label);
  checkedColumnIdList.value = dropColumns.value.map(item => item.customId);
};
resetColumns();

// 重新计算表格列
const renderColumns = computed(() => {
  const filteredColumns = columns.filter((item: ColumnType) => checkedColumnIdList.value.includes(item.customId));
  // 根据自定义列排序，即根据dropColumns的顺序
  filteredColumns.sort((a, b) => dropColumns.value.indexOf(a) - dropColumns.value.indexOf(b));
  return filteredColumns;
});
// 全屏
const fullScreen = () => {
  let el = baseTableRef.value;
  if (fullScreenSelector) {
    // 如果没传容器，就全屏整个表格
    el = document.querySelector(fullScreenSelector) as HTMLElement;
  }
  fullscreen.toggle(el, {
    pageOnly: true,
    teleport: true,
    fullscreenClass: "table-fullscreen"
    // callback: isFullscreen => {}
  });
};
</script>
<style lang="scss" scoped>
.base-table {
  .table-operation {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.drap-box {
  padding: 10px 10px 0 10px;
  .drag-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    .drag-item__move {
      margin-right: 4px;
      cursor: move;
    }
  }
}
.drag-reset {
  padding: 0 8px 10px 8px;
}
</style>
