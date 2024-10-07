import { ref } from "vue";
import usePagination from "./usePagination";
import type { Options as paginationOptions } from "./usePagination";

interface Options {
  onSuccess?: () => void;
  immediate?: boolean;
  paginationOption?: paginationOptions;
}
type GetPageApi = (params: { currentPage?: number; pageSize?: number; query?: any }) => Promise<any>;

export default function useTable(getTableDataApi: GetPageApi, options: Options) {
  // loading
  const tableLoading = ref(false);
  //  表格数据
  const tableData = ref([] as any[]);
  const queryParam = ref({});
  // 获取数据
  const getData = async (page = currentPage.value, size = pageSize.value, query: any = {}) => {
    tableLoading.value = true;
    // 保存查询参数
    queryParam.value = query;
    try {
      const data = await getTableDataApi({ currentPage: page, pageSize: size, query });
      tableData.value = data.records;
      pageSize.value = data.size;
      currentPage.value = data.current;
      setTotal(data.total);
      tableLoading.value = false;
      options.onSuccess && options.onSuccess();
    } catch (e) {
      console.error(e);
      tableLoading.value = false;
    }
  };
  // 分页操作
  const {
    setTotal,
    total,
    current: currentPage,
    pageSize,
    onChange: pageChange
  } = usePagination(getData, options.paginationOption);
  // 查询
  const search = (query = {}) => {
    currentPage.value = 1;
    getData(currentPage.value, pageSize.value, query);
  };
  // 刷新
  const refresh = () => getData(currentPage.value, pageSize.value, queryParam.value);
  // 重置
  const reset = () => {
    currentPage.value = 1;
    pageSize.value = 10;
    queryParam.value = {};
    getData(currentPage.value, pageSize.value, queryParam.value);
  };
  // 立即执行
  options.immediate && getData();
  return {
    pageSize,
    currentPage,
    total,
    tableLoading,
    tableData,
    search,
    refresh,
    reset,
    pageChange
  };
}
