import { reactive, toRefs } from "vue";

type Callback = (page: number, pageSize: number) => void;

export type Options = {
  currentPage: number;
  total: number;
  pageSize: number;
  pageSizes: number[];
};

export default function usePagination(
  callback?: Callback,
  options: Options = {
    currentPage: 1,
    total: 0,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50]
  }
) {
  const pagination = reactive({
    currentPage: options.currentPage,
    total: options.total,
    pageSize: options.pageSize,
    pageSizes: options.pageSizes,
    onChange: (page: number, pageSize: number) => {
      pagination.currentPage = page;
      pagination.pageSize = pageSize;
      callback && callback(page, pageSize);
    }
  });
  const setTotal = (toal: number) => {
    pagination.total = toal;
  };

  const { currentPage, total, pageSize, pageSizes, onChange } = toRefs(pagination);
  return {
    current: currentPage,
    total,
    pageSize,
    pageSizes,
    onChange,
    setTotal
  };
}
