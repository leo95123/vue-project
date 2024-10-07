<template>
  <div class="home">
    <BaseTable :data="tableData" :refresh="refresh" :full-screen-selector="'.home'" v-loading="tableLoading">
      <el-table-column prop="id" label="ID">
        <template #default="scope">
          <span>aaa-{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="salesOrderNo" label="订单号" />
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </BaseTable>
    <el-pagination layout="prev, pager, next,jumper,total" :page-size="pageSize" :total="total" @change="pageChange" />
  </div>
</template>

<script setup lang="ts">
import { getCount, getPage } from "@/api/home";
import { onMounted, reactive } from "vue";
import useTable from "@/hook/useTable";
import BaseTable from "@/components/BaseTable.vue";

const { pageSize, refresh, tableLoading, tableData, search, pageChange, total } = useTable(getPage, {
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
    if (res.failNum == 1) {
      console.log("失败");
    }
  });
});
</script>
<style lang="scss" scoped></style>
