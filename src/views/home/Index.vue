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
      <template #empty>
        <el-empty description="2333" />
      </template>
      <template #qualityClass="scope">
        <el-tag>测试-{{ scope.row.qualityClass }}</el-tag>
      </template>
    </BaseTable>
    <el-pagination
      layout="prev, pager, next,jumper,total,sizes"
      :page-sizes="[10, 15, 20, 30]"
      v-model:page-size="pageSize"
      :total="total"
      @change="pageChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { ColumnType } from "@/components/BaseTable/types";
import { getCount, getPage } from "@/api/home";
import { onMounted, ref, reactive } from "vue";
import useTable from "@/hook/useTable";
import SearchHeader from "@/components/SearchHeader.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";

const cloumns = ref<ColumnType[]>([
  { prop: "id", label: "ID", width: 300 },
  { prop: "salesOrderNo", label: "订单号" },
  { prop: "qualityClass", label: "品类", slot: "qualityClass" },
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
  salesOrderNo: "",
  salesOrderLineNo: ""
});
const { pageSize, refresh, tableLoading, tableData, reset, search, pageChange, total } = useTable(getPage, {
  immediate: true
});

const num = reactive({
  failNum: 0,
  successNum: 0
});
onMounted(() => {
  getCount().then((res: any) => {
    num.failNum = res.failNum;
    num.successNum = res.successNum;
    console.log(res);
    if (res.failNum === 1) {
      console.log("失败");
    }
  });
});
</script>
<style lang="scss" scoped></style>
