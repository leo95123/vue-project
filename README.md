## vue 项目模板

### 目录结构

```
|-- .eslintrc.cjs // eslint配置
|-- .gitignore // git忽略
|-- .npmrc // npm 源配置
|-- .prettierrc.json // prettier 配置
|-- README.md // 项目介绍
|-- env.d.ts
|-- index.html // 项目入口
|-- package-lock.json
|-- package.json
|-- pnpm-lock.yaml
|-- tsconfig.app.json // ts 配置
|-- tsconfig.json // ts 配置
|-- tsconfig.node.json // ts 配置
|-- vite.config.ts // vite 配置
|-- public // 公共资源
| |-- favicon.ico
|-- src
|-- App.vue
|-- main.ts // 入口文件
|-- api // api接口
| |-- about
| |-- home
| |-- index.ts
|-- assets // 资源目录
| |-- icons
| |-- IconDrag.vue
| |-- icons.d.ts
|-- components // 公共组件
| |-- SearchHeader.vue
| |-- BaseTable // 表格
| |--- BaseTable.vue
| |--- BaseTableColumn.tsx
| |--- types.ts
|-- hook // hook
| |-- usePagination.ts // 分页
| |-- useTable.ts // 表格
|-- request // 请求封装
| |-- index.ts
| |-- token.ts
|-- router // 路由
| |-- index.ts
| |-- home
| |-- index.ts
|-- types // 类型
|-- views // 页面
|--- home
|--- Index.vue

```

### 请求接口

```ts
// src/api/home/index.ts
import request from "@/request";
export function getCount() {
  return request.get("xxxx/getCount",{
    showGlobalLoading: false,// 是否显示全局loading
    showGlobalErrorMessage: true,// 是否全局错误提示
    responseAllData: false // 是否返回所有数据（一般导出文件 true）
  });
}
// src/views/home/Index.vue
<script setup lang="ts">
import { getCount, getPage } from "@/api/home";
import { onMounted } from "vue";
onMounted(() => {
  getCount().then((res: any) => {
    console.log(res);
  }).catch((err: any) => {
    console.log(err);
  })
});
</script>
```

### 分页

```vue
<template>
  <div class="home">
    <el-form ref="formRef" size="small" :model="form" inline>
      <!-- 查询 -->
      <SearchHeader>
        <template #left>
          <el-form-item prop="salesOrderNo" label="订单号:">
            <el-input placeholder="请输入" v-model="form.salesOrderNo"></el-input>
          </el-form-item>
          <el-form-item prop="salesOrderNo" label="订单号:">
            <el-input placeholder="请输入" v-model="form.salesOrderNo"></el-input>
          </el-form-item>
        </template>
        <template #right>
          <el-form-item>
            <el-button type="primary" @click="search(form)">查询</el-button>
            <el-button @click="reset(formRef)">重置</el-button>
          </el-form-item>
        </template>
      </SearchHeader>
    </el-form>
    <BaseTable
      :data="tableData"
      full-screen-selector=".home"
      :refresh="refresh"
      :columns="cloumns"
      v-loading="tableLoading"
    >
      <!-- 自定义空数据显示 -->
      <template #empty>
        <el-empty description="2333" />
      </template>
      <template #qualityClass="scope">
        <el-tag>测试-{{ scope.row.qualityClass }}</el-tag>
      </template>
    </BaseTable>
    <!-- 分页 -->
    <el-pagination layout="prev, pager, next,jumper,total" :page-size="pageSize" :total="total" @change="pageChange" />
  </div>
</template>

<script setup lang="ts">
import type { ColumnType } from "@/components/BaseTable/types";
import { getCount, getPage } from "@/api/home";
import { onMounted, ref, reactive } from "vue";
import useTable from "@/hook/useTable";
import SearchHeader from "@/components/SearchHeader.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import type { ElForm } from "element-plus";

// 表格列
const cloumns = ref<ColumnType[]>([
  { prop: "id", label: "ID", width: 300 },
  { prop: "salesOrderNo", label: "订单号" },
  // 自定义内容显示
  { prop: "qualityClass", label: "品类", slot: "qualityClass" },
  // 表头分组
  {
    label: "产品类型",
    childrenColumns: [
      { prop: "productForm", label: "产品型号" },
      { prop: "productForm", label: "产品型号" },
      { prop: "productForm", label: "产品型号" }
    ]
  }
]);

const form = reactive({
  salesOrderNo: ""
});
const formRef = ref<InstanceType<typeof ElForm>>();
const { pageSize, refresh, tableLoading, tableData, reset, search, pageChange, total } = useTable(getPage, {
  immediate: true
});
</script>
```

#### BaseTable 参数

1. 可接收 el-table 所有参数和插槽（default 除外）
2. refresh: Function 刷新方法
3. fullScreenSelector?: string 全屏容器，不传就全屏整个表格（包含操作）
4. columns: ColumnType[] 可接收 el-table-column所有参数  
   示例：

```ts
const cloumns = ref<ColumnType[]>([
  { prop: "id", label: "ID", width: 300 },
  {
    prop: "salesOrderNo",
    label: "订单号",
    // 自定义筛选图标，需要在<BaseTable></BaseTable>中插入slot
    iconSlot: "salesOrderNoIcon",
    // 自定义header，需要在<BaseTable></BaseTable>中插入slot
    header: "salesOrderNoHeader"
  },
  // 自定义内容显示，需要在<BaseTable></BaseTable>中插入slot
  { prop: "qualityClass", label: "品类", slot: "qualityClass" },
  // 表头分组
  {
    label: "产品类型",
    childrenColumns: [
      { prop: "productForm", label: "产品型号" },
      { prop: "productForm", label: "产品型号" },
      { prop: "productForm", label: "产品型号" }
    ]
  }
]);
```

#### BaseTable 插槽

1. append, empty 同el-table
2. left-operation 左侧操作
3. right-operation 右侧操作，默认有刷新，列设置，全屏。传入此slot 将不会有默认操作
