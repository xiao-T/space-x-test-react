// date picker wrap

import React, { FC } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ControllerRenderProps } from "react-hook-form";

type TCustomDatePicker = {
  label?: string;
  error?: boolean;
  helperText?: string;
} & Omit<ControllerRenderProps, "ref">;
const CustomDatePicker: FC<TCustomDatePicker> = ({
  label,
  helperText,
  error = false,
  ...rest
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        {...rest}
        slotProps={{
          textField: {
            helperText,
            error,
          },
        }}
      />
    </LocalizationProvider>
  );
};
export default CustomDatePicker;
