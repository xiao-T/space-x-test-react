// filter panel select options
import { TOptionItem } from "../SelectField";

// sort options
export const sortOptions: TOptionItem[] = [
  {
    value: "desc",
    label: "发射时间由近到远",
  },
  {
    value: "asc",
    label: "发射时间由远到近",
  },
];
// launch status options
export const statusOptions: TOptionItem[] = [
  {
    value: "all",
    label: "全部",
  },
  {
    value: "launched",
    label: "是",
  },
  {
    value: "unlaunched",
    label: "否",
  },
];
