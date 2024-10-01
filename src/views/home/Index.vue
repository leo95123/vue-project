<template>
  <div class="home">
    <el-table :data="tableData" v-loading="tableLoading">
      <el-table-column prop="salesOrderNo" label="订单号1" />
      <el-table-column prop="salesOrderNo" label="订单号" />
    </el-table>
    <el-pagination layout="prev, pager, next,jumper,total" :page-size="pageSize" :total="total" @change="pageChange" />
  </div>
</template>

<script setup lang="ts">
import { getCount, getPage } from "@/api/home";
import { onMounted, reactive } from "vue";
import useTable from "@/hook/useTable";

const { pageSize, currentPage, tableLoading, tableData, search, pageChange, total } = useTable(getPage, {
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
