// custom select field
import React, { FC } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ControllerRenderProps } from "react-hook-form";

export type TOptionItem = {
  value: string;
  label: string;
};
type TSelectFieldType = {
  id: string;
  label: string;
  options: TOptionItem[];
} & Omit<ControllerRenderProps, "ref">;

const SelectField: FC<TSelectFieldType> = ({
  id,
  label,
  options = [],
  ...rest
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Select id={id} label="{label}" {...rest}>
        {options.map((item) => {
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectField;
