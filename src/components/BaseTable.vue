<template>
  <div class="base-table" ref="baseTableRef">
    <!-- 表格操作 -->
    <div class="table-operation">
      <div class="left-operation"></div>
      <div class="right-operation">
        <!-- 刷新 列设置 全屏 -->
        <el-space>
          <el-button icon="RefreshRight" title="刷新" @click="refresh"></el-button>
          <el-dropdown trigger="click">
            <el-button icon="Setting" title="列设置" @click="columnSetting"></el-button>
            <template #dropdown>
              <div class="drap-box">
                <el-checkbox-group v-model="checkedColumnIdList" @change="columnSelectChange">
                  <div v-for="item in dropColumns" :key="item.customId" class="drag-item">
                    <div class="drag-item__move">
                      <el-icon><IconDrap /></el-icon>
                    </div>
                    <el-checkbox size="small" :value="item.customId">{{ item.label }} </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
              <div class="drag-reset">
                <el-divider style="margin: 2px 0 8px 0"></el-divider>
                <el-button style="width: 100%" size="small" icon="RefreshRight" type="primary">重置</el-button>
              </div>
            </template>
          </el-dropdown>
          <el-button icon="FullScreen" title="全屏" @click="fullScreen"></el-button>
        </el-space>
      </div>
    </div>
    <el-table ref="tableRef" v-bind="$attrs">
      <template v-for="slot in tableSlots" :key="slot.name" #[slot.name]="{ record }">
        <slot :name="slot.name" :record="record"></slot>
      </template>
      <slot name="default"></slot>
    </el-table>
    <!-- 虚拟表格，获取列 -->
    <el-table ref="virtualTableRef" v-bind="$attrs">
      <slot name="default"></slot>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ElTableColumn } from "element-plus";
import { useSlots, useAttrs, computed, ref, reactive, onMounted, watch, nextTick } from "vue";
import { api as fullscreen } from "vue-fullscreen";
import IconDrap from "@/assets/icons/IconDrag.vue";
interface ColumnType extends InstanceType<typeof ElTableColumn> {
  [customId: string]: any;
}
const props = defineProps({
  refresh: { type: Function, default: () => {} },
  fullScreenSelector: { type: String, default: "" } // 全屏容器
});
const $attrs = useAttrs(); // 属性
const slots = useSlots(); // 插槽
const baseTableRef = ref(); // 表格容器
const tableRef = ref(); // 表格实例
const virtualTableRef = ref(); // 虚拟表格
let dropColumns: ColumnType[] = reactive([]); // 默认拖拽初始列
const checkedColumnIdList: any = ref([]); // 选中列
const renderColumnSlots: any = ref([]);

// 表格列插槽
const columnSlots = computed(() => {
  return Object.keys(slots)
    .filter(v => v === "default")
    .map((v, index) => {
      console.log(slots["default"]?.({ customId: index }));
      return {
        customId: index,
        name: v,
        slot: slots[v]
      };
    });
});

// 获取表格其他插槽
const tableSlots = computed(() => {
  if (slots) {
    return Object.keys(slots)
      .filter(v => v !== "default")
      .map(v => {
        return {
          customId: null,
          name: v,
          slot: slots[v]
        };
      });
  }
  return [];
});
onMounted(() => {
  nextTick(() => {
    // 获取初始列
    if (virtualTableRef.value) {
      console.log("columnSlots", columnSlots.value);
      const cloumns = virtualTableRef.value.columns;
      dropColumns = cloumns.filter((item: ColumnType, index: number) => {
        item.customId = index;
        // 筛选有label 的才参与排序或选择
        return item.label;
      });
      checkedColumnIdList.value = dropColumns.map(item => item.customId);
      renderColumnSlots.value = columnSlots.value;
    }
  });
});
const getRenderColumnSlots = () => {
  const slots = columnSlots.value.filter(item => {
    return checkedColumnIdList.value.includes(item.customId);
  });
  // console.log("slots", slots);
  renderColumnSlots.value = slots;
};
// 全屏
const fullScreen = () => {
  let el = baseTableRef.value;
  if (props.fullScreenSelector) {
    // 如果没传容器，就全屏整个表格
    el = document.querySelector(props.fullScreenSelector) as HTMLElement;
  }
  fullscreen.toggle(el, {
    pageOnly: true,
    teleport: true,
    callback: isFullscreen => {
      console.log(isFullscreen);
    }
  });
};
// 列设置,
const columnSetting = () => {
  console.log("列", dropColumns);
};
// 列选中
const columnSelectChange = (value: (number | null)[]) => {
  console.log(value);
  // console.log(checkedColumnIdList);
  getRenderColumnSlots();
};
</script>
<style lang="scss" scoped>
.base-table {
  .table-operation {
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
    }
  }
}
.drag-reset {
  padding: 0 8px 10px 8px;
}
</style>
