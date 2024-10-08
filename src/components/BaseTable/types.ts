import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

interface StrictColumnType<T = any> extends Omit<TableColumnCtx<T>, "children"> {
  customId: string;
  slot: string;
  headerSlot?: string;
  iconSlot: string;
  childrenColumns: ColumnType[];
}
export type ColumnType = Partial<StrictColumnType>;
