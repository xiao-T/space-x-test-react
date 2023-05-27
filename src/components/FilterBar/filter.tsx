// filter panel

import React, { FC, useContext } from "react";
import { TextField, Grid, Drawer, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// local components
import CustomDatePicker from "../CustomDatePicker";
import dayjs from "dayjs";
import SelectField from "../SelectField";
import { sortOptions, statusOptions } from "./selectOptions";
import filterTheme from "./theme";
import { HomeContext } from "../../pages/home/store";
import {
  fetchRecords,
  TFilterFormType,
  defaultFilter,
} from "../../pages/home/apis";

// filter panel type
type TFilterPanelProps = {
  open: boolean;
  onClose: () => void;
};

const FilterPanel: FC<TFilterPanelProps> = ({ open, onClose }): JSX.Element => {
  const { dispatch } = useContext(HomeContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultFilter,
    },
  });
  const onSubmit: SubmitHandler<TFilterFormType> = async (
    data: TFilterFormType
  ) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch({
      type: "reset",
    });
    const filter = {
      ...data,
    };
    const [records, hasNextPage] = await fetchRecords(1, filter);
    dispatch({
      type: "update",
      payload: {
        records,
        hasNextPage,
        page: 1,
      },
    });
    onClose();
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
                rules={{ required: "搜索关键字不能为空!" }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="关键字"
                    variant="outlined"
                    {...field}
                    error={!!errors.keywords}
                    helperText={!!errors.keywords && errors.keywords?.message}
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
                rules={{
                  validate: (value, form) => {
                    if (
                      dayjs(value).isBefore(dayjs(form.startDate)) ||
                      dayjs(value).isSame(dayjs(form.startDate))
                    ) {
                      return "结束时间必须大于开始时间";
                    }
                    return true;
                  },
                }}
                render={({ field: { ref, ...rest } }) => (
                  <CustomDatePicker
                    label={"请选择结束时间"}
                    {...rest}
                    error={!!errors.endDate}
                    helperText={errors.endDate?.message}
                  />
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
                name="date_local"
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
