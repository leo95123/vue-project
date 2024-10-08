import { defineComponent } from "vue";
import type { ColumnType } from "./types";

export default defineComponent({
  name: "BaseTableColumn",
  props: {
    columns: {
      type: Array as () => ColumnType[]
    }
  },
  setup(props, { slots }) {
    const getRenderColumns = (column: ColumnType) => {
      // 获取slot
      const slot = column.slot ? slots[column.slot] : null;
      const headerSlot = column.headerSlot ? slots[column.headerSlot] : null;
      const iconSlot = column.iconSlot ? slots[column.iconSlot] : null;
      // 获取v-slots
      const vSlots: {
        default?: any;
        header?: any;
        icon?: any;
      } = {
        default: (scope: any) => {
          return slot ? slot(scope) : null;
        },
        header: (scope: any) => {
          return headerSlot ? headerSlot(scope) : null;
        },
        icon: (scope: any) => {
          return iconSlot ? iconSlot(scope) : null;
        }
      };
      // 清除不需要的slot
      !slot && delete vSlots.default;
      !headerSlot && delete vSlots.header;
      !iconSlot && delete vSlots.icon;
      return (
        <>
          <el-table-column {...column} v-slots={vSlots}>
            {column.childrenColumns?.map(item => {
              return getRenderColumns(item);
            })}
          </el-table-column>
        </>
      );
    };
    return () => (
      <>
        {props.columns?.map(item => {
          return getRenderColumns(item);
        })}
      </>
    );
  }
});
