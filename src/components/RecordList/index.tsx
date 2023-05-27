// spaceX launch records

import React, { FC, useEffect, useContext } from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, Grid } from "@mui/material";
import recordListTheme from "./theme";
import ListCard from "./ListCard";
import dayjs from "dayjs";
// local components
import LazyLoadHOC from "../LazyLoadHOC";
import LoadMore from "../LoadMore";
import { fetchRecords } from "../../pages/home/apis";
import { HomeContext, TRecordItem } from "../../pages/home/store";

const RecordList: FC = () => {
  const { page, records, hasNextPage, dispatch } = useContext(HomeContext);
  // fetch records
  const getRecords = async (page = 1): Promise<boolean> => {
    const [records, hasNextPage] = await fetchRecords(page);
    dispatch({
      type: "update",
      payload: {
        records,
        hasNextPage,
        page,
      },
    });
    return hasNextPage;
  };
  // since React 18, useEffect will be called twice in development with `StrictMode`
  // refer to: https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode
  useEffect(() => {
    // fetch first page data
    getRecords(page);
  }, []);
  return (
    <ThemeProvider theme={recordListTheme}>
      <LoadMore
        isLoading={hasNextPage}
        onLoadMore={async (): Promise<boolean> => {
          const nextPage = page + 1;
          const result = await getRecords(nextPage);
          return result;
        }}
      >
        <Box mt={10} mx={2}>
          <Grid container spacing={2}>
            {records.map((record: TRecordItem) => {
              const { id, name, links, date_local } = record;
              const image = links.patch.small;
              const time = dayjs(date_local).format("MMMM D, YYYY");
              return (
                <Grid key={id} item>
                  <ListCard id={id} name={name} image={image} time={time} />
                </Grid>
              );
            })}
          </Grid>
          {records.length === 0 && !hasNextPage && (
            <Box p={4} sx={{ color: "#fff", textAlign: "center" }}>
              Nothing :)
            </Box>
          )}
        </Box>
      </LoadMore>
    </ThemeProvider>
  );
};

export default LazyLoadHOC()(RecordList);
