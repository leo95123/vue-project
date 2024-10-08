import request from "@/request";

export function getCount() {
  return request.get("/order/process/api/ord/salesOrderLineInfo/getCount");
}
export function getPage(data: any) {
  return request.post("/order/process/api/ord/salesOrderLineInfo/getOrderPage", data);
}
