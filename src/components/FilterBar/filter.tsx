// filter panel

import React, { FC } from "react";
import { TextField, Grid, Drawer, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// local components
import CustomDatePicker from "../CustomDatePicker";
import dayjs, { Dayjs } from "dayjs";
import SelectField from "../SelectField";
import { sortOptions, statusOptions } from "./selectOptions";
import filterTheme from "./theme";

// filter panel type
type TFilterPanelProps = {
  open: boolean;
  onClose: () => void;
};

// form type
type TFilterFormType = {
  keywords: string;
  startDate: Dayjs;
  endDate: Dayjs;
  launchStatus: string;
  launchTime: string;
};

const FilterPanel: FC<TFilterPanelProps> = ({ open, onClose }): JSX.Element => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      keywords: "",
      startDate: dayjs(new Date().toLocaleString()),
      endDate: dayjs(new Date().toLocaleString()),
      launchStatus: "all",
      launchTime: "desc",
    },
  });
  const onSubmit: SubmitHandler<TFilterFormType> = (data: TFilterFormType) => {
    console.log("submit", data, dayjs(data.startDate).toISOString());
  };
  return (
    <ThemeProvider theme={filterTheme}>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="subtitle1" mb={1} mt={4} textAlign={"center"}>
            搜索
          </Typography>
          <Grid
            container
            direction={"column"}
            spacing={2}
            justifyContent={"space-between"}
          >
            <Grid item>
              <Controller
                name="keywords"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="关键字"
                    required
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="startDate"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <CustomDatePicker label={"请选择开始时间"} {...rest} />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="endDate"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <CustomDatePicker label={"请选择结束时间"} {...rest} />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="launchStatus"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <SelectField
                    label="发射状态"
                    id="launch-status-label"
                    {...rest}
                    options={statusOptions}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="launchTime"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <SelectField
                    label="排序"
                    id="sort-label"
                    {...rest}
                    options={sortOptions}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Button fullWidth type="submit">
                确定
              </Button>
            </Grid>
          </Grid>
        </form>
      </Drawer>
    </ThemeProvider>
  );
};

export default FilterPanel;
