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
    <SearchHeader :reset="reset" :form="form" :search="search" show-hide-condition>
      <template #left>
        <el-form-item prop="salesOrderNo" label="订单号:">
          <el-input placeholder="请输入" v-model="form.salesOrderNo"></el-input>
        </el-form-item>
        <el-form-item prop="salesOrderNo" label="订单号:">
          <el-input placeholder="请输入" v-model="form.salesOrderNo"></el-input>
        </el-form-item>
        <el-form-item prop="salesOrderNo" label="订单号:">
          <el-input placeholder="请输入" v-model="form.salesOrderNo"></el-input>
        </el-form-item>
      </template>
      <template #hide-left>
        <el-form-item prop="salesOrderLineNo" label="订单行号:">
          <el-input placeholder="请输入" v-model="form.salesOrderLineNo"></el-input>
        </el-form-item>
      </template>
    </SearchHeader>
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

#### BaseTable 默认操作

1. 刷新：需要传入刷新方法
2. 列设置: 包含列排序和列显示，可操作的列不包含子列和空表头
3. 全屏：需要传入全屏容器，否则全屏整个表格

### SearchHeader 查询条件组件

```vue
<template>
  <SearchHeader :reset="reset" :form="form" :search="search" show-hide-condition>
    <!-- 左侧查询条件内容 -->
    <template #left>
      <el-form-item prop="salesOrderNo" label="订单号:">
        <el-input placeholder="请输入" v-model="form.salesOrderNo"></el-input>
      </el-form-item>
      <el-form-item prop="salesOrderNo" label="订单号:">
        <el-input placeholder="请输入" v-model="form.salesOrderNo"></el-input>
      </el-form-item>
      <el-form-item prop="salesOrderNo" label="订单号:">
        <el-input placeholder="请输入" v-model="form.salesOrderNo"></el-input>
      </el-form-item>
    </template>
    <!-- 可隐藏的左侧搜索条件 -->
    <template #hide-left>
      <el-form-item prop="salesOrderLineNo" label="订单行号:">
        <el-input placeholder="请输入" v-model="form.salesOrderLineNo"></el-input>
      </el-form-item>
    </template>
  </SearchHeader>
</template>
```

#### SearchHeader 参数

1. reset?: Function 重置方法
2. form: any 表单
3. search?: Function 查询方法
4. showHideCondition?:boolean 默认是否显示隐藏的筛选条件

#### SearchHeader 插槽

1. left: 左侧查询条件
2. hide-left: 可隐藏的左侧查询条件
3. right: 右侧查询条件, 默认查询和重置，传入此slot 将不会有默认操作
